import "./projects-showcase.css"

const PROJECTS = [
  {
    title: "DOR-DressOnRent",
    type: "web",
    media: "/projects/web1.mp4",
  },
  {
    title: "Call Leads App",
    type: "app",
    media: "/projects/app1.mp4",
  },
  {
    title: "Dignostic Lab Landing",
    type: "web",
    media: "/projects/web2.mp4",
  },
  {
    title: "Attendence App",
    type: "app",
    media: "/projects/app2.mp4",
  },
  {
    title: "KiyuZiyu-Jewellery Website",
    type: "web",
    media: "/projects/kiyuziyu.mp4",
  },
  {
    title: "Mytennant-Flatmate Finding App",
    type: "app",
    media: "/projects/app3.mp4",
  },
  {
    title: "Artha-Billing Software Landing",
    type: "web",
    media: "/projects/web9.mp4",
  },
  {
    title: "Restaurent Billing App",
    type: "app",
    media: "/projects/app4.mp4",
  },
   {
    title: "Borezy - Renting management website",
    type: "web",
    media: "/projects/web5.mp4",
  },
   {
    title: "BookMyMedicare",
    type: "web",
    media: "/projects/web6.mp4",
  },
   {
    title: "Call Leads CRM - one stop solution for the call leads management",
    type: "web",
    media: "/projects/web7.mp4",
  },
   {
    title: "Perfume Story Web",
    type: "web",
    media: "/projects/web8.mp4",
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
