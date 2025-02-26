import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScatterText = ({ text }) => {
  const letters = text.split('');
  
  return (
    <div className="flex justify-center mb-4">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            type: "spring",
            stiffness: 100
          }}
          className="text-4xl font-bold text-indigo-400 mx-[1px]"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

const CLI = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'info', content: 'Welcome to Arpit Rajput\'s interactive terminal' },
    { type: 'info', content: 'Type "help" to see available commands' },
  ]);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const commands = {
    help: () => {
      return [
        { type: 'info', content: 'Available commands:' },
        { type: 'command', content: 'about - Learn about me' },
        { type: 'command', content: 'skills - View my technical skills' },
        { type: 'command', content: 'projects - See my projects' },
        { type: 'command', content: 'contact - Get my contact information' },
        { type: 'command', content: 'clear - Clear the terminal' },
      ];
    },
    about: () => {
      return [
        { type: 'info', content: 'About Me:' },
        { type: 'success', content: 'I am a passionate full-stack developer with expertise in modern web technologies.' },
        { type: 'success', content: 'I love creating elegant solutions to complex problems and building intuitive user experiences.' },
      ];
    },
    skills: () => {
      return [
        { type: 'info', content: 'My Skills:' },
        { type: 'success', content: 'Frontend: React, Next.js, TypeScript, Tailwind CSS' },
        { type: 'success', content: 'Backend: Node.js, Express, MongoDB, PostgreSQL' },
        { type: 'success', content: 'Other: Git, Docker, AWS, CI/CD' },
      ];
    },
    projects: () => {
      return [
        { type: 'info', content: 'My Projects:' },
        { type: 'link', content: 'Portfolio Website', url: '#projects' },
        { type: 'link', content: 'E-commerce Platform', url: '#projects' },
        { type: 'link', content: 'Task Management App', url: '#projects' },
      ];
    },
    contact: () => {
      return [
        { type: 'info', content: 'Contact Information:' },
        { type: 'success', content: 'Email: example@example.com' },
        { type: 'link', content: 'GitHub', url: 'https://github.com/yourusername' },
        { type: 'link', content: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
      ];
    },
    clear: () => {
      setOutput([]);
      return [];
    },
  };

  const handleCommand = (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      return;
    }

    const newOutput = [
      ...output,
      { type: 'user', content: `> ${input}` }
    ];

    const command = input.trim().toLowerCase();
    
    if (commands[command]) {
      const commandOutput = commands[command]();
      setOutput([...newOutput, ...commandOutput]);
    } else {
      setOutput([
        ...newOutput,
        { type: 'error', content: `Command not found: ${input}. Type "help" for available commands.` }
      ]);
    }

    setInput('');
    
    // Scroll to bottom after output updates
    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const getTextColor = (type) => {
    switch (type) {
      case 'command':
        return 'text-indigo-400';
      case 'success':
        return 'text-indigo-300';
      case 'error':
        return 'text-red-400';
      case 'info':
        return 'text-indigo-400 font-semibold';
      case 'user':
        return 'text-gray-300';
      case 'link':
        return 'text-indigo-400 hover:underline cursor-pointer';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#1a1f35] to-[#1f2937] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ScatterText text="Interactive Terminal" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700"
        >
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-gray-400 text-sm">arpit@portfolio:~</div>
          </div>
          
          <div 
            ref={outputRef}
            className="p-4 h-80 overflow-y-auto font-mono text-sm"
            style={{ backgroundColor: '#0d1117' }}
          >
            {output.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`mb-1 ${getTextColor(item.type)}`}
                onClick={() => item.url && window.location.assign(item.url)}
              >
                {item.content}
              </motion.div>
            ))}
          </div>
          
          <form onSubmit={handleCommand} className="border-t border-gray-700 p-2 flex">
            <span className="text-indigo-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-300"
              placeholder="Type a command..."
            />
          </form>
        </motion.div>
        
        <div className="mt-8 text-center text-gray-400">
          <p>Type "help" to see available commands</p>
        </div>
      </div>
    </div>
  );
};

export default CLI;
