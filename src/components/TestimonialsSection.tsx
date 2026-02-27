import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, LuxeCart",
    quote: "Aditus transformed our online presence. Our sales tripled in 6 months and our brand has never looked better.",
  },
  {
    name: "James Rodriguez",
    role: "Founder, FitPro",
    quote: "The lead gen campaigns they built are a machine. We went from 200 to 1,200 leads per month. Absolutely incredible team.",
  },
  {
    name: "Emily Chen",
    role: "CMO, TechScale",
    quote: "Their strategic thinking sets them apart. They didn't just run ads — they built a complete growth engine for us.",
  },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Testimonials</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
          Loved by <span className="text-gradient-gold italic">Ambitious</span> Brands
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="glass-card p-8 hover:border-primary/30 transition-all duration-300">
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
            <div>
              <div className="font-semibold text-foreground">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
