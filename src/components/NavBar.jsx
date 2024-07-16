import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getI18N } from "@/i18n/"


function App({currentLocale}) {
  return (
    <>
    <div className="hidden lg:block">
      {/* <Nav /> */}
    </div>
    <div className="bg-red-50 flex items-center justify-center">
      <Tabs currentLocale={currentLocale} />
    </div>
    
    </>
    
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
      className="hidden fixed top-0 z-10 sm:flex w-full justify-center pt-3"
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



const Tabs = ({currentLocale}) => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const i18n = getI18N({ currentLocale });
  const TABS = getTABS(currentLocale);

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);
      lastYRef.current = y;
    }
  });

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }
    setSelected(val);
  };

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
      className="fixed top-0 z-10 w-full flex pt-4 items-center justify-center" 
    >
      <div
        onMouseLeave={() => handleSetSelected(null)}
        className="relative flex h-fit gap-2 bg-white py-3 px-6 rounded-full shadow-xl"
      >
        <a data-astro-reload href="/" onMouseEnter={() => handleSetSelected(null)} className="flex items-center gap-1  text-sm  bg-white rounded-3xl border border-gray-200 px-7 py-2 transition-colors duration-300 hover:bg-gray-200 focus-visible:bg-gray-200">
          {i18n.Navbar.Inicio}
        </a>
        <a href="/doctor-dueñas" onMouseEnter={() => handleSetSelected(null)} className="flex items-center gap-1  text-sm  bg-white rounded-3xl border border-gray-200 px-7 py-2 transition-colors duration-300 hover:bg-gray-200 focus-visible:bg-gray-200">
          {i18n.Navbar.Dr}
        </a>
        <a href="" onMouseEnter={() => handleSetSelected(null)} className="flex items-center gap-1  text-sm  bg-white rounded-3xl border border-gray-200 px-7 py-2 transition-colors duration-300 hover:bg-gray-200 focus-visible:bg-gray-200">
          {i18n.Navbar.CelulasM}
        </a>
        {TABS.map((t) => {
          return (
            <Tab
              key={t.id}
              selected={selected}
              handleSetSelected={handleSetSelected}
              tab={t.id}
            >
              {t.title}
            </Tab>
          );
        })}

        <AnimatePresence>
          {selected && <Content dir={dir} selected={selected} currentLocale={currentLocale} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      // onMouseLeave={() => handleSetSelected(null)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1  text-sm  bg-white rounded-3xl border border-gray-200 px-7 py-2 transition-colors duration-300 hover:bg-gray-200 focus-visible:bg-gray-200  ${
        selected === tab
          ? " bg-[#e5e7eb] "
          : "text-black"
      }`}
    >
      <span>{children}</span>
      {
        <div className={`transition-transform ${
          selected === tab ? "rotate-180" : ""
        }`}>
          <FiChevronDown/>
        </div>
      }
    </button>
  );
};

const Content = ({ selected, dir, currentLocale }) => {
  const TABS = getTABS(currentLocale);
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute left-0 top-[calc(100%_+_24px)] w-full rounded-lg  shadow-md bg-white p-4"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component currentLocale={currentLocale} />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl  bg-white"
    />
  );
};

const Therapies = ({currentLocale}) => {
  const i18n = getI18N({ currentLocale })
  return (
    <div className="">
      <div className="flex gap-4">
        <div className="w-full">
          {i18n.Treatments_Section.TREATMENTS.slice(0, 4).map((treatment) => (
            <a key={treatment.name} href="#" className="mb-1 text-sm flex items-center gap-1 transition-all duration-300 border border-white hover:border-gray-200 hover:bg-gray-200 focus-visible:bg-gray-200 py-1.5 px-3 rounded-full">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="#1c73b7"  className="icon icon-tabler icons-tabler-filled icon-tabler-medical-cross"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 2l-.15 .005a2 2 0 0 0 -1.85 1.995v2.803l-2.428 -1.401a2 2 0 0 0 -2.732 .732l-1 1.732l-.073 .138a2 2 0 0 0 .805 2.594l2.427 1.402l-2.427 1.402a2 2 0 0 0 -.732 2.732l1 1.732l.083 .132a2 2 0 0 0 2.649 .6l2.428 -1.402v2.804a2 2 0 0 0 2 2h2l.15 -.005a2 2 0 0 0 1.85 -1.995v-2.804l2.428 1.403a2 2 0 0 0 2.732 -.732l1 -1.732l.073 -.138a2 2 0 0 0 -.805 -2.594l-2.428 -1.403l2.428 -1.402a2 2 0 0 0 .732 -2.732l-1 -1.732l-.083 -.132a2 2 0 0 0 -2.649 -.6l-2.428 1.4v-2.802a2 2 0 0 0 -2 -2h-2z" /></svg>
              {treatment.name}
            </a>  
          ))}
        </div>
     
        <div className="w-full">
          {i18n.Treatments_Section.TREATMENTS.slice(4).map((treatment) => (
            <a key={treatment.name} href="#" className="mb-1 text-sm flex items-center gap-1 transition-all duration-300 border border-white hover:border-gray-200 hover:bg-gray-200 focus-visible:bg-gray-200 py-1.5 px-3 rounded-full">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="#1c73b7"  className="icon icon-tabler icons-tabler-filled icon-tabler-medical-cross"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 2l-.15 .005a2 2 0 0 0 -1.85 1.995v2.803l-2.428 -1.401a2 2 0 0 0 -2.732 .732l-1 1.732l-.073 .138a2 2 0 0 0 .805 2.594l2.427 1.402l-2.427 1.402a2 2 0 0 0 -.732 2.732l1 1.732l.083 .132a2 2 0 0 0 2.649 .6l2.428 -1.402v2.804a2 2 0 0 0 2 2h2l.15 -.005a2 2 0 0 0 1.85 -1.995v-2.804l2.428 1.403a2 2 0 0 0 2.732 -.732l1 -1.732l.073 -.138a2 2 0 0 0 -.805 -2.594l-2.428 -1.403l2.428 -1.402a2 2 0 0 0 .732 -2.732l-1 -1.732l-.083 -.132a2 2 0 0 0 -2.649 -.6l-2.428 1.4v-2.802a2 2 0 0 0 -2 -2h-2z" /></svg>
              {treatment.name}
            </a>  
          ))}
          {/* <a href="#" className="mb-1 text-sm flex items-center gap-1 transition-all duration-300 border border-white hover:border-gray-200 hover:bg-gray-200 focus-visible:bg-gray-200 py-1.5 px-3 rounded-full">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="#1c73b7"  class="icon icon-tabler icons-tabler-filled icon-tabler-medical-cross"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 2l-.15 .005a2 2 0 0 0 -1.85 1.995v2.803l-2.428 -1.401a2 2 0 0 0 -2.732 .732l-1 1.732l-.073 .138a2 2 0 0 0 .805 2.594l2.427 1.402l-2.427 1.402a2 2 0 0 0 -.732 2.732l1 1.732l.083 .132a2 2 0 0 0 2.649 .6l2.428 -1.402v2.804a2 2 0 0 0 2 2h2l.15 -.005a2 2 0 0 0 1.85 -1.995v-2.804l2.428 1.403a2 2 0 0 0 2.732 -.732l1 -1.732l.073 -.138a2 2 0 0 0 -.805 -2.594l-2.428 -1.403l2.428 -1.402a2 2 0 0 0 .732 -2.732l-1 -1.732l-.083 -.132a2 2 0 0 0 -2.649 -.6l-2.428 1.4v-2.802a2 2 0 0 0 -2 -2h-2z" /></svg>
            Terapia de quelación
          </a> */}

        </div>
     
     
     
      </div>

      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-tertiary">
        <span>{i18n.NavbarBlog.VIEW_MORE}</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        {/* <FiHome className="mb-2 text-xl text-indigo-300" /> */}
        <span className="text-xs">Startup</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        {/* <FiBarChart2 className="mb-2 text-xl text-indigo-300" /> */}
        <span className="text-xs">Scaleup</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        {/* <FiPieChart className="mb-2 text-xl text-indigo-300" /> */}
        <span className="text-xs">Enterprise</span>
      </a>
    </div>
  );
};

const Blog = ({currentLocale}) => {
  const i18n = getI18N({ currentLocale });
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {i18n.NavbarBlog.ITEMS.map((item, index) => (
          <a href="#" key={index}>
            <img
              className="mb-2 h-28 w-full rounded object-cover"
              src={item.IMAGE}
              alt={item.IMAGE_ALT}
            />
            <h4 className="mb-0.5 text-sm font-medium">{item.TITLE}</h4>
            <p className="text-xs text-neutral-700">
              {item.DESCRIPTION}
            </p>
          </a>
        ))}
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-tertiary">
        <span>{i18n.NavbarBlog.VIEW_MORE}</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const getTABS = (currentLocale) => {
  const i18n = getI18N({ currentLocale });
  return [
    {
      title: i18n.Navbar.Terapias,
      Component: ({ currentLocale }) => <Therapies currentLocale={currentLocale} />,
    },
    {
      title: i18n.Navbar.Blog,
      Component: Blog,
    },
  ].map((n, idx) => ({ ...n, id: idx + 1 }));
};

// const TABS = [

//   {
//     title: i18n.Navbar.Terapias,
//     Component: ({ currentLocale }) => <Therapies currentLocale={currentLocale} />,
//   },
//   {
//     title: i18n.Navbar.Blog,
//     Component: Blog,
//   },
// ].map((n, idx) => ({ ...n, id: idx + 1 }));

const FiChevronDown = () =>{
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>
  )
}
const FiArrowRight = () =>{
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
  )
}

export default App;