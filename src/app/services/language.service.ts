import { Injectable, signal, computed, effect } from '@angular/core';

export interface Translations {
  nav: {
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  hero: {
    title: string;
  };
  about: {
    title: string;
    description: string;
    bio: string;
  };
  skills: {
    title: string;
  };
  projects: {
    title: string;
    codeaxis: {
      title: string;
      description: string;
    };
    cli: {
      title: string;
      description: string;
    };
    chrono: {
      title: string;
      description: string;
    };
  };
  contact: {
    title: string;
    description: string;
    email: string;
    github: string;
    linkedin: string;
  };
  footer: {
    copyright: string;
  };
  skillsData: {
    frontend: {
      name: string;
      description: string;
    };
    backend: {
      name: string;
      description: string;
    };
    finops: {
      name: string;
      description: string;
    };
    ai: {
      name: string;
      description: string;
    };
    devops: {
      name: string;
      description: string;
    };
  };
}

const enTranslations: Translations = {
  nav: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    title: 'Full-Stack Engineer | Angular & Spring Boot Specialist | AI Enthusiast',
  },
  about: {
    title: 'About Me',
    description:
      'Full-Stack Engineer specialized in Angular and Node.js. I build scalable applications while optimizing cloud infrastructure through FinOps. Passionate about AI integration via the Model Context Protocol (MCP).',
    bio: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing. I believe in writing clean, maintainable code and creating products that make a real impact.",
  },
  skills: {
    title: 'What I Do',
  },
  projects: {
    title: 'Featured Projects',
    codeaxis: {
      title: 'CodeAxis - Full-Stack Application',
      description:
        'A platform for learning to code, featuring courses, challenges, and a community.',
    },
    cli: {
      title: 'CLI Orquestrator',
      description:
        'A CLI tool to orchestrate commands and automate workflows across different platforms.',
    },
    chrono: {
      title: 'ChronoTrack Desktop',
      description:
        'A simple and efficient desktop app for tracking work hours with real-time updates.',
    },
  },
  contact: {
    title: "Let's Work Together",
    description: "I'm always open to discussing new projects and opportunities.",
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Michel Cavalcante. All rights reserved.`,
  },
  skillsData: {
    frontend: {
      name: 'Frontend Development',
      description:
        'Crafting responsive and performant user interfaces using Angular, focusing on clean architecture and seamless UX.',
    },
    backend: {
      name: 'Backend & Orchestration',
      description:
        'Developing robust APIs with Node.js and building intelligent CLI tools to automate and orchestrate complex developer workflows.',
    },
    finops: {
      name: 'FinOps & Cloud Optimization',
      description:
        'Analyzing and optimizing cloud spend and infrastructure efficiency to align technical performance with business value.',
    },
    ai: {
      name: 'AI & MCP Integration',
      description:
        'Exploring the frontier of AI through the Model Context Protocol, creating custom servers and tools that enhance LLM capabilities.',
    },
    devops: {
      name: 'DevOps',
      description:
        'Building and maintaining CI/CD pipelines with GitHub Actions, containerizing with Docker, managing infrastructure with Terraform on GCP.',
    },
  },
};

const ptTranslations: Translations = {
  nav: {
    about: 'Sobre',
    skills: 'Habilidades',
    projects: 'Projetos',
    contact: 'Contato',
  },
  hero: {
    title: 'Engenheiro Full-Stack | Especialista em Angular e Spring Boot | Entusiasta de IA',
  },
  about: {
    title: 'Sobre Mim',
    description:
      'Engenheiro Full-Stack especializado em Angular e Node.js. Construo aplicações escaláveis otimizando infraestrutura em nuvem através de FinOps. Apaixonado por integração de IA via Model Context Protocol (MCP).',
    bio: 'Quando não estou programando, você me encontra explorando novas tecnologias, contribuindo para projetos open-source ou compartilhando conhecimento através de artigos técnicos. Acredito em escrever código limpo e mantível e criar produtos que causam impacto real.',
  },
  skills: {
    title: 'O Que Faço',
  },
  projects: {
    title: 'Projetos em Destaque',
    codeaxis: {
      title: 'CodeAxis - Aplicação Full-Stack',
      description:
        'Uma plataforma para aprender a programar, com cursos, desafios e uma comunidade.',
    },
    cli: {
      title: 'CLI Orquestrador',
      description:
        'Uma ferramenta CLI para orquestrar comandos e automatizar fluxos de trabalho em diferentes plataformas.',
    },
    chrono: {
      title: 'ChronoTrack Desktop',
      description:
        'Um aplicativo desktop simples e eficiente para rastrear horas de trabalho com atualizações em tempo real.',
    },
  },
  contact: {
    title: 'Vamos Trabalhar Juntos',
    description: 'Sempre aberto para discutir novos projetos e oportunidades.',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Michel Cavalcante. Todos os direitos reservados.`,
  },
  skillsData: {
    frontend: {
      name: 'Desenvolvimento Frontend',
      description:
        'Criando interfaces responsivas e de alto desempenho com Angular, focando em arquitetura limpa e UX perfeita.',
    },
    backend: {
      name: 'Backend e Orquestração',
      description:
        'Desenvolvendo APIs robustas com Node.js e construindo ferramentas CLI inteligentes para automatizar fluxos de trabalho complexos.',
    },
    finops: {
      name: 'FinOps e Otimização em Nuvem',
      description:
        'Analisando e otimizando gastos em nuvem e eficiência de infraestrutura para alinhar desempenho técnico com valor de negócio.',
    },
    ai: {
      name: 'Integração de IA e MCP',
      description:
        'Explorando a fronteira da IA através do Model Context Protocol, criando servidores e ferramentas personalizadas que potencializam LLMs.',
    },
    devops: {
      name: 'DevOps',
      description:
        'Construindo e mantendo pipelines de CI/CD com GitHub Actions, containerizando com Docker, gerenciando infraestrutura com Terraform no GCP.',
    },
  },
};

export type Language = 'en' | 'pt';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly _language = signal<Language>('en');
  private readonly _translations = signal<Record<Language, Translations>>({
    en: enTranslations,
    pt: ptTranslations,
  });

  readonly language$ = this._language.asReadonly();
  readonly currentTranslations = computed(() => this._translations()[this._language()]);

  constructor() {
    // Load saved language preference from localStorage
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && (saved === 'en' || saved === 'pt')) {
      this._language.set(saved);
    }

    // Save language preference when it changes
    effect(() => {
      localStorage.setItem('language', this._language());
    });
  }

  setLanguage(lang: Language): void {
    this._language.set(lang);
  }

  getLanguage(): Language {
    return this._language();
  }
}
