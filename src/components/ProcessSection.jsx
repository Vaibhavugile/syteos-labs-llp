import { motion } from "framer-motion"
import { useEffect } from "react"
import "./process.css"

const steps = [
  {
    step: "01",
    title: "Discover",
    desc: "We understand your goals, users, and constraints.",
    img: "/process/discover.png",
  },
  {
    step: "02",
    title: "Design",
    desc: "We craft intuitive, user-focused interfaces.",
    img: "/process/design.png",
  },
  {
    step: "03",
    title: "Build",
    desc: "We develop scalable, high-performance solutions.",
    img: "/process/build.png",
  },
  {
    step: "04",
    title: "Launch",
    desc: "We deploy, monitor, and support your product.",
    img: "/process/launch.png",
  },
]

export default function ProcessSection() {

  /* ----------------------------------
     3D TILT + GLOW
  ---------------------------------- */

  useEffect(() => {
    const cards = document.querySelectorAll(".process-card")

    const handlers = []

    cards.forEach(card => {

      const move = e => {
        const rect = card.getBoundingClientRect()

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const rx = ((y / rect.height) - 0.5) * -14
        const ry = ((x / rect.width) - 0.5) * 14

        const glowX = (x / rect.width) * 100
        const glowY = (y / rect.height) * 100

        card.style.setProperty("--rx", `${rx}deg`)
        card.style.setProperty("--ry", `${ry}deg`)
        card.style.setProperty("--x", `${glowX}%`)
        card.style.setProperty("--y", `${glowY}%`)
      }

      const leave = () => {
        card.style.setProperty("--rx", "0deg")
        card.style.setProperty("--ry", "0deg")
        card.style.setProperty("--x", "50%")
        card.style.setProperty("--y", "50%")
      }

      card.addEventListener("mousemove", move)
      card.addEventListener("mouseleave", leave)

      handlers.push({ card, move, leave })
    })

    return () => {
      handlers.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move)
        card.removeEventListener("mouseleave", leave)
      })
    }
  }, [])

  /* ----------------------------------
     UI
  ---------------------------------- */

  return (
    <section className="process" id="process">

      <div className="process-wrapper">

        {/* HEADER */}
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >
          <h2>
            How We <span>Work</span>
          </h2>
          <p>A clear, structured process from idea to launch.</p>
        </motion.div>

        {/* GRID */}
        <div className="process-grid">

          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="process-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .7,
                delay: .2 + i * .12,
              }}
              viewport={{ once: true }}
            >

              <div className="process-avatar">
                <img src={item.img} alt={item.title} />
              </div>

              <div className="process-step">{item.step}</div>

              <h4>{item.title}</h4>
              <p>{item.desc}</p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}