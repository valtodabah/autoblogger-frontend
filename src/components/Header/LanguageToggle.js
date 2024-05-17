import './LanguageToggle.css';

export function LanguageToggle({ onLanguageChange, currentLanguage }) {
    return (
        <div className="language-toggle">
            <button onClick={() => onLanguageChange('en')} className={currentLanguage === 'en' ? 'active' : ''}>EN</button>
            <button onClick={() => onLanguageChange('es')} className={currentLanguage === 'es' ? 'active' : ''}>ES</button>
        </div>
    );
}
