import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";

export default function TermsOfService() {
  return (
    <PageWrapper maxWidth="max-w-4xl" showHero={false}>
      <div className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic">
            Terms of <span className="text-soul-gradient">Service.</span>
          </h1>
          
          <div className="space-y-8 text-zinc-400 font-medium leading-relaxed">
            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">1. Agreement to Terms</h2>
              <p>
                By accessing or using the AI Surfer platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">2. Use of AI Services</h2>
              <p>
                Our platform provides AI-driven marketing and architecture tools. You agree to use these tools responsibly and in compliance with all applicable laws. You are responsible for any content generated using our platform.
              </p>
            </section>

            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">3. Subscriptions and Payments</h2>
              <p>
                Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Payments are handled via Stripe, and you agree to their terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">4. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of AI Surfer and its licensors.
              </p>
            </section>

            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">5. Limitation of Liability</h2>
              <p>
                In no event shall AI Surfer, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
              </p>
            </section>

            <section>
              <h2 className="text-white uppercase tracking-widest text-lg font-black italic">6. Changes</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
