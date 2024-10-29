const  filterByTags = async (tags) => {

    try {
        
        const response = await fetch('http://localhost:8000/certificaciones/filter/', {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ tags }),
        });


        if (!response.ok) {
            throw new Error('Error al filtrar certificaciones');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error)
        throw error;
    }
}

export default filterByTags;