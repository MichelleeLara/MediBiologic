import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NavBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: { 
      x: "-100%",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: { 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    open: i => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1 }
    })
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  const links = ["Inicio", "Acerca de", "Servicios", "Contacto"];

  return (
    <>
      <motion.button 
        onClick={toggleMenu} 
        className="fixed top-7 right-4 z-50 bg-white rounded-full p-2 shadow-lg"
        animate={isOpen ? "open" : "closed"}
        variants={iconVariants}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            style={{
              backdropFilter: 'blur(2.2px)',
              WebkitBackdropFilter: 'blur(2.2px)',
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={menuRef}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed top-0 left-0 w-56 h-full bg-white shadow-lg p-4  z-50"
      >
        <nav className="mt-16">
          <ul className="space-y-4">
            {links.map((link, index) => (
              <motion.li
                key={link}
                custom={index}
                variants={linkVariants}
                initial="closed"
                animate="open"
              >
                <a href="#" className="text-blue-600 text-lg font-semibold hover:text-blue-800 transition-colors">{link}</a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
};

export default NavBarMobile;