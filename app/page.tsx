// app/page.tsx

'use client'

import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaCertificate, FaProjectDiagram, FaEnvelope, FaGithub, FaLinkedin, FaBars, FaTimes, FaChevronRight, FaJava, FaHtml5, FaCss3Alt, FaJs, FaUser, FaWordpress, FaFigma, FaLinux, FaShieldAlt, FaCloud, FaUsers, FaLightbulb, FaClock } from 'react-icons/fa'
import { SiTailwindcss, SiCanva, SiAdobe } from 'react-icons/si'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Import your profile image
import profileImage from '../public/Image/Logo.png' // Adjust this path based on your actual file structure

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const technicalSkills = [
  { name: 'Java', icon: <FaJava className="w-6 h-6 text-red-500" />, level: 60 },
  { name: 'JavaScript', icon: <FaJs className="w-6 h-6 text-yellow-500" />, level: 35 },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-6 h-6 text-teal-500" />, level: 65 },
  { name: 'WordPress', icon: <FaWordpress className="w-6 h-6 text-blue-500" />, level: 70 },
  { name: 'HTML & CSS', icon: <><FaHtml5 className="w-6 h-6 text-orange-500" /><FaCss3Alt className="w-6 h-6 text-blue-500" /></>, level: 90 },
  { name: 'Git/GitHub', icon: <FaGithub className="w-6 h-6 text-gray-800" />, level: 50 },
  { name: 'Figma', icon: <FaFigma className="w-6 h-6 text-purple-500" />, level: 75 },
  { name: 'Canva', icon: <SiCanva className="w-6 h-6 text-blue-400" />, level: 85 },
  { name: 'System Troubleshooting', icon: <FaLinux className="w-6 h-6 text-gray-700" />, level: 80 },
  { name: 'Cybersecurity Basics', icon: <FaShieldAlt className="w-6 h-6 text-green-500" />, level: 70 },
  { name: 'Virtualization', icon: <FaCloud className="w-6 h-6 text-indigo-500" />, level: 65 },
  { name: 'Photoshop', icon: <SiAdobe className="w-6 h-6 text-blue-600" />, level: 70 },
]

const softSkills = [
  { name: 'Communication', icon: <FaUsers className="w-6 h-6 text-green-500" /> },
  { name: 'Problem Solving', icon: <FaLightbulb className="w-6 h-6 text-yellow-500" /> },
  { name: 'Adaptability', icon: <FaCloud className="w-6 h-6 text-blue-500" /> },
  { name: 'Team Collaboration', icon: <FaUsers className="w-6 h-6 text-purple-500" /> },
  { name: 'Time Management', icon: <FaClock className="w-6 h-6 text-teal-500" /> },
]

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = navItems.map(item => document.getElementById(item.id))
      const current = sections.find(section => {
        if (section) {
          const rect = section.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (current) {
        setActiveSection(current.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      {/* Minimal Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrollY > 20 ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-xl font-medium text-gray-800 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <span className="text-blue-600">Juan</span>.dev
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all ${
                    activeSection === item.id 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
                    />
                  )}
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium text-sm hover:bg-blue-700 transition-all shadow-sm"
              >
                Contact Me
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 text-left transition-all ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <main className="bg-white text-gray-800">
        {/* SECTION 1: HERO WITH PROFILE */}
        <section id="home" className="min-h-screen flex items-center px-6 pt-16">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariant}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-12"
            >
              {/* Profile Picture Section */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="relative"
              >
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                  {!imageError ? (
                    // Next.js Image component for optimized loading
                    <Image
                      src={profileImage}
                      alt="Juan's Profile"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 256px, 256px"
                      priority
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    // Fallback if image fails to load
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                      <FaUser className="w-32 h-32 text-blue-200" />
                    </div>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-blue-200 rounded-full"
                />
              </motion.div>

{/* Intro Text */}
<div className="flex-1 text-center lg:text-left">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
      Hi, I'm <span className="font-semibold text-blue-600">Juan</span>
    </h1>
    <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
      A passionate <span className="text-blue-600 font-medium">4th Year IT Student</span> seeking On-the-Job Training opportunities where I can apply my technical knowledge, enhance my practical skills, and gain real-world experience in web technologies and various areas of the IT industry.
    </p>
    
    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          // Create a temporary link element
          const link = document.createElement('a');
          link.href = '/certificates/Resume.pdf'; // Path to your PDF in public folder
          link.download = 'Juan_IT_Student_Resume.pdf'; // Default filename for download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow flex items-center gap-2"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        Download CV
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection('skills')}
        className="px-8 py-3 border border-gray-300 rounded-full font-medium hover:bg-gray-50 transition-all"
      >
        My Skills
      </motion.button>
    </div>

                  {/* Quick Stats */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.6 }}
  className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
>
  {[
    { label: 'OJT Availability', value: 'Immediate' },
    { label: 'Specialization', value: 'IT Solutions' },
    { label: 'Technical Area', value: 'System Analysis' },
    { label: 'Looking For', value: 'Experience' },
  ].map((stat, index) => (
    <div key={stat.label} className="text-center">
      <motion.p
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.2 + index * 0.1 }}
        className="text-xl font-semibold text-blue-600"
      >
        {stat.value}
      </motion.p>
      <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
    </div>
  ))}
</motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: ABOUT */}
        <section id="about" className="min-h-screen flex items-center px-6 py-20 bg-gray-50/50">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariant}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-12">
                <span className="font-semibold text-blue-600">About</span> Me
              </h2>
              
              <div className="space-y-8 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  As a 4th-year IT student, I'm eager to transition from academic learning to practical application. While I have built a foundation through coursework and personal projects, I recognize that real-world experience is invaluable for professional growth.
                </p>
                
                <p>
                  My journey in IT has equipped me with technical skills ranging from programming in Java to web development with modern tools. However, I'm not just looking for any opportunity I'm seeking an OJT placement where I can actively contribute, learn from experienced professionals, and understand how theoretical concepts apply in actual business environments.
                </p>
                
                <p>
                  I believe that hands-on experience is the best teacher, and I'm excited about the prospect of applying my classroom knowledge to solve real problems, collaborate with industry professionals, and gain insights that can only come from working in a professional IT setting.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FaCode className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-semibold">What I'm Looking For</h3>
                </div>
                <p className="text-gray-600">
                  An OJT opportunity where I can contribute to real projects, learn industry best practices, and develop the practical skills needed to succeed as a professional in the IT industry.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: SKILLS */}
        <section id="skills" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariant}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light mb-4">
                  My <span className="font-semibold text-blue-600">Skills</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Technical abilities and soft skills I've developed through my academic journey
                </p>
              </div>
              
              {/* Technical Skills */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-8 text-center text-gray-700">Technical Skills</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technicalSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-blue-50">
                          {skill.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                            />
                          </div>
                          <p className="text-right text-sm text-gray-500 mt-1">{skill.level}%</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-2xl font-semibold mb-8 text-center text-gray-700">Soft Skills</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="p-3 rounded-lg bg-gray-50 mb-3">
                          {skill.icon}
                        </div>
                        <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: EXPERIENCE */}
        <section id="experience" className="min-h-screen flex items-center px-6 py-20 bg-gray-50/50">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariant}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light mb-4">
                  Academic <span className="font-semibold text-blue-600">Experience</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Project-based experience from my academic journey
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "System Analyst – Capstone Project",
                    period: "Nov 2024 - Oct 2025",
                    description: "Analyzed system requirements and worked with the team to design a web-based application for Greensync Garden. Created flowcharts, process diagrams, and documentation for system design. Conducted testing to ensure system functionality and usability. Coordinated with team members to solve technical challenges and meet project milestones.",
                    tags: ["System Analysis", "Web Development", "Team Collaboration", "Documentation"],
                    link: "https://greensync.garden/",
                  },
                  {
                    title: "Assistant Programmer – Unity Game Classroom Project",
                    period: "Aug - Nov 2025",
                    description: "Assisted in developing a game using Unity, collaborating with the main programmer and design team. Implemented basic scripts using C# and helped integrate features into the game environment. Conducted testing and debugging to ensure smooth gameplay and functionality. Coordinated with team members to troubleshoot technical issues and optimize code performance.",
                    tags: ["Unity", "C#", "Game Development", "Teamwork", "Debugging"],
                  },
                ].map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-8"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200" />
                    <div className="absolute left-[-4px] top-0 w-3 h-3 rounded-full bg-blue-500" />
                    
                    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 ml-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{exp.description}</p>
                      {exp.link && (
                        <a 
                          href={exp.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
                        >
                          <FaChevronRight className="w-3 h-3 mr-2" />
                          View Project: {exp.link}
                        </a>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: PROJECTS & CERTIFICATES */}
        <section id="projects" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariant}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light mb-4">
                  <span className="font-semibold text-blue-600">Project</span> & Certificates
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our capstone project and academic certifications
                </p>
              </div>

              {/* Capstone Project */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-8 text-center text-gray-700">Capstone Project</h3>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                        Greensync Garden - Web Application
                      </h3>
                      <p className="text-gray-600 mb-6">
                        A comprehensive web-based system designed to streamline garden management operations. 
                        This capstone project demonstrates my ability to work in a team, analyze system requirements, 
                        and contribute to the development of a functional web application.
                      </p>
                      <a 
                        href="https://greensync.garden/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg"
                      >
                        <span>View Live Project</span>
                        <FaChevronRight className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" />
                      </a>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                        <div className="text-center">
                          <FaProjectDiagram className="w-16 h-16 text-green-500 mx-auto mb-4" />
                          <p className="text-gray-700 font-medium">Web-based Garden Management System</p>
                          <p className="text-sm text-gray-500 mt-2">Click the link above to explore the live application</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

                           {/* Certificates */}
              <div>
                <h3 className="text-2xl font-semibold mb-8 text-center text-gray-700">Certificates</h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {[
                    {
                      title: "Java Fundamentals",
                      issuer: "Oracle Academy",
                      date: "June 24, 2023",
                      icon: <FaJava className="w-8 h-8 text-red-500" />,
                      description: "Completed comprehensive Java programming fundamentals course covering object-oriented programming, data structures, control flow, and basic application development using Java.",
                      file: "JavaFundamentals.pdf",
                    },
                    {
                      title: "Systems Administration",
                      issuer: "ICT Courseware Development",
                      date: "June 24, 2023", 
                      icon: <FaLaptopCode className="w-8 h-8 text-blue-500" />,
                      description: "Completed systems administration course covering server management, network configuration, system maintenance, and IT infrastructure fundamentals.",
                      file: "SystemAdmin.pdf",
                    },
                  ].map((cert, index) => (
                    <motion.div
                      key={cert.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-gray-50">
                          {cert.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-2">{cert.title}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                              {cert.date}
                            </span>
                          </div>
                        </div>
                        <FaCertificate className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-sm text-gray-600 mt-3 mb-4 leading-relaxed">
                        {cert.description}
                      </p>
                      
                      {/* Download Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          // Create a temporary link to download the file
                          const link = document.createElement('a');
                          link.href = `/certificates/${cert.file}`; // Assuming files are in /public/certificates/
                          link.download = `${cert.title.replace(/\s+/g, '_')}_Certificate.pdf`;
                          link.click();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-all group-hover:bg-blue-100"
                      >
                        <svg 
                          className="w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                          />
                        </svg>
                        <span>Download Certificate</span>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
                
                {/* Certificate Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 text-center max-w-xl mx-auto"
                >
                  <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full">
                    <FaLightbulb className="w-5 h-5 text-gray-500" />
                    <p className="text-sm text-gray-600">
                      Continuously expanding my knowledge in information technology through hands-on learning and professional certifications.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: CONTACT */}
<section id="contact" className="min-h-screen flex items-center px-6 py-20 bg-gray-50/50">
  <div className="max-w-4xl mx-auto w-full">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariant}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className="inline-block p-4 rounded-full bg-blue-100 mb-8">
        <FaEnvelope className="w-12 h-12 text-blue-600" />
      </div>
      
      <h2 className="text-3xl md:text-4xl font-light mb-6">
        Let's <span className="font-semibold text-blue-600">Connect</span>
      </h2>
      
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        I'm actively seeking On-the-Job Training opportunities and would love to connect 
        with companies looking for dedicated IT students ready to learn and contribute.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
        <motion.a
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          href="mailto:your.juanromulo016@gmail.com"
          className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
        >
          <FaEnvelope className="w-8 h-8 text-blue-600 mb-4 mx-auto group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-800 block mb-2">Email</span>
          <p className="text-gray-600 text-sm">juanromulo016@gmail.com</p>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/RMLDevX"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
        >
          <FaGithub className="w-8 h-8 text-gray-800 mb-4 mx-auto group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-800 block mb-2">GitHub</span>
          <p className="text-gray-600 text-sm">@RMLDevX</p>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.linkedin.com/in/juan-gabriel-romulo-5aa097395/"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
        >
          <FaLinkedin className="w-8 h-8 text-blue-700 mb-4 mx-auto group-hover:scale-110 transition-transform" />
          <span className="font-medium text-gray-800 block mb-2">LinkedIn</span>
          <p className="text-gray-600 text-sm">Juan Romulo - IT Student</p>
        </motion.a>
      </div>

      <div className="pt-8 border-t border-gray-200">
        <p className="text-gray-500">
         Ready to Learn | Eager to Contribute | Committed to Growth
        </p>
        <p className="mt-2 text-sm text-gray-400">
          © {new Date().getFullYear()} Juan. All rights reserved.
        </p>
      </div>
    </motion.div>
  </div>
</section>
      </main>
    </>
  )
}