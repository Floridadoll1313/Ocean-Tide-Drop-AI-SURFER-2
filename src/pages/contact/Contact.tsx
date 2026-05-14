import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00111a] via-[#002b3d] to-[#00070a] text-white overflow-hidden">
      {/* NAVBAR */}
      <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 drop-shadow-[0_0_12px_#00eaff]"
            />
            <span className="text-xl font-semibold tracking-wide">
              Ocean Tide Drop
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm">
            <a className="hover:text-[#00eaff] transition-all" href="/">Home</a>
            <a className="hover:text-[#00eaff] transition-all" href="/services">Services</a>
            <a className="hover:text-[#00eaff] transition-all" href="/members">Members</a>
            <a className="hover:text-[#00eaff] transition-all" href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* CONTACT SECTION */}
      <section className="pt-40 pb-32 relative flex flex-col items-center justify-center min-h-[80vh]">
        {/* Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00eaff]/10 blur-[150px] rounded-full pointer-events-none"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_0_25px_#00eaff] mb-6">
            Get in Touch
          </h1>

          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto mb-16">
            Reach out to start your next big wave. Whether you need cinematic branding or advanced automations, we're ready to ride the tide with you.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
              <h3 className="text-[#00eaff] font-bold text-xl mb-4 font-display">Email Us</h3>
              <a href="mailto:oceantidedropaisurf@gmail.com" className="text-lg hover:text-[#00eaff] transition-colors">
                oceantidedropaisurf@gmail.com
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
              <h3 className="text-[#00eaff] font-bold text-xl mb-4 font-display">Call Us</h3>
              <a href="tel:8542853282" className="text-lg hover:text-[#00eaff] transition-colors">
                (854) 285-3282
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-white/60 text-sm relative z-10">
        © {new Date().getFullYear()} Ocean Tide Drop AI Surfer — All Rights Reserved.
      </footer>
    </div>
  );
}
