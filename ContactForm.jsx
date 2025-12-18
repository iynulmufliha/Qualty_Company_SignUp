import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    companyName: "",
    tradeType: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          email: "",
          contact: "",
          companyName: "",
          tradeType: "",
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
    <section className="px-6 pt-0 py-12 bg-white text-black">
      <div className="max-w-xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ff7a18 0%, #af00ff 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Contact Us
        </h2>

<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
  <input
    type="text"
    name="name"
    placeholder=" name "
    value={formData.name}
    onChange={handleChange}
    required
    className="w-full px-5 py-3 rounded-full border border-black bg-white text-black"
  />

  <input
    type="email"
    name="email"
    placeholder=" email"
    value={formData.email}
    onChange={handleChange}
    required
    className="w-full px-5 py-3 rounded-full border border-black bg-white text-black"
  />

  <input
    type="number"
    name="contact"
    placeholder=" contact"
    value={formData.contact}
    onChange={handleChange}
    required
    className="w-full px-5 py-3 rounded-full border border-black bg-white text-black"
  />

  <input
    type="text"
    name="companyName"
    placeholder=" company name"
    value={formData.companyName}
    onChange={handleChange}
    required
    className="w-full px-5 py-3 rounded-full border border-black bg-white text-black"
  />

  <div className="relative sm:col-span-2">
    <select
      name="tradeType"
      value={formData.tradeType}
      onChange={handleChange}
      required
      className="appearance-none w-full px-5 py-3 rounded-full border border-black bg-white text-black"
    >
      <option value="" disabled>
        Are you an importer or exporter?
      </option>
      <option value="Importer">Importer</option>
      <option value="Exporter">Exporter</option>
      <option value="Both">Both</option>
      <option value="Others">Others</option>
    </select>

    <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  <textarea
    name="message"
    placeholder=" message...."
    value={formData.message}
    onChange={handleChange}
    required
    rows="4"
    className="sm:col-span-2 w-full px-5 py-3 rounded-2xl border border-black bg-white text-black"
  />

  <button
    type="submit"
    className="sm:col-span-2 cursor-pointer w-full py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition"
  >
    Send Enquiry
  </button>
</form>


        {status && <p className="mt-4 text-center text-sm">{status}</p>}
      </div>
    </section>
  );
}
