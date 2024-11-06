import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import getCertificationById from "../services/getCertificationById";

const CertificationPage = () => {
    // Estados de la pagina de certificacion
    const { id } = useParams();
    const [certification, setCertification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null); 
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
        return <span className="loader-search"></span>;
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

    return (
        <>
            <div id="container-right-pop">
                {/* Pop-up section */}
                <div className="grid-pop-section" id="upper-section">
                    <button id="close-pop">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                    <h3>¿Aún no eres miembro de Top Education?</h3>
                </div>
                {/* Middle section */}
                <div className="grid-pop-section" id="mid-section">
                    <span>Con una membresía en Top Education, tendrás acceso a esta certificación y cientos más. <b>¡Haz la prueba ahora!</b></span>
                    <button id="button-test-top">Probar Top Education</button>
                </div>
                {/* Bottom section */}
                <div className="grid-pop-section" id="bottom-section">
                    <span>¿Te gustaría contratar nuestros servicios para tu empresa?</span>
                    <a>Conoce Top Education for teams</a>
                </div>
            </div>


            <div id="grid-main-content">
                {/* Main certification information */}
                <div className="container-main-info">
                    <div id="wrapper-logo-certification" className="grid-main-info-section">
                        <img src={getImageUrl(certification.url_imagen_universidad_certificacion)} alt="Logo de la certificación" />
                    </div>
                    <div id="wrapper-name-certification" className="grid-main-info-section">
                        <h1>{certification.nombre}</h1>
                    </div>
                    <div id="container-short-description" className="grid-main-info-section">
                        <p>{certification.metadescripcion_certificacion}</p>
                    </div>
                    <div id="container-button-url-original" className="grid-main-info-section">
                        <button onClick={() => window.open(certification.url_certificacion_original, '_blank')} className="button-url-original">Ver en la página oficial</button>
                    </div>

                    {/* Instructors */}
                    <div id="container-instructors" className="grid-main-info-section">
                        <h2><b>Instructor/es</b></h2>
                        <ul>
                            {certification.instructores_certificacion.map((instructor, index) => (
                                <li key={index}>{instructor.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Fast info section */}
                    <div id="container-fast-info" className="grid-main-info-section">
                        <div className="fast-info"><h3>Idioma</h3>{certification.lenguaje_certificacion}</div>
                        <div className="fast-info"><h3>Nivel</h3>{certification.nivel_certificacion}</div>
                        <div className="fast-info"><h3>Cronograma</h3>{certification.tiempo_certificacion}</div>
                    </div>

                    {/* Learning outcomes */}
                    {certification.aprendizaje_certificacion && certification.aprendizaje_certificacion.some(aprendizaje => aprendizaje.nombre.startsWith('x')) ? null : (
                        <div id="container-learning" className="grid-main-info-section">
                            <h2>¿Qué aprenderás?</h2>
                            <ul>
                                {certification.aprendizaje_certificacion?.map((aprendizaje, index) => (
                                    aprendizaje.nombre.startsWith(' ') ? null : (<li key={index}>{aprendizaje.nombre}</li>)
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Modules section */}
                    <div id="container-modules" className="grid-main-info-section">
                        <h2>{certification.contenido_certificacion.cantidad_modulos}</h2>
                        <p>{certification.contenido_certificacion.contenido_certificacion.join('\n')}</p>
                    </div>

                    {/* Skills section */}
                    {certification.habilidades_certificacion.some(habilidad => habilidad.nombre.startsWith('x')) ? null : (
                        <div id="container-skills" className="grid-main-info-section">
                            <h2>Habilidades que obtendrás</h2>
                            <div id="wrapper-tags-skills" style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gridTemplateRows: `repeat(${countSkills}, auto)`, width: "100%", columnGap: "5px", rowGap: "10px", padding: "" }}>
                                {certification.habilidades_certificacion.map((habilidad, index) => (
                                    <div className="skill-tag" key={index}>{habilidad.nombre}</div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div id="container-modules-detail" className="grid-main-info-section">
                        {certification.modulos_certificacion.map((modulo, index) => {
                            const isExpanded = expandedIndex === index;
                            return (
                                <div
                                    key={index}
                                    className={`module-card ${isExpanded ? 'expanded' : 'closed'}`} // La clase `expanded` se aplica aquí al contenedor principal de la tarjeta
                                >
                                    <div className="first-row">
                                        <div className="wrapper-info">
                                            <h2>{modulo.titulo}</h2>
                                            <span>{modulo.duracion}</span>
                                            <span>Incluye: {modulo.incluye}</span>
                                        </div>
                                        <div
                                            className="wrapper-row"
                                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M6 9l6 6l6 -6" />
                                            </svg>
                                        </div>
                                    </div>
                                    {isExpanded && (
                                        <div className="second-row">
                                            <div className="content-module-container">
                                                <div className="content-module">
                                                    {modulo.contenido}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>



                </div>


                <div id="container-areas">
                        <div id="wrapper-title-areas"><h1>Explora áreas del conocimiento</h1></div>

                        <div id="wrapper-show-areas">

                        <div className="area-circle-object">
  <img src="/assets/Areas-Conocimiento/area-conocimiento-1.png" alt="Área de Conocimiento 1" />
</div>

                            <div className="area-circle-object">
                            <img src="/assets/Areas-Conocimiento/area-conocimiento-2.png" alt="Área de Conocimiento 1" />
                            </div>
                            <div className="area-circle-object">
                            <img src="/assets/Areas-Conocimiento/area-conocimiento-3.png" alt="Área de Conocimiento 1" />
                            </div>
                            <div className="area-circle-object">
                            <img src="/assets/Areas-Conocimiento/area-conocimiento-4.png" alt="Área de Conocimiento 1" />
                            </div>
                            <div className="area-circle-object">
                            <img src="/assets/Areas-Conocimiento/area-conocimiento-5.png" alt="Área de Conocimiento 1" />
                            </div>
                            <div className="area-circle-object">
                            <img src="/assets/Areas-Conocimiento/area-conocimiento-6.png" alt="Área de Conocimiento 1" />
                            </div>
                            <div className="area-circle-object">
                            <img src="/assets/Areas-Conocimiento/area-conocimiento-7.png" alt="Área de Conocimiento 1" />
                            </div>
                            <div className="area-circle-object">
                            <img src="/assets/Areas-Conocimiento/area-conocimiento-8.png" alt="Área de Conocimiento 1" />
                            </div>
                            <div className="area-circle-object">
                            <img src="/assets/Areas-Conocimiento/area-conocimiento-9.png" alt="Área de Conocimiento 1" />
                            </div>
                        </div>
                </div>


                <div id="container-classes">
                <div id="wrapper-title-classes"><h1>Clases recomendadas para ti</h1></div>
                </div>
            </div>



        </>
    );
};

export default CertificationPage;