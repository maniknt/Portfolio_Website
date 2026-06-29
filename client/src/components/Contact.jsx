import { useState } from "react";
import axios from "axios";
import "../styles/Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        "import.meta.env.VITE_API_URL/api/contact",
        form
      );

      alert(res.data.message);

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact Me</h2>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          rows="6"
          placeholder="Enter Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}

export default Contact;