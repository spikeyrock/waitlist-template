"use client";
import { useState } from "react";

export default function Waitlist() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setMessage("Please fill out both fields.");
      return;
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Thank you for joining our waitlist!");
        setFormData({ name: "", email: "" });
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || "Failed to join the waitlist.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center w-full max-w-md"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Join Waitlist
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
