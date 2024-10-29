// CertificationsList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GetCertificationData from '../services/getCertificationData';

/**
 * Componente que renderiza una lista de certificaciones.
 * @param {Array} certifications - Lista de certificaciones para mostrar.
 */
const CertificationsList = ({ certifications }) => {
    const navigate = useNavigate();

    const handleCertificationClick = async (certificationId) => {
        try {
            console.log("Click en certificación:", certificationId);
            navigate(`/certificacion?id=${certificationId}`);
            const data = await GetCertificationData.getCertificationById(certificationId);
            //console.log("DATA TRAIDA", data);
        } catch (error) {
            console.error('Error al manejar el click: ', error);
        }
    };

    return (
        <div className="wrapper-certifications">
            {certifications.map(certification => {
                const topicName = certification.tema_certificacion?.nombre || 'Sin categoría';
                
                return (
                    <div
                        key={certification.id}
                        className='certification-card'
                        onClick={() => handleCertificationClick(certification.id)}
                        style={{cursor: 'pointer'}}
                    >
                        <div className="container-img-card">
                            <img
                                src={certification.url_imagen_universidad_certificacion}
                                alt="imagen-certificacion"
                            />
                            <h3>{certification.nombre}</h3>
                            <div className="tag-platform">
                                <img
                                    src={certification.url_imagen_plataforma_certificacion}
                                    alt="platform-logo"
                                />
                            </div>
                            <div className="tag-category">{certification.tema_certificacion.nombre}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CertificationsList;
