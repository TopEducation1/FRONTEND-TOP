import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Skills from "../services/skillsService";
import SkillsTags from "../services/skillsService";
import Universities from "../services/univerisitiesService";
import Topics from "../services/topicService";
import tagFilterService from "../services/filterByTagsTesting";
import CertificationsFetcher from "../services/certificationsFetcher";
import CertificationsList from "../components/layoutCertifications";
import SearchBar from "../components/searchBar";
import RoutesComponent from "../components/RoutesComponent";

/**
 * Pagina de la biblioteca
 *  */

function LibraryPage() {

    // Estados de la pagina
    const [width, setWidth] = useState(window.innerWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSections, setOpenSections] = useState([]);
    const [selectedTags, setSelectedTags] = useState({});
    const [isMobileView, setIsMobileView] = useState(false);
    const [indexPosition, setIndexPosition] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSmallScreen, SetIsSmallSreen] = useState(false);


    useEffect(() => {

        const handleRezise = () => {
            SetIsSmallSreen(window.innerWidth <= 1100);

        }

        window.addEventListener('resize', handleRezise);
        handleRezise(); // Verificar ancho de la pagina

        return () => {
            window.removeEventListener('resize', handleRezise);
        }
    }, []);




    // Estados para la paginación
    const [pagination, setPagination] = useState({
        count: 0,
        current_page: 1,
        total_pages: 1,
    });


    const loadCertifications = async (page = 1, pageSize = 16) => {
        try {
            setLoading(true);
            let fetchData;



            if (Object.keys(selectedTags).length > 0) {
                fetchData = await tagFilterService.filterByTags(selectedTags, page, pageSize);

                // Actualizar la url con los parametros de filtro
                const queryString = tagFilterService.buildQueryString(selectedTags);
                window.history.pushState({}, '', `/library/filter/${queryString}`);
            } else {
                fetchData = await CertificationsFetcher.getAllCertifications(page, pageSize);
                window.history.pushState({}, '', '/library');
            }


            if (fetchData && fetchData.results) {

                setCertifications(fetchData.results);
                setPagination({
                    count: fetchData.count,
                    current_page: page,
                    total_pages: Math.ceil(fetchData.count / pageSize)
                });
            }
        } catch (error) {
            setError('Error al cargar las certificaciones');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCertifications(1);
    }, []);


    useEffect(() => {
        loadCertifications(1);
    }, [selectedTags]);


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.total_pages && !loading) {
            loadCertifications(newPage);
        }
    };

    /**
  * Maneja el clic en una etiqueta de filtro
  * @param {string} category - Categoría de la etiqueta
  * @param {string} tag - Etiqueta seleccionada
  */
    const handleTagClick = (category, tag) => {
        setSelectedTags(prevTags => {


            // Copiar el estado previo de los tags para no mutarlo
            const updatedTags = { ...prevTags };

            // Set a partir de la lista actual o una vacia
            const tagSet = new Set(updatedTags[category] || []);

            tagSet.add(tag);
            updatedTags[category] = [...tagSet];
            return updatedTags;

        });
    };


    const removeTag = (category, tagToRemove) => {
        setSelectedTags(prevTags => {
            const updatedTags = { ...prevTags };


            if (updatedTags[category]) {

                updatedTags[category] = updatedTags[category].filter(tag => tag !== tagToRemove);


                if (updatedTags[category].length === 0) {
                    delete updatedTags[category];  // Eliminamos la categoría si no quedan tags
                }
            }
            return updatedTags;
        })
    };



    const PaginationControls = () => (
        <div className="container-buttons-pagination">
            <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1 || loading}
            >
                Anterior
            </button>
            <span style={{ padding: '0.5rem 15px' }}>
                Página {pagination.current_page} de {pagination.total_pages}
            </span>
            <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.total_pages || loading}
            >
                Siguiente
            </button>
        </div>
    );


    // Ajustar el tamaño del contenedor del indice despues de un segundo
    useEffect(() => {

        const indexContainer = document.querySelector('.index-container');

        if (indexContainer) {
            setTimeout(() => {
                indexContainer.classList.add('moved-index-container');
            }, 1000)
        }
    }, []);



    // Definición del array sections para categorias de filtro
    const sections = [
        {
            title: "Tema",

            subsections: ["Arte y Humanidades", "Negocios", "Ciencias de la Computación", "Ciencias de Datos", "Tecnología de la información", "Salud", "Matemáticas y Logica", "Desarrollo Personal", "Ciencías, Física e Ingenieria", "Ciencias Sociales", "Aprendizaje de un Idioma"]
        },
        {
            title: "Plataforma",
            subsections: ["EdX", "Coursera", "MasterClass"]
        },
        {
            title: "Empresa",
            subsections: ["Capitals Coalition", "DeepLearning.AI", "Big Interview", "UBITS", "HubSpot Academy", "SV Academy", "Pathstream", "Salesforce", "The Museum of Moder Art", "Banco Interamericano de Desarrollo", "Yad Vashem", " Google", "Microsoft"]
        },
        {
            title: "Universidad",
            subsections: [
                {
                    title: "Oceania",
                    subsections: ["Macquarie University"]
                },
                {
                    title: "Europa",
                    subsections: ["IE Business School", "Universidad Autónoma de Barcelona", "Universidad Carlos III de Madrid"]
                },
                {
                    title: "Latinoamérica",
                    subsections: ["Universidad de chile", "Universidad Nacional de Colombia", "Tecnológico de Monterrey", "Pontificia Universidad Católica del Perú", "Universidad Nacional Autónoma de Mexico", "Universidad Anáhuac", "SAE Institute México", "Pontificia Universidad Católica de Chile", "Universidad de Palermo", "Universidad de los Andes", "Universidad Austral"]
                },
                {
                    title: "Norteamérica",
                    subsections: ["University of New Mexico", "Parsons School of Design, The New School", "University of Michigan", "University of Virginia", "University of Illinois Urbana-Champaign", "University of California, Irvine", "The University of North Carolina at Chapel Hill", "Northwestern University", "University of Colorado Boulder", "Wesleyan University", "California Institute of the Arts", "Duke University", "University of Pennsylvania", "Berklee college of music", "Columbia", "Harvard university", "Yale university", "Stanford"]
                }
            ]
        }
    ];

    /**
     * Abre el menu  del index responsive
     */

    const openIndexResponsiveMenu = () => {
        setIsMenuOpen(true);
    };


    /**
     * Cierre el menu index reponsive
     */
    const closeIndexResponsiveMenu = () => {
        setIsMenuOpen(false);
    };


    /**
     * Calcula el margen dinámico de una sección del menú de índice
     * @param {number} index - Índice de la sección
     * @returns {number} - Valor del margen
     */

    const calculateDynamicMargin = (index) => {
        const section = sections[index];
        const numSubsections = section.subsections.length;
        const baseMargin = 120;
        const marginPerItem = 50;
        return baseMargin + numSubsections * marginPerItem;
    };


    /**
     * Alterna la apertura de una sección del menú de índice
     * @param {number} index - Índice de la sección
     */

    const toggleSection = (index) => {
        setOpenSections(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const renderSubsections = (category, subsections) => {
        return subsections.map((subsection, subIndex) => {
            if (typeof subsection === "string") {
                return (
                    <div key={subIndex} style={{ marginBottom: 30 }}>
                        <Link
                            to="#"
                            className="subsection-link"
                            onClick={(e) => {
                                e.preventDefault();
                                handleTagClick(category, subsection);
                            }}
                        >
                            {subsection}
                        </Link>
                    </div>
                );
            } else if (subsection.title && subsection.subsections) {
                return (
                    <div key={subIndex} style={{ marginBottom: 30 }}>
                        <h3>{subsection.title}</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {subsection.subsections.map((subsubsection, subsubIndex) => (
                                <li key={subsubIndex} style={{ marginBottom: 30 }}>
                                    <Link
                                        to="#"
                                        className="subsection-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleTagClick(category, subsubsection);
                                        }}
                                    >
                                        {subsubsection}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            }
            return null;
        });
    };



    return (
        <>
            <div className="title-category">
                <h2>Biblioteca</h2>
            </div>

            <SearchBar />

            {!isMobileView && SearchBar}

            <div className="container-tags">
                {Object.keys(selectedTags).length === 0 || Object.values(selectedTags).every(tags => tags.length === 0) ? (
                    <p>Aún no has seleccionado tags</p>
                ) : (
                    Object.entries(selectedTags).map(([category, tags], index) => (
                        tags.map((tag, tagIndex) => (
                            <div key={`${category}-${tagIndex}`} className="tag">
                                <span>{tag}</span>
                                <button onClick={() => removeTag(category, tag)} className="remove-tag-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    ))
                )}
            </div>


            <div className="container-buttons-reponsive-index">
                <button id="button-filter" onClick={openIndexResponsiveMenu}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#000000"
                        className="icon icon-tabler icons-tabler-filled icon-tabler-filter"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 3h-16a1 1 0 0 0 -1 1v2.227l.008 .223a3 3 0 0 0 .772 1.795l4.22 4.641v8.114a1 1 0 0 0 1.316 .949l6 -2l.108 -.043a1 1 0 0 0 .576 -.906v-6.586l4.121 -4.12a3 3 0 0 0 .879 -2.123v-2.171a1 1 0 0 0 -1 -1z" />
                    </svg>
                    <span>Filtrar</span>
                </button>
                {isMobileView && SearchBar}
            </div>

            <div className={`sliding-menu-index ${isMenuOpen ? 'open' : ''}`}>
                <button
                    className="btnclose-index-responsive-menu"
                    onClick={closeIndexResponsiveMenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>


                <div className="index-container">  
                    <div className="category-wrapper">
                        {sections.map((section, index) => (
                            <div
                                className={`category-item ${openSections.includes(index) ? "open" : ""}`}
                                key={index}
                                style={{
                                    marginBottom: openSections.includes(index) ? calculateDynamicMargin(index) : 0,
                                }}
                            >
                                <button
                                    className="unfold-category-button"
                                    onClick={() => toggleSection(index)}
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d={openSections.includes(index) ? "M6 9l6 6l6 -6" : "M9 6l6 6l-6 6"} />
                                        </svg>
                                        {section.title}
                                    </span>
                                </button>
                                {openSections.includes(index) && (
                                    <div className="unfold-list">
                                        {renderSubsections(section.title, section.subsections)}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {isSmallScreen && isMenuOpen && (
                    <div
                        
                        className={`container-logo-platforms ${isSmallScreen ? 'small-screen' : ''
                            }`}
                    >
                        
                        <div className={`wrapper-new-courses ${isSmallScreen ? 'small-screen' : ''
                            }`}>
                            <button id="button-new-courses">Nuevo en Top Education</button>
                        </div>

                        <div className={`wrapper-logos ${isSmallScreen ? 'small-screen' : ''
                            }`}>
                            <div className="container-logo">
                                <img src="assets/logos/coursera-hover.png" />
                            </div>
                            <div className="container-logo">
                                <img src="assets/logos/edx-hover.png" />
                            </div>
                            <div className="container-logo">
                                <img src="assets/logos/masterclass-hover.png" />
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {!isSmallScreen && (
                <div
                id="container-logo-platforms"
                className={`wrapper-logo-platforms ${isSmallScreen ? 'small-screen' : ''
                    }`}
            >
                <div id="wrapper-logos">
                    <div className="container-logo">
                        <img src="assets/logos/coursera-hover.png" />
                    </div>
                    <div className="container-logo">
                        <img src="assets/logos/edx-hover.png" />
                    </div>
                    <div className="container-logo">
                        <img src="assets/logos/masterclass-hover.png" />
                    </div>
                </div>
                <div id="wrapper-new-courses">
                    <button id="button-new-courses">Nuevo en Top Education</button>
                </div>
            </div>
            )}

     
                    
        



            <div className="certifications-container">
            { loading ? (
                <span class="loader"></span>

            ) : (
                <CertificationsList certifications={certifications} />
                
            )}
                <PaginationControls />

            </div>

            <div className="container-routes-section">
                <RoutesComponent />
            </div>
        </>
    );
}

export default LibraryPage;