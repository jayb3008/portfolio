import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Laptop Model Component
const Laptop = () => {
  const laptopRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (screenRef.current && laptopRef.current) {
      // Initial closed position
      screenRef.current.rotation.x = Math.PI;
      laptopRef.current.position.y = -0.2; // Start slightly lower
      
      // Create a timeline for sequential animations
      const tl = gsap.timeline();
      
      // Animate to open position after a short delay
      setTimeout(() => {
        setIsOpen(true);
        
        // First, lift the laptop slightly
        tl.to(laptopRef.current.position, {
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        })
        // Then start opening the screen
        .to(screenRef.current.rotation, {
          x: Math.PI * 0.8, // Open about 80% first
          duration: 0.8,
          ease: "power2.inOut"
        })
        // Finally, complete the opening
        .to(screenRef.current.rotation, {
          x: Math.PI / 6, // Final open position
          duration: 0.7,
          ease: "power2.out"
        });
      }, 1000);
    }
  }, []);

  useFrame((state) => {
    if (laptopRef.current && screenRef.current) {
      // Gentle floating animation only when fully open
      if (isOpen) {
        laptopRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        screenRef.current.rotation.x = Math.PI / 6 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
      }
    }
  });

  return (
    <group ref={laptopRef} position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Base of the laptop */}

      
      {/* Screen assembly */}
      <group ref={screenRef} position={[0, 0.55, -0.4]} rotation={[Math.PI, 0, 0]}>
        {/* Screen frame */}
        <mesh castShadow>
          <boxGeometry args={[2, 1.2, 0.08]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.9} 
            roughness={0.1}
            envMapIntensity={1}
          />
        </mesh>
        
        {/* Screen bezel */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.9, 1.1, 0.02]} />
          <meshStandardMaterial 
            color="#000000" 
            metalness={0.5} 
            roughness={0.2}
          />
        </mesh>
        
        {/* Screen display */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.8, 1]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff" 
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
        
        {/* Screen Content */}
        <group position={[0, 0, 0.07]}>
          {/* Header */}
          <mesh position={[0, 0.4, 0]}>
            <planeGeometry args={[1.6, 0.1]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              emissive="#1a1a1a" 
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Navigation */}
          <mesh position={[0, 0.35, 0]}>
            <planeGeometry args={[1.4, 0.05]} />
            <meshStandardMaterial 
              color="#3377ff" 
              emissive="#3377ff" 
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Hero Section */}
          <mesh position={[0, 0.2, 0]}>
            <planeGeometry args={[1.5, 0.2]} />
            <meshStandardMaterial 
              color="#f5f5f5" 
              emissive="#f5f5f5" 
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Project Cards */}
          <group position={[0, -0.1, 0]}>
            {/* Card 1 */}
            <mesh position={[-0.5, 0, 0]}>
              <planeGeometry args={[0.4, 0.3]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff" 
                emissiveIntensity={0.8}
              />
            </mesh>
            {/* Card 2 */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[0.4, 0.3]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff" 
                emissiveIntensity={0.8}
              />
            </mesh>
            {/* Card 3 */}
            <mesh position={[0.5, 0, 0]}>
              <planeGeometry args={[0.4, 0.3]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff" 
                emissiveIntensity={0.8}
              />
            </mesh>
          </group>

          {/* Footer */}
          <mesh position={[0, -0.35, 0]}>
            <planeGeometry args={[1.6, 0.1]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              emissive="#1a1a1a" 
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
        
        {/* Screen hinge */}
        <mesh position={[0, -0.6, 0.04]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
      </group>
      
      {/* Keyboard area */}
      <group position={[0, 0.05, 0.2]}>
        {/* Keyboard base with proper structure */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.05, 1.2]} />
          <meshStandardMaterial 
            color="#2a2a2a" 
            metalness={0.8} 
            roughness={0.3}
          />
        </mesh>

        {/* Palm rest area */}
        <mesh position={[0, -0.025, -0.3]}>
          <boxGeometry args={[1.8, 0.02, 0.6]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.7} 
            roughness={0.4}
          />
        </mesh>
        
        {/* Trackpad with subtle depression */}
        <group position={[0, -0.02, -0.3]}>
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.4, 0.01, 0.25]} />
            <meshStandardMaterial 
              color="#333333" 
              metalness={0.5} 
              roughness={0.3}
            />
          </mesh>
          {/* Trackpad border */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.42, 0.01, 0.27]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              metalness={0.6} 
              roughness={0.4}
            />
          </mesh>
        </group>
        
        {/* Keyboard keys with glow effect */}
        <group position={[0, 0.03, 0]}>
          {/* Function keys row */}
          <group position={[0, 0.3, 0]}>
            {[...Array(12)].map((_, col) => (
              <mesh key={col} position={[-0.65 + col * 0.12, 0, 0]}>
                <boxGeometry args={[0.08, 0.08, 0.02]} />
                <meshStandardMaterial 
                  color="#1a1a1a" 
                  metalness={0.4} 
                  roughness={0.6}
                  emissive="#4488ff"
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))}
          </group>

          {/* Number keys row */}
          <group position={[0, 0.2, 0]}>
            {[...Array(10)].map((_, col) => (
              <mesh key={col} position={[-0.45 + col * 0.1, 0, 0]}>
                <boxGeometry args={[0.08, 0.08, 0.02]} />
                <meshStandardMaterial 
                  color="#1a1a1a" 
                  metalness={0.4} 
                  roughness={0.6}
                  emissive="#4488ff"
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))}
          </group>

          {/* QWERTY row */}
          <group position={[0, 0.1, 0]}>
            {[...Array(10)].map((_, col) => (
              <mesh key={col} position={[-0.45 + col * 0.1, 0, 0]}>
                <boxGeometry args={[0.08, 0.08, 0.02]} />
                <meshStandardMaterial 
                  color="#1a1a1a" 
                  metalness={0.4} 
                  roughness={0.6}
                  emissive="#4488ff"
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))}
          </group>

          {/* ASDF row */}
          <group position={[0, 0, 0]}>
            {[...Array(9)].map((_, col) => (
              <mesh key={col} position={[-0.4 + col * 0.1, 0, 0]}>
                <boxGeometry args={[0.08, 0.08, 0.02]} />
                <meshStandardMaterial 
                  color="#1a1a1a" 
                  metalness={0.4} 
                  roughness={0.6}
                  emissive="#4488ff"
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))}
          </group>

          {/* ZXCV row */}
          <group position={[0, -0.1, 0]}>
            {[...Array(7)].map((_, col) => (
              <mesh key={col} position={[-0.3 + col * 0.1, 0, 0]}>
                <boxGeometry args={[0.08, 0.08, 0.02]} />
                <meshStandardMaterial 
                  color="#1a1a1a" 
                  metalness={0.4} 
                  roughness={0.6}
                  emissive="#4488ff"
                  emissiveIntensity={0.2}
                />
              </mesh>
            ))}
          </group>

          {/* Space bar */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[0.4, 0.08, 0.02]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              metalness={0.4} 
              roughness={0.6}
              emissive="#4488ff"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Special keys (Enter, Shift, etc.) */}
          <mesh position={[0.45, 0, 0]}>
            <boxGeometry args={[0.12, 0.08, 0.02]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              metalness={0.4} 
              roughness={0.6}
              emissive="#4488ff"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[0.45, -0.1, 0]}>
            <boxGeometry args={[0.12, 0.08, 0.02]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              metalness={0.4} 
              roughness={0.6}
              emissive="#4488ff"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>

        {/* Backlight glow effect */}
        <mesh position={[0, 0.02, 0]}>
          <planeGeometry args={[1.6, 0.8]} />
          <meshStandardMaterial 
            color="#4488ff"
            transparent
            opacity={0.1}
            emissive="#4488ff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Subtle edge highlights */}
        <mesh position={[0, 0.03, 0.6]}>
          <boxGeometry args={[1.8, 0.01, 0.01]} />
          <meshStandardMaterial 
            color="#4488ff"
            emissive="#4488ff"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[0, 0.03, -0.6]}>
          <boxGeometry args={[1.8, 0.01, 0.01]} />
          <meshStandardMaterial 
            color="#4488ff"
            emissive="#4488ff"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
};

// Animated Particles Background
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;
  
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;
    sizes[i] = Math.random() * 0.2 + 0.05;
  }
  
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0003;
      particlesRef.current.rotation.x += 0.0001;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          array={positions} 
          count={positions.length / 3} 
          itemSize={3}
        />
        <bufferAttribute 
          attach="attributes-size" 
          array={sizes} 
          count={sizes.length} 
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        sizeAttenuation={true} 
        color="#4488ff"
        transparent
        opacity={0.8}
      />
    </points>
  );
};

// Scene Component
const SceneContent = () => {
  const { camera } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(camera as THREE.PerspectiveCamera);

  useEffect(() => {
    if (cameraRef.current) {
      // Initial camera position
      cameraRef.current.position.set(4, 2, 6);
      
      // Animate camera on load
      gsap.to(cameraRef.current.position, {
        x: 3,
        y: 1.5,
        z: 5,
        duration: 3,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[4, 2, 6]} />
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3366ff" />
      <spotLight position={[5, 5, 5]} intensity={1.5} castShadow />
      
      {/* <Laptop /> */}
      <ParticleField />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
      />
    </>
  );
};

const Scene3D: React.FC = () => {
  return (
    <Canvas shadows>
      <SceneContent />
    </Canvas>
  );
};

export default Scene3D;
