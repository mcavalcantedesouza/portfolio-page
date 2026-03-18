import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal, computed } from '@angular/core';

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
 * Service for consuming GitHub API - Optimized with Signals only
 * Provides GitHub user data and repository information
 * No external RxJS dependencies - pure Angular signals
 */
@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.github.com';

  private readonly _user = signal<GitHubUser | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals
  readonly user$ = this._user.asReadonly();
  readonly isLoading$ = this._isLoading.asReadonly();
  readonly error$ = this._error.asReadonly();

  // Computed signal for user avatar URL
  readonly userAvatarUrl = computed(() => this._user()?.avatar_url ?? null);

  /**
   * Fetch GitHub user data by username
   * @param username - GitHub username
   */
  async fetchUser(username: string): Promise<GitHubUser | null> {
    this._isLoading.set(true);
    this._error.set(null);

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
      const errorMessage = `Failed to fetch user ${username}`;
      console.warn(errorMessage, error);
      this._error.set(errorMessage);
      return null;
    } finally {
      this._isLoading.set(false);
    }
  }

  /**
   * Fetch GitHub repository data
   * @param owner - Repository owner
   * @param repo - Repository name
   */
  async fetchRepository(owner: string, repo: string): Promise<GitHubRepository | null> {
    this._isLoading.set(true);
    this._error.set(null);

    try {
      const response = await this.http
        .get<GitHubRepository>(`${this.baseUrl}/repos/${owner}/${repo}`)
        .toPromise();
      return response ?? null;
    } catch (error) {
      const errorMessage = `Failed to fetch repository ${owner}/${repo}`;
      console.warn(errorMessage, error);
      this._error.set(errorMessage);
      return null;
    } finally {
      this._isLoading.set(false);
    }
  }

  /**
   * Fetch repository languages
   * @param languages_url - URL for language data
   */
  async fetchRepositoryLanguages(languages_url: string): Promise<string[] | null> {
    this._isLoading.set(true);
    this._error.set(null);

    try {
      const response = await this.http.get<Record<string, number>>(languages_url).toPromise();
      return response ? Object.keys(response) : null;
    } catch (error) {
      const errorMessage = 'Failed to fetch repository languages';
      console.warn(errorMessage, error);
      this._error.set(errorMessage);
      return null;
    } finally {
      this._isLoading.set(false);
    }
  }

  /**
   * Fetch GitHub organization data
   * @param org - Organization name
   */
  async fetchOrganization(org: string): Promise<GitHubOrganization | null> {
    this._isLoading.set(true);
    this._error.set(null);

    try {
      const response = await this.http
        .get<GitHubOrganization>(`${this.baseUrl}/orgs/${org}`)
        .toPromise();
      return response ?? null;
    } catch (error) {
      const errorMessage = `Failed to fetch organization ${org}`;
      console.warn(errorMessage, error);
      this._error.set(errorMessage);
      return null;
    } finally {
      this._isLoading.set(false);
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
    return this.userAvatarUrl();
  }

  /**
   * Get user statistics
   */
  getUserStats() {
    const user = this._user();
    return user
      ? {
          repos: user.public_repos,
          followers: user.followers,
          following: user.following,
        }
      : null;
  }
}
