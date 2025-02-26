import React, { useState, useContext, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MouseContext } from '../App';

const Contact = () => {
  const { mousePosition } = useContext(MouseContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const contactRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (contactRef.current) {
      setDimensions({
        width: contactRef.current.offsetWidth,
        height: contactRef.current.offsetHeight
      });
    }
    
    const handleResize = () => {
      if (contactRef.current) {
        setDimensions({
          width: contactRef.current.offsetWidth,
          height: contactRef.current.offsetHeight
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'arpit.rajput871@gmail.com',
      link: 'mailto:arpit.rajput871@gmail.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+919399588708',
      link: 'tel:+919399588708'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Bhopal, MP',
      link: 'https://maps.google.com'
    }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/ARPIT871', icon: '💻' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/arpit-rajput-7420b1217/', icon: '👔' },
    { name: 'Twitter', url: 'https://twitter.com/arpitrajput7828', icon: '🐦' },
    { name: 'Instagram', url: 'https://instagram.com/arpit871', icon: '📸' }
  ];

  // Mouse-following gradient component
  const MouseGradient = () => {
    const gradientControls = useAnimation();
    
    useEffect(() => {
      gradientControls.start({
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 25%)`,
        transition: { duration: 0.3 }
      });
    }, [mousePosition]);
    
    return (
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        animate={gradientControls}
      />
    );
  };

  return (
    <motion.section
      ref={contactRef}
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
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you. Send me a message and I'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information with mouse interaction */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              y: calculateParallax(0.3).y
            }}
            transition={{ 
              x: { duration: 0.8, delay: 0.2 },
              y: { type: "spring", damping: 25 }
            }}
            className="space-y-8"
          >
            {/* Contact Cards with 3D effect */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                // Calculate card-specific parallax effect
                const cardParallax = {
                  x: calculateParallax(0.5 + index * 0.2).x * (index % 2 === 0 ? 1 : -1),
                  y: calculateParallax(0.5 + index * 0.2).y * (index % 2 === 0 ? 1 : -1)
                };
                
                return (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      rotateX: hoveredCard === info.title ? 5 : 0,
                      rotateY: hoveredCard === info.title ? 5 : 0,
                      z: hoveredCard === info.title ? 20 : 0,
                      ...cardParallax
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      rotateX: { type: "spring", stiffness: 100, damping: 15 },
                      rotateY: { type: "spring", stiffness: 100, damping: 15 },
                      z: { type: "spring", stiffness: 200, damping: 20 }
                    }}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setHoveredCard(info.title)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="block p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-700/50 relative"
                    style={{ 
                      transformStyle: "preserve-3d",
                      perspective: "1000px"
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.span 
                        className="text-2xl"
                        animate={{
                          rotateY: hoveredCard === info.title ? [0, 360] : 0
                        }}
                        transition={{
                          duration: 1,
                          ease: "easeInOut"
                        }}
                      >
                        {info.icon}
                      </motion.span>
                      <div>
                        <h3 className="text-lg font-semibold text-indigo-400">{info.title}</h3>
                        <p className="text-gray-300">{info.value}</p>
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      animate={{
                        boxShadow: hoveredCard === info.title ? 
                          "0 0 20px 2px rgba(99, 102, 241, 0.3)" : 
                          "0 0 0px 0px rgba(99, 102, 241, 0)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links with magnetic effect */}
            <div>
              <h3 className="text-2xl font-semibold text-indigo-400 mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  // Calculate distance from mouse for magnetic effect
                  const socialRef = useRef(null);
                  const [socialPos, setSocialPos] = useState({ x: 0, y: 0 });
                  
                  useEffect(() => {
                    if (socialRef.current) {
                      const rect = socialRef.current.getBoundingClientRect();
                      setSocialPos({
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                      });
                    }
                  }, [dimensions]);
                  
                  // Calculate magnetic pull
                  const dx = mousePosition.x - socialPos.x;
                  const dy = mousePosition.y - socialPos.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  const magnetStrength = Math.min(100 / (distance + 1), 15);
                  
                  // Direction vector
                  const directionX = dx / (distance + 1);
                  const directionY = dy / (distance + 1);
                  
                  return (
                    <motion.a
                      ref={socialRef}
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: 1,
                        x: hoveredSocial === social.name ? directionX * magnetStrength : 0,
                        y: hoveredSocial === social.name ? directionY * magnetStrength : 0,
                        scale: hoveredSocial === social.name ? 1.2 : 1
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.5 + index * 0.1,
                        x: { type: "spring", stiffness: 300, damping: 20 },
                        y: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      whileHover={{ scale: 1.1 }}
                      onHoverStart={() => setHoveredSocial(social.name)}
                      onHoverEnd={() => setHoveredSocial(null)}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-[#0ea5e9] text-white text-xl hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 relative"
                    >
                      {social.icon}
                      
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: hoveredSocial === social.name ? 
                            "0 0 20px 5px rgba(99, 102, 241, 0.5)" : 
                            "0 0 0px 0px rgba(99, 102, 241, 0)"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form with mouse interaction */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              y: calculateParallax(0.2).y * -1 // Move in opposite direction
            }}
            transition={{ 
              x: { duration: 0.8, delay: 0.4 },
              y: { type: "spring", damping: 25 }
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-indigo-400 text-gray-300 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-indigo-400 text-gray-300 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-indigo-400 text-gray-300 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-indigo-400 text-gray-300 backdrop-blur-sm resize-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                  />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 relative overflow-hidden ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-500 to-[#0ea5e9] hover:shadow-lg hover:shadow-indigo-500/20'
                }`}
              >
                <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                
                {/* Button animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9] to-indigo-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 bg-gradient-to-r from-indigo-500 to-[#0ea5e9] blur-xl"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
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

export default Contact;
