import React, { useState } from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: '💻',
    skills: [
      { name: 'React.js', level: 90, description: 'Building modern and responsive user interfaces' },
      { name: 'Next.js', level: 85, description: 'Server-side rendering and static site generation' },
      { name: 'TypeScript', level: 85, description: 'Type-safe JavaScript development' },
      { name: 'Tailwind CSS', level: 90, description: 'Utility-first CSS framework' },
      { name: 'Redux', level: 80, description: 'State management for large applications' }
    ]
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 85, description: 'Server-side JavaScript runtime' },
      { name: 'Express.js', level: 85, description: 'Web application framework' },
      { name: 'Python', level: 80, description: 'General-purpose programming' },
      { name: 'Django', level: 75, description: 'High-level Python web framework' },
      { name: 'RESTful APIs', level: 90, description: 'API design and implementation' }
    ]
  },
  {
    title: 'Database & DevOps',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 85, description: 'NoSQL database management' },
      { name: 'PostgreSQL', level: 80, description: 'Relational database management' },
      { name: 'Docker', level: 75, description: 'Containerization and deployment' },
      { name: 'AWS', level: 70, description: 'Cloud infrastructure and services' },
      { name: 'CI/CD', level: 75, description: 'Automated deployment pipelines' }
    ]
  },
  {
    title: 'Tools & Others',
    icon: '🛠️',
    skills: [
      { name: 'Git', level: 90, description: 'Version control and collaboration' },
      { name: 'Webpack', level: 75, description: 'Module bundling and optimization' },
      { name: 'Jest', level: 80, description: 'JavaScript testing framework' },
      { name: 'Figma', level: 75, description: 'UI/UX design and prototyping' },
      { name: 'Agile/Scrum', level: 85, description: 'Project management methodology' }
    ]
  }
];

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0].title);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <motion.section
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
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#0ea5e9] mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different domains.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.title}
              onClick={() => setSelectedCategory(category.title)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.title
                  ? 'bg-gradient-to-r from-indigo-500 to-[#0ea5e9] text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <span>{category.icon}</span>
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="max-w-6xl mx-auto"
        >
          {skillCategories
            .filter(category => category.title === selectedCategory)
            .map(category => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-indigo-400 mb-2">{skill.name}</h3>
                        <p className="text-gray-300 text-sm">{skill.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-400">Proficiency</span>
                          <span className="text-sm text-indigo-400">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-[#0ea5e9] rounded-full"
                          />
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-[#0ea5e9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
                        animate={{
                          opacity: hoveredSkill === skill.name ? 1 : 0
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
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

export default Skills;
