// src/App.jsx

import Hero from "./components/Hero"
import Services from "./components/services/Services"
import ProcessSection from "./components/ProcessSection"
import ProjectsShowcase from "./components/projects/ProjectsShowcase"
import Testimonials from "./components/Testimonials"
import TeamSection from "./components/TeamSection"
import ContactUs from "./components/ContactSection"
import Header from "./components/Header"

import "./App.css"
import "./components/avatarPreload" // 🔥 keep avatar preload
import Footer from "./components/Footer"
export default function App() {
  return (
    <>
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= HERO ================= */}
      <section className="section-shell">
        <Hero />
      </section>
       <section className="section-shell">
        <ProcessSection />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="section-shell">
        <Services />
      </section>

      {/* ================= PROCESS ================= */}
     

      {/* ================= PROJECTS ================= */}
      <section className="section-shell">
        <ProjectsShowcase />
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section-shell">
        <Testimonials />
      </section>

      {/* ================= TEAM ================= */}
      <section className="section-shell">
        <TeamSection />
      </section>

      {/* ================= CONTACT ================= */}
      <ContactUs />

      <Footer />
    </>
  )
}
