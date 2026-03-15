import { Injectable, signal, computed, inject } from '@angular/core';
import { Portfolio, Project, Skill, NavLink, SocialLink } from '../models/portfolio.types';
import { GitHubService } from './github.service';

/**
 * PortfolioService - Centralized state management for portfolio data
 * Uses Angular Signals for reactive, performant state management
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly githubService = inject(GitHubService);

  // Private state using signals for immutability and reactivity
  private readonly _portfolio = signal<Portfolio>({
    name: 'Michel Cavalcante de Souza',
    title: 'Full-Stack Developer & Creative Problem Solver',
    email: 'michelc.desouza@gmail.com',
    description:
      "I'm a passionate full-stack developer with experience building scalable web applications and bringing creative ideas to life. I specialize in modern JavaScript frameworks, Angular, cloud technologies, and creating seamless user experiences.",
    initials: 'MC'
  });

  private readonly _projects = signal<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image:
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#'
    },
    {
      id: '2',
      title: 'AI Content Generator',
      description:
        'Machine learning powered content creation tool that generates high-quality marketing copy and blog posts.',
      tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
      image:
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#'
    },
    {
      id: '3',
      title: 'Project Management Dashboard',
      description:
        'Collaborative project management tool with real-time updates, task tracking, and team communication.',
      tech: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      image:
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '#'
    }
  ]);

  private readonly _skills = signal<Skill[]>([
    {
      id: '1',
      name: 'Frontend Development',
      iconName: 'code',
      color: 'bg-blue-500',
      description: 'Building exceptional digital experiences with modern tools and best practices.'
    },
    {
      id: '2',
      name: 'UI/UX Design',
      iconName: 'palette',
      color: 'bg-cyan-500',
      description: 'Crafting beautiful and intuitive user interfaces that users love.'
    },
    {
      id: '3',
      name: 'Full-Stack Development',
      iconName: 'rocket',
      color: 'bg-sky-600',
      description: 'End-to-end solutions from database design to cloud deployment.'
    }
  ]);

  private readonly _navLinks = signal<NavLink[]>([
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]);

  private readonly _socialLinks = signal<SocialLink[]>([
    {
      label: 'Email',
      href: 'mailto:michelc.desouza@gmail.com',
      iconName: 'mail',
      external: false
    },
    {
      label: 'GitHub',
      href: 'https://github.com/mcavalcantedesouza',
      iconName: 'code',
      external: true
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dev-cavalcante/',
      iconName: 'domain',
      external: true
    }
  ]);

  // Public readonly computed signals for component consumption
  readonly portfolio$ = computed(() => this._portfolio());
  readonly projects$ = computed(() => this._projects());
  readonly skills$ = computed(() => this._skills());
  readonly navLinks$ = computed(() => this._navLinks());
  readonly socialLinks$ = computed(() => this._socialLinks());

  constructor() {
    this.initializePortfolio();
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
        avatarUrl: user.avatar_url
      });
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
