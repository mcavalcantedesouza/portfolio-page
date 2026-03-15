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
