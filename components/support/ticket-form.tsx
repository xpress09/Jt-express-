"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";

const categories = [
  "General Inquiry",
  "Tracking Issue",
  "Delivery Problem",
  "Refund Request",
  "Damaged Package",
  "Account Issue",
  "Other",
];

const priorities = ["Low", "Medium", "High", "Urgent"];

export default function TicketForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    trackingNumber: "",
    category: "",
    priority: "Medium",
    subject: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
          <Check className="h-7 w-7 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Ticket Submitted Successfully
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Your support ticket has been created. You will receive a confirmation
          email with your ticket ID. Our team typically responds within 2-4
          hours.
        </p>
        <p className="font-mono text-sm text-primary">
          Ticket ID: JT-{Math.random().toString(36).substring(2, 8).toUpperCase()}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              trackingNumber: "",
              category: "",
              priority: "Medium",
              subject: "",
              description: "",
            });
          }}
          className="mt-2 rounded-md border border-border bg-secondary px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
        >
          Submit Another Ticket
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5 md:p-6"
    >
      {/* Name and Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-sm font-medium text-foreground"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Tracking Number */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="trackingNumber"
          className="text-sm font-medium text-foreground"
        >
          Tracking Number{" "}
          <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="trackingNumber"
          name="trackingNumber"
          type="text"
          value={form.trackingNumber}
          onChange={handleChange}
          placeholder="JT..."
          className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Category and Priority */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="category"
            className="text-sm font-medium text-foreground"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            value={form.category}
            onChange={handleChange}
            className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="priority"
            className="text-sm font-medium text-foreground"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-foreground"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          placeholder="Brief description of your issue"
          className="h-11 rounded-md border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="description"
          className="text-sm font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          value={form.description}
          onChange={handleChange}
          placeholder="Please provide as much detail as possible about your issue..."
          className="rounded-md border border-input bg-background px-3 py-2.5 text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex h-12 items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Send className="h-4 w-4" />
        Submit Ticket
      </button>
    </form>
  );
}
