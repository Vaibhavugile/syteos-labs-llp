// src/App.jsx
import Hero from "./components/Hero"
import Services from "./components/services/Services"
import ProjectsShowcase from "./components/projects/ProjectsShowcase"
import Testimonials from "./components/Testimonials"
import Header from "./components/Header"
import ContactUs from  "./components/ContactSection"
import TeamSection from "./components/TeamSection"
import ProcessSection from "./components/ProcessSection"
import "./App.css"

export default function App() {
  return (
    <>
      <Header />
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
    <Testimonials/>
  </div>
   <ContactUs />
   <TeamSection />
   <ProcessSection />

  

  
    </> 
  )
}
