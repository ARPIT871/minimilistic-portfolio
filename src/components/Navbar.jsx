import React, { useState, useEffect, useContext } from 'react';
import { motion, useViewportScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MouseContext } from '../App';

const Navbar = ({ darkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState(null);
  const { mousePosition, cursorVariant } = useContext(MouseContext);
  const { scrollY } = useViewportScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [darkMode ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)', darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'skills', 'contact', 'cli'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
    { id: 'cli', label: 'Terminal' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.nav
      style={{ backgroundColor }}
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setHoveredItem('logo')}
          onHoverEnd={() => setHoveredItem(null)}
        >
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#0ea5e9] mb-4"
          >
            AR
          </button>
          <AnimatePresence>
            {hoveredItem === 'logo' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -bottom-8 left-0 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-indigo-300"
              >
                Back to top
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <ul className="flex space-x-6">
          {navItems.map((item) => {
            // Calculate distance from mouse to create a magnetic effect
            const distance = Math.sqrt(
              Math.pow(mousePosition.x - window.innerWidth / 2, 2) + 
              Math.pow(mousePosition.y - 50, 2)
            );
            
            // Scale the effect based on distance (closer = stronger effect)
            const magnetStrength = Math.min(50 / (distance + 1), 5);
            
            // Direction vector from center to mouse
            const directionX = (mousePosition.x - window.innerWidth / 2) / (distance + 1);
            const directionY = (mousePosition.y - 50) / (distance + 1);
            
            return (
              <motion.li 
                key={item.id} 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                animate={
                  hoveredItem === item.id 
                    ? { 
                        x: directionX * magnetStrength * 2,
                        y: directionY * magnetStrength
                      } 
                    : { x: 0, y: 0 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative"
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-indigo-400'
                      : 'text-gray-300 hover:text-indigo-400'
                  }`}
                >
                  {item.label}
                </button>
                
                {/* Animated underline */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-[#0ea5e9]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                
                {/* Hover glow effect */}
                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 -z-10 blur-md bg-indigo-500/20 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
        
        {/* Mouse position indicator - subtle gradient that follows mouse in navbar */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-30"
          animate={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.3), transparent 100px)`
          }}
          transition={{ type: "spring", damping: 15 }}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
