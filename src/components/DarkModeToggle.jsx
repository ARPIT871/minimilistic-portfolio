import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = ({ darkMode, setDarkMode, playSound }) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    playSound();
  };

  return (
    <motion.button
      className={`fixed top-4 right-4 p-2 rounded-full z-50 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-200'
      }`}
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? (
          <FaSun className="text-yellow-400 text-xl" />
        ) : (
          <FaMoon className="text-gray-700 text-xl" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
