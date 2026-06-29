import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Hero.css";

function Hero() {
  const [resume, setResume] = useState("");

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/resume`
      );

      if (res.data && res.data.resume) {
        setResume(res.data.resume);
      }
    } catch (err) {
      console.error("Resume Fetch Error:", err);
    }
  };

  const handleDownload = () => {
    if (resume) {
      window.open(resume, "_blank");
    } else {
      alert("Resume not uploaded yet!");
    }
  };

  const handleContact = () => {
    const section = document.getElementById("contact");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hi, I'm Mohit 👋</h1>

        <h2>Full Stack Developer</h2>

        <p>
          I build responsive websites using React.js, Node.js,
          Express.js and MongoDB.
        </p>

        <div className="buttons">
          <button
            className="btn1"
            onClick={handleDownload}
          >
            Download Resume
          </button>

          <button
            className="btn2"
            onClick={handleContact}
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;