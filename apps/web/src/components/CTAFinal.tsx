'use client';

import { motion } from 'framer-motion';

export default function CTAFinal() {
  return (
    <section id="cta-final" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/8 rounded-full blur-[180px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-xs font-medium text-gold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Acceso disponible ahora
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            Empieza a{' '}
            <span className="text-gradient-blue">automatizar</span>{' '}
            hoy
          </h2>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            No esperes a que tu competencia te supere. Implementa inteligencia artificial
            en tu operación y transforma la manera en que haces negocios.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#ecosistema"
              className="group relative px-10 py-4 rounded-2xl text-base font-semibold text-dark bg-gradient-to-r from-primary to-blue-400 hover:shadow-glow-blue-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Ver productos
            </a>
            <a
              href="https://discord.gg/aivanguard"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-4 rounded-2xl text-base font-semibold text-gold border border-gold/30 hover:border-gold/60 hover:shadow-glow-gold transition-all duration-300 hover:scale-105 glass w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
              Unirse a Discord
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
