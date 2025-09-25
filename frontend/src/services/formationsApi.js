import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  // Pour les routes admin, utiliser token
  if (config.url.includes('/admin/')) {
    const adminToken = localStorage.getItem('token');
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    // Pour les autres routes, utiliser token normal
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const formationsApi = {
  // Formations
  getFormations: (params = {}) => api.get('/formations', { params }),
  getFeaturedFormations: () => api.get('/formations/featured'),
  getFormation: (slug) => api.get(`/formations/${slug}`),
  enrollInFormation: (slug) => api.post(`/formations/${slug}/enroll`),
  getMyFormations: () => api.get('/my-formations'),

  // Categories
  getCategories: () => api.get('/formation-categories'),
  getCategory: (id) => api.get(`/formation-categories/${id}`),

  // Lessons
  getLesson: (id) => api.get(`/lessons/${id}`),
  getNextLesson: (id) => api.get(`/lessons/${id}/next`),
  getPreviousLesson: (id) => api.get(`/lessons/${id}/previous`),
  getLessonsByChapter: (chapterId) => api.get(`/chapters/${chapterId}/lessons`),
  markLessonProgress: (lessonId, progressData) =>
    api.post(`/lessons/${lessonId}/progress`, progressData),

  // Progress
  getProgressDashboard: () => api.get('/progress/dashboard'),
  getUserEnrollments: (params = {}) => api.get('/progress/enrollments', { params }),
  getFormationProgress: (formationSlug) => api.get(`/progress/formations/${formationSlug}`),
  getLessonProgress: (lessonId) => api.get(`/progress/lessons/${lessonId}`),
  getWeeklyStats: () => api.get('/progress/weekly-stats'),

  // Certificates
  getCertificates: () => api.get('/certificates'),
  generateCertificate: (formationSlug) => api.post(`/formations/${formationSlug}/certificate`),

  // Reviews
  getFormationReviews: (formationSlug, params = {}) =>
    api.get(`/formations/${formationSlug}/reviews`, { params }),
  addReview: (formationSlug, reviewData) =>
    api.post(`/formations/${formationSlug}/reviews`, reviewData),
  getUserReview: (formationSlug) => api.get(`/formations/${formationSlug}/reviews/me`),
  updateReview: (reviewId, reviewData) => api.put(`/reviews/${reviewId}`, reviewData),
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
  markReviewHelpful: (reviewId) => api.post(`/reviews/${reviewId}/helpful`),

  // Admin endpoints
  admin: {
    // Formations management
    getFormations: (params = {}) => api.get('/admin/formations', { params }),
    createFormation: (formationData) => api.post('/admin/formations', formationData),
    updateFormation: (id, formationData) => api.put(`/admin/formations/${id}`, formationData),
    deleteFormation: (id) => api.delete(`/admin/formations/${id}`),

    // Categories management
    getCategories: () => api.get('/admin/formation-categories'),
    createCategory: (categoryData) => api.post('/admin/formation-categories', categoryData),
    updateCategory: (id, categoryData) => api.put(`/admin/formation-categories/${id}`, categoryData),
    deleteCategory: (id) => api.delete(`/admin/formation-categories/${id}`),

    // Lessons management
    getLessons: () => api.get('/admin/formation-lessons'),
    createLesson: (lessonData) => api.post('/admin/formation-lessons', lessonData),
    updateLesson: (id, lessonData) => api.put(`/admin/formation-lessons/${id}`, lessonData),
    deleteLesson: (id) => api.delete(`/admin/formation-lessons/${id}`),

    // Chapters management
    getChapters: (params = {}) => api.get('/admin/formation-chapters', { params }),
    getChapter: (id) => api.get(`/admin/formation-chapters/${id}`),
    createChapter: (chapterData) => api.post('/admin/formation-chapters', chapterData),
    updateChapter: (id, chapterData) => api.put(`/admin/formation-chapters/${id}`, chapterData),
    deleteChapter: (id) => api.delete(`/admin/formation-chapters/${id}`),
    reorderChapters: (chaptersData) => api.post('/admin/formation-chapters/reorder', chaptersData),
    publishChapter: (id) => api.post(`/admin/formation-chapters/${id}/publish`),
    unpublishChapter: (id) => api.post(`/admin/formation-chapters/${id}/unpublish`),
  }
};

export default formationsApi;