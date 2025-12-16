import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { motion } from "framer-motion"
import AvatarCall from "./AvatarCall"
import "./contact.css"

export default function ContactUs() {
  return (
    <section className="contact"  id="contact">
      <div className="contact-wrapper">

        {/* ================= HEADER ================= */}
        <header className="contact-header">

          {/* DESKTOP HEADER */}
          <motion.div
            className="contact-header-desktop"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>
              Let’s <span>Talk</span>
            </h2>
            <p>Have a project in mind? We usually respond within 24 hours.</p>
          </motion.div>

          {/* MOBILE HEADER */}
          <div className="contact-header-mobile">
            <h2>
              Let’s <span>Talk</span>
            </h2>

            <div className="mobile-avatar">
              <Canvas camera={{ position: [0, 1.3, 4.8], fov: 32 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <Suspense fallback={null}>
                  <AvatarCall />
                </Suspense>
              </Canvas>
            </div>

            <p className="contact-subtitle">
              Have a project in mind? We usually respond within 24 hours.
            </p>
          </div>

        </header>

        {/* ================= CONTENT ================= */}
        <div className="contact-layout">

          {/* DESKTOP AVATAR */}
          <div className="contact-avatar">
            <Canvas camera={{ position: [0, 1.4, 4.6], fov: 28 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <Suspense fallback={null}>
                <AvatarCall />
              </Suspense>
            </Canvas>
          </div>

          {/* FORM */}
          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="contact-intro">
              <h3>Let’s talk about your idea</h3>
              <p>Your information stays private.</p>
            </div>

            <input placeholder="Your Name" />
            <input placeholder="Email Address" />
            <textarea placeholder="Tell us about your project" />
            <button type="submit">Send Message</button>

            <p className="contact-trust">🔒 We never share your data</p>
          </motion.form>

        </div>

      </div>
    </section>
  )
}
