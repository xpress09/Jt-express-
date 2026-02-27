"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    category: "Tracking & Delivery",
    questions: [
      {
        q: "How do I track my package?",
        a: "Go to our Track Package page and enter the tracking number provided in your shipping confirmation email. You will see real-time status updates, location on the map, and estimated delivery time.",
      },
      {
        q: "My tracking number is not working. What should I do?",
        a: "Please allow up to 24 hours after dispatch for tracking information to become available. If it still does not work, verify the number from your confirmation email or contact our support team.",
      },
      {
        q: "What are your delivery timeframes?",
        a: "Standard Shipping: 3-5 business days. Express Delivery: 1-2 business days. Same-Day Delivery: Available in select metro areas for orders placed before 10 AM.",
      },
      {
        q: "Can I change the delivery address after shipping?",
        a: "Address changes may be possible if the package has not yet departed the sorting facility. Please contact support immediately with your tracking number for assistance.",
      },
    ],
  },
  {
    category: "Payments & Refunds",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards, bank transfers, digital wallets (PayPal, GrabPay, LINE Pay), and cash-on-delivery in select areas.",
      },
      {
        q: "How do I request a refund?",
        a: "Submit a support ticket with the category 'Refund Request' and include your order/tracking number. Our team will review your case within 24-48 hours and process eligible refunds.",
      },
      {
        q: "My package was damaged. What are my options?",
        a: "Please file a damage claim within 48 hours of delivery. Include photos of the damage and your tracking number. All shipments include basic insurance coverage.",
      },
    ],
  },
  {
    category: "Account & Services",
    questions: [
      {
        q: "How do I schedule a pickup?",
        a: "Visit our website or mobile app, go to 'Schedule Pickup', enter the package details and preferred time window. Our courier will arrive within the selected time slot.",
      },
      {
        q: "Do you offer international shipping?",
        a: "Yes, we ship to over 50 countries worldwide. International rates depend on destination, weight, and dimensions. Use our online calculator for instant quotes.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-medium text-foreground">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all",
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        )}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <div className="flex flex-col gap-8">
      {faqData.map((category) => (
        <div key={category.category}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            {category.category}
          </h3>
          <div className="rounded-lg border border-border bg-card px-5">
            {category.questions.map((item) => (
              <FAQItem
                key={item.q}
                question={item.q}
                answer={item.a}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
