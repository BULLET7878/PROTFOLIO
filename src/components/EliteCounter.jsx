import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

const EliteCounter = ({ value, max = 100 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            // High-end speedometer sweep effect
            animate(count, max, {
                duration: 0.6,
                ease: "easeOut",
                onComplete: () => {
                    animate(count, value, {
                        duration: 1,
                        ease: "circOut"
                    });
                }
            });
        }
    }, [isInView, value, count, max]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default EliteCounter;
