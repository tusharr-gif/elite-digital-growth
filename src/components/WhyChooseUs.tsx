import { Shield, Zap, Award, HeartHandshake } from "lucide-react";

const points = [
  {
    icon: Zap,
    title: "Results-Driven Approach",
    description: "Every strategy is backed by data. We focus on metrics that matter — revenue, leads, and ROI.",
  },
  {
    icon: Shield,
    title: "Transparent Reporting",
    description: "Real-time dashboards and weekly reports so you always know exactly where your money goes.",
  },
  {
    icon: Award,
    title: "Industry Expertise",
    description: "5+ years working with 150+ brands across e-commerce, SaaS, local businesses, and startups.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Partnership",
    description: "You get a dedicated team, not a ticket number. We treat your business like our own.",
  },
];

const WhyChooseUs = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-6">
            We Don't Just Market.{" "}
            <span className="text-gradient-gold italic">We Deliver.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Most agencies sell promises. We sell results. Our team combines creative excellence with
            analytical rigor to build campaigns that consistently outperform.
          </p>
          <div className="flex gap-8">
            <div>
              <div className="font-display text-3xl font-bold text-gradient-gold">4.9/5</div>
              <div className="text-sm text-muted-foreground">Client Rating</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-gradient-gold">3x</div>
              <div className="text-sm text-muted-foreground">Avg. ROI</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-gradient-gold">24h</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {points.map((p) => (
            <div key={p.title} className="glass-card p-6 hover:border-primary/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <p.icon className="text-primary" size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
