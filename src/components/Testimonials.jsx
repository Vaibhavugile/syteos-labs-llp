import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import AvatarPull from "./AvatarPull";
import "./testimonials.css";

const TESTIMONIALS = [
  {
    text: "Scalable architecture and on-time delivery. Highly recommended.",
    name: "Daniel Wong",
    role: "CTO, FinTech Labs",
  },
  {
    text: "From concept to launch, everything was smooth and transparent.",
    name: "Sofia Martinez",
    role: "CEO, Creativio",
  },
  {
    text: "The team delivered exactly what we needed. Clean UI and great communication.",
    name: "Rahul Sharma",
    role: "Founder, StartupX",
  },
  {
    text: "Our conversions increased significantly after launch.",
    name: "Ananya Patel",
    role: "Marketing Head, Growthify",
  },
];

export default function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="testimonials"  id="testimonials">
      <div className="testimonials-wrapper">

        {/* HEADER */}
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>
            Trusted by <span>growing teams</span>
          </h2>
          <p>
            We partner with startups and businesses worldwide to deliver
            high-quality digital products that perform.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="testimonials-container">

          {/* SLIDER */}
          <div className="testimonials-slider">
            <div className={`testimonials-track ${paused ? "paused" : ""}`}>
              {[...TESTIMONIALS, ...TESTIMONIALS].map((item, i) => (
                <div
                  className="testimonial-card"
                  key={i}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <p className="testimonial-text">“{item.text}”</p>
                  <span className="testimonial-name">{item.name}</span>
                  <span className="testimonial-role">{item.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AVATAR — ALWAYS MOUNTED */}
          <div className="testimonials-avatar">
            <Canvas camera={{ position: [0, 1.4, 4.4], fov: 30 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <Suspense fallback={null}>
                <AvatarPull paused={paused} />
              </Suspense>
            </Canvas>
          </div>

        </div>
      </div>
    </section>
  );
}
