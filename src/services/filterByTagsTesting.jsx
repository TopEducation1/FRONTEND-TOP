const TAG_CATEGORIES =  {
    TEMAS: 'Temas',
    HABILIDADES: 'Habilidades',
    EMPRESAS: 'Empresas',
    UNIVERSIDADES: 'Universidades'
};

class TagFilterService {
    constructor(baseUrl = 'http://localhost:8000/certificaciones/filter/') {
        this.baseUrl = baseUrl;
    }


    buildQueryString(tags) {
        const queryParts = [];


        Object.entries(tags).forEach(([category, tagList]) => {
            if(tagList && tagList.length > 0) {
                
                const categoryParam = category.toLowerCase();

                const tagsString = tagList.map(tag => encodeURIComponent(tag)).join(',');
                queryParts.push(`${categoryParam}=${tagsString}`);
            }
        });

        return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    }


    async filterByTags(selectedTags) {
        try {
            const queryString = this.buildQueryString(selectedTags);
            const url = `${this.baseUrl}${queryString}`;


            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });


            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            const data = await response.json();
            console.log("ESTA ES LA DATA FILTRADA");
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error en TagFilterService: ', error);
            throw error;
        }
    }



    validateTags(tags) {
        const validCategories = Object.values(TAG_CATEGORIES);


        return Object.entries(tags).every(([category, tagList]) => {
            return (
                validCategories.includes(category) &&
                Array.isArray(tagList) &&
                tagList.every(tag => typeof tag == 'string')
            );
        });
    }
}

export const tagFilterService = new TagFilterService();
export default tagFilterService;