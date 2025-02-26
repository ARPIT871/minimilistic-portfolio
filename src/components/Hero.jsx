import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, OrbitControls, Stars } from '@react-three/drei';

// Floating tech icons component
const FloatingIcons = () => {
  const icons = [
    { icon: '⚛️', label: 'React' },
    { icon: '🚀', label: 'Next.js' },
    { icon: '🎨', label: 'Tailwind' },
    { icon: '📱', label: 'Mobile-First' },
    { icon: '⚡', label: 'Performance' },
    { icon: '🔥', label: 'Firebase' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="relative group">
            <span className="text-2xl filter blur-[1px]">{item.icon}</span>
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900/80 px-2 py-1 rounded">
              {item.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Dynamic subtitle animation
const DynamicSubtitle = () => {
  const roles = [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Tech Innovator"
  ];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p
      key={currentRole}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-2xl text-gray-300 font-light"
    >
      {roles[currentRole]}
    </motion.p>
  );
};

function AnimatedText() {
  const textRef = useRef();

  useFrame(({ clock }) => {
    if (textRef.current) {
      // Gentle floating animation
      textRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.2;
      textRef.current.rotation.x = Math.cos(clock.elapsedTime * 0.3) * 0.1;
      textRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Center>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.8}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        Arpit Rajput
        <meshPhongMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.3}
          shininess={100}
        />
      </Text3D>
    </Center>
  );
}

// Add this new component for the glow effect
const GlowingRing = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.5, 0.3, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
        <div className="absolute inset-0 blur-[100px] bg-gradient-to-r from-indigo-500/30 via-[#0ea5e9]/30 to-indigo-500/30 animate-pulse" />
        <div className="absolute inset-0 blur-[80px] bg-gradient-to-r from-[#0ea5e9]/20 to-indigo-500/20 animate-pulse delay-100" />
      </div>
    </motion.div>
  );
};

// Interactive Particles component
const InteractiveParticles = ({ mousePosition }) => {
  const [particles, setParticles] = useState([]);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 2,
      color: Math.random() > 0.5 ? '#6366f1' : '#0ea5e9',
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      life: Math.random() * 100 + 100,
    }));
    
    setParticles(initialParticles);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  const animate = time => {
    if (previousTimeRef.current !== undefined) {
      // Update particles
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Calculate distance from mouse
          const dx = particle.x - (mousePosition.x * window.innerWidth + window.innerWidth) / 2;
          const dy = particle.y - (mousePosition.y * window.innerHeight + window.innerHeight) / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply force based on mouse position
          const forceDirectionX = dx / (distance || 1);
          const forceDirectionY = dy / (distance || 1);
          const maxDistance = 300;
          const force = (maxDistance - distance) / maxDistance;
          
          // Only apply force if within maxDistance
          let newVx = particle.vx;
          let newVy = particle.vy;
          
          if (distance < maxDistance) {
            newVx += forceDirectionX * force * 0.5;
            newVy += forceDirectionY * force * 0.5;
          }
          
          // Update position
          let x = particle.x + newVx;
          let y = particle.y + newVy;
          
          // Boundary check
          if (x < 0 || x > window.innerWidth) {
            x = particle.x;
            newVx = -newVx * 0.5;
          }
          
          if (y < 0 || y > window.innerHeight) {
            y = particle.y;
            newVy = -newVy * 0.5;
          }
          
          // Reduce life and check if particle should be reset
          const life = particle.life - 1;
          if (life <= 0) {
            return {
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              size: Math.random() * 5 + 2,
              color: Math.random() > 0.5 ? '#6366f1' : '#0ea5e9',
              vx: (Math.random() - 0.5) * 1,
              vy: (Math.random() - 0.5) * 1,
              life: Math.random() * 100 + 100,
            };
          }
          
          return {
            ...particle,
            x,
            y,
            vx: newVx * 0.99, // Add some friction
            vy: newVy * 0.99,
            life,
          };
        })
      );
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mousePosition]);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-[5]">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life / 200,
            filter: `blur(${Math.random() * 2}px)`,
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth) * 2 - 1,
      y: -(clientY / innerHeight) * 2 + 1,
    });
  };

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={handleMouseMove}
      className="h-screen relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a1f35] to-[#1f2937]"
        animate={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(99, 102, 241, 0.15), transparent 50%)`
        }}
      />

      {/* Add Glowing Ring Effect */}
      {/* <GlowingRing /> */}

      {/* Add Interactive Particles */}
      <InteractiveParticles mousePosition={mousePosition} />

      {/* Floating Tech Icons with enhanced glow */}
      <FloatingIcons />

      {/* 3D Canvas with enhanced lighting */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight
            position={[0, 5, 0]}
            intensity={0.5}
            angle={0.5}
            penumbra={1}
            color="#0ea5e9"
          />
          
          {/* Enhanced Background Stars */}
          <Stars
            radius={100}
            depth={50}
            count={7000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          {/* Spaceship with enhanced glow */}  

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <AnimatedText />
        </Canvas>
      </div>

      {/* Content with enhanced visual effects */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center mt-[400px]">
        <div className="text-center space-y-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
            <DynamicSubtitle />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center mt-8"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">View Projects</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9] to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-indigo-400 rounded-full text-indigo-400 font-semibold hover:bg-indigo-400/10 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Me</span>
              <motion.div
                className="absolute inset-0 bg-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              <div className="absolute inset-0 bg-indigo-400 blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Enhanced Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <div className="w-6 h-10 border-2 border-indigo-400 rounded-full flex justify-center relative group">
              <div className="w-1 h-3 bg-indigo-400 rounded-full mt-2 animate-bounce" />
              <motion.div
                className="absolute inset-0 border-2 border-indigo-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="absolute inset-0 border-2 border-indigo-400 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
