import { API_BASE_URL } from './api';

class AdminAuthService {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur de connexion');
    }

    // Store token and user data
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_user', JSON.stringify(data.user));

    return data;
  }

  async logout() {
    const token = localStorage.getItem('admin_token');

    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken() {
    return localStorage.getItem('admin_token');
  }

  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return token && user && user.role === 'admin';
  }

  async checkAuth() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        this.logout();
        return false;
      }

      const user = await response.json();
      if (user.role !== 'admin') {
        this.logout();
        return false;
      }

      localStorage.setItem('admin_user', JSON.stringify(user));
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}

export const adminAuthService = new AdminAuthService();