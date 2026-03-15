import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .TiltCardWrapper')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(mousePosition.x, springConfig);
    const cursorY = useSpring(mousePosition.y, springConfig);

    return (
        <motion.div
            className={`CustomCursor ${isHovering ? 'Hovering' : ''}`}
            style={{
                left: cursorX,
                top: cursorY,
            }}
        >
            <div className="CursorInner" />
            <div className="CursorOuter" />
        </motion.div>
    );
};

export default CustomCursor;
