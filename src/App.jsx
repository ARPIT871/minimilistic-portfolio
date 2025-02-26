import React, { useState, useEffect, createContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CLI from './components/CLI';
import DarkModeToggle from './components/DarkModeToggle';
import useSound from 'use-sound';
import clickSound from './assets/sounds/click.mp3';

// Create a context for mouse position
export const MouseContext = createContext({
  mousePosition: { x: 0, y: 0 },
  cursorVariant: "default"
});

// Custom cursor component
const CustomCursor = () => {
  const { mousePosition, cursorVariant } = React.useContext(MouseContext);
  
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(99, 102, 241, 0.3)",
      mixBlendMode: "difference"
    },
    text: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(14, 165, 233, 0.2)",
      mixBlendMode: "difference"
    },
    button: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(99, 102, 241, 0.4)",
      mixBlendMode: "difference"
    }
  };

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-50 rounded-full pointer-events-none hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div 
        className="cursor-ring fixed top-0 left-0 z-50 rounded-full border-2 border-indigo-400 pointer-events-none hidden md:block"
        style={{ 
          height: 12, 
          width: 12,
          x: mousePosition.x - 6,
          y: mousePosition.y - 6
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 28, mass: 0.1 }}
      />
    </>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [playClickSound] = useSound(clickSound, { volume: 0.5 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Additional approach to ensure scroll reset
    const handleLoad = () => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    };
    
    window.addEventListener('load', handleLoad);
    
    // Also handle hash changes to prevent unwanted scrolling
    const handleHashChange = () => {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Add event listeners for cursor variants
  useEffect(() => {
    const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span");
    const buttonElements = document.querySelectorAll("button, a");
    
    const handleMouseEnterText = () => setCursorVariant("text");
    const handleMouseEnterButton = () => setCursorVariant("button");
    const handleMouseLeave = () => setCursorVariant("default");
    
    textElements.forEach(element => {
      element.addEventListener("mouseenter", handleMouseEnterText);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
    
    buttonElements.forEach(element => {
      element.addEventListener("mouseenter", handleMouseEnterButton);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
    
    return () => {
      textElements.forEach(element => {
        element.removeEventListener("mouseenter", handleMouseEnterText);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      
      buttonElements.forEach(element => {
        element.removeEventListener("mouseenter", handleMouseEnterButton);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <MouseContext.Provider value={{ mousePosition, cursorVariant }}>
      <div className={`min-h-screen transition-colors duration-500 ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <CustomCursor />
        <Navbar darkMode={darkMode} />
        <main className="relative">
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            <About darkMode={darkMode} />
          </section>
          <section id="projects">
            <Projects darkMode={darkMode} />
          </section>
          <section id="skills">
            <Skills darkMode={darkMode} />
          </section>
          <section id="contact">
            <Contact darkMode={darkMode} />
          </section>
          <section id="cli">
            <CLI darkMode={darkMode} />
          </section>
        </main>
        {/* <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} playSound={playClickSound} /> */}
      </div>
    </MouseContext.Provider>
  );
}

export default App;
