import { motion } from 'framer-motion';

const skills = [
  "User Experience Design",
  "User Interface Design",
  "Interaction Design",
  "Design Systems",
  "Wireframing",
  "Prototyping",
  "User Research",
  "Usability Testing"
];

const tools = [
  "Figma",
  "Adobe XD",
  "Sketch",
  "Animetor",
  "InVision",
  "Photoshop",
  "Illustrator",
  "After Effects"
];

export function AboutSection() {
  return (
    <section className="relative py-20 md:py-32 bg-secondary/30">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Design Tool Icons */}
        <div className="absolute top-20 left-10 opacity-10">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 bg-accent-gradient rounded-lg flex items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
        </div>

        <div className="absolute top-40 right-20 opacity-10">
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2a1 1 0 0 0-2 0v2H8V2a1 1 0 0 0-2 0v2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z"/>
            </svg>
          </motion.div>
        </div>

        <div className="absolute bottom-32 left-1/4 opacity-10">
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </motion.div>
        </div>

        <div className="absolute top-60 left-1/3 opacity-10">
          <motion.div
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
          </motion.div>
        </div>

        <div className="absolute bottom-20 right-1/3 opacity-10">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </motion.div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent-gradient opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500 opacity-15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.span 
                className="text-sm tracking-widest text-accent-gradient uppercase mb-4 block animate-gradient-shift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About
              </motion.span>
              <motion.h2 
                className="text-accent-gradient-sunset animate-gradient-pulse mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Ashen Ravisara
              </motion.h2>
            </div>

            <motion.div 
              className="space-y-6 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                ✨ With over 2 years of experience and 15+ successful projects, I specialize in 
                crafting seamless digital experiences across FinTech, eCommerce, SaaS platforms, 
                admin panels, and other commercial systems. Whether I'm working solo as a freelancer 
                or collaborating with teams at CodeLantic, my focus is always on delivering clean, 
                user-centric, and scalable design solutions.
              </p>
              <p className="text-muted-foreground">
                👨‍💻 Currently at CodeLantic (Pvt.) Ltd., I work as an Associate UI/UX Designer, 
                contributing to diverse UI projects and collaborating closely with developers and 
                stakeholders to bring meaningful interfaces to life. I also lead freelance projects, 
                handling everything from strategy to execution.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center space-x-4"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg shadow-accent/25 bg-gradient-to-br from-accent-gradient/20 to-purple-600/20 p-0.5">
                <img 
                  src="/public/images/AR.jpg" 
                  alt="Ashen Ravisara Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <p className="font-medium text-foreground">Ashen Ravisara</p>
                <p className="text-muted-foreground text-sm">UI/UX Designer | Freelancer</p>
              </div>
            </motion.div>

            {/* Experience Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-foreground/10"
            >
              <div className="text-left">
                <div className="text-3xl font-black text-accent-gradient mb-2">2+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-black text-accent-gradient mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <motion.h3 
                className="text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Expertise
              </motion.h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="p-4 bg-foreground/5 backdrop-blur-sm rounded-lg border border-foreground/10 hover:border-accent/30 transition-all duration-300 cursor-pointer group"
                  >
                    <p className="text-sm font-medium text-foreground group-hover:text-accent-gradient transition-colors duration-300">{skill}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.h3 
                className="text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Tools &amp; Technologies
              </motion.h3>
              <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {tools.map((tool, index) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-accent-gradient/10 text-accent-gradient rounded-full text-sm border border-accent/20 hover:bg-accent-gradient/20 hover:border-accent/40 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                  >
                    {tool}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Current Role Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-6 bg-accent-gradient/5 backdrop-blur-sm rounded-xl border border-accent/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-accent-gradient rounded-full animate-pulse"></div>
                <h4 className="font-semibold text-foreground">Currently At</h4>
              </div>
              <p className="text-accent-gradient font-medium">CodeLantic (Pvt.) Ltd.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Contributing to diverse UI projects and collaborating with cross-functional teams
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}