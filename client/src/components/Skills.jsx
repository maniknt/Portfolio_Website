import "../styles/Skills.css";

function Skills() {
  return (
    <section className="skills">

      <h2>My Skills</h2>

      <div className="skill">

        <p>HTML</p>

        <div className="progress">
          <div className="html"></div>
        </div>

      </div>

      <div className="skill">

        <p>CSS</p>

        <div className="progress">
          <div className="css"></div>
        </div>

      </div>

      <div className="skill">

        <p>JavaScript</p>

        <div className="progress">
          <div className="js"></div>
        </div>

      </div>

      <div className="skill">

        <p>React</p>

        <div className="progress">
          <div className="react"></div>
        </div>

      </div>

    </section>
  );
}

export default Skills;