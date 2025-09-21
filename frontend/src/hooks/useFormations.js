import { useState, useEffect } from 'react';
import { formationsService } from '../services/formationsService.js';

export function useFormations() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await formationsService.getFormations();
      setFormations(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching formations:', err);
    } finally {
      setLoading(false);
    }
  };

  return { formations, loading, error, refetch: fetchFormations };
}

export function useFormation(slug) {
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchFormation();
    }
  }, [slug]);

  const fetchFormation = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await formationsService.getFormation(slug);
      setFormation(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching formation:', err);
    } finally {
      setLoading(false);
    }
  };

  return { formation, loading, error, refetch: fetchFormation };
}