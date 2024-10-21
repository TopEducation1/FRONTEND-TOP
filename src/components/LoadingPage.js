import { useEffect, useState } from "react";

const LoadingPage = () => {
    const [loading, setLoading] = useState(true);
    const [exit, setExit] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setExit(true);
            setTimeout(() => {
                setLoading(false);
                }, 1000)
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);

    return (
        loading && (
            <div className={`page-loading ${exit ? "exit" : ""}`}>
                <div className="container-logo-loading"><img src="/assets/logos/TOPEDUCATIONLOGO-WHITE.png" alt="Logo Top Education" className="logo-nav"></img></div>
                <div className="balls">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    );
};

export default LoadingPage;
