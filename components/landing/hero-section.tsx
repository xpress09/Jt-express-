"use client";

import { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Package } from "lucide-react";

const DeliveryScene = dynamic(
  () => import("@/components/three/delivery-scene"),
  { ssr: false }
);

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-primary/10" />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 opacity-70 md:opacity-100">
        <Suspense fallback={<SceneFallback />}>
          <DeliveryScene />
        </Suspense>
      </div>

      {/* Overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
          <span className="text-xs font-medium text-primary">
            Next Generation Logistics
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Unified{" "}
          <span className="text-primary">Logistics</span>
          <br />
          Platform
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Unlock unparalleled delivery performance with real-time tracking,
          intelligent routing, and digital-first customer experiences. Join the
          logistics revolution.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/tracking"
            className="flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Package className="h-4 w-4" />
            Track a Package
          </Link>
          <Link
            href="/support"
            className="flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-secondary px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
          >
            Get Support
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-4">
          {[
            { value: "150M+", label: "Packages Delivered" },
            { value: "98.7%", label: "On-Time Rate" },
            { value: "50+", label: "Countries" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-lg border border-border/50 bg-card/50 px-4 py-4 backdrop-blur-sm"
            >
              <span className="text-xl font-bold text-foreground md:text-2xl">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground md:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-8 w-5 items-start justify-center rounded-full border border-muted-foreground/30 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
