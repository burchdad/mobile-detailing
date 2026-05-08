"use client";

export default function Footer() {
  return (
    <footer className="bg-deep-black border-t border-white/6 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-blue flex items-center justify-center text-white font-black text-sm shadow-neon-pink">
                A
              </div>
              <span className="font-black text-white text-lg tracking-tight">
                A&S <span className="gradient-text">Mobile Detail</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Elite mobile auto detailing serving East Texas. We bring the
              showroom to your door.
            </p>
            <p className="text-white/20 text-xs mt-4">
              Powered by{" "}
              <span className="text-neon-blue/60 font-semibold">
                Ghost AI Solutions
              </span>
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Maintenance Detail",
                "Interior Restoration",
                "Paint Enhancement",
                "Ceramic Coating",
                "Paint Correction",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-white/40 text-sm hover:text-white/80 transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-2 text-white/40 text-sm">
              <li>📍 Tyler, TX &amp; East Texas</li>
              <li>
                <a
                  href="tel:+19035550000"
                  className="hover:text-white/80 transition-colors"
                >
                  📞 (903) 555-0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@asmobiledetail.com"
                  className="hover:text-white/80 transition-colors"
                >
                  ✉ info@asmobiledetail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-xs">
          <span>© {new Date().getFullYear()} A&S Mobile Detail. All rights reserved.</span>
          <span>
            Mobile Auto Detailing Tyler TX | Ceramic Coating Tyler TX
          </span>
        </div>
      </div>
    </footer>
  );
}
