import ApiService from './api.js';

export const technologiesService = {
  async getTechnologies() {
    return ApiService.get('/technologies');
  },

  async createTechnology(technologyData) {
    return ApiService.post('/admin/technologies', technologyData);
  },

  async updateTechnology(id, technologyData) {
    return ApiService.put(`/admin/technologies/${id}`, technologyData);
  },

  async deleteTechnology(id) {
    return ApiService.delete(`/admin/technologies/${id}`);
  }
};