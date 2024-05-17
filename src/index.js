import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { Header } from "./components/Header/Header";
import { MainContent } from "./components/MainContent/MainContent";

const App = () => {
    const [language, setLanguage] = useState('en'); // State to manage the current language

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className="index">
            <Header onLanguageChange={handleLanguageChange} currentLanguage={language} />
            <div className="container">
                <MainContent currentLanguage={language} />
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
