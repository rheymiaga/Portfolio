import { useState, useEffect } from 'react';
import { BsSun } from 'react-icons/bs';
import { FiMoon } from 'react-icons/fi';

export const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 hover:shadow-lg border-2 border-amber-50 dark:border-blue-300 md:border-0 md:p-2 text-2xl md:text-base rounded-full
        hover:focus:ring-white hover:ring-2 hover:text-gray-600 text-blue-300
        dark:hover:focus:ring-slate-200 dark:focus:border-gray-800
        dark:focus:ring-gray-200 dark:hover:text-gray-100 
        transition-all duration-500 ease-in-out dark:hover:bg-slate-700
        flex shrink-0 mr-0 mb-0 md:mr-4 bg-white dark:bg-gray-950/90
     hover:bg-amber-50 dark:text-slate-200 hover:scale-105"
        >
            {theme === 'light' ? <FiMoon /> : <BsSun />}
        </button>
    );
};
