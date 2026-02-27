"use client";

import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChat from "@/components/support/live-chat";
import FAQSection from "@/components/support/faq-section";
import TicketForm from "@/components/support/ticket-form";
import {
  MessageCircle,
  HelpCircle,
  FileText,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "chat", label: "Live Chat", icon: MessageCircle },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "ticket", label: "Support Ticket", icon: FileText },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<TabId>("chat");

  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-28">
        {/* Page header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            Customer Support
          </span>
          <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            How Can We Help?
          </h1>
          <p className="mt-3 max-w-md text-pretty text-muted-foreground">
            Get instant answers through our chatbot, browse our FAQ, or submit a
            support ticket for personalized assistance.
          </p>
        </div>

        {/* Contact cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Mail,
              title: "Email Us",
              value: "support@jtexpress.com",
              subtitle: "Response within 2-4 hours",
            },
            {
              icon: Phone,
              title: "Call Us",
              value: "+66 2 000 0000",
              subtitle: "Mon-Fri, 8AM-8PM",
            },
            {
              icon: Clock,
              title: "Support Hours",
              value: "24/7 Chat Support",
              subtitle: "Tickets: Business hours",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.title}</p>
                <p className="text-sm font-semibold text-foreground">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg border border-border bg-card p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-md py-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="min-h-[500px]">
          {activeTab === "chat" && (
            <div className="mx-auto max-w-2xl">
              <LiveChat />
            </div>
          )}
          {activeTab === "faq" && (
            <div className="mx-auto max-w-3xl">
              <FAQSection />
            </div>
          )}
          {activeTab === "ticket" && (
            <div className="mx-auto max-w-2xl">
              <TicketForm />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
