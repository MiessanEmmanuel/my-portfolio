import ApiService from './api.js';

export const contactService = {
  async sendMessage(messageData) {
    return ApiService.post('/contact', messageData);
  },

  async getMessages(params = {}) {
    return ApiService.get('/admin/contact-messages', params);
  },

  async getMessage(id) {
    return ApiService.get(`/admin/contact-messages/${id}`);
  },

  async markAsRead(id) {
    return ApiService.patch(`/admin/contact-messages/${id}/mark-read`);
  },

  async markAsReplied(id) {
    return ApiService.patch(`/admin/contact-messages/${id}/mark-replied`);
  },

  async deleteMessage(id) {
    return ApiService.delete(`/admin/contact-messages/${id}`);
  }
};