const serviceLinks = [
  { label: "Concierge Maintenance", href: "/services/mobile-detailing" },
  { label: "Interior Restoration", href: "/services/interior-restoration" },
  { label: "Paint Enhancement", href: "/services/paint-correction" },
  { label: "Ceramic Protection", href: "/services/ceramic-coatings" },
  { label: "Fleet Preservation", href: "/services/fleet-care" },
];

const navLinks = [
  { label: "About Steve", href: "/about" },
  { label: "Results", href: "/results" },
  { label: "Media", href: "/media" },
  { label: "Journal", href: "/journal" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="bg-[#020202] px-5 pb-10 pt-16 text-white md:px-8 md:pt-24">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-2xl font-black tracking-tight">A&amp;S Mobile Detail</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/42">
              East Texas vehicle preservation for owners who care about protection, clarity, and the way their vehicle is represented.
            </p>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-neon-blue">Powered by Ghost AI Partners</p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white/32">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white/32">Contact</h3>
            <div className="space-y-3 text-sm text-white/50">
              <p>Tyler, TX &amp; East Texas</p>
              <a href="tel:+19033308955" className="block transition-colors hover:text-white">
                (903) 330-8955
              </a>
              <a href="mailto:hello@asmobiledetail.com" className="block transition-colors hover:text-white">
                hello@asmobiledetail.com
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-xs font-bold uppercase tracking-[0.15em] text-white/32 transition-colors hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/8 pt-7 text-xs text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} A&amp;S Mobile Detail. All rights reserved.</p>
          <p>Premium vehicle preservation in East Texas.</p>
        </div>
      </div>
    </footer>
  );
}
