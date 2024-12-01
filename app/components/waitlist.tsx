"use client";

import { useState, useTransition } from "react";
import { addToWaitlist } from "../actions/saveEmail/route";

export default function Waitlist() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

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

    startTransition(async () => {
      try {
        const result = await addToWaitlist(formData); // Call the server action
        setMessage(result);
        setFormData({ name: "", email: "" });
      } catch (error: any) {
        setMessage(error.message || "An unexpected error occurred.");
      }
    });
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
        disabled={isPending}
        className={`px-6 py-3 rounded ${
          isPending ? "bg-gray-500" : "bg-blue-600"
        } text-white hover:bg-blue-700`}
      >
        {isPending ? "Submitting..." : "Join Waitlist"}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
