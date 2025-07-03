// src/components/FilmReel3D.jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';

const FilmReel = () => {
  const reelRef = useRef();

  // Add rotation
  useFrame(() => {
    if (reelRef.current) {
      reelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={reelRef}>
      <cylinderGeometry args={[1.5, 1.5, 0.5, 32]} />
      <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
    </mesh>
  );
};

const FilmReel3D = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stage environment="city" intensity={0.6} shadows={false}>
          <FilmReel />
        </Stage>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default FilmReel3D;
