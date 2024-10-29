import React, {useEffect, useState} from "react";
import { useSearchParams } from 'react-router-dom';

import getCertificationById from "../services/getCertificationById";

const CertificationPage = () => {

    const [searchParams] = useSearchParams();
    const [certification, setCertification] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCertification = async () => {
            try {
                const id = searchParams.get('id');
                const data = getCertificationById(id);
                setCertification(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                console.log(error)
            }
        };

        loadCertification();
        
    }, [searchParams]);


    return (
       <div className="container-main-info">
            <div className="container-logo-detail"></div>
            <div className="container-title-certification-detail">
                <h1>{certification.certification_name}</h1>
            </div>
            <button className="button-url-original">Ver en la página oficial</button>
            <div className="container-instructors">
                <h3><b>Instructor/es:</b></h3>
                <ul>
                    {certification.certification_learnings && Object.entries(certification.certification_learnings).map(([key, learning]) => (
                        <li key={key}>
                            {learning}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container-fast-info">
                <div className="fast-info" id="language-container">
                    <h3>Idioma</h3>
                    <span>{certification.certification_languaje}</span>
                </div>
                <div className="fast-info"id="level-container">
                    <h3>Nivel</h3>
                    <span>{certification.certification_level}</span>
                </div>
                <div className="fast-info" id="duration-container">
                    <h3>Duración</h3>
                    <span>{certification.certification_time}</span>
                </div>
               
            </div>
            <div className="container-learning">
                <h2>¿Qué aprenderás?</h2>
                <ul>
                    {certification.certification_learnings && certification.certification_learnings.map((learning, index) => (
                        <li key={index}>
                            {learning}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container-skills">
            <h2>Habilidades que obtendrás</h2>
            <div className="container-tags-skills">
                {certification.certification_skills && certification.certification_skills.map((skill, index) => (
                    <div className="skill-tag">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#ffffff"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                        {skill}</div>
                ))}
            </div>
            </div>
       </div>
    );
};

export default CertificationPage;