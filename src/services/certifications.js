import React, { useEffect, useState } from 'react';


const Certifications = () => {

    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect (() => {
        fetch('http://localhost:8000/certificaciones/')
        .then(response => {
            if(!response.ok) {
                throw new Error('BAD REQUEST');
            }

            return response.json();
    })

    .then(data => {
        setCertifications(data);
        setLoading(false);
    })

    .catch(error => {
        setError(error.message);
        setLoading(false);
    });

},[]);

    if (loading) return <p>Cargando catalogo...</p>;
    if (error) return <p>Error: {error}</p>;


    return (        
        <div className="wrapper-certifications">
            {certifications.map(certification => (
                <div key={certification.id} className='certification-card'>
                    <div className="container-img-card">
                        <img src="assets/images/university-logo.png"alt="imagen-certificacion"/>
                        <h3>{certification.certification_name}</h3>
                        <div className="tag-platform"><img src="assets/images/coursera-logo.png"/></div>
                        <div className="tag-category">Category</div>
                    </div>
                </div>
            ))}        
        </div>
    );

    };

export default Certifications;