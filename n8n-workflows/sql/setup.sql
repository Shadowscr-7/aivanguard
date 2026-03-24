-- ============================================
-- AI Vanguard - Sistema de Prospección LATAM
-- Base de datos PostgreSQL
-- ============================================

-- Tabla principal de leads
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    rubro TEXT,
    ciudad TEXT,
    pais TEXT DEFAULT 'Uruguay',
    whatsapp TEXT UNIQUE,
    instagram TEXT,
    website TEXT,
    website_score INT DEFAULT -1,        -- -1 = no evaluado, 0-100 = puntaje (menor = más obsoleto)
    direccion TEXT,
    rating NUMERIC(2,1),
    reviews_count INT DEFAULT 0,
    origen TEXT DEFAULT 'google_maps',    -- google_maps, instagram, directorio, referido
    status TEXT DEFAULT 'nuevo',          -- nuevo, contactado, respondido, interesado, agendado, cerrado, blacklist
    score_prospecto INT DEFAULT 0,       -- 0-100, puntaje de calidad del prospecto
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    fecha_contacto TIMESTAMP,
    fecha_respuesta TIMESTAMP,
    fecha_agendado TIMESTAMP,
    notas TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de log de mensajes
CREATE TABLE IF NOT EXISTS mensajes_log (
    id SERIAL PRIMARY KEY,
    lead_id INT REFERENCES leads(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL,                   -- enviado, recibido
    mensaje TEXT NOT NULL,
    message_id TEXT,                      -- ID del mensaje de WhatsApp
    status_msg TEXT DEFAULT 'sent',       -- sent, delivered, read
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de control de envíos diarios (anti-ban)
CREATE TABLE IF NOT EXISTS envios_diarios (
    id SERIAL PRIMARY KEY,
    fecha DATE DEFAULT CURRENT_DATE,
    cantidad INT DEFAULT 0,
    UNIQUE(fecha)
);

-- Tabla de configuración
CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insertar configuración por defecto
INSERT INTO config (key, value) VALUES
    ('max_envios_dia', '30'),
    ('delay_min_seg', '60'),
    ('delay_max_seg', '180'),
    ('horario_inicio', '10'),
    ('horario_fin', '19'),
    ('timezone', 'America/Montevideo')
ON CONFLICT (key) DO NOTHING;

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON leads(whatsapp);
CREATE INDEX IF NOT EXISTS idx_leads_ciudad_rubro ON leads(ciudad, rubro);
CREATE INDEX IF NOT EXISTS idx_mensajes_lead_id ON mensajes_log(lead_id);
CREATE INDEX IF NOT EXISTS idx_mensajes_created ON mensajes_log(created_at);
CREATE INDEX IF NOT EXISTS idx_envios_fecha ON envios_diarios(fecha);

-- Vista de métricas generales
CREATE OR REPLACE VIEW metricas_campana AS
SELECT
    COUNT(*) FILTER (WHERE status != 'blacklist') AS total_leads,
    COUNT(*) FILTER (WHERE status = 'nuevo') AS pendientes,
    COUNT(*) FILTER (WHERE status = 'contactado') AS contactados,
    COUNT(*) FILTER (WHERE status = 'respondido') AS respondidos,
    COUNT(*) FILTER (WHERE status = 'interesado') AS interesados,
    COUNT(*) FILTER (WHERE status = 'agendado') AS agendados,
    COUNT(*) FILTER (WHERE status = 'cerrado') AS cerrados,
    COUNT(*) FILTER (WHERE status = 'blacklist') AS blacklisted,
    ROUND(
        COUNT(*) FILTER (WHERE status IN ('respondido','interesado','agendado','cerrado'))::NUMERIC /
        NULLIF(COUNT(*) FILTER (WHERE status IN ('contactado','respondido','interesado','agendado','cerrado')), 0) * 100, 1
    ) AS tasa_respuesta_pct,
    ROUND(
        COUNT(*) FILTER (WHERE status IN ('agendado','cerrado'))::NUMERIC /
        NULLIF(COUNT(*) FILTER (WHERE status IN ('contactado','respondido','interesado','agendado','cerrado')), 0) * 100, 1
    ) AS tasa_agendamiento_pct
FROM leads;

-- Vista de métricas por rubro
CREATE OR REPLACE VIEW metricas_por_rubro AS
SELECT
    rubro,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE status = 'contactado') AS contactados,
    COUNT(*) FILTER (WHERE status IN ('respondido','interesado')) AS respondidos,
    COUNT(*) FILTER (WHERE status = 'agendado') AS agendados,
    COUNT(*) FILTER (WHERE status = 'cerrado') AS cerrados,
    COUNT(*) FILTER (WHERE status = 'blacklist') AS blacklisted
FROM leads
GROUP BY rubro
ORDER BY agendados DESC, respondidos DESC;

-- Vista de actividad diaria
CREATE OR REPLACE VIEW actividad_diaria AS
SELECT
    DATE(created_at) AS fecha,
    COUNT(*) FILTER (WHERE tipo = 'enviado') AS enviados,
    COUNT(*) FILTER (WHERE tipo = 'recibido') AS recibidos
FROM mensajes_log
GROUP BY DATE(created_at)
ORDER BY fecha DESC;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_leads_updated
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
