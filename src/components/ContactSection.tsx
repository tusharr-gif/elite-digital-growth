import { useState } from "react";
import { Send, Mail, Phone, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Contact Us</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-6">
              Let's Start Your{" "}
              <span className="text-gradient-gold italic">Growth</span> Journey
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Fill out the form and our team will get back to you within 24 hours with a custom strategy proposal.
            </p>

            <div className="space-y-6">
              <a href="mailto:aditus011@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium text-foreground">aditus011@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4 text-muted-foreground group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <a href="tel:+919309312359" className="font-medium text-foreground hover:text-opacity-80 transition-colors block">+91 9309312359</a>
                  <a href="tel:+917840919923" className="font-medium text-foreground hover:text-opacity-80 transition-colors block mt-1">+91 7840919923</a>
                </div>
              </div>

              <a
                href="https://wa.me/919309312359"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="text-primary" size={20} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">WhatsApp</div>
                  <div className="font-medium text-foreground">Chat with us on WhatsApp</div>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Your phone no."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-gold text-primary-foreground py-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-gold hover:opacity-90 transition-opacity"
            >
              {submitted ? "Message Sent! ✓" : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
