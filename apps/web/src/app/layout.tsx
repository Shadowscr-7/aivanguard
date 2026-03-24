import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Vanguard | El ecosistema de IA que automatiza tu negocio',
  description:
    'Marketing, ventas, finanzas y operaciones impulsadas por inteligencia artificial. Syndra, InmoFlow, FlowMind, Closer AI y ScoutLeague en un solo ecosistema.',
  keywords: [
    'inteligencia artificial',
    'automatización',
    'SaaS',
    'marketing IA',
    'ventas IA',
    'CRM IA',
    'AI Vanguard',
    'Syndra',
    'InmoFlow',
    'FlowMind',
    'Closer AI',
    'ScoutLeague',
  ],
  openGraph: {
    title: 'AI Vanguard | El ecosistema de IA que automatiza tu negocio',
    description:
      'Marketing, ventas, finanzas y operaciones impulsadas por inteligencia artificial.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'AI Vanguard',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Vanguard | El ecosistema de IA que automatiza tu negocio',
    description:
      'Marketing, ventas, finanzas y operaciones impulsadas por inteligencia artificial.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
