import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";

export default function PrivacyPolicy() {
  return (
    <PageWrapper maxWidth="max-w-4xl" showHero={false}>
      <div className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic">
            Privacy <span className="text-soul-gradient">Policy.</span>
          </h1>
          
          <div className="space-y-8 text-zinc-400 font-medium leading-relaxed">
            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">1. Introduction</h2>
              <p>
                Welcome to AI Surfer. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
              </p>
            </section>

            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">2. Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Financial Data:</strong> processed securely via Stripe. We do not store your full card details on our servers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, login data, browser type and version.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you (e.g., providing our AI services).
              </p>
            </section>

            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way.
              </p>
            </section>

            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">5. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of processing.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
