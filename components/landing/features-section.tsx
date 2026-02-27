"use client";

import {
  Truck,
  MapPin,
  Shield,
  Zap,
  BarChart3,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Express Delivery",
    description:
      "Same-day and next-day delivery with optimized routing algorithms that cut transit times by up to 40%.",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    description:
      "Live GPS tracking on an interactive map with push notifications at every status change and estimated arrival times.",
  },
  {
    icon: Shield,
    title: "Secure Handling",
    description:
      "End-to-end chain-of-custody verification with tamper-evident packaging and insurance coverage on every shipment.",
  },
  {
    icon: Zap,
    title: "Instant Quotes",
    description:
      "Get accurate shipping costs in seconds with our AI-powered pricing engine that accounts for weight, dimensions, and urgency.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive business insights with delivery performance metrics, cost analysis, and predictive demand forecasting.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Intelligent chatbot and live agent support available around the clock to resolve issues and answer questions instantly.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            Capabilities
          </span>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Built for the Future of Delivery
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Every feature designed to make logistics faster, more transparent,
            and customer-centric.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-card/80 md:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
