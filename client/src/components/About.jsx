import "../styles/About.css";

function About() {
  return (
    <section className="about">

      <div className="about-image">
        <img
          src="https://via.placeholder.com/300"
          alt="Profile"
        />
      </div>

      <div className="about-content">

        <h2>About Me</h2>

        <p>
          Hello! I'm Mohit, a passionate Full Stack Developer who loves
          building modern and responsive web applications.
        </p>

        <div className="info">

          <p><strong>Name:</strong> Mohit</p>

          <p><strong>Email:</strong> mohit@gmail.com</p>

          <p><strong>Education:</strong> BCA</p>

          <p><strong>Location:</strong> India</p>

        </div>

      </div>

    </section>
  );
}

export default About;