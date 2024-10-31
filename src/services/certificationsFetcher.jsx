const CertificationsFetcher = {
  async getAllCertifications(page = 1, pageSize = 16) {
    try {
      const url = new URL('http://localhost:8000/certificaciones/');
      url.searchParams.append('page', page);
      url.searchParams.append('page_size', pageSize);

      const response = await fetch(url.toString());
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