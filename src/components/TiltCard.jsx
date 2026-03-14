import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion';

const TiltCard = ({ children, className = "" }) => {
    const ref = useRef(null);
    const rectRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 120, damping: 25 });
    const mouseYSpring = useSpring(y, { stiffness: 120, damping: 25 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Glare effect motion values to avoid React re-renders during mouse move
    const glareOpacity = useMotionValue(0);
    const glareX = useMotionValue(0);
    const glareY = useMotionValue(0);

    // Dynamic background for glare
    const glareBackground = useTransform(
        [glareX, glareY],
        ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.2) 0%, transparent 65%)`
    );

    const handleMouseEnter = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    const handleMouseMove = (e) => {
        if (!rectRef.current) {
            rectRef.current = ref.current?.getBoundingClientRect();
        }
        if (!rectRef.current) return;

        const { left, top, width, height } = rectRef.current;
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);

        // Glare position updates (no re-renders)
        glareX.set((mouseX / width) * 100);
        glareY.set((mouseY / height) * 100);
        glareOpacity.set(0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        animate(glareOpacity, 0, { duration: 0.5 });
        rectRef.current = null;
    };

    return (
        <motion.div
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -10 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className={`TiltCardWrapper ${className}`}
        >
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>

            {/* Glare effect overlay */}
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: glareBackground,
                    pointerEvents: "none",
                    opacity: glareOpacity,
                    zIndex: 10,
                    borderRadius: "inherit"
                }}
            />
        </motion.div>
    );
};

export default TiltCard;
