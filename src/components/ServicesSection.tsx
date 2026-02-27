import { Target, Globe, Layout, Users, TrendingUp, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Meta Ads Management",
    description: "High-ROI Facebook & Instagram ad campaigns that drive qualified leads and sales at scale.",
    features: ["Audience Targeting", "Creative Strategy", "A/B Testing", "ROI Tracking"],
  },
  {
    icon: Globe,
    title: "Website Design & Development",
    description: "Custom, conversion-focused websites that establish authority and turn visitors into customers.",
    features: ["Custom Design", "Responsive", "SEO Optimized", "Fast Loading"],
  },
  {
    icon: Layout,
    title: "Landing Page Design",
    description: "High-converting landing pages engineered to maximize your ad spend and capture leads.",
    features: ["Conversion Focused", "A/B Tested", "Mobile First", "Speed Optimized"],
  },
  {
    icon: Users,
    title: "Lead Generation",
    description: "Multi-channel lead generation strategies that fill your pipeline with qualified prospects.",
    features: ["Funnel Design", "Email Sequences", "CRM Integration", "Lead Scoring"],
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    description: "Data-driven CRO strategies that increase your conversion rates and maximize revenue.",
    features: ["Heatmap Analysis", "User Testing", "Split Testing", "Analytics"],
  },
  {
    icon: Lightbulb,
    title: "Digital Marketing Strategy",
    description: "Comprehensive digital strategies aligned with your business goals for sustainable growth.",
    features: ["Market Research", "Competitor Analysis", "Growth Plan", "KPI Tracking"],
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Services</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">
          Everything You Need to <span className="text-gradient-gold italic">Win</span> Online
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          End-to-end digital solutions designed to grow your business and outperform competitors.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="glass-card p-8 group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <s.icon className="text-primary" size={24} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.description}</p>
            <div className="flex flex-wrap gap-2">
              {s.features.map((f) => (
                <span key={f} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
