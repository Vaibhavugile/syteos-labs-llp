// src/App.jsx

import { useEffect } from "react"

import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/services/Services"
import ProcessSection from "./components/ProcessSection"
import ProjectsShowcase from "./components/projects/ProjectsShowcase"
import Testimonials from "./components/Testimonials"
import TeamSection from "./components/TeamSection"
import ContactUs from "./components/ContactSection"
import Footer from "./components/Footer"

import "./App.css"
import "./components/avatarPreload" // keep avatar preload

export default function App() {

  /* ---------------------------------------
     GLOBAL SECTION FADE IN / OUT OBSERVER
  --------------------------------------- */
  useEffect(() => {
    const sections = document.querySelectorAll(".section")

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            entry.target.classList.remove("fading-out")
          } else {
            if (entry.target.classList.contains("visible")) {
              entry.target.classList.add("fading-out")
            }
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20% 0px"
      }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= HERO ================= */}
      {/* Hero manages its own animation */}
      <Hero />

      {/* ================= PROCESS ================= */}
      <section className="section-shell section">
        <ProcessSection />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="section-shell section">
        <Services />
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="section-shell section">
        <ProjectsShowcase />
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section-shell section">
        <Testimonials />
      </section>

      {/* ================= TEAM ================= */}
      <section className="section-shell section">
        <TeamSection />
      </section>

      {/* ================= CONTACT ================= */}
      <ContactUs />

      {/* ================= FOOTER ================= */}
      <Footer />
    </>
  )
}
