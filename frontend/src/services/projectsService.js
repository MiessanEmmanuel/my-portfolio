import ApiService from './api.js';

export const projectsService = {
  async getProjects(params = {}) {
    return ApiService.get('/projects', params);
  },

  async getProject(slug) {
    return ApiService.get(`/projects/${slug}`);
  },

  async createProject(projectData) {
    return ApiService.post('/admin/projects', projectData);
  },

  async updateProject(id, projectData) {
    return ApiService.put(`/admin/projects/${id}`, projectData);
  },

  async deleteProject(id) {
    return ApiService.delete(`/admin/projects/${id}`);
  }
};