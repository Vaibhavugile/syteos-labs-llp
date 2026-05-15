import "./footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* LEFT */}
        <div className="footer-left">
          <div className="footer-logo">
            <span>SYTEOS</span> LABS LLP
          </div>

          <p>
            Designing, building, and growing digital brands
            through technology and marketing.
          </p>

          <div className="footer-contact">
            <p>
              <strong>Address:</strong><br />
              Office No. 12, Tech Park,<br />
              Pune, Maharashtra, India
            </p>

            <p>
              <strong>Phone:</strong><br />
              +91 9876543210
            </p>

            <p>
              <strong>Email:</strong><br />
              hello@syteos.com
            </p>
          </div>
        </div>

        {/* CENTER */}
        <nav className="footer-nav">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* RIGHT */}
        <div className="footer-socials">
          <h4>Follow Us</h4>

          <a href="https://instagram.com" target="_blank">
            Instagram
          </a>

          <a href="https://linkedin.com" target="_blank">
            LinkedIn
          </a>

          <a href="https://twitter.com" target="_blank">
            Twitter / X
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SYTEOS LABS LLP.
        All rights reserved.
      </div>
    </footer>
  )
}