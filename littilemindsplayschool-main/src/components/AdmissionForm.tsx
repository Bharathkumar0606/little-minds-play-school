import { useState } from "react";

const AdmissionForm = () => {
  const [form, setForm] = useState({
    childName: "",
    age: "",
    parentName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("FORM SUBMITTED ✅", form);

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("Response:", data);
      alert("Admission submitted successfully ✅");

      // reset form
      setForm({
        childName: "",
        age: "",
        parentName: "",
        phone: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form ❌");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Admission Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="childName"
          placeholder="Child Name"
          value={form.childName}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="parentName"
          placeholder="Parent Name"
          value={form.parentName}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email (Optional)"
          value={form.email}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="address"
          placeholder="Address (Optional)"
          value={form.address}
          onChange={handleChange}
          rows={3}
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdmissionForm;