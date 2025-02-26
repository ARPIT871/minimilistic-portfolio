import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MouseContext } from '../App';

const skills = [
  { name: 'Frontend Development', level: 90, icon: '💻' },
  { name: 'Backend Development', level: 85, icon: '⚙️' },
  { name: 'UI/UX Design', level: 80, icon: '🎨' },
  { name: 'Database Management', level: 85, icon: '🗄️' },
  { name: 'DevOps', level: 75, icon: '🚀' },
  { name: 'Problem Solving', level: 95, icon: '🧩' },
];

const timelineData = [
  { 
    year: '2023', 
    title: 'MERN Stack Teacher', 
    description: 'Started my career as a MERN stack teacher, helping others learn web development.',
    icon: '👨‍🏫',
    tech: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  { 
    year: '2024', 
    title: 'B.Tech in Computer Science', 
    description: 'Completed my graduation in Computer Science from Bhopal.',
    icon: '🎓',
    tech: ['Computer Science', 'Programming', 'Data Structures']
  },

  { 
    year: '2024', 
    title: 'Product-Based Company', 
    description: 'Worked on creating data visualization and cost management tools.lead a team of 5 members',
    icon: '📊',
    tech: ['Data Visualization', 'Cost Management', 'Full Stack']
  },
  { 
    year: '2025', 
    title: 'WhatsApp Messaging Tool', 
    description: 'Developed a WhatsApp messaging tool using the WhatsApp API at another product-based company.',
    icon: '💬',
    tech: ['WhatsApp API', 'Messaging', 'Integration']
  },
  { 
    year: '2025', 
    title: 'Freelance Developer', 
    description: 'Started freelancing, working on diverse projects and expanding my skill set.',
    icon: '🚀',
    tech: ['Web Development', 'Mobile Apps', 'Client Projects']
  },
];

const ParallaxCard = ({ children, delay = 0 }) => {
  const { mousePosition } = useContext(MouseContext);
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 });

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      });
    }
    
    const handleResize = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;
    
    // Calculate if mouse is over the card
    const isMouseOver = 
      mousePosition.x >= dimensions.left && 
      mousePosition.x <= dimensions.left + dimensions.width &&
      mousePosition.y >= dimensions.top && 
      mousePosition.y <= dimensions.top + dimensions.height;
    
    if (isMouseOver) {
      const x = mousePosition.x - dimensions.left;
      const y = mousePosition.y - dimensions.top;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      setRotateX(-rotateX);
      setRotateY(rotateY);
    } else {
      // Gradually return to neutral position when mouse is not over
      setRotateX(rotateX * 0.9);
      setRotateY(rotateY * 0.9);
      
      // Stop tiny movements
      if (Math.abs(rotateX) < 0.1) setRotateX(0);
      if (Math.abs(rotateY) < 0.1) setRotateY(0);
    }
  }, [mousePosition, dimensions]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.3s ease'
      }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
      {children}
    </motion.div>
  );
};

// Mouse-following gradient component
const MouseGradient = () => {
  const { mousePosition } = useContext(MouseContext);
  const gradientControls = useAnimation();
  
  useEffect(() => {
    gradientControls.start({
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 25%)`,
      transition: { duration: 0.3 }
    });
  }, [mousePosition, gradientControls]);
  
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-0"
      animate={gradientControls}
    />
  );
};

const About = () => {
  const { mousePosition } = useContext(MouseContext);
  const aboutRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (aboutRef.current) {
      setDimensions({
        width: aboutRef.current.offsetWidth,
        height: aboutRef.current.offsetHeight
      });
    }
    
    const handleResize = () => {
      if (aboutRef.current) {
        setDimensions({
          width: aboutRef.current.offsetWidth,
          height: aboutRef.current.offsetHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateParallax = (depth = 1) => {
    if (dimensions.width === 0) return { x: 0, y: 0 };
    
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    const deltaX = (mousePosition.x - centerX) / centerX;
    const deltaY = (mousePosition.y - centerY) / centerY;
    
    return {
      x: deltaX * 15 * depth,
      y: deltaY * 15 * depth
    };
  };

  return (
    <motion.section
      ref={aboutRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden flex flex-col justify-center py-20"
    >
      {/* Background with enhanced effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a1f35] to-[#1f2937]">
        <div className="absolute inset-0 opacity-20">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        {/* Add animated gradient circles with mouse interaction */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          animate={{
            x: (mousePosition.x / window.innerWidth - 0.5) * -30,
            y: (mousePosition.y / window.innerHeight - 0.5) * -30,
          }}
          transition={{ type: "spring", damping: 20 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-3xl animate-pulse delay-1000"
          animate={{
            x: (mousePosition.x / window.innerWidth - 0.5) * 30,
            y: (mousePosition.y / window.innerHeight - 0.5) * 30,
          }}
          transition={{ type: "spring", damping: 20 }}
        />
      </div>

      {/* Mouse-following gradient */}
      <MouseGradient />

      <div className="container mx-auto px-4 relative z-10">
        {/* About Me Header with enhanced animation */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            x: calculateParallax(0.2).x
          }}
          transition={{ 
            y: { duration: 0.8 },
            x: { type: "spring", damping: 25 }
          }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: (mousePosition.x / window.innerWidth - 0.5) * 5
            }}
            transition={{ 
              scale: { duration: 0.5 },
              rotate: { type: "spring", damping: 10 }
            }}
            className="inline-block mb-4 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-[#0ea5e9] p-1 relative">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
            </div>
          </motion.div>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#0ea5e9] mb-4 relative group">
            About Me
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] opacity-0  transition-opacity duration-300 blur rounded-lg" />
          </h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless user experiences. My journey in tech has been driven by curiosity and a constant desire to learn and innovate.
          </motion.p>
        </motion.div>

        {/* Skills Section with parallax cards */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            x: calculateParallax(0.3).x * -1 // Move in opposite direction
          }}
          transition={{ 
            y: { duration: 0.8, delay: 0.2 },
            x: { type: "spring", damping: 25 }
          }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-indigo-400 mb-8 text-center relative group">
            Skills & Expertise
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] opacity-0  transition-opacity duration-300 blur rounded-lg" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <ParallaxCard key={index} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                    <h4 className="text-lg font-semibold text-gray-200">{skill.name}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Proficiency</span>
                      <span className="text-sm text-indigo-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-full relative group"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </motion.div>

        {/* Timeline with enhanced visuals and mouse interaction */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            x: calculateParallax(0.2).x
          }}
          transition={{ 
            y: { duration: 0.8, delay: 0.4 },
            x: { type: "spring", damping: 25 }
          }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-indigo-400 mb-12 text-center relative group">
            My Journey
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur rounded-lg" />
          </h3>
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex-shrink-0 w-32 text-right pr-8 pt-1">
                  <span className="text-indigo-300 font-semibold">{item.year}</span>
                </div>
                <motion.div 
                  className="relative flex items-center justify-center"
                  animate={{
                    y: (mousePosition.y / window.innerHeight - 0.5) * 10
                  }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="h-full w-px bg-gradient-to-b from-indigo-500 to-[#0ea5e9] absolute top-0 bottom-0" />
                  <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-[#0ea5e9] flex items-center justify-center z-10 relative group">
                    <span className="text-xl transform group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur" />
                  </div>
                </motion.div>
                <div className="flex-grow pl-8">
                  <ParallaxCard>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50 relative z-10"
                    >
                      <h4 className="text-xl font-semibold text-indigo-400 mb-2">{item.title}</h4>
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm relative group-hover:bg-indigo-500/20 transition-colors duration-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </ParallaxCard>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA with enhanced effects and mouse interaction */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            x: calculateParallax(0.4).x * -1 // Move in opposite direction for depth
          }}
          transition={{ 
            y: { duration: 0.8, delay: 0.6 },
            x: { type: "spring", damping: 25 }
          }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 relative group"
          >
            <span className="relative z-10">Let's Work Together</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9] to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
              animate={{
                scale: [1, 1.5],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          animation: twinkle 3s ease-in-out infinite;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
        }

        .stars2 {
          animation-delay: 1s;
          background-size: 300px 300px;
        }

        .stars3 {
          animation-delay: 2s;
          background-size: 400px 400px;
        }

        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </motion.section>
  );
};

export default About;
