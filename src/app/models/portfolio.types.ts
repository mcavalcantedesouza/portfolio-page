import { Type } from '@angular/core';

export interface Portfolio {
  name: string;
  title: string;
  email: string;
  description: string;
  initials: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export interface Skill {
  id: string;
  name: string;
  iconName: string;
  color: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  iconName: string;
  external?: boolean;
}
