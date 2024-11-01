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
      const url = new URL(endpoints.certificaciones);

      url.searchParams.append('page', page);
      url.searchParams.append('page_size', pageSize);

      // Asegurar que la URL use HTTPS
      const secureUrl = url.toString().replace('http://', 'https://');
      
      const response = await fetch(secureUrl, fetchConfig);
      
      if (!response.ok) {
        throw new Error('BAD REQUEST');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching certifications:', error);
      throw error;
    }
  }
};

export default CertificationsFetcher;