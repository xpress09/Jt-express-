"use client";

import { Check, Circle, Clock, MapPin, Truck, Package, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  status: "completed" | "current" | "pending";
  title: string;
  description: string;
  timestamp: string;
  location: string;
  icon: "package" | "truck" | "mappin" | "home" | "check";
}

interface TrackingTimelineProps {
  events: TimelineEvent[];
}

const iconMap = {
  package: Package,
  truck: Truck,
  mappin: MapPin,
  home: Home,
  check: Check,
};

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <div className="flex flex-col gap-0">
      {events.map((event, index) => {
        const Icon = iconMap[event.icon];
        const isLast = index === events.length - 1;

        return (
          <div key={event.id} className="flex gap-4">
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
                  event.status === "completed" &&
                    "border-green-500 bg-green-500/10 text-green-500",
                  event.status === "current" &&
                    "border-primary bg-primary/10 text-primary",
                  event.status === "pending" &&
                    "border-muted bg-muted text-muted-foreground"
                )}
              >
                {event.status === "completed" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 grow",
                    event.status === "completed"
                      ? "bg-green-500/30"
                      : "bg-border"
                  )}
                  style={{ minHeight: "2rem" }}
                />
              )}
            </div>

            {/* Content */}
            <div className={cn("flex flex-col gap-1 pb-6", isLast && "pb-0")}>
              <h4
                className={cn(
                  "pt-2 text-sm font-semibold",
                  event.status === "pending"
                    ? "text-muted-foreground"
                    : "text-foreground"
                )}
              >
                {event.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {event.timestamp}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
