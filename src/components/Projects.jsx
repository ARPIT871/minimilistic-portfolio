import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MouseContext } from '../App';

// Import images
import solveaiImg from '../assets/solveai.png';
import studynotionImg from '../assets/studynotion.png';
import brainwaveImg from '../assets/brainwave.png';
import tshirtImg from '../assets/tshirt.png';
import zenteryImg from '../assets/zentery.png';
import appleImg from '../assets/iphone.png';

const projects = [
  {
    title: 'SolveAI',
    description: 'A powerful AI content generator that helps create content for blogs, websites, and social media. Streamline your content creation process with advanced AI technology.',
    image: solveaiImg,
    tech: ['React', 'OpenAI API', 'Node.js', 'TailwindCSS'],
    category: 'AI/ML',
    link: 'https://github.com/yourusername/solveai',
    demo: 'https://solveai.netlify.app/'
  },
  {
    title: 'StudyNotion',
    description: 'A comprehensive online learning platform offering coding courses with self-paced learning, hands-on projects, quizzes, and personalized instructor feedback.',
    image: studynotionImg,
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    category: 'Full Stack',
    link: 'https://github.com/yourusername/studynotion',
    demo: 'https://study-notion-mohan.vercel.app/'
  },
  {
    title: 'Brainwave AI',
    description: 'An open AI chat application designed to boost productivity. Unleash the power of AI with advanced chat capabilities and intelligent assistance.',
    image: brainwaveImg,
    tech: ['Next.js', 'OpenAI', 'TailwindCSS', 'Firebase'],
    category: 'AI/ML',
    link: 'https://github.com/yourusername/brainwave',
    demo: 'https://brainwave-jet-six.vercel.app/'
  },
  {
    title: 'T-Shirt Customizer',
    description: 'Create unique and exclusive shirts with a cutting-edge 3D customization tool. Users can unleash their imagination and define their own style with this interactive platform.',
    image: tshirtImg,
    tech: ['React Three Fiber', 'Three.js', 'Framer Motion', 'TailwindCSS'],
    category: '3D/Interactive',
    link: 'https://github.com/yourusername/tshirt-customizer',
    demo: 'https://t-shirt-customization-ecru.vercel.app/'
  },
  {
    title: 'Zentry Gaming',
    description: 'A modern and dynamic gaming website landing page showcasing the latest in gaming technology and experiences.',
    image: zenteryImg,
    tech: ['React', 'TailwindCSS', 'Framer Motion', 'GSAP'],
    category: 'Web App',
    link: 'https://github.com/yourusername/zentry',
    demo: 'https://zentry-three.vercel.app/'
  },
  {
    title: 'Apple Website Clone',
    description: 'A pixel-perfect clone of the Apple website, demonstrating attention to detail and advanced frontend development skills.',
    image: appleImg,
    tech: ['React', 'TailwindCSS', 'GSAP', 'Responsive Design'],
    category: 'Web App',
    link: 'https://github.com/yourusername/apple-clone',
    demo: 'https://i-phone-peach-ten.vercel.app/#highlights'
  }
];

const categories = ['All', 'Full Stack', 'Web App', 'AI/ML', '3D/Interactive'];

// Project card with mouse interaction
const ProjectCard = ({ project, index }) => {
  const { mousePosition } = useContext(MouseContext);
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (cardRef.current) {
      const updateDimensions = () => {
        const rect = cardRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top
        });
      };
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      window.addEventListener('scroll', updateDimensions);
      
      return () => {
        window.removeEventListener('resize', updateDimensions);
        window.removeEventListener('scroll', updateDimensions);
      };
    }
  }, []);
  
  // Calculate if mouse is over the card
  useEffect(() => {
    if (dimensions.width === 0) return;
    
    const isMouseOver = 
      mousePosition.x >= dimensions.left && 
      mousePosition.x <= dimensions.left + dimensions.width &&
      mousePosition.y >= dimensions.top && 
      mousePosition.y <= dimensions.top + dimensions.height;
    
    setIsHovered(isMouseOver);
  }, [mousePosition, dimensions]);
  
  // Calculate rotation based on mouse position
  const calculateRotation = () => {
    if (!isHovered || dimensions.width === 0) return { rotateX: 0, rotateY: 0 };
    
    const centerX = dimensions.left + dimensions.width / 2;
    const centerY = dimensions.top + dimensions.height / 2;
    
    // Calculate rotation (limited to small values for subtle effect)
    const rotateY = ((mousePosition.x - centerX) / (dimensions.width / 2)) * 5;
    const rotateX = ((mousePosition.y - centerY) / (dimensions.height / 2)) * -5;
    
    return { rotateX, rotateY };
  };
  
  const { rotateX, rotateY } = calculateRotation();
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX: rotateX,
        rotateY: rotateY,
        z: isHovered ? 50 : 0
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        rotateX: { type: "spring", stiffness: 100, damping: 15 },
        rotateY: { type: "spring", stiffness: 100, damping: 15 },
        z: { type: "spring", stiffness: 200, damping: 20 }
      }}
      className="relative group"
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
        {/* Project Image with parallax effect */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              x: isHovered ? (mousePosition.x - (dimensions.left + dimensions.width / 2)) * -0.05 : 0,
              y: isHovered ? (mousePosition.y - (dimensions.top + dimensions.height / 2)) * -0.05 : 0
            }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        <div className="p-6">
          <div className="mb-4">
            <motion.h3 
              className="text-2xl font-semibold text-indigo-400 mb-2"
              animate={{ 
                x: isHovered ? (mousePosition.x - (dimensions.left + dimensions.width / 2)) * 0.03 : 0,
                y: isHovered ? (mousePosition.y - (dimensions.top + dimensions.height / 2)) * 0.03 : 0
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              {project.title}
            </motion.h3>
            <motion.p 
              className="text-gray-300"
              animate={{ 
                x: isHovered ? (mousePosition.x - (dimensions.left + dimensions.width / 2)) * 0.02 : 0,
                y: isHovered ? (mousePosition.y - (dimensions.top + dimensions.height / 2)) * 0.02 : 0
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              {project.description}
            </motion.p>
          </div>

          <div className="space-y-4">
            {/* Tech Stack with staggered animation */}
            <motion.div 
              className="flex flex-wrap gap-2"
              animate={{ 
                x: isHovered ? (mousePosition.x - (dimensions.left + dimensions.width / 2)) * 0.01 : 0,
                y: isHovered ? (mousePosition.y - (dimensions.top + dimensions.height / 2)) * 0.01 : 0
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              {project.tech.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isHovered && techIndex === Math.floor(mousePosition.x / 30) % project.tech.length ? 1.1 : 1
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: techIndex * 0.1 
                  }}
                  className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Project Links with hover effects */}
            <div className="flex gap-4">
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-full text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 flex items-center gap-2"
              >
                <span>Live Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-[#0ea5e9]/10 rounded-xl pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: isHovered ? 
              `radial-gradient(circle at ${mousePosition.x - dimensions.left}px ${mousePosition.y - dimensions.top}px, rgba(99, 102, 241, 0.2), rgba(14, 165, 233, 0.1), transparent 70%)` : 
              'none'
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
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

const Projects = () => {
  const { mousePosition } = useContext(MouseContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const projectsRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (projectsRef.current) {
      setDimensions({
        width: projectsRef.current.offsetWidth,
        height: projectsRef.current.offsetHeight
      });
    }
    
    const handleResize = () => {
      if (projectsRef.current) {
        setDimensions({
          width: projectsRef.current.offsetWidth,
          height: projectsRef.current.offsetHeight
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

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <motion.section
      ref={projectsRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden flex flex-col justify-center py-20"
    >
      {/* Background with animated gradient and stars */}
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
        {/* Header with parallax effect */}
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
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#0ea5e9] mb-4">
            My Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my latest works and personal projects that showcase my skills and passion for development.
          </p>
        </motion.div>

        {/* Category Filter with mouse interaction */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            x: calculateParallax(0.3).x * -1 // Move in opposite direction
          }}
          transition={{ 
            y: { duration: 0.6, delay: 0.2 },
            x: { type: "spring", damping: 25 }
          }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-500 to-[#0ea5e9] text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(${selectedCategory === category ? 20 : 0}px)`
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid with enhanced cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          animate={{ 
            x: calculateParallax(0.1).x
          }}
          transition={{ type: "spring", damping: 25 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
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

export default Projects;
