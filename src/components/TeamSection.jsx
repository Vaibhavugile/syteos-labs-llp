import { motion } from "framer-motion"
import "./team.css"

const team = [
  { name: "John Doe", role: "Founder & Lead Engineer", img: "/team/john.jpg" },
  { name: "Sarah Lee", role: "UI / UX Designer", img: "/team/sarah.jpg" },
  { name: "Michael Chen", role: "Frontend Developer", img: "/team/michael.jpg" },
  { name: "Emma Brown", role: "Product Manager", img: "/team/emma.jpg" }
]

export default function TeamSection() {
  return (
    <section className="team"  id="team">
      <div className="team-wrapper">

        {/* HEADER */}
        <motion.div
          className="team-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>
            Meet the <span>Team</span>
          </h2>
          <p>People behind the work you can trust.</p>
        </motion.div>

        {/* LAYOUT */}
        <div className="team-layout">

          {/* CENTER ILLUSTRATION */}
          <div className="team-center-visual">
            <img src="/team/typing.png" alt="Working illustration" />
            <span className="center-caption">Always building · Always creating</span>
          </div>

          {/* TEAM GRID */}
          <div className="team-circle-grid">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className={`team-circle-card offset-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="team-circle">
                  <span className="pulse-ring" />
                  <img src={member.img} alt={member.name} />
                </div>

                <h4>{member.name}</h4>
                <span className="role">{member.role}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
