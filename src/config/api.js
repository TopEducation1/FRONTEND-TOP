const API_URL = process.env.REACT_APP_API_URL || 'https://backend-top-production-0f82.up.railway.app';

export const endpoints  =  {
    
    certificaciones: `${API_URL}/certificaciones/`,
    certificationes_tags: `${API_URL}/certificaciones/filter/`,
    certificaciones_busqueda: `${API_URL}/certificaciones/busqueda/`,
    certificaciones_id: (id) => `${API_URL}/certificaciones/${id}/`,
    habilidades: `${API_URL}/certificaciones/skills/`,
    temas: `${API_URL}/certificaciones/topics`,
    universidades: `${API_URL}/certificaciones/universities/`
}

export default API_URL;