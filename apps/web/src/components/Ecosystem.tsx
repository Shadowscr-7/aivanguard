'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const products = [
  {
    name: 'SYNDRA',
    url: 'https://syndra.aivanguardlabs.com',
    tagline: 'Tu equipo de marketing trabajando 24/7',
    description:
      'Automatización de contenido y marketing con IA. Genera copies, imágenes y videos. Publica en redes sociales y aprende tu estilo de marca.',
    features: ['Generación automática de contenido', 'Publicación en redes sociales', 'Copies, imágenes y videos con IA', 'Aprendizaje del estilo de marca'],
    color: '#00B3FF',
    gradient: 'from-blue-500 to-cyan-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    name: 'INMOFLOW',
    url: 'https://inmoflow.aivanguardlabs.com',
    tagline: 'Convierte consultas en ventas sin esfuerzo',
    description:
      'CRM inmobiliario potenciado con IA. Captura, clasifica y da seguimiento a leads. Automatiza respuestas y agenda visitas sin intervención manual.',
    features: ['Captura y clasificación de leads', 'Respuestas automáticas inteligentes', 'Agendamiento de visitas', 'Seguimiento completo de clientes'],
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
      </svg>
    ),
  },
  {
    name: 'FLOWMIND',
    url: 'https://flowmind.aivanguardlabs.com',
    tagline: 'Tu mente financiera aumentada por IA',
    description:
      'Gestión financiera personal con inteligencia artificial. Controla gastos, recibe análisis inteligentes y recomendaciones personalizadas para evolucionar financieramente.',
    features: ['Control inteligente de gastos', 'Análisis financiero con IA', 'Recomendaciones personalizadas', 'Evolución financiera del usuario'],
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    name: 'CLOSER AI',
    url: 'https://closerai.aivanguardlabs.com',
    tagline: 'Agentes que venden por ti',
    description:
      'Centro de agentes IA para ventas multicanal. Responde automáticamente en WhatsApp, Instagram y Messenger. Cierra ventas y gestiona reservas sin descanso.',
    features: ['WhatsApp Business integrado', 'Instagram y Messenger', 'Respuestas inteligentes automáticas', 'Cierre de ventas y reservas'],
    color: '#F59E0B',
    gradient: 'from-amber-500 to-yellow-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    name: 'SCOUTLEAGUE',
    url: 'https://scoutleague.aivanguardlabs.com',
    tagline: 'El futuro del scouting deportivo',
    description:
      'Plataforma de scouting futbolístico con IA. Analiza estadísticas, rendimiento y evolución de jugadores. Videos, highlights y perfiles profesionales en un solo lugar.',
    features: ['Estadísticas avanzadas de jugadores', 'Seguimiento de rendimiento', 'Videos y highlights', 'Evolución profesional'],
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0m0 0v4.522" />
      </svg>
    ),
  },
  {
    name: 'NEXUSFORGE',
    url: 'https://nexusforge.aivanguardlabs.com',
    tagline: 'El estudio definitivo para card games',
    description:
      'Plataforma all-in-one para diseñar, balancear y distribuir juegos de cartas coleccionables. Editor de cartas con IA, simulador de partidas, generación de arte y exportación a motores de juego.',
    features: ['Editor de cartas y mazos con IA', 'Simulador de partidas y balanceo', 'Art studio con generación de arte IA', 'Exportación a Unity/Unreal/JSON'],
    color: '#EC4899',
    gradient: 'from-pink-500 to-fuchsia-400',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
]; = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Ecosystem() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="ecosistema" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Nuestras plataformas
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-4 mb-6">
            Un ecosistema.{' '}
            <span className="text-gradient-gold">Infinitas posibilidades.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cada plataforma resuelve un problema específico. Juntas, transforman por completo la manera en que operas tu negocio.
          </p>
        </motion.div>

        {/* Product Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative group rounded-2xl overflow-hidden transition-all duration-500`}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${product.color}40, transparent, ${product.color}20)`,
                }}
              />

              <div className="relative glass rounded-2xl p-8 h-full flex flex-col transition-all duration-500 group-hover:border-white/10">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}20, ${product.color}05)`,
                    color: product.color,
                  }}
                >
                  {product.icon}
                </div>

                {/* Name & Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-display font-bold text-xl text-white">
                    {product.name}
                  </h3>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: `${product.color}15`,
                      color: product.color,
                    }}
                  >
                    IA
                  </span>
                </div>

                {/* Tagline */}
                <p
                  className="text-sm font-medium mb-3"
                  style={{ color: product.color }}
                >
                  {product.tagline}
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: product.color }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 border group-hover:scale-[1.02] text-center"
                  style={{
                    borderColor: `${product.color}30`,
                    color: product.color,
                    background: hoveredIndex === index ? `${product.color}10` : 'transparent',
                  }}
                >
                  Descubrir {product.name}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
