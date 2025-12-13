import "./projects-showcase.css"

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    type: "web",
    media: "/projects/web1.mp4",
  },
  {
    title: "Fitness App",
    type: "app",
    media: "/projects/app1.mp4",
  },
  {
    title: "Marketing Website",
    type: "web",
    media: "/projects/web2.jpg",
  },
  {
    title: "Finance App",
    type: "app",
    media: "/projects/app2.jpg",
  },
  {
    title: "SaaS Landing",
    type: "web",
    media: "/projects/web3.mp4",
  },
  {
    title: "Travel App",
    type: "app",
    media: "/projects/app3.mp4",
  },
]

export default function ProjectsShowcase() {
  return (
    <section className="projects-showcase">
      <div className="projects-header">
        <h2>
          Our <span>Projects</span>
        </h2>
        <p>
          A snapshot of web and mobile products we’ve designed and built.
        </p>
      </div>

      {/* SLIDER */}
      <div className="projects-slider">
        <div className="projects-track">
          {[...PROJECTS, ...PROJECTS].map((project, i) => (
            <div
              key={i}
              className={`project-card ${project.type}`}
            >
              <div className="project-media">
                {project.media.endsWith(".mp4") ? (
                  <video
                    src={project.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img src={project.media} alt={project.title} />
                )}
              </div>

              <span className="project-title">
                {project.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
