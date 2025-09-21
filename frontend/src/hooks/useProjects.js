import { useState, useEffect } from 'react';
import { projectsService } from '../services/projectsService.js';

export function useProjects(params = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, [JSON.stringify(params)]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsService.getProjects(params);
      
      // API returns paginated data, extract the projects array
      setProjects(data.data || data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, error, refetch: fetchProjects };
}

export function useProject(slug) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsService.getProject(slug);
      setProject(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching project:', err);
    } finally {
      setLoading(false);
    }
  };

  return { project, loading, error, refetch: fetchProject };
}

// Helper functions to maintain compatibility with existing code
export const getProjectById = (projects, id) => {
  return projects.find(project => project.id === parseInt(id));
};

export const getProjectsByCategory = (projects, category) => {
  return projects.filter(project => 
    project.category.toLowerCase().includes(category.toLowerCase())
  );
};

export const getFeaturedProjects = (projects, limit = 4) => {
  return projects.filter(project => project.featured).slice(0, limit);
};