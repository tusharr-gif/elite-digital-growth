const AboutSection = () => (
  <section id="about" className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Us</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-6">
            A Team Obsessed With{" "}
            <span className="text-gradient-gold italic">Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Apex Digital was founded with a simple belief: every business deserves access to world-class
            digital marketing. We combine creative storytelling with data-driven strategies to help brands
            of all sizes compete and win online.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our mission is to be the growth partner that businesses trust to scale their revenue, build their
            brand, and dominate their market. We don't do cookie-cutter. Every strategy is custom-built for
            your unique goals.
          </p>
          <div className="flex gap-6">
            <div className="glass-card px-6 py-4 text-center">
              <div className="font-display text-2xl font-bold text-gradient-gold">15+</div>
              <div className="text-xs text-muted-foreground mt-1">Team Members</div>
            </div>
            <div className="glass-card px-6 py-4 text-center">
              <div className="font-display text-2xl font-bold text-gradient-gold">6</div>
              <div className="text-xs text-muted-foreground mt-1">Countries Served</div>
            </div>
            <div className="glass-card px-6 py-4 text-center">
              <div className="font-display text-2xl font-bold text-gradient-gold">150+</div>
              <div className="text-xs text-muted-foreground mt-1">Happy Clients</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 md:p-12">
          <h3 className="font-display text-2xl font-bold mb-4">Our Values</h3>
          <ul className="space-y-5">
            {[
              { title: "Excellence", desc: "We hold ourselves to the highest standard in everything we deliver." },
              { title: "Transparency", desc: "No hidden fees, no vanity metrics. Just honest, clear communication." },
              { title: "Innovation", desc: "We stay ahead of trends to give our clients a competitive edge." },
              { title: "Partnership", desc: "Your success is our success. We're invested in your long-term growth." },
            ].map((v) => (
              <li key={v.title}>
                <div className="font-semibold text-foreground">{v.title}</div>
                <div className="text-sm text-muted-foreground">{v.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
