'use client';

import { motion } from 'framer-motion';

const metrics = [
  {
    value: '+12,000',
    label: 'Automatizaciones ejecutadas al mes',
    change: '+340% vs trimestre anterior',
  },
  {
    value: '4.8/5',
    label: 'Valoración promedio de usuarios',
    change: 'Basado en +200 reseñas',
  },
  {
    value: '< 2 min',
    label: 'Tiempo de respuesta de agentes IA',
    change: 'En horarios pico',
  },
];

const useCases = [
  {
    industry: 'Inmobiliaria',
    platform: 'INMOFLOW + CLOSER AI',
    result: 'Agencia inmobiliaria automatizó el seguimiento de leads y aumentó un 65% sus cierres mensuales usando agentes IA para WhatsApp.',
    metric: '+65% cierres',
    color: '#8B5CF6',
  },
  {
    industry: 'E-commerce',
    platform: 'SYNDRA + CLOSER AI',
    result: 'Tienda online generó contenido automático para 5 redes sociales y redujo su costo de adquisición de clientes en un 40%.',
    metric: '-40% CAC',
    color: '#00B3FF',
  },
  {
    industry: 'Consultoría',
    platform: 'FLOWMIND + SYNDRA',
    result: 'Consultora financiera implementó análisis de gastos con IA y marketing automatizado, triplicando su base de clientes en 4 meses.',
    metric: '3x clientes',
    color: '#10B981',
  },
];

export default function SocialProof() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-400/30" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-primary/5 rounded-full blur-[130px]" />

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
            Resultados reales
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-4 mb-6">
            Impacto{' '}
            <span className="text-gradient-blue">medible</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Negocios reales usando AI Vanguard para automatizar operaciones
            y multiplicar resultados.
          </p>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="glass rounded-2xl p-8 text-center hover:border-primary/20 transition-all duration-300"
            >
              <div className="font-display font-bold text-3xl sm:text-4xl text-gradient-blue mb-2">
                {metric.value}
              </div>
              <div className="text-white text-sm font-medium mb-2">
                {metric.label}
              </div>
              <div className="text-gray-500 text-xs">
                {metric.change}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.industry}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 flex flex-col hover:border-white/10 transition-all duration-300 group"
            >
              {/* Industry Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `${useCase.color}15`,
                    color: useCase.color,
                  }}
                >
                  {useCase.industry}
                </span>
                <span
                  className="font-display font-bold text-lg"
                  style={{ color: useCase.color }}
                >
                  {useCase.metric}
                </span>
              </div>

              {/* Platform */}
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                {useCase.platform}
              </div>

              {/* Result */}
              <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                {useCase.result}
              </p>

              {/* Decorative line */}
              <div
                className="mt-6 h-0.5 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, ${useCase.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
