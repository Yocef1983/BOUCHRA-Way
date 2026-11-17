import React from 'react';
import { Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center bg-slate-100/80 p-1 rounded-full border border-slate-200/60 shadow-inner">
      <button
        type="button"
        onClick={() => onLanguageChange('ar')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
          currentLang === 'ar'
            ? 'bg-white text-slate-900 shadow-sm font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        العربية
      </button>
      <button
        type="button"
        onClick={() => onLanguageChange('fr')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
          currentLang === 'fr'
            ? 'bg-white text-slate-900 shadow-sm font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        FR
      </button>
    </div>
  );
};