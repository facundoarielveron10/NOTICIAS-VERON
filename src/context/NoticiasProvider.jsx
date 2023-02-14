import axios from 'axios';
import { useState, useEffect, createContext } from 'react';

const NoticiasContext = createContext();

const NoticiasProvider = ({ children }) => {
    // ESTADOS
    const [categoria, setCategoria] = useState('general');
    const [noticias, setNoticias] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalNoticias, setTotalNoticias] = useState(0);

    // EFECTO
    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=ar&category=${categoria}&apiKey=${
                import.meta.env.VITE_API_KEY
            }`;

            const { data } = await axios(url);

            setTotalNoticias(data.totalResults);
            setPagina(1);
            setNoticias(data.articles);
        };

        consultarAPI();
    }, [categoria]);

    // EFECTO
    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=ar&page=${pagina}&category=${categoria}&apiKey=${
                import.meta.env.VITE_API_KEY
            }`;

            const { data } = await axios(url);

            setTotalNoticias(data.totalResults);
            setNoticias(data.articles);
        };

        consultarAPI();
    }, [pagina]);

    // FUNCIONES
    const handleChangeCategoria = (e) => {
        setCategoria(e.target.value);
    };

    const handleChangePagina = (e, valor) => {
        setPagina(valor);
    };

    return (
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                handleChangePagina,
                noticias,
                totalNoticias,
                pagina,
            }}
        >
            {children}
        </NoticiasContext.Provider>
    );
};

export { NoticiasProvider };

export default NoticiasContext;
