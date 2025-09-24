import ApiService from './api.js';

export const authService = {
  async login(email, password) {
    const response = await ApiService.post('/auth/login', { email, password });
    console.log(response.token)
    if (response.token) {
      ApiService.setToken(response.token);
    }
    return response;
  },

  async register(userData) {
    const response = await ApiService.post('/auth/register', userData);
    if (response.token) {
      ApiService.setToken(response.token);
    }
    return response;
  },

  async logout() {
    try {
      await ApiService.post('/auth/logout');
    } finally {
      ApiService.clearToken();
    }
  },

  async getCurrentUser() {
    return ApiService.get('/auth/me');
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
  }
};