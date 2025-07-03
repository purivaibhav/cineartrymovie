import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

// Typing effect using useFrame for smoother updates
const TypingText = ({ fullText, speed = 5, ...props }) => {
  const [displayed, setDisplayed] = useState("");
  const index = useRef(0);

  useFrame(({ clock }) => {
    const nextCharIndex = Math.floor(clock.getElapsedTime() * speed);
    if (nextCharIndex !== index.current && nextCharIndex <= fullText.length) {
      index.current = nextCharIndex;
      setDisplayed(fullText.slice(0, index.current));
    }
  });

  return (
    <Text {...props} color="white" anchorX="center" anchorY="middle">
      {displayed}
    </Text>
  );
};

const Chair = ({ position }) => (
  <mesh position={position} castShadow>
    <boxGeometry args={[0.6, 0.6, 0.6]} />
    <meshStandardMaterial color="#aa0000" />
  </mesh>
);

const Screen = () => (
  <mesh position={[0, 1.5, -12]} receiveShadow>
    <planeGeometry args={[12, 6]} />
    <meshStandardMaterial color="white" />
  </mesh>
);

const Floor = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} receiveShadow>
    <planeGeometry args={[40, 40]} />
    <meshStandardMaterial color="#111" />
  </mesh>
);

const SideLights = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  useFrame(({ clock }) => {
    const intensity = (Math.sin(clock.getElapsedTime() * 3) + 1.5) / 2;
    if (ref1.current) ref1.current.intensity = intensity;
    if (ref2.current) ref2.current.intensity = intensity;
  });
  return (
    <>
      <pointLight ref={ref1} position={[-8, 2, -8]} color="red" />
      <pointLight ref={ref2} position={[8, 2, -8]} color="blue" />
    </>
  );
};

const CameraProp = ({ position }) => (
  <group position={position}>
    <mesh>
      <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
      <meshStandardMaterial color="gray" />
    </mesh>
    <mesh position={[0, 0.8, 0]}>
      <boxGeometry args={[0.5, 0.3, 0.3]} />
      <meshStandardMaterial color="black" />
    </mesh>
    <mesh position={[0, 0.8, 0.2]}>
      <circleGeometry args={[0.1, 32]} />
      <meshStandardMaterial color="lime" emissive="#00ff00" />
    </mesh>
  </group>
);

const CameraRig = ({ children }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = Math.sin(t * 0.4) * 0.1;
  });
  return <group ref={ref}>{children}</group>;
};

const CinemaHall = () => {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas shadows camera={{ position: [0, 6, 16], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 12, 8]} intensity={1} castShadow />
        <SideLights />
        <OrbitControls enableZoom={false} />
        <CameraRig>
          <Floor />
          <Screen />

          {/* Seats */}
          {[...Array(10)].map((_, row) =>
            [...Array(12)].map((_, col) => (
              <Chair
                key={`${row}-${col}`}
                position={[col - 5.5, -1.8, -row * 1.2]}
              />
            ))
          )}

          {/* Cameras */}
          <CameraProp position={[-6, -1.8, 6]} />
          <CameraProp position={[6, -1.8, 6]} />

          {/* Text on screen */}
          <Text
            position={[0, 2.5, -11.9]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            CineArtery
          </Text>
          <TypingText
            fullText="Where stories come alive"
            speed={10}
            fontSize={0.3}
            position={[0, 1.5, -11.9]}
          />
        </CameraRig>
      </Canvas>
    </div>
  );
};

export default CinemaHall;
