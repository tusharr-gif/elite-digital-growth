import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="section-padding bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
    <div className="relative max-w-4xl mx-auto text-center">
      <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
        Ready to <span className="text-gradient-gold italic">Scale</span> Your Business?
      </h2>
      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Book a free strategy session with our experts. We'll audit your current digital presence and
        show you exactly how to grow.
      </p>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-10 py-4 rounded-lg text-lg font-semibold shadow-gold hover:opacity-90 transition-opacity"
      >
        Get Free Consultation <ArrowRight size={20} />
      </a>
      <p className="text-sm text-muted-foreground mt-4">No commitment. No pressure. Just results.</p>
    </div>
  </section>
);

export default CTASection;
