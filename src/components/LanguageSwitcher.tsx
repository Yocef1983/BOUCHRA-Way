import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; short: string; flag: string }[] = [
    { code: 'ar', label: 'العربية (AR)', short: 'AR', flag: '🇲🇦' },
    { code: 'fr', label: 'Français (FR)', short: 'FR', flag: '🇫🇷' },
  ];

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (lang: Language) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-start ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Changer de langue / تغيير اللغة"
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-stone-50 hover:bg-pink-50/60 border border-stone-200 hover:border-pink-200 text-stone-700 hover:text-[#E6007E] text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs select-none"
      >
        <Globe size={14} className="text-[#E6007E] shrink-0" />
        <span className="font-bold tracking-wide">{current.short}</span>
        <ChevronDown
          size={12}
          className={`text-stone-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full mt-2 end-0 w-40 bg-white rounded-xl border border-gray-100 shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {languages.map((l) => {
            const isSelected = l.code === currentLang;
            return (
              <button
                key={l.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(l.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-pink-50/80 text-[#E6007E] font-bold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{l.flag}</span>
                  <span>{l.label}</span>
                </div>
                {isSelected && <Check size={14} className="text-[#E6007E] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
