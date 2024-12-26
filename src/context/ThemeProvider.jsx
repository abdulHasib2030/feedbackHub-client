import React, { createContext, useEffect, useState } from 'react';
import { use } from 'react';

export const ThemeContext  = createContext();

 const ThemeProvider = ({ children }) => {
    
    const getInitialTheme = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedPrefs = window.localStorage.getItem('color-theme');
            if (typeof storedPrefs === 'string') {
                return storedPrefs;
            }
            const userMedia = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return userMedia ? 'dark' : 'light';
           
        }
      
    };


const [theme, setTheme] = useState(getInitialTheme);

useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'system'){
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', prefersDark);

    }
    else{
        root.classList.toggle('dark', theme === 'dark');

    }
    localStorage.setItem('color-theme', theme);
},
[theme])

    const toggleTheme = (mode) => {
       
        setTheme(mode);
    };
    
    return (
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
       </ThemeContext.Provider>
    );
}

export default ThemeProvider;