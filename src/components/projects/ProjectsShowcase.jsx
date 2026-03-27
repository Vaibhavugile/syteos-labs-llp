import "./projects-showcase.css"

const PROJECTS = [
  {
    title: "DOR-DressOnRent",
    type: "web",
    media: "/projects/web1.webm",
  },
  {
    title: "Call Leads App",
    type: "app",
    media: "/projects/app1.webm",
  },
  {
    title: "Dignostic Lab Landing",
    type: "web",
    media: "/projects/web2.webm",
  },
  {
    title: "Attendence App",
    type: "app",
    media: "/projects/app2.webm",
  },
  {
    title: "KiyuZiyu-Jewellery Website",
    type: "web",
    media: "/projects/kiyuziyu.webm",
  },
  {
    title: "Mytennant-Flatmate Finding App",
    type: "app",
    media: "/projects/app3.webm",
  },
  {
    title: "Artha-Billing Software Landing",
    type: "web",
    media: "/projects/web9.webm",
  },
  {
    title: "Restaurent Billing App",
    type: "app",
    media: "/projects/app4.webm",
  },
   {
    title: "Borezy - Renting management website",
    type: "web",
    media: "/projects/web5.webm",
  },
   {
    title: "BookMyMedicare",
    type: "web",
    media: "/projects/web6.webm",
  },
   {
    title: "Call Leads CRM - one stop solution for the call leads management",
    type: "web",
    media: "/projects/web7.webm",
  },
   {
    title: "Perfume Story Web",
    type: "web",
    media: "/projects/web8.webm",
  },
]

export default function ProjectsShowcase() {
 return (
  <section className="projects-showcase" id="projects">
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
        {PROJECTS.map((project, i) => (
          <div key={i} className={`project-card ${project.type}`}>
            <div className="project-media">
              {project.media.endsWith(".webm") ? (
                <video
                  src={project.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  loading="lazy"
                />
              ) : (
                <img
                  src={project.media}
                  alt={project.title}
                  loading="lazy"
                />
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
