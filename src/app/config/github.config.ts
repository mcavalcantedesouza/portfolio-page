/**
 * GitHub API Configuration
 * IMPORTANT: For security, use environment variables for the token in production
 */

export const GITHUB_CONFIG = {
  // You can use a personal access token here or set it via environment variables
  // For now, we'll use a token-less approach with better error handling
  baseUrl: 'https://api.github.com',

  // Optional: Add your GitHub token here (use environment variables in production)
  // token: process.env['GITHUB_TOKEN'] || '',

  // Default avatars and fallbacks for when API calls fail
  defaultProjectImage:
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
};
