import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "$2M+", label: "Revenue Generated" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years Experience" },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto w-full section-padding pt-32 pb-20">
      <div className="max-w-3xl">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium animate-fade-in">
          Award-Winning Digital Agency
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 animate-slide-up">
          We Build Brands That{" "}
          <span className="text-gradient-gold italic">Dominate</span> Online
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          From Meta Ads to conversion-optimized websites — we help businesses scale revenue, generate leads, and own their digital presence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg text-base font-semibold shadow-gold hover:opacity-90 transition-opacity"
          >
            Get Free Consultation <ArrowRight size={18} />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-base font-semibold hover:bg-secondary transition-colors"
          >
            View Our Work
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-border/50">
        {stats.map((s, i) => (
          <div key={s.label} className="animate-fade-in" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
            <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">{s.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
