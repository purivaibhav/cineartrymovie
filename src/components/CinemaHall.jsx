import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import screenImage from "../assets/homeimage.jpg";

const CinemaHall = () => {
  const screenTexture = useLoader(TextureLoader, screenImage);

  return (
    <group>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 10, -19.9]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial map={screenTexture} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 10, -20]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Side Walls */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-20, 10, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[20, 10, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 20, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#121212" />
      </mesh>

      {/* Projector Room */}
      <mesh position={[-15, 5, 18]}>
        <boxGeometry args={[8, 10, 5]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Seats */}
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 10 }, (_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[col * 2 - 9, 1, row * -2 + 10]}
            castShadow
          >
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshStandardMaterial color="#2f2f2f" />
          </mesh>
        ))
      )}
    </group>
  );
};

export default CinemaHall;
