import './header.css';
import { LanguageToggle } from './LanguageToggle';

export function Header({ onLanguageChange, currentLanguage }) {
    return (
        <header className="header-container">
            <LanguageToggle onLanguageChange={onLanguageChange} currentLanguage={currentLanguage} />
            <div className="header-content">
                <h1>{currentLanguage === 'en' ? 'AutoBlogger' : 'AutoBlogger'}</h1>
                <p>{currentLanguage === 'en' ? 'Generate articles with AI' : 'Genera artículos con IA'}</p>
            </div>
        </header>
    );
}
