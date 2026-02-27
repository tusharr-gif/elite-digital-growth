const steps = [
  { number: "01", title: "Discovery", description: "We deep-dive into your business, competitors, and goals to craft a tailored strategy." },
  { number: "02", title: "Strategy", description: "We design a data-backed plan covering channels, creatives, funnels, and KPIs." },
  { number: "03", title: "Execution", description: "Our team launches campaigns, builds assets, and implements everything with precision." },
  { number: "04", title: "Optimization", description: "We continuously test, iterate, and scale what works to maximize your results." },
];

const ProcessSection = () => (
  <section className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Process</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
          How We <span className="text-gradient-gold italic">Work</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          A proven 4-step framework that delivers consistent, measurable results.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={s.number} className="relative group">
            <div className="glass-card p-8 text-center hover:border-primary/30 transition-all duration-300 h-full">
              <div className="font-display text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors mb-4">
                {s.number}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
