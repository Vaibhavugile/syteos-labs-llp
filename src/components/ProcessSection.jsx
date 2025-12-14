import { motion } from "framer-motion"
import "./process.css"

const steps = [
  {
    step: "01",
    title: "Discover",
    desc: "We understand your goals, users, and constraints.",
    img: "/process/discover.png"
  },
  {
    step: "02",
    title: "Design",
    desc: "We craft intuitive, user-focused interfaces.",
    img: "/process/design.png"
  },
  {
    step: "03",
    title: "Build",
    desc: "We develop scalable, high-performance solutions.",
    img: "/process/build.png"
  },
  {
    step: "04",
    title: "Launch",
    desc: "We deploy, monitor, and support your product.",
    img: "/process/launch.png"
  }
]

export default function ProcessSection() {
  return (
    <section className="process">
      <div className="process-wrapper">

        {/* HEADER */}
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>
            How We <span>Work</span>
          </h2>
          <p>A clear, structured process from idea to launch.</p>
        </motion.div>

        {/* STEPS */}
        <div className="process-grid">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="process-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
