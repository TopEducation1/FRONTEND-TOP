import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import getCertificationById from "../services/getCertificationById";

const CertificationPage = () => {
    const { id } = useParams();
    const [certification, setCertification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para calcular el grid de las habilidades
    const [countSkills, setSkillsCount] = useState(0);

    useEffect(() => {
        const loadCertification = async () => {
            try {
                setLoading(true);
                const data = await getCertificationById(id);
                setCertification(data);
                console.log("INFORMACIÓN ESPECIFICA DE LA CERTIFICACION");
                console.log(data);
            } catch (error) {
                setError(error.message);
                console.error('Error al cargar la certificación:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadCertification();
        }
    }, [id]);

    useEffect(() => {
        if (certification && certification.habilidades_certificacion) {
            const rows = Math.ceil(certification.habilidades_certificacion.length / 4);
            setSkillsCount(rows);
        }
    }, [certification]);

    const getImageUrl = (url) => {
        if (!url) return null;
        return url.startsWith('/') ? url : `/${url}`;
    };

    if (loading) {
        return (
            <div className="container-main-info">
                <div>Cargando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-main-info">
                <div>Error: {error}</div>
            </div>
        );
    }

    if (!certification) {
        return (
            <div className="container-main-info">
                <div>No se encontró la certificación</div>
            </div>
        );
    }

    if (!loading && !error && certification) {
        return (
            <div className="container-main-info">
                <div className="wrapper-logo-certification">
                    <img
                        src={getImageUrl(certification.url_imagen_universidad_certificacion)} 
                        alt="Logo de la certificación"
                    />
                </div>

                <div className="wrapper-name-certification">
                    <h1>{certification.nombre}</h1>
                </div>

                <div className="container-short-description">
                    <p>{certification.metadescripcion_certificacion}</p>
                </div>

                <div className="container-button-url-original">
                    <button
                        onClick={() => window.open(certification.url_certificacion_original, '_blank')}
                        className="button-url-original">Ver en la página oficial</button>
                </div>

                <div className="container-instructors">
                    <h2><b>Instructor/es</b></h2>
                    <ul>
                        {certification.instructores_certificacion.map((instructor, index) => (
                            <li key={index}>{instructor.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="container-fast-info">
                    <div className="fast-info"><h3>Idioma</h3>{certification.lenguaje_certificacion}</div>
                    <div className="fast-info"><h3>Nivel</h3>{certification.nivel_certificacion}</div>
                    <div className="fast-info"><h3>Cronograma</h3>{certification.tiempo_certificacion}</div>
                </div>

                    .
                        <div className="container-learning">
                            <h2>¿Qué aprenderás?</h2>
                            <ul>
                                {certification.aprendizaje_certificacion.map((aprendizaje, index) => (
                                    <li key={index}>{aprendizaje.nombre}</li>
                                ))}
                            </ul>
                        </div>
                    

                <div className="container-modules">
                    <h2>{certification.cantidad_modulos}</h2>
                    <p>{certification.contenido_certificacion}</p>
                </div>

                <div className="container-skills">
                    <h2>Habilidades que obtendrás</h2>
                    <div
                        className="container-tag-skills"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, auto)",
                            gridTemplateRows: `repeat(${countSkills}, auto)`,
                            gap: "10px",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        {certification.habilidades_certificacion.map((habilidad, index) => (
                            <div className="skill-tag" key={index}>{habilidad.nombre}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default CertificationPage;
