import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-950">
      <app-header />
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-contact />
      <app-footer />
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  }
})
export class PortfolioPageComponent {}
