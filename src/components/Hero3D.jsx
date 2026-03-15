import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function ParticleMesh({ count = 400, color = "#00f3ff" }) {
    const pointsRef = useRef();
    const { mouse, viewport } = useThree();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, [count]);

    // Use a ref to track scroll without triggering re-renders or layout thrashing inside useFrame
    const scrollRef = useRef(0);
    useEffect(() => {
        const handleScroll = () => {
            scrollRef.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame((state) => {
        const { clock } = state;
        const scrollY = scrollRef.current;

        // Rotate based on time and scroll - Ultra-smooth interpolation
        pointsRef.current.rotation.y += (clock.getElapsedTime() * 0.04 + scrollY * 0.0004 - pointsRef.current.rotation.y) * 0.03;
        pointsRef.current.rotation.x += (clock.getElapsedTime() * 0.02 + scrollY * 0.0001 - pointsRef.current.rotation.x) * 0.03;

        // Subtle mouse reaction - Very soft lerp
        const targetX = (mouse.x * viewport.width) / 15;
        const targetY = (mouse.y * viewport.height) / 15;
        pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.025;
        pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.025;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={color}
                size={0.012}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.4}
            />
        </Points>
    );
}

const Hero3D = ({ currentPath = "/" }) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const config = useMemo(() => {
        // Map path to variant
        if (currentPath === "/contact") return { color: "#bc13fe", secondary: "#00f3ff", geo: "torus" };
        if (currentPath === "/about") return { color: "#00f3ff", secondary: "#bc13fe", geo: "octa" };
        return { color: "#00f3ff", secondary: "#bc13fe", geo: "mixed" };
    }, [currentPath]);

    return (
        <div className="Hero3DContainer" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            overflow: 'hidden'
        }}>
            <Canvas 
                camera={{ position: [0, 0, 5], fov: 75 }} 
                dpr={isMobile ? [1, 1] : [1, 1.5]} 
                frameloop="demand"
                performance={{ min: 0.5 }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color={config.color} />
                <ParticleMesh count={isMobile ? 150 : 400} color={config.color} />

                {!isMobile && (config.geo === "octa" || config.geo === "mixed") ? (
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <mesh position={[2, 1, -2]}>
                            <octahedronGeometry args={[1.2, 0]} />
                            <meshStandardMaterial color={config.secondary} wireframe transparent opacity={0.15} />
                        </mesh>
                    </Float>
                ) : null}

                {!isMobile && (config.geo === "torus" || config.geo === "mixed") ? (
                    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                        <mesh position={[-3, -2, -1]}>
                            <torusGeometry args={[1, 0.3, 16, 100]} />
                            <meshStandardMaterial color={config.color} wireframe transparent opacity={0.1} />
                        </mesh>
                    </Float>
                ) : null}
            </Canvas>
        </div>
    );
};

export default Hero3D;
