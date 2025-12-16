// src/App.jsx
import { useEffect, useState } from "react"
import Hero from "./components/Hero"
import Services from "./components/services/Services"
import ProjectsShowcase from "./components/projects/ProjectsShowcase"
import Testimonials from "./components/Testimonials"
import Header from "./components/Header"
import ContactUs from "./components/ContactSection"
import TeamSection from "./components/TeamSection"
import ProcessSection from "./components/ProcessSection"
import "./App.css"
import "./components/avatarPreload"

export default function App() {
  const [theme, setTheme] = useState("dark")

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }, [])

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="section-shell">
        <Hero />
      </div>

      <div className="section-shell">
        <Services />
      </div>

      <div className="section-shell">
        <ProjectsShowcase />
      </div>

      <div className="section-shell">
        <Testimonials />
      </div>

      <ContactUs />
      <TeamSection />
      <ProcessSection />
    </>
  )
}
