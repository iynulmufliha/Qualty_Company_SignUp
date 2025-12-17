import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    contact: "",
    businessType: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(`${BASE_URL}/contact/sendEnquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Enquiry sent successfully!");
        setFormData({
          name: "",
          companyName: "",
          email: "",
          contact: "",
          businessType: "",
          message: "",
        });
      } else {
        setStatus("Failed to send enquiry.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending enquiry.");
    }
  };

  return (
    <section className="px-6 py-12 bg-white text-black">
      <div className="max-w-xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ff7a18 0%, #af00ff 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 text-sm rounded border border-black bg-white text-black"
            />
            <input
              type="text"
              name="companyName"
              placeholder="Company"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full p-2 text-sm rounded border border-black bg-white text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 text-sm rounded border border-black bg-white text-black"
            />

            <input
              type="tel"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full p-2 text-sm rounded border border-black bg-white text-black"
            />

            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
              className="w-full p-2 text-sm rounded border border-black bg-white text-black sm:col-span-2"
            >
              <option value="" disabled>
                Exporter / Importer
              </option>
              <option value="Exporter">Exporter</option>
              <option value="Importer">Importer</option>
              <option value="Both">Both</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-2 text-sm rounded border border-black bg-white text-black"
          />

          <button
            type="submit"
            className="cursor-pointer w-full py-2 text-sm bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
          >
            Send Enquiry
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm font-medium">{status}</p>
        )}
      </div>
    </section>
  );
}
