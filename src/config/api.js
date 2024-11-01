// config/api.js
// URL PRODUCCIÓN -> https://backend-top-production-0f82.up.railway.app
// URL LOCAL -> http://127.0.0.1:8000/
const API_URL = process.env.REACT_APP_API_URL || 'https://backend-top-production-0f82.up.railway.app';

console.log(API_URL);

// Asegurarnos de que la URL base siempre use HTTPS
const ensureHttps = (url) => {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
};

const BASE_URL = ensureHttps(API_URL);

// Configuración base para fetch
const baseConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'http://localhost:8080'
  },
  mode: 'cors',
  credentials: 'include',
};

// Función de utilidad para hacer peticiones
export const fetchWithConfig = async (url, options = {}) => {
  const secureUrl = ensureHttps(url);
  try {
    const response = await fetch(secureUrl, {
      ...baseConfig,
      ...options,
      headers: {
        ...baseConfig.headers,
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
};

// Endpoints
export const endpoints = {
  certificaciones: `${BASE_URL}/certificaciones/`,
  certificaciones_tags: `${BASE_URL}/certificaciones/filter/`,
  certificaciones_busqueda: `${BASE_URL}/certificaciones/busqueda/`,
  certificaciones_id: (id) => `${BASE_URL}/certificaciones/${id}/`,
  habilidades: `${BASE_URL}/certificaciones/skills/`,
  temas: `${BASE_URL}/certificaciones/topics`,
  universidades: `${BASE_URL}/certificaciones/universities/`
};

export default BASE_URL;