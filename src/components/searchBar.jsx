import { useState, useEffect } from "react";
import FilterBySearch from "../services/filterBySearch";

const SearchBar = () => {

    // Estados para el componente de la barra de busqueda 
    const [position, setPosition] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);


    // Manejar la escritura en el input 
    const handleWriting = event => {
        const newText = event.target.value;
        setText(newText);

        if (!newText.trim()) {
            setResults([])
        }
        //console.log(text);
    };


    useEffect(() => {
        console.log("EL USUARIO HA ESCRITO");

        const fetchResults = async () => {


            if (!text.trim()) {

                // Vaciar resultados si no hay texto
                setResults([]);
                return;
            }

            try {
                setLoading(true);
                const data = await FilterBySearch.getResults(text);
                setResults(Array.isArray(data) ? data : []);
                console.log("ESTE ES EL PUNTO FINAL PARA RECIBIR LA DATA");
                console.log(data);
                setLoading(false);

            } catch (error) {
                console.error('Error al enviar datos: ', error);
                setError(error);
                setResults([]);
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchResults();
        }, 300)

        return () => clearTimeout(timeoutId);
    }, [text]);




    return (
        <>
            <div className={`wrapper-search-bar ${isMobileView ? 'mobile-style' : 'desktop-style'}`}>
                <input
                    type="text"
                    placeholder="¿Qué quieres aprender?"
                    name="text"
                    className="input"
                    onChange={handleWriting}
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
                {loading && <span className="loader-search"></span>}
            </div>
            

            

            {text.trim() && results.length > 0 && (
                <div className="container-results">
                    {results.map((resultado) => (
                        <div key={resultado.id} className="box-result">
                            <div className="wrapper-img-box">
                                <img src={resultado.url_imagen_universidad_certificacion}></img>
                            </div>
                            <div className="wrapper-name-box">{resultado.nombre}</div>

                        </div>
                    ))}
                </div>
            )



            }




        </>


    )



};

export default SearchBar;