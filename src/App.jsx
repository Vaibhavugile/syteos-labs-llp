// src/App.jsx
import Hero from "./components/Hero"
import Services from "./components/services/Services"
import ProjectsShowcase from "./components/projects/ProjectsShowcase"
import "./App.css"

export default function App() {
  return (
    <>
      <div className="section-shell">
    <Hero />
  </div>
<div className="section-shell">
    <ProjectsShowcase />
  </div>
  <div className="section-shell">
    <Services />
  </div>

  
    </> 
  )
}
