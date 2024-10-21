import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Certifications from "../services/certifications";
import Skills from "../services/skillsService";
import SkillsTags from "../services/skillsService";
import Universities from "../services/univerisitiesService";
import Topics from "../services/topicService";

function LibraryPage() {
    const [width, setWidth] = useState(window.innerWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [barSearchPosition, setBarSearchPosition] = useState(true);
    const [openSections, setOpenSections] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    // Definición del array sections
    const sections = [
        {
            title: "Temas",
            subsections: ["Artes y Humanidades", "Negocios", "Ciencias de la Computación", "Ciencias de Datos", "Tecnologias de Información", "Salud", "Matemáticas y Logica", "Desarrollo Personal", "Ciencías, Física e Ingenieria", "Ciencias Sociales", "Aprendizaje de un Idioma"]
        },
        {
            title: "Habilidades",
            subsections: ["Bienestar", "Estrategia", "Liderazgo", "Productividad", "Personas y Cultura", "Diversidad, Equidad e Inclusión", "Trabajo en Equipo", "Crecimiento Personal", "Creatividad", "Comunicación"]
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
                    subsections: ["Universidad de chile", "Universidad Nacional de Colombia", "Tecnológico de Monterrey", "Pontifica Universidad Católica del Perú", "Universidad Nacional Autónoma de Mexico", "Universidad Anáhuac", "SAE Institute México", "Pontificia Universidad Católica de Chile", "Universidad de Palermo", "Universidad de los Andes", "Universidad Austral"]
                },
                {
                    title: "Norteamérica",
                    subsections: ["University of New Mexico", "Parsons School of Design, The New School", "University of Michigan", "University of Virginia", "University of Illinois Urbana-Champaign", "University of California, Irvine", "The University of North Carolina at Chapel Hill", "Northwestern University", "University of Colorado Boulder", "Wesleyan University", "California Institute of the Arts", "Duke University", "University of Pennsylvania", "Berklee college of music", "Columbia", "Harvard university", "Yale university", "Stanford"]
                }
            ]
        }
    ];

    const openIndexResponsiveMenu = () => {
        setIsMenuOpen(true);
    };

    const closeIndexResponsiveMenu = () => {
        console.log("Botón de cerrar menú presionado");
        setIsMenuOpen(false);
    };

    const calculateDynamicMargin = (index) => {
        const section = sections[index];
        const numSubsections = section.subsections.length;
        const baseMargin = 120;
        const marginPerItem = 50;
        return baseMargin + numSubsections * marginPerItem;
    };

    const toggleSection = (index) => {
        setOpenSections(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const handleTagClick = (category) => {
        setSelectedTags(prevTags => {
            if (!prevTags.includes(category)) {
                return [...prevTags, category];
            }
            return prevTags;
        });
    };

    const removeTag = (categoryToRemove) => {
        setSelectedTags(prevTags => 
            prevTags.filter(tag => tag !== categoryToRemove)
        );
    };

    const searchBar = (
        <div className={`wrapper-search-bar ${barSearchPosition ? 'desktop-style' : 'mobile-style'}`}>
            <input 
                type="text" 
                placeholder="¿Qué quieres aprender?" 
                name="text" 
                className="input" 
            />
            <svg 
                fill="white" 
                width="20px" 
                height="20px" 
                viewBox="0 0 1920 1920" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd"></path>
            </svg>
        </div>
    );

    useEffect(() => {
        const desktopMediaQuery = window.matchMedia('(max-width: 480px)');
        
        const handleMediaQueryChange = (event) => {
            setBarSearchPosition(event.matches);
        };

        desktopMediaQuery.addEventListener('change', handleMediaQueryChange);
        
        return () => {
            desktopMediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    const renderSubsections = (subsections) => {
        return subsections.map((subsection, subIndex) => {
            if (typeof subsection === "string") {
                return (
                    <div key={subIndex} style={{ marginBottom: 30 }}>
                        <Link 
                            to="#" 
                            className="subsection-link" 
                            onClick={(e) => {
                                e.preventDefault(); 
                                handleTagClick(subsection);
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
                                            handleTagClick(subsubsection);
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

            <div className="container-tags">
                {selectedTags.map((tag, index) => (
                    <div key={index} className="tag">
                        <span>{tag}</span>
                        <button 
                            onClick={() => removeTag(tag)} 
                            className="remove-tag-button"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg"  
                                width="15"  
                                height="15"  
                                viewBox="0 0 24 24"  
                                fill="none"  
                                stroke="black"  
                                strokeWidth="2"  
                                strokeLinecap="round"  
                                strokeLinejoin="round"  
                                className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M18 6l-12 12" />
                                <path d="M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
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
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M20 3h-16a1 1 0 0 0 -1 1v2.227l.008 .223a3 3 0 0 0 .772 1.795l4.22 4.641v8.114a1 1 0 0 0 1.316 .949l6 -2l.108 -.043a1 1 0 0 0 .576 -.906v-6.586l4.121 -4.12a3 3 0 0 0 .879 -2.123v-2.171a1 1 0 0 0 -1 -1z" />
                    </svg>
                    <span>Filtrar</span>
                </button>
                {barSearchPosition && searchBar}
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
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
                <div className="index-container">
                    {!barSearchPosition && searchBar}
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
                                        {renderSubsections(section.subsections)}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="certifications-container">
                <Certifications />
            </div>
        </>
    );
}

export default LibraryPage;