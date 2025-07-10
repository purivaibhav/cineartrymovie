// File: src/Project/Projects.jsx

import React, { useState } from "react";
import Project from "./Project";
import styles from "./style.module.css";
import preview1 from "./assets/preview1.jpg";
import preview2 from "./assets/preview2.jpg";
import preview3 from "./assets/preview3.jpg";
import preview4 from "./assets/preview4.jpg";

const projectList = [
  { title: "3D Commercials", subtitle: "Product Showcase" },
  { title: "Film Production", subtitle: "Cinematic Projects" },
  { title: "Animation", subtitle: "Engaging Motion" },
  { title: "Visual FX", subtitle: "Stunning Details" },
];

const previews = [preview1, preview2, preview3, preview4];

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className={styles.projectsWrapper}
      onMouseMove={handleMouseMove}
    >
      {projectList.map((item, index) => (
        <Project
          key={index}
          index={index}
          title={item.title}
          subtitle={item.subtitle}
          setModal={setModal}
        />
      ))}

      {/* Floating Image Following Cursor */}
      {modal.active && (
        <div
          className={styles.previewImageWrapper}
          style={{
            position: "fixed",
            top: `${mouse.y - 150}px`,
            left: `${mouse.x + 20}px`,
            pointerEvents: "none",
            zIndex: 50,
            transition: "all 0.1s ease-in-out",
          }}
        >
          <img
            src={previews[modal.index]}
            alt="preview"
            className={styles.previewImage}
          />
        </div>
      )}
    </div>
  );
}
