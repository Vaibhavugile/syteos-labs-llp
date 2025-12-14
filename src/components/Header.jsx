import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./header.css"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="header">
        <div className="header-inner">

          {/* LOGO */}
          <div className="logo">
            <span>My</span>Studio
          </div>

          {/* DESKTOP NAV */}
          <nav className="nav-desktop">
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact" className="cta">
              Start Project
            </a>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            className={`hamburger ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 0.84, 0.48, 1] }}
          >
            <a onClick={() => setOpen(false)} href="#services">Services</a>
            <a onClick={() => setOpen(false)} href="#projects">Projects</a>
            <a onClick={() => setOpen(false)} href="#testimonials">Testimonials</a>
            <a onClick={() => setOpen(false)} href="#contact" className="cta">
              Start Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
