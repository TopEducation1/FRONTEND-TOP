const getCertificationById = async (id) => {
    try {
        const url = `http://localhost:8000/certificaciones/${id}/`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
            
    } catch (error) {
        console.error("Error fetching certification data: ", error);
        throw error;
    }
};

export default getCertificationById;