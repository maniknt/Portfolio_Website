import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="projects" id="projects">
      <h2>My Projects</h2>

      <div className="projects-container">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="project-buttons">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
              >
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;


