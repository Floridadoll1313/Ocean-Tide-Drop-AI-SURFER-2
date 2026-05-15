import React from "react";
import PageWrapper from "../../components/PageWrapper";

export default function Contact() {
  return (
    <PageWrapper>
      {/* CONTACT SECTION */}
      <section className="relative flex flex-col items-center justify-center">
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
    </PageWrapper>
  );
}
