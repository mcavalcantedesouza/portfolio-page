import { Injectable, signal, computed, inject } from '@angular/core';
import { Portfolio, Project, Skill, NavLink, SocialLink } from '../models/portfolio.types';
import { GitHubService } from './github.service';
import { LanguageService } from './language.service';

/**
 * PortfolioService - Centralized state management for portfolio data
 * Uses Angular Signals for reactive, performant state management
 */
@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly githubService = inject(GitHubService);
  private readonly languageService = inject(LanguageService);

  // Private state using signals for immutability and reactivity
  private readonly _portfolio = signal<Portfolio>({
    name: 'Michel Cavalcante de Souza',
    title: 'Full-Stack Engineer | Angular & Spring Boot Specialist | AI Enthusiast',
    email: 'michelc.desouza@gmail.com',
    description: `Full-Stack Engineer specialized in Angular and Node.js. I build scalable applications while optimizing cloud infrastructure through FinOps. Passionate about AI integration via the Model Context Protocol (MCP).`,
    initials: 'MC',
  });

  private readonly _projects = signal<Project[]>([
    {
      id: 'code-axis',
      title: 'CodeAxis - Full-Stack Application',
      description:
        'A platform for learning to code, featuring courses, challenges, and a community.',
      tech: ['React', 'Node.js', 'Nest', 'PostgreSQL', 'Docker'],
      image:
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: 'https://github.com/Projeto-Integrador-CodeAxis',
    },
    {
      id: 'cli-orquestrator',
      title: 'CLI Orquestrator',
      description:
        'A CLI tool to orchestrate commands and automate workflows across different platforms.',
      tech: ['AI', 'MCP', 'CLI', 'WSL', 'Gemini', 'TypeScript'],
      image:
        'data:image/svg+xml;utf8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3Cpath d=%22M7 9L10 12L7 15%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3Cpath d=%22M12 9H17%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E',
      link: 'https://github.com/mcavalcantedesouza/cli-orquestrator',
    },
    {
      id: 'chronotrack-desktop',
      title: 'ChronoTrack Desktop',
      description:
        'A simple and efficient desktop app for tracking work hours with real-time updates.',
      tech: ['Electron.js', 'NeDB', 'TypeScript', 'Vue.js'],
      image:
        'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22currentColor%22 class=%22bi bi-stopwatch%22 viewBox=%220 0 16 16%22%3E%3Cpath d=%22M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z%22/%3E%3Cpath d=%22M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3%22/%3E%3C/svg%3E',
      link: 'https://github.com/mcavalcantedesouza/chronotrack-desktop',
    },
  ]);

  private readonly _skills = signal<Skill[]>([
    {
      id: '1',
      name: 'Frontend Development',
      iconName: 'code',
      color: 'bg-blue-500',
      description:
        'Crafting responsive and performant user interfaces using Angular, focusing on clean architecture and seamless UX.',
    },
    {
      id: '2',
      name: 'Backend & Orchestration',
      iconName: 'settings',
      color: 'bg-cyan-500',
      description:
        'Developing robust APIs with Node.js and building intelligent CLI tools to automate and orchestrate complex developer workflows.',
    },
    {
      id: '3',
      name: 'FinOps & Cloud Optimization',
      iconName: 'trending_down',
      color: 'bg-green-500',
      description:
        'Analyzing and optimizing cloud spend and infrastructure efficiency to align technical performance with business value.',
    },
    {
      id: '4',
      name: 'AI & MCP Integration',
      iconName: 'smart_toy',
      color: 'bg-purple-500',
      description:
        'Exploring the frontier of AI through the Model Context Protocol, creating custom servers and tools that enhance LLM capabilities.',
    },
    {
      id: '5',
      name: 'DevOps',
      iconName: 'build',
      color: 'bg-red-500',
      description:
        'Building and maintaining CI/CD pipelines with GitHub Actions, containerizing with Docker, managing infrastructure with Terraform on GCP.',
    },
  ]);

  // Computed signal that returns translated skills
  readonly skills$ = computed(() => {
    const translations = this.languageService.currentTranslations();
    const skillsData = translations.skillsData;
    return [
      {
        ...this._skills()[0],
        name: skillsData.frontend.name,
        description: skillsData.frontend.description,
      },
      {
        ...this._skills()[1],
        name: skillsData.backend.name,
        description: skillsData.backend.description,
      },
      {
        ...this._skills()[2],
        name: skillsData.finops.name,
        description: skillsData.finops.description,
      },
      { ...this._skills()[3], name: skillsData.ai.name, description: skillsData.ai.description },
      {
        ...this._skills()[4],
        name: skillsData.devops.name,
        description: skillsData.devops.description,
      },
    ];
  });

  private readonly _navLinks = signal<NavLink[]>([
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]);

  // Computed signal that returns translated nav links
  readonly navLinks$ = computed(() => {
    const translations = this.languageService.currentTranslations();
    return [
      { label: translations.nav.about, href: '#about' },
      { label: translations.nav.skills, href: '#skills' },
      { label: translations.nav.projects, href: '#projects' },
      { label: translations.nav.contact, href: '#contact' },
    ];
  });

  private readonly _socialLinks = signal<SocialLink[]>([
    {
      label: 'Email',
      href: 'mailto:michelc.desouza@gmail.com',
      iconName: 'mail',
      external: false,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/mcavalcantedesouza',
      iconName: 'code',
      external: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dev-cavalcante/',
      iconName: 'domain',
      external: true,
    },
  ]);

  // Public readonly computed signals for component consumption
  readonly portfolio$ = computed(() => this._portfolio());
  readonly projects$ = computed(() => this._projects());
  readonly socialLinks$ = computed(() => this._socialLinks());

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.initializePortfolio();
    await this.initializeProjects();
  }

  /**
   * Initialize portfolio with GitHub data
   */
  private async initializePortfolio(): Promise<void> {
    const user = await this.githubService.fetchUser('mcavalcantedesouza');
    if (user) {
      const currentPortfolio = this._portfolio();
      this._portfolio.set({
        ...currentPortfolio,
        avatarUrl: user.avatar_url,
      });
    }
  }

  /**
   * Initialize projects with GitHub data (or keep defaults if API fails)
   */
  private async initializeProjects(): Promise<void> {
    const projects: Project[] = [];

    // Project 1: CodeAxis
    const codeAxisOwner = 'Projeto-Integrador-CodeAxis';
    const backEndRepoName = 'ProjetoCodeAxis-BackEnd';
    const frontEndRepoName = 'ProjetoCodeAxis-FrontEnd';

    try {
      const backEndRepo = await this.githubService.fetchRepository(codeAxisOwner, backEndRepoName);
      const frontEndRepo = await this.githubService.fetchRepository(
        codeAxisOwner,
        frontEndRepoName,
      );
      const organization = await this.githubService.fetchOrganization(codeAxisOwner);

      if (backEndRepo && frontEndRepo) {
        const backEndLanguages =
          (await this.githubService.fetchRepositoryLanguages(backEndRepo.languages_url)) || [];
        const frontEndLanguages =
          (await this.githubService.fetchRepositoryLanguages(frontEndRepo.languages_url)) || [];
        const fetchedLanguages = [...new Set([...backEndLanguages, ...frontEndLanguages])];
        const manualLanguages = ['React', 'Node.js', 'Nest'];
        const allLanguages = [...new Set([...fetchedLanguages, ...manualLanguages])];

        const codeAxisProject: Project = {
          id: 'code-axis',
          title: 'CodeAxis - Full-Stack Application',
          description:
            'A platform for learning to code, featuring courses, challenges, and a community.',
          tech: allLanguages,
          image:
            organization?.avatar_url ||
            'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
          link: 'https://github.com/Projeto-Integrador-CodeAxis',
        };
        projects.push(codeAxisProject);
      }
    } catch (error) {
      console.warn('Failed to fetch CodeAxis project from GitHub:', error);
    }

    // Project 2: CLI Orquestrator
    const cliOwner = 'mcavalcantedesouza';
    const cliRepoName = 'cli-orquestrator';

    try {
      const cliRepo = await this.githubService.fetchRepository(cliOwner, cliRepoName);

      if (cliRepo) {
        const cliLanguages =
          (await this.githubService.fetchRepositoryLanguages(cliRepo.languages_url)) || [];
        const manualCliLanguages = ['AI', 'MCP', 'CLI', 'WSL', 'Gemini'];
        const allCliLanguages = [...new Set([...cliLanguages, ...manualCliLanguages])];

        const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 9L10 12L7 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 9H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        const cliImage = `data:image/svg+xml;utf8,${svg}`;

        const cliProject: Project = {
          id: 'cli-orquestrator',
          title: 'CLI Orquestrator',
          description: cliRepo.description || 'A CLI tool to orchestrate commands.',
          tech: allCliLanguages,
          image: cliImage,
          link: cliRepo.html_url,
        };
        projects.push(cliProject);
      }
    } catch (error) {
      console.warn('Failed to fetch CLI Orquestrator project from GitHub:', error);
    }

    // Project 3: ChronoTrack Desktop
    const chronoTrackOwner = 'mcavalcantedesouza';
    const chronoTrackRepoName = 'chronotrack-desktop';

    try {
      const chronoTrackRepo = await this.githubService.fetchRepository(
        chronoTrackOwner,
        chronoTrackRepoName,
      );

      if (chronoTrackRepo) {
        const chronoTrackLanguages =
          (await this.githubService.fetchRepositoryLanguages(chronoTrackRepo.languages_url)) || [];
        const manualChronoTrackLanguages = ['Electron.js', 'NeDB'];
        const allChronoTrackLanguages = [
          ...new Set([...chronoTrackLanguages, ...manualChronoTrackLanguages]),
        ];

        const stopwatchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16"><path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z"/><path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"/></svg>`;
        const chronoTrackImage = `data:image/svg+xml;utf8,${stopwatchSvg}`;

        const chronoTrackProject: Project = {
          id: 'chronotrack-desktop',
          title: 'ChronoTrack Desktop',
          description:
            chronoTrackRepo.description ||
            'A simple and efficient desktop app for tracking work hours.',
          tech: allChronoTrackLanguages,
          image: chronoTrackImage,
          link: chronoTrackRepo.html_url,
        };
        projects.push(chronoTrackProject);
      }
    } catch (error) {
      console.warn('Failed to fetch ChronoTrack project from GitHub:', error);
    }

    // Only update if we got data from GitHub, otherwise keep the defaults
    if (projects.length > 0) {
      this._projects.set(projects);
    }
  }

  /**
   * Get portfolio information
   */
  getPortfolio(): Portfolio {
    return this._portfolio();
  }

  /**
   * Get all projects
   */
  getProjects(): Project[] {
    return this._projects();
  }

  /**
   * Get all skills
   */
  getSkills(): Skill[] {
    return this._skills();
  }

  /**
   * Get navigation links
   */
  getNavLinks(): NavLink[] {
    return this._navLinks();
  }

  /**
   * Get social links
   */
  getSocialLinks(): SocialLink[] {
    return this._socialLinks();
  }

  /**
   * Get project by ID
   */
  getProjectById(id: string): Project | undefined {
    return this._projects().find((p) => p.id === id);
  }

  /**
   * Get skill by ID
   */
  getSkillById(id: string): Skill | undefined {
    return this._skills().find((s) => s.id === id);
  }
}
