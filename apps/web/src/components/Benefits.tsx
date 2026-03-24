'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Automatización total',
    description:
      'Desde la captación de leads hasta el cierre de ventas. Tus procesos funcionan de manera autónoma, eliminando tareas repetitivas y errores humanos.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m0 0l4.5 7.795M12 12L7.5 19.795M12 12l4.5-7.795" />
      </svg>
    ),
    stat: '80%',
    statLabel: 'menos tareas manuales',
    color: '#00B3FF',
  },
  {
    title: 'Ahorro de tiempo',
    description:
      'Recupera horas de tu día. Lo que antes tomaba equipos completos, ahora lo ejecuta la IA en segundos. Enfócate en lo estratégico.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat: '15h',
    statLabel: 'ahorradas por semana',
    color: '#10B981',
  },
  {
    title: 'Incremento de ventas',
    description:
      'Agentes IA que responden al instante, califican leads y cierran ventas 24/7. Nunca pierdas una oportunidad por falta de velocidad.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    stat: '3x',
    statLabel: 'más conversiones',
    color: '#FFD700',
  },
  {
    title: 'Decisiones inteligentes',
    description:
      'Dashboards, métricas y análisis en tiempo real. Cada decisión que tomes estará respaldada por datos procesados por inteligencia artificial.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    stat: '360°',
    statLabel: 'visión del negocio',
    color: '#8B5CF6',
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-gold/3 rounded-full blur-[150px]" />

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
            Ventajas competitivas
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-4 mb-6">
            Por qué elegir{' '}
            <span className="text-gradient-gold">AI Vanguard</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            No es solo tecnología. Es una ventaja competitiva real
            que transforma la manera en que tu negocio opera y crece.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-2xl p-8 h-full flex gap-6 transition-all duration-500 hover:border-white/10">
                {/* Icon & Stat */}
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${benefit.color}15`,
                      color: benefit.color,
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <div className="text-center">
                    <div
                      className="font-display font-bold text-2xl"
                      style={{ color: benefit.color }}
                    >
                      {benefit.stat}
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                      {benefit.statLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
