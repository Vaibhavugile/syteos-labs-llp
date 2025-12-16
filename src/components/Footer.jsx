import "./footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-left">
          <div className="footer-logo">
            <span>SYTEOS</span> LABS LLP
          </div>
          <p>
           Designing, building, and growing digital brands through technology and marketing.
          </p>
        </div>

        <nav className="footer-nav">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#projects">Projects</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </nav>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SYTEOS LABS LLP. All rights reserved.
      </div>
    </footer>
  )
}
