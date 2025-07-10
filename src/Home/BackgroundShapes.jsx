import { useViewportScroll, useTransform } from "framer-motion";

const bgColors = [
  { color: "bg-orange-500", delay: 0 },
  { color: "bg-purple-500", delay: 100 },
  { color: "bg-yellow-400", delay: 200 },
  { color: "bg-lime-400", delay: 300 },
  { color: "bg-blue-200", delay: 400 },
];

const BackgroundShapes = ({ scrollY }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[300vh] -z-10">
      {bgColors.map((item, index) => {
        const offset = 800 + index * 100; // scroll point to start animation
        const animateIn = scrollY > offset;
        return (
          <motion.div
            key={index}
            className={`absolute left-0 w-[150%] h-[100vh] ${item.color} rounded-r-[100px] border border-black`}
            style={{
              top: `${index * 100}vh`,
            }}
            initial={{ x: "-100%" }}
            animate={{ x: animateIn ? "0%" : "-100%" }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: index * 0.1 }}
          />
        );
      })}
    </div>
  );
};
