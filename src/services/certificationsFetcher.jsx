// CertificationsFetcher.jsx
const CertificationsFetcher = {
    async getAllCertifications() {
        try {
            const response = await fetch('http://localhost:8000/certificaciones/');
            if (!response.ok) {
                throw new Error('BAD REQUEST');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
};

export default CertificationsFetcher;