import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

function App() {
  return (
    <div className="">
      <Nav />
    </div>
  );
}

const Nav = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  
  console.log(scrollY)
  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);

      lastYRef.current = y;
    }
  });

  return (
    <motion.div
      animate={isHidden ? "hidden" : "visible"}
      whileHover="visible"
      onFocusCapture={() => setIsHidden(false)}
      variants={{
        hidden: {
          y: "-90%",
        },
        visible: {
          y: "0%",
        },
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 z-10 flex w-full justify-center pt-3"
    >
        
      <nav className="flex justify-between gap-3 rounded-3xl shadow-lg z-[1000] bg-white py-2.5 px-5 ">
        <a href="#" className="rounded-3xl border border-gray-200 px-7 py-2 transition-colors duration-300 hover:bg-gray-200 focus-visible:bg-gray-200">Products</a>
        <a href="#" className="rounded-3xl border border-gray-200 px-7 py-2 transition-colors duration-300 hover:bg-gray-200 focus-visible:bg-gray-200">Services</a>
        <a href="#" className="rounded-3xl border border-gray-200 px-7 py-2 transition-colors duration-300 hover:bg-gray-200 focus-visible:bg-gray-200">About</a>
        <a href="#" className="rounded-3xl border border-gray-200 px-7 py-2 transition-colors duration-300 hover:bg-gray-200 focus-visible:bg-gray-200">Contact</a>
      </nav>
    </motion.div>
  );
};

export default App;