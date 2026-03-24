import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'ai-vanguard-api',
      version: '1.0.0',
    };
  }

  getPlatforms() {
    return {
      platforms: [
        {
          id: 'syndra',
          name: 'Syndra',
          description: 'Automatización de contenido y marketing con IA',
          status: 'active',
        },
        {
          id: 'inmoflow',
          name: 'InmoFlow',
          description: 'CRM inmobiliario con IA',
          status: 'active',
        },
        {
          id: 'flowmind',
          name: 'FlowMind',
          description: 'Gestión financiera personal con IA',
          status: 'active',
        },
        {
          id: 'closer-ai',
          name: 'Closer AI',
          description: 'Centro de agentes IA para ventas',
          status: 'active',
        },
        {
          id: 'scoutleague',
          name: 'ScoutLeague',
          description: 'Plataforma de scouting futbolístico',
          status: 'active',
        },
      ],
    };
  }
}
