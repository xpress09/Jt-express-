"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import TrackingTimeline from "@/components/tracking/tracking-timeline";
import {
  Search,
  Package,
  Clock,
  MapPin,
  Truck,
  CalendarDays,
  Weight,
  ArrowRight,
} from "lucide-react";

const TrackingMap = dynamic(
  () => import("@/components/tracking/tracking-map"),
  { ssr: false }
);

// Demo tracking data
const demoTrackingData = {
  trackingNumber: "JT2026031587429",
  status: "In Transit",
  estimatedDelivery: "Feb 28, 2026 - 2:00 PM",
  origin: "Bangkok, Thailand",
  destination: "Chiang Mai, Thailand",
  weight: "2.4 kg",
  service: "Express Delivery",
  points: [
    {
      lat: 13.7563,
      lng: 100.5018,
      label: "Bangkok Sorting Center",
      status: "completed" as const,
    },
    {
      lat: 14.8971,
      lng: 100.4992,
      label: "Nakhon Sawan Hub",
      status: "completed" as const,
    },
    {
      lat: 16.4419,
      lng: 99.5222,
      label: "Kamphaeng Phet Transit",
      status: "current" as const,
    },
    {
      lat: 17.9647,
      lng: 99.003,
      label: "Lampang Distribution",
      status: "pending" as const,
    },
    {
      lat: 18.7883,
      lng: 98.9853,
      label: "Chiang Mai Delivery",
      status: "pending" as const,
    },
  ],
  timeline: [
    {
      id: "1",
      status: "completed" as const,
      title: "Package Picked Up",
      description: "Package collected from sender and processed at origin facility.",
      timestamp: "Feb 26, 2026 - 9:15 AM",
      location: "Bangkok, Thailand",
      icon: "package" as const,
    },
    {
      id: "2",
      status: "completed" as const,
      title: "Departed Sorting Center",
      description: "Package sorted and dispatched for transit to next hub.",
      timestamp: "Feb 26, 2026 - 3:42 PM",
      location: "Bangkok Sorting Center",
      icon: "truck" as const,
    },
    {
      id: "3",
      status: "completed" as const,
      title: "Arrived at Transit Hub",
      description: "Package received at intermediate hub for routing.",
      timestamp: "Feb 27, 2026 - 1:18 AM",
      location: "Nakhon Sawan Hub",
      icon: "mappin" as const,
    },
    {
      id: "4",
      status: "current" as const,
      title: "In Transit",
      description: "Package is currently on the way to the next distribution center.",
      timestamp: "Feb 27, 2026 - 8:30 AM",
      location: "Kamphaeng Phet",
      icon: "truck" as const,
    },
    {
      id: "5",
      status: "pending" as const,
      title: "Out for Delivery",
      description: "Package will be loaded onto delivery vehicle for final leg.",
      timestamp: "Estimated: Feb 28, 2026",
      location: "Chiang Mai",
      icon: "truck" as const,
    },
    {
      id: "6",
      status: "pending" as const,
      title: "Delivered",
      description: "Package delivered to recipient.",
      timestamp: "Estimated: Feb 28, 2026 - 2:00 PM",
      location: "Chiang Mai, Thailand",
      icon: "home" as const,
    },
  ],
};

export default function TrackingPage() {
  const [trackingInput, setTrackingInput] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<typeof demoTrackingData | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    // Simulate loading
    setTimeout(() => {
      setTrackingData(demoTrackingData);
      setIsTracking(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-28">
        {/* Page header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            Package Tracking
          </span>
          <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Track Your Shipment
          </h1>
          <p className="mt-3 max-w-md text-pretty text-muted-foreground">
            Enter your tracking number to get real-time updates on your
            package location and estimated delivery.
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleTrack}
          className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter tracking number (e.g., JT2026031587429)"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              className="h-12 w-full rounded-md border border-input bg-card pl-11 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            disabled={isTracking}
            className="flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {isTracking ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
            ) : (
              <>
                Track
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo hint */}
        {!trackingData && !isTracking && (
          <p className="mb-10 text-center text-sm text-muted-foreground">
            Try searching any text to see a demo tracking result.
          </p>
        )}

        {/* Loading state */}
        {isTracking && (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-3 border-muted border-t-primary" />
            <p className="text-sm text-muted-foreground">
              Locating your package...
            </p>
          </div>
        )}

        {/* Tracking results */}
        {trackingData && !isTracking && (
          <div className="flex flex-col gap-6">
            {/* Status banner */}
            <div className="flex flex-col gap-4 rounded-lg border border-primary/20 bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-lg font-bold text-primary">
                    {trackingData.status}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span className="font-mono text-foreground">
                    {trackingData.trackingNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{trackingData.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: MapPin,
                  label: "Origin",
                  value: trackingData.origin,
                },
                {
                  icon: MapPin,
                  label: "Destination",
                  value: trackingData.destination,
                },
                {
                  icon: Weight,
                  label: "Weight",
                  value: trackingData.weight,
                },
                {
                  icon: Clock,
                  label: "Service",
                  value: trackingData.service,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map + Timeline layout */}
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Map */}
              <div className="lg:col-span-3">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  Live Route
                </h3>
                <TrackingMap points={trackingData.points} />
              </div>

              {/* Timeline */}
              <div className="lg:col-span-2">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  Tracking History
                </h3>
                <div className="rounded-lg border border-border bg-card p-5">
                  <TrackingTimeline events={trackingData.timeline} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
