import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [project, setProject] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    live: "",
  });

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [resume, setResume] = useState("");
  const [messages, setMessages] = useState([]);

 useEffect(() => {
  fetchProjects();
  fetchResume();
  fetchMessages();
}, []);

  // ==========================
  // Fetch Projects
  // ==========================
  const fetchProjects = async () => {
    try {
      const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/projects`
);
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Fetch Resume
  // ==========================
  const fetchResume = async () => {
    try {
      const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/resume`
);

      if (res.data) {
        setResume(res.data.resume);
      }
    } catch (err) {
      console.log(err);
    }
  };
   
   // ==========================
// Fetch Messages
// ==========================
const fetchMessages = async () => {
  try {
     const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/contact`
);

    setMessages(res.data);
  } catch (err) {
    console.log(err);
  }
};

// ==========================
// Delete Message
// ==========================
const deleteMessage = async (id) => {
  try {
    await axios.delete(
  `${import.meta.env.VITE_API_URL}/api/contact/${id}`
);

    alert("Message Deleted Successfully");

    fetchMessages();
  } catch (err) {
    console.log(err);
  }
};

  // ==========================
  // Handle Input
  // ==========================
  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Add / Update Project
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
       await axios.put(
  `${import.meta.env.VITE_API_URL}/api/projects/${editingId}`,
  project
);

        alert("Project Updated Successfully");

        setEditingId(null);
      } else {
         await axios.post(
  `${import.meta.env.VITE_API_URL}/api/projects`,
  project
);

        alert("Project Added Successfully");
      }

      setProject({
        title: "",
        description: "",
        image: "",
        github: "",
        live: "",
      });

      fetchProjects();

    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Delete Project
  // ==========================
  const deleteProject = async (id) => {
    try {
      await axios.delete(
  `${import.meta.env.VITE_API_URL}/api/projects/${id}`
);

      alert("Project Deleted Successfully");

      fetchProjects();

    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Edit Project
  // ==========================
  const editProject = (item) => {
    setProject({
      title: item.title,
      description: item.description,
      image: item.image,
      github: item.github,
      live: item.live,
    });

    setEditingId(item._id);
  };

  // ==========================
  // Save Resume
  // ==========================
  const saveResume = async () => {
    try {
      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/resume`,
  {
    resume,
  }
);

      alert("Resume Updated Successfully");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      <h1>Admin Dashboard</h1>

      <button
        onClick={logout}
        style={{
          background: "red",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        Logout
      </button>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={project.title}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={project.description}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            height: "120px",
          }}
        />

        <br /><br />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={project.image}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          value={project.github}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <input
          type="text"
          name="live"
          placeholder="Live Demo Link"
          value={project.live}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <button
          type="submit"
          style={{
            padding: "10px 25px",
            cursor: "pointer",
          }}
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>

      </form>

      <hr style={{ margin: "40px 0" }} />

      <h2>Resume</h2>

      <input
        type="text"
        placeholder="Resume PDF Link"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <br /><br />

      <button
        onClick={saveResume}
        style={{
          padding: "10px 25px",
        }}
      >
        Save Resume
      </button>

      <hr style={{ margin: "40px 0" }} />

      <h2>All Projects</h2>


      <hr style={{ margin: "40px 0" }} />

<h2>Contact Messages</h2>

{messages.length === 0 ? (
  <p>No Messages Found</p>
) : (
  messages.map((msg) => (
    <div
      key={msg._id}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>{msg.name}</h3>

      <p>
        <strong>Email:</strong> {msg.email}
      </p>

      <p>{msg.message}</p>

      <button
        onClick={() => deleteMessage(msg._id)}
        style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Delete Message
      </button>
    </div>
  ))
)}

      {projects.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.title}</h3>

          <p>{item.description}</p>

          <button
            onClick={() => editProject(item)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteProject(item._id)}
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}

export default Admin;