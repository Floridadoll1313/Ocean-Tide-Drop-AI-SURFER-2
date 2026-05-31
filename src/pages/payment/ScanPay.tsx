import React from 'react';
import PageWrapper from '../../components/PageWrapper';

export default function ScanPay() {
  return (
    <PageWrapper maxWidth="max-w-6xl">
      <div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
        <div className="w-full max-w-4xl bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl flex flex-col items-center">
          <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-2">Scan. Pay. Go.</h2>
          <p className="text-zinc-400 text-sm mb-8">Secure payments powered by Tanka AI.</p>
          <div className="w-full h-[650px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative">
            <iframe 
              src="https://memory.tanka.ai/s/H92IUp6oT6OIdaPRy4bnjWFS" 
              className="w-full h-full border-none"
              title="Tanka Payment"
              allow="payment"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
