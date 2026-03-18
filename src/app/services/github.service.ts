import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

/**
 * GitHub API interface for user data
 */
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

/**
 * GitHub API interface for repository data
 */
export interface GitHubRepository {
  name: string;
  description: string;
  html_url: string;
  languages_url: string;
}

/**
 * GitHub API interface for organization data
 */
export interface GitHubOrganization {
  login: string;
  id: number;
  avatar_url: string;
  description: string;
}

/**
 * Service for consuming GitHub API
 * Provides GitHub user data and repository information
 */
@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.github.com';

  private readonly _user = signal<GitHubUser | null>(null);
  readonly user$ = this._user;

  /**
   * Fetch GitHub user data by username
   * @param username - GitHub username
   */
  async fetchUser(username: string): Promise<GitHubUser | null> {
    try {
      const response = await this.http
        .get<GitHubUser>(`${this.baseUrl}/users/${username}`)
        .toPromise();

      if (response) {
        this._user.set(response);
        return response;
      }
      return null;
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      return null;
    }
  }

  /**
   * Fetch GitHub repository data
   * @param owner - Repository owner
   * @param repo - Repository name
   */
  async fetchRepository(
    owner: string,
    repo: string
  ): Promise<GitHubRepository | null> {
    try {
      const response = await this.http
        .get<GitHubRepository>(`${this.baseUrl}/repos/${owner}/${repo}`)
        .toPromise();
      return response || null;
    } catch (error) {
      console.error(`Error fetching GitHub repository ${owner}/${repo}:`, error);
      return null;
    }
  }

  /**
   * Fetch repository languages
   * @param languages_url - URL for language data
   */
  async fetchRepositoryLanguages(
    languages_url: string
  ): Promise<string[] | null> {
    try {
      const response = await this.http.get<any>(languages_url).toPromise();
      return response ? Object.keys(response) : null;
    } catch (error) {
      console.error('Error fetching repository languages:', error);
      return null;
    }
  }

  /**
   * Fetch GitHub organization data
   * @param org - Organization name
   */
  async fetchOrganization(org: string): Promise<GitHubOrganization | null> {
    try {
      const response = await this.http
        .get<GitHubOrganization>(`${this.baseUrl}/orgs/${org}`)
        .toPromise();
      return response || null;
    } catch (error) {
      console.error(`Error fetching GitHub organization ${org}:`, error);
      return null;
    }
  }

  /**
   * Get cached user data
   */
  getUser(): GitHubUser | null {
    return this._user();
  }

  /**
   * Get user avatar URL
   */
  getAvatarUrl(): string | null {
    return this._user()?.avatar_url || null;
  }

  /**
   * Get user statistics
   */
  getUserStats() {
    const user = this._user();
    if (!user) return null;
    return {
      repos: user.public_repos,
      followers: user.followers,
      following: user.following
    };
  }
}
