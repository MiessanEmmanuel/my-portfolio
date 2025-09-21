import ApiService from './api.js';

export const formationsService = {
  async getFormations() {
    return ApiService.get('/formations');
  },

  async getFormation(slug) {
    return ApiService.get(`/formations/${slug}`);
  },

  async getFormationExercises(slug) {
    return ApiService.get(`/formations/${slug}/exercises`);
  },

  async enrollInFormation(formationId) {
    return ApiService.post(`/formations/${formationId}/enroll`);
  },

  async getMyFormations() {
    return ApiService.get('/my-formations');
  },

  async createFormation(formationData) {
    return ApiService.post('/admin/formations', formationData);
  },

  async updateFormation(id, formationData) {
    return ApiService.put(`/admin/formations/${id}`, formationData);
  },

  async deleteFormation(id) {
    return ApiService.delete(`/admin/formations/${id}`);
  }
};