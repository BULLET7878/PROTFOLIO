import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button className="ThemeToggleButton" onClick={toggleTheme} title="Toggle Theme">
            <div className={`ToggleCircle ${theme === 'light' ? 'Light' : 'Dark'}`}>
                {theme === 'light' ? <FaMoon className="ToggleIcon" /> : <FaSun className="ToggleIcon" />}
            </div>
        </button>
    );
};

export default ThemeToggle;
