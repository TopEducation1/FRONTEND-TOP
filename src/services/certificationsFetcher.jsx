import { endpoints } from "../config/api";

const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  mode: 'cors',
  credentials: 'include',
};

const CertificationsFetcher = {
  async getAllCertifications(page = 1, pageSize = 16) {
    try {
      // Construir la URL manualmente
      const baseUrl = endpoints.certificaciones;
      const url = `${baseUrl}?page=${page}&page_size=${pageSize}`;
      
      console.log('Requesting URL:', url);
       // Para debugging
      
      const response = await fetch(url, fetchConfig);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      return data;
      
    } catch (error) {
      console.error('Error fetching certifications:', error);
      throw error;
    }
  }
};

export default CertificationsFetcher;