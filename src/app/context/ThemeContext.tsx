import React, { createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <StyledWrapper>
      <label className="switch">
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <div className="slider" style={{ background: isDark ? '#070912' : '#4facfe' }}>
          <div className="sun-moon" style={{ 
            background: isDark ? '#f4f4f5' : '#ffce54',
            transform: isDark ? 'translateX(30px)' : 'translateX(0px)',
          }}>
            <div className="dots" style={{ opacity: isDark ? 1 : 0 }}>
              <span className="dot dot-1"></span>
              <span className="dot dot-2"></span>
              <span className="dot dot-3"></span>
            </div>
          </div>
          <div className="background-elements">
            <div className="stars" style={{ opacity: isDark ? 1 : 0 }}>
              <span className="star star-1"></span>
              <span className="star star-2"></span>
              <span className="star star-3"></span>
            </div>
            <div className="clouds" style={{ opacity: isDark ? 0 : 1 }}>
               <svg className="cloud-svg" viewBox="0 0 24 24"><path d="M17.5,19c-3,0-5.5-2.5-5.5-5.5s2.5-5.5,5.5-5.5s5.5,2.5,5.5,5.5S20.5,19,17.5,19z M9,17c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C13,15.2,11.2,17,9,17z" /></svg>
               <svg className="cloud-svg second" viewBox="0 0 24 24"><path d="M17.5,19c-3,0-5.5-2.5-5.5-5.5s2.5-5.5,5.5-5.5s5.5,2.5,5.5,5.5S20.5,19,17.5,19z M9,17c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C13,15.2,11.2,17,9,17z" /></svg>
            </div>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  isolation: isolate;
  mix-blend-mode: normal !important;

  .switch {
    position: relative;
    display: inline-block;
    width: 62px;
    height: 32px;
    border: 1.5px solid rgba(128, 128, 128, 0.4) !important;
    border-radius: 34px;
    overflow: hidden;
    cursor: pointer;
  }
  
  .switch input { opacity: 0; width: 0; height: 0; }
  
  .slider { 
    position: absolute; 
    top: 0; left: 0; right: 0; bottom: 0; 
    transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1); 
  }

  .sun-moon {
    position: absolute;
    height: 24px; width: 24px;
    left: 4px; bottom: 2.5px;
    border-radius: 50%;
    transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;
    /* Added subtle glow to the sun/moon */
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
  }

  .dot { position: absolute; background: #d4d4d8 !important; border-radius: 50%; }
  .dot-1 { top: 6px; left: 5px; width: 6px; height: 6px; }
  .dot-2 { top: 14px; left: 12px; width: 4px; height: 4px; }
  .dot-3 { top: 6px; left: 14px; width: 3px; height: 3px; }

  .clouds, .stars { position: absolute; width: 100%; height: 100%; transition: 0.5s; }

  /* --- Enhanced Clouds with Shadows --- */
  .cloud-svg { 
    position: absolute; 
    fill: #ffffff !important; 
    width: 45px; 
    top: 4px; 
    left: 10px; 
    animation: drift 6s infinite ease-in-out; 
    /* The "Shadow" - Multiple filters for a soft, realistic look */
    filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.15)) 
            drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1));
  }

  .cloud-svg.second { 
    top: -8px; 
    left: 30px; 
    width: 35px; 
    opacity: 0.6; 
    animation: drift 10s infinite ease-in-out reverse; 
    /* Lighter shadow for the background cloud */
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
  }

  /* --- Enhanced Twinkling Stars --- */
  .star {
    position: absolute;
    background: #ffffff !important;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    animation: twinkle-enhanced 2s infinite ease-in-out;
  }

  .star-1 { top: 6px; left: 10px; width: 8px; height: 8px; }
  .star-2 { top: 18px; left: 14px; width: 5px; height: 5px; animation-delay: 0.6s; }
  .star-3 { top: 8px; left: 24px; width: 6px; height: 6px; animation-delay: 1.2s; }

  @keyframes drift { 
    0%, 100% { transform: translateX(0) translateY(0); } 
    50% { transform: translateX(8px) translateY(1px); } 
  }

  @keyframes twinkle-enhanced { 
    0%, 100% { opacity: 0.2; transform: scale(0.6) rotate(0deg); } 
    50% { opacity: 1; transform: scale(1.1) rotate(15deg); } 
  }
`;