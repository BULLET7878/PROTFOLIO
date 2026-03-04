import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Particle = ({ color, size, initialX, initialY, duration, delay, opacity }) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '0%', // Square 'Binary' feel
                background: color,
                left: `${initialX}%`,
                top: `${initialY}%`,
                filter: 'blur(0.5px)',
                zIndex: 0
            }}
            animate={{
                y: [0, -100, -250],
                opacity: [0, opacity, 0],
                x: ['-1%', '1%', '-1%'],
                rotate: [0, 90, 180]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
        />
    );
};

const FloatingParticles = ({ count = 50 }) => {
    const particles = useMemo(() => {
        const colors = [
            'rgba(0, 243, 255, 0.3)',
            'rgba(188, 19, 254, 0.3)',
            'rgba(255, 255, 255, 0.15)'
        ];
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 2 + 1,
            initialX: Math.random() * 100,
            initialY: Math.random() * 100 + 20,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.4 + 0.1
        }));
    }, [count]);

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {particles.map((p) => (
                <Particle key={p.id} {...p} />
            ))}
        </div>
    );
};

export default FloatingParticles;

