import { API_BASE_URL } from './api';

class AdminService {
  getHeaders() {
    const token = localStorage.getItem('admin_token');
    console.log(token)
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

  }

  // Projects Management
  async getProjects() {
    const response = await fetch(`${API_BASE_URL}/admin/projects`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des projets');
    }

    return response.json();
  }

  async getProject(id) {
    const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement du projet');
    }

    return response.json();
  }

  async createProject(projectData) {
    const response = await fetch(`${API_BASE_URL}/admin/projects`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(projectData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création du projet');
    }

    return response.json();
  }

  async updateProject(id, projectData) {
    const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(projectData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour du projet');
    }

    return response.json();
  }

  async deleteProject(id) {
    const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du projet');
    }

    return true;
  }

  // Formations Management
  async getFormations() {
    const response = await fetch(`${API_BASE_URL}/admin/formations`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des formations');
    }

    return response.json();
  }

  async getFormation(id) {
    const response = await fetch(`${API_BASE_URL}/admin/formations/${id}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement de la formation');
    }

    return response.json();
  }

  async createFormation(formationData) {
    const response = await fetch(`${API_BASE_URL}/admin/formations`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(formationData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création de la formation');
    }

    return response.json();
  }

  async updateFormation(id, formationData) {
    const response = await fetch(`${API_BASE_URL}/admin/formations/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(formationData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour de la formation');
    }

    return response.json();
  }

  async deleteFormation(id) {
    const response = await fetch(`${API_BASE_URL}/admin/formations/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la formation');
    }

    return true;
  }

  // Contact Messages Management
  async getContactMessages() {
    const response = await fetch(`${API_BASE_URL}/admin/contact-messages`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des messages');
    }

    return response.json();
  }

  async getContactMessage(id) {
    const response = await fetch(`${API_BASE_URL}/admin/contact-messages/${id}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement du message');
    }

    return response.json();
  }

  async markMessageAsRead(id) {
    const response = await fetch(`${API_BASE_URL}/admin/contact-messages/${id}/mark-read`, {
      method: 'PATCH',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors du marquage du message comme lu');
    }

    return response.json();
  }

  async deleteContactMessage(id) {
    const response = await fetch(`${API_BASE_URL}/admin/contact-messages/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du message');
    }

    return true;
  }

  // Users Management
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des utilisateurs');
    }

    return response.json();
  }

  async getUser(id) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement de l\'utilisateur');
    }

    return response.json();
  }

  async updateUser(id, userData) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour de l\'utilisateur');
    }

    return response.json();
  }

  async deleteUser(id) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'utilisateur');
    }

    return true;
  }
}

export const adminService = new AdminService();