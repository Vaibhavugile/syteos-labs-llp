import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import AvatarCall from "./AvatarCall"
import "./contact.css"

export default function ContactUs() {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

  const sendEmail = (e) => {
    e.preventDefault()
    if (sending) return

    setSending(true)
    setStatus(null)

    emailjs
      .sendForm(
        "service_x8rzhj8",
        "template_pmqhrpc",
        e.target,
        "luhtzzNQjbqCoSwPb"
      )
      .then(
        () => {
          setStatus("success")
          setSending(false)
          e.target.reset()
        },
        () => {
          setStatus("error")
          setSending(false)
        }
      )
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-wrapper">

        {/* HEADER */}
        <motion.header
          className="contact-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>
            Let’s <span>Talk</span>
          </h2>
          <p>Have a project in mind? We usually respond within 24 hours.</p>
        </motion.header>

        {/* CONTENT */}
        <div className="contact-layout">

          {/* AVATAR */}
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
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="contact-intro">
              <h3>Let’s talk about your idea</h3>
              <p>Your information stays private.</p>
            </div>

            <input name="name" placeholder="Your Name" required />
            <input name="email" type="email" placeholder="Email Address" required />
            <textarea name="message" placeholder="Tell us about your project" required />

            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="contact-success">✅ Message sent successfully!</p>
            )}

            {status === "error" && (
              <p className="contact-error">❌ Failed to send message.</p>
            )}

            <p className="contact-trust">🔒 We never share your data</p>
          </motion.form>

        </div>
      </div>
    </section>
  )
}