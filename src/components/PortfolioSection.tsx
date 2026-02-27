const projects = [
  {
    title: "LuxeCart E-Commerce",
    category: "Website + Meta Ads",
    result: "340% increase in online sales",
    gradient: "from-amber-900/40 to-orange-900/20",
  },
  {
    title: "FitPro Gym Chain",
    category: "Lead Generation",
    result: "1,200+ leads per month",
    gradient: "from-emerald-900/40 to-teal-900/20",
  },
  {
    title: "UrbanNest Realty",
    category: "Landing Pages + Ads",
    result: "85% reduction in CPL",
    gradient: "from-blue-900/40 to-indigo-900/20",
  },
  {
    title: "TechScale SaaS",
    category: "Full Digital Strategy",
    result: "$1.2M ARR in 12 months",
    gradient: "from-purple-900/40 to-pink-900/20",
  },
];

const PortfolioSection = () => (
  <section id="portfolio" className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Portfolio</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
          Results That <span className="text-gradient-gold italic">Speak</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Real projects. Real results. Here's a glimpse of what we've accomplished for our clients.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div
            key={p.title}
            className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${p.gradient} border border-border/50 p-10 md:p-12 flex flex-col justify-end min-h-[280px] group hover:border-primary/30 transition-all duration-300`}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              {p.category}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">{p.title}</h3>
            <p className="text-muted-foreground">{p.result}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioSection;
