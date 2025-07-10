// src/slidingimg/index.jsx
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";

import gif1 from "./assets/rebeccadavid.gif";
import gif2 from "./assets/lucyeyes.gif";
import gif3 from "./assets/gif1.gif";
import gif4 from "./assets/sandy.gif";
import gif5 from "./assets/rebecca.gif";
import gif6 from "./assets/rd.gif";
import gif7 from "./assets/lucyeyes2.gif";
import gif8 from "./assets/adamsmash.gif";

const slider1 = [
  { color: "#141516", src: gif1 },
  { color: "#141516", src: gif2 },
  { color: "#141516", src: gif3 },
  { color: "#21242b", src: gif4 },
];

const slider2 = [
  { color: "#141516", src: gif5 },
  { color: "#141516", src: gif6 },
  { color: "#141516", src: gif7 },
  { color: "#141516", src: gif8 },
];

export default function SlidingImages() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => (
          <div
            key={index}
            className={styles.project}
            style={{ backgroundColor: project.color }}
          >
            <div className={styles.imageContainer}>
              <img src={project.src} alt="gif" className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => (
          <div
            key={index}
            className={styles.project}
            style={{ backgroundColor: project.color }}
          >
            <div className={styles.imageContainer}>
              <img src={project.src} alt="gif" className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}
