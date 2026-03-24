# AI Vanguard - Sistema de Prospección Automatizada LATAM

Sistema completo de prospección y contacto automatizado para comercios en Uruguay (expandible a LATAM) usando **n8n**, **Evolution API** (WhatsApp), **OpenAI** y **PostgreSQL**.

---

## 📐 Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SISTEMA DE PROSPECCIÓN                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐  │
│  │  01 - SCRAPER    │    │  02 - OUTBOUND   │    │  03 - HANDLER    │  │
│  │  Google Maps     │───▶│  WhatsApp msgs   │───▶│  IA + Conversac. │  │
│  │  (SerpAPI)       │    │  (Evolution API)  │    │  (OpenAI + Evol.)│  │
│  └────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘  │
│           │                       │                        │            │
│           ▼                       ▼                        ▼            │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      PostgreSQL (leads + mensajes + métricas)     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  Flujo: Scraping ──▶ Score ──▶ Contacto WA ──▶ IA conversa ──▶ Cita   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Workflows

| # | Workflow | Trigger | Función |
|---|---------|---------|---------|
| 01 | Lead Scraper | Cron diario 08:00 | Busca comercios en Google Maps vía SerpAPI, los puntúa y guarda en DB |
| 02 | Campaña Outbound | Cada 3 minutos | Envía mensajes personalizados por WhatsApp con rate limiting anti-ban |
| 03 | Handler Conversación | Webhook (Evolution API) | Recibe respuestas, IA responde, detecta intención, agenda o descarta |

---

## 🔧 Requisitos Previos

### Servicios necesarios

| Servicio | Para qué | Costo aprox. |
|----------|----------|:------------:|
| **n8n** (self-hosted) | Orquestador de workflows | Gratis (Docker) |
| **PostgreSQL** | Base de datos | Gratis |
| **Evolution API** | Enviar/recibir WhatsApp | Gratis (self-hosted) |
| **SerpAPI** | Scraping Google Maps | $50/mes (5000 búsquedas) |
| **OpenAI** | IA para conversaciones | ~$5-15/mes (gpt-4o-mini) |
| **Webhook externo** | Notificaciones (Slack/Discord) | Gratis |

### Stack técnico recomendado

- Docker + Docker Compose (para n8n, Evolution API, PostgreSQL)
- VPS con mínimo 2GB RAM (Contabo, Hetzner, DigitalOcean)
- Dominio con SSL (para webhooks)

---

## 🚀 Instalación

### 1. Variables de entorno de n8n

Agregar estas variables en tu archivo `.env` o `docker-compose.yml` de n8n:

```env
# SerpAPI - para scraping de Google Maps
SERPAPI_KEY=tu_clave_serpapi_aqui

# Evolution API - para WhatsApp
EVOLUTION_API_URL=https://tu-evolution-api.com
EVOLUTION_API_KEY=tu_api_key_evolution
EVOLUTION_INSTANCE=nombre-de-tu-instancia

# OpenAI - para el agente de IA
OPENAI_API_KEY=sk-tu_clave_openai

# Webhook de notificaciones (Slack, Discord, o cualquier URL)
NOTIFICATION_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
```

> **Docker Compose**: agregar bajo `environment:` del servicio n8n:
> ```yaml
> environment:
>   - SERPAPI_KEY=xxx
>   - EVOLUTION_API_URL=https://...
>   - EVOLUTION_API_KEY=xxx
>   - EVOLUTION_INSTANCE=mi-instancia
>   - OPENAI_API_KEY=sk-xxx
>   - NOTIFICATION_WEBHOOK_URL=https://...
> ```

### 2. Base de datos

Ejecutar el script SQL en tu PostgreSQL:

```bash
psql -U tu_usuario -d tu_base -f sql/setup.sql
```

O desde Docker:
```bash
docker exec -i tu_postgres_container psql -U postgres -d ai_vanguard < sql/setup.sql
```

### 3. Credencial PostgreSQL en n8n

1. Ir a **Settings** > **Credentials** en n8n
2. Crear nueva credencial tipo **PostgreSQL**
3. Configurar host, port, database, user, password
4. Nombrarla: `PostgreSQL AI Vanguard`

### 4. Configurar Evolution API

1. Crear una instancia en Evolution API
2. Conectar un número de WhatsApp (escanear QR)
3. Configurar webhook apuntando a tu n8n:
   ```
   URL: https://tu-n8n.com/webhook/evolution-webhook
   Events: messages.upsert
   ```

### 5. Importar workflows

En n8n, ir a **Workflows** > **Import from File** e importar en orden:

1. `01-lead-scraper.json`
2. `02-outbound-campaign.json`
3. `03-conversation-handler.json`

> **IMPORTANTE**: Después de importar, n8n pedirá que asignes las credenciales de PostgreSQL. Seleccionar la credencial creada en el paso 3.

### 6. Mapear credenciales

Después de importar, abrir cada workflow y verificar que todos los nodos de Postgres tengan la credencial correcta asignada (el ícono de credencial va a mostrar una advertencia si falta).

### 7. Activar workflows

1. **Primero**: Activar `03 - Handler Conversación` (necesita estar activo para recibir webhooks)
2. **Segundo**: Activar `01 - Lead Scraper` (empezará a buscar leads al día siguiente)
3. **Tercero**: Activar `02 - Campaña Outbound` (empezará a enviar cuando haya leads)

---

## ⚙️ Configuración

### Rate limiting (tabla `config`)

```sql
-- Cambiar máximo de envíos por día (default: 30)
UPDATE config SET value = '25' WHERE key = 'max_envios_dia';

-- Cambiar horario (default: 10-19)
UPDATE config SET value = '11' WHERE key = 'horario_inicio';
UPDATE config SET value = '18' WHERE key = 'horario_fin';
```

### Agregar ciudades/rubros

Editar el nodo **"Generar Busquedas"** en el workflow 01. Las listas de `rubros` y `ciudades` son fácilmente editables. Para expandir a Argentina, Brasil, etc:

```javascript
// Agregar en el array de ciudades:
{ nombre: 'Buenos Aires', lat: -34.6037, lng: -58.3816, pais: 'Argentina' },
{ nombre: 'Rosario', lat: -32.9468, lng: -60.6393, pais: 'Argentina' },
```

### Personalizar mensajes de primer contacto

Editar el nodo **"Personalizar Mensaje"** en el workflow 02. Los templates están organizados por categoría de rubro (gastronomía, estética, salud, servicios, genérico).

### Ajustar prompt de IA

Editar el nodo **"Preparar Prompt IA"** en el workflow 03. El system prompt define toda la personalidad y reglas del agente de venta.

---

## 📊 Métricas y Consultas

### Dashboard general

```sql
SELECT * FROM metricas_campana;
```

Resultado:
```
total_leads | pendientes | contactados | respondidos | interesados | agendados | cerrados | blacklisted | tasa_respuesta_pct | tasa_agendamiento_pct
```

### Métricas por rubro

```sql
SELECT * FROM metricas_por_rubro;
```

### Actividad diaria

```sql
SELECT * FROM actividad_diaria LIMIT 30;
```

### Leads listos para contactar

```sql
SELECT nombre, rubro, ciudad, whatsapp, score_prospecto
FROM leads
WHERE status = 'nuevo'
ORDER BY score_prospecto DESC
LIMIT 20;
```

### Conversaciones activas

```sql
SELECT l.nombre, l.rubro, l.whatsapp, l.status,
  (SELECT COUNT(*) FROM mensajes_log m WHERE m.lead_id = l.id) as total_mensajes,
  (SELECT mensaje FROM mensajes_log m WHERE m.lead_id = l.id ORDER BY created_at DESC LIMIT 1) as ultimo_mensaje
FROM leads l
WHERE l.status IN ('respondido', 'interesado')
ORDER BY l.updated_at DESC;
```

### Leads agendados (para contactar ahora)

```sql
SELECT nombre, rubro, ciudad, whatsapp, fecha_agendado
FROM leads
WHERE status = 'agendado'
ORDER BY fecha_agendado DESC;
```

---

## ⚠️ Medidas Anti-Ban

El sistema implementa estas protecciones:

| Medida | Implementación |
|--------|---------------|
| **Rate limit diario** | Máx. 30 mensajes/día por número (configurable) |
| **Espaciado temporal** | 3 minutos mínimo entre envíos (~20 envíos/hora máx.) |
| **Horario humano** | Solo 10:00-19:00 UY, lunes a viernes |
| **Mensajes personalizados** | Templates variados por rubro + nombre del comercio |
| **Blacklist automática** | Si dicen "no", se deja de contactar inmediatamente |
| **Volumen gradual** | Empezar con 10-15/día y subir gradualmente |

### Recomendaciones adicionales

1. **Usar un número nuevo** dedicado exclusivamente a prospección
2. **Calentarlo primero**: enviar mensajes manuales durante 1-2 semanas antes de automatizar
3. **Empezar despacio**: configurar `max_envios_dia` en 10 la primera semana, 20 la segunda, 30 después
4. **Monitorear**: si ven que el número se banea temporalmente, bajar el volumen
5. **Rotar números**: si escalan, usar 2-3 números con 15-20 msgs/día cada uno

---

## 🛠️ Troubleshooting

### El scraper no encuentra resultados
- Verificar que la API key de SerpAPI sea válida
- Probar la query manualmente en https://serpapi.com/playground
- Algunos rubros pueden dar pocos resultados en ciudades chicas

### Evolution API no envía mensajes
- Verificar que la instancia esté conectada (QR escaneado)
- Verificar la URL y API key en las variables de entorno
- Probar enviar un mensaje manual desde la API de Evolution

### La IA responde raro
- Ajustar el system prompt en el nodo "Preparar Prompt IA"
- Cambiar `temperature` (0.5 = más conservador, 0.9 = más creativo)
- Verificar que el historial se esté cargando correctamente

### No llegan webhooks
- Verificar que el workflow 03 esté **ACTIVO** (no solo guardado)
- Verificar la URL del webhook en Evolution API
- Probar la URL del webhook manualmente con `curl`

---

## 📁 Estructura de archivos

```
n8n-workflows/
├── README.md                          ← Este archivo
├── sql/
│   └── setup.sql                      ← Schema de PostgreSQL
├── 01-lead-scraper.json               ← Workflow: scraping Google Maps
├── 02-outbound-campaign.json          ← Workflow: envío WhatsApp rate-limited
└── 03-conversation-handler.json       ← Workflow: IA + conversación + handoff
```

---

## 🔄 Flujo de estados del lead

```
nuevo ──▶ contactado ──▶ respondido ──▶ interesado ──▶ agendado ──▶ cerrado
  │           │              │              │
  └───────────┴──────────────┴──────────────┴──────▶ blacklist
```

| Estado | Significado |
|--------|------------|
| `nuevo` | Scrapeado, listo para contactar |
| `contactado` | Se le envió primer mensaje |
| `respondido` | Respondió algo (IA lo está atendiendo) |
| `interesado` | Mostró interés (segunda interacción positiva) |
| `agendado` | Quiere reunión → **NOTIFICACIÓN AL EQUIPO** |
| `cerrado` | Se concretó la reunión/venta (manual) |
| `blacklist` | Dijo que no / pidió no ser contactado |
