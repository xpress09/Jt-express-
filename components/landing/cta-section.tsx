import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export default function CTASection() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-8 md:p-16">
          {/* Background glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Ready to Transform Your Deliveries?
            </h2>
            <p className="mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Start tracking packages in real-time, access 24/7 customer
              support, and experience logistics built for the next generation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tracking"
                className="flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Package className="h-4 w-4" />
                Track a Package
              </Link>
              <Link
                href="/support"
                className="flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-secondary px-8 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
              >
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
