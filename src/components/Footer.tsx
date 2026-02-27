const Footer = () => (
  <footer className="px-6 py-12 md:px-12 lg:px-20 xl:px-32 bg-background border-t border-border/50">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-display text-xl font-bold tracking-tight">
        Adi<span className="text-gradient-gold">tus</span>
      </div>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <a href="#services" className="hover:text-foreground transition-colors">Services</a>
        <a href="#portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
        <a href="#about" className="hover:text-foreground transition-colors">About</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
      </div>
      <div className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Aditus. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
