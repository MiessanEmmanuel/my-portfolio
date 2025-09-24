import ApiService from './api.js';

export const authService = {
  async login(email, password) {
    const response = await ApiService.post('/auth/login', { email, password });
    if (response.token) {
      ApiService.setToken(response.token);
      // Stocker l'utilisateur pour l'accès hors ligne
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }
    return response;
  },

  async register(userData) {
    const response = await ApiService.post('/auth/register', userData);
    if (response.token) {
      ApiService.setToken(response.token);
      // Stocker l'utilisateur pour l'accès hors ligne
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
    }
    return response;
  },

  async logout() {
    try {
      const token = ApiService.getToken();
      if (token) {
        await ApiService.post('/auth/logout');
      }
    } catch (error) {
      // Ignorer les erreurs de logout (token invalide, etc.)
      console.log('Logout error (ignored):', error.message);
    } finally {
      ApiService.clearToken();
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser() {
    const response = await ApiService.get('/auth/me');
    return response.user || response;
  },

  async updateProfile(profileData) {
    return ApiService.put('/profile', profileData);
  },

  async getProfile() {
    return ApiService.get('/profile');
  },

  isAuthenticated() {
    return !!ApiService.getToken();
  },

  getToken() {
    return ApiService.getToken();
  },

  // Méthodes pour la compatibilité admin
  async checkAuth() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const user = await this.getCurrentUser();
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      this.clearToken();
      return false;
    }
  },

  clearToken() {
    ApiService.clearToken();
    localStorage.removeItem('user');
  },

  getCachedUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};