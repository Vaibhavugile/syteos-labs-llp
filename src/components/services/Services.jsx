import { motion } from "framer-motion"
import "./services.css"

const SERVICES = [
  {
    title: "Web Development",
    subtitle: "Modern & scalable websites",
    description:
      "High-performance, SEO-friendly, and responsive web solutions.",
    icon: "💻",
  },
  {
    title: "App Development",
    subtitle: "iOS & Android apps",
    description:
      "Native and cross-platform mobile applications built to scale.",
    icon: "📱",
  },
  {
    title: "UI / UX Design",
    subtitle: "Human-centered design",
    description:
      "Clean, intuitive interfaces focused on usability and conversions.",
    icon: "🎨",
  },
  {
    title: "Digital Marketing",
    subtitle: "Growth & visibility",
    description:
      "SEO, paid ads, and data-driven strategies that convert.",
    icon: "📈",
  },
  {
    title: "E-Commerce Solutions",
    subtitle: "Sell at scale",
    description:
      "Secure, fast, and conversion-optimized online stores.",
    icon: "🛒",
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Reliable infrastructure",
    description:
      "Scalable cloud setups, CI/CD pipelines, and deployments.",
    icon: "☁️",
  },
  {
    title: "API Development",
    subtitle: "Robust backend systems",
    description:
      "Secure, well-documented APIs for modern applications.",
    icon: "🔗",
  },
  {
    title: "Maintenance & Support",
    subtitle: "Long-term reliability",
    description:
      "Ongoing updates, monitoring, and performance optimization.",
    icon: "🛠️",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 0.84, 0.48, 1],
    },
  }),
}

export default function Services() {
  return (
    <section className="services-2d">
      <div className="services-container">
        {/* HEADER */}
        <div className="services-header">
          <h2>
            Our <span>Services</span>
          </h2>
          <p>
            We design, build, and scale digital products with precision,
            performance, and long-term vision.
          </p>
        </div>

        {/* GRID */}
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className="service-card-2d"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
            >
              <div className="service-icon-2d">{service.icon}</div>
              <h3>{service.title}</h3>
              <span className="service-sub-2d">{service.subtitle}</span>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
