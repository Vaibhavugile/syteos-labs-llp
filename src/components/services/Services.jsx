import { motion } from "framer-motion"
import "./services.css"

const SERVICES = [
  {
    title: "Web Development",
    desc: "High-performance websites built for speed, scale, and reliability.",
    img: "/services/web1.webp",
  },
  {
    title: "App Development",
    desc: "Modern mobile & web apps with intuitive UX and smooth performance.",
    img: "/services/app2.webp",
  },
  {
    title: "UI / UX Design",
    desc: "Design systems and experiences users actually enjoy using.",
    img: "/services/cyber1.webp",
  },
  {
    title: "SEO Optimization",
    desc: "Rank higher, attract the right traffic, and grow organically.",
    img: "/services/seo1.webp",
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven marketing strategies that convert and scale.",
    img: "/services/marketing1.webp",
  },
  {
    title: "Cloud Solutions",
    desc: "Secure, scalable cloud infrastructure built for growth.",
    img: "/services/cloud1.webp",
  },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services-container">

        {/* HEADER */}
        <motion.header
          className="services-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 0.84, 0.48, 1] }}
          viewport={{ once: true }}
        >
          <h2>
            Our <span>Services</span>
          </h2>
          <p>
            Everything you need to design, build, and scale modern digital products.
          </p>
        </motion.header>

        {/* GRID */}
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              className="service-card"
              style={{
                backgroundImage: `url(${service.img})`,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 0.84, 0.48, 1],
              }}
              viewport={{ once: true }}
            >
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
