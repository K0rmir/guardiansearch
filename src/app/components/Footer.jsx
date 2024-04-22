import "@/styles/Footer.css";
import "primeicons/primeicons.css";

export default function Footer() {
  return (
    <div className="footer">
      <p>Made by Kormir</p>
      <div className="footerLinks">
        <a href="https://www.linkedin.com/in/edd-stewart/">
          <i
            className="pi pi-linkedin"
            style={{fontSize: "1.5rem", color: "grey"}}></i>
        </a>

        <a href="https://github.com/K0rmir">
          <i
            className="pi pi-github"
            style={{fontSize: "1.5rem", color: "grey"}}></i>
        </a>
      </div>
    </div>
  );
}
