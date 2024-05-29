import './MainContent.css';
import { useState } from 'react';
import axios from "axios";

export function MainContent({ currentLanguage }) {
    const [article, setArticle] = useState(''); // State to hold article content
    const [title, setTitle] = useState(''); // State to hold user input title
    const [loading, setLoading] = useState(false); // State to handle loading state

    const getMessages = async (event) => {
        event.preventDefault(); // Prevent form from submitting traditionally

        if (!title.trim()) {
            setArticle(currentLanguage === 'en' ? 'Please, enter a title to generate an article' : 'Por favor, ingrese un título para generar un artículo');
            return;
        }

        setLoading(true); // Set loading to true when request is sent

        const url = `${process.env.REACT_APP_BACKEND_URL}/generate-article`;
        const options = {
            method: "POST",
            data: JSON.stringify({
                prompt: title // Use the state value here
            }),
            headers: {
                "Content-type": "application/json"
            }
        };

        try {
            const response = await axios.post(url, options.data, { headers: options.headers });
            if (response.data && response.data.data) {
                setArticle(response.data.data.message.content);
            } else {
                setArticle(currentLanguage === 'en' ? 'No content received' : 'No se recibió contenido');
            }
        } catch (error) {
            console.log('Error fetching article:', error);
            setArticle(currentLanguage === 'en' ? 'Failed to load content' : 'No se pudo cargar el contenido');
        } finally {
            setLoading(false); // Set loading to false when request completes
        }
    }

    return (
        <main>
            <form id="articleForm" onSubmit={getMessages}>
                <label htmlFor="articleInput">
                    {currentLanguage === 'en' ? 'Enter a title for your article' : 'Ingrese un título para su artículo'}
                </label>
                <input 
                    type="text" 
                    id="articleInput" 
                    name="articleInput" 
                    value={title} // Bind input value to state
                    onChange={(e) => setTitle(e.target.value)} // Update state on input change
                    required 
                />
                <button type="submit">
                    {currentLanguage === 'en' ? 'Generate Article' : 'Generar Artículo'}
                </button>
            </form>

            <section id="articleOutput">
                {loading ? 
                    <p>{currentLanguage === 'en' ? 'Loading...' : 'Cargando...'}</p> : 
                    article ? 
                    article.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    )) 
                    : <p>{currentLanguage === 'en' ? 'No article generated yet.' : 'No se ha generado ningún artículo.'}</p>
                } {/* Display article content */}
            </section>
        </main>
    );
}
