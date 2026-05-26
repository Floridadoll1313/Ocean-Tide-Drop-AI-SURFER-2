import React, { useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import { Copy, AlertTriangle, Check, Lightbulb, ChevronDown } from 'lucide-react';

const PRESETS = {
  ui: {
    context: "We are building an ultra-sleek, modern members-only dashboard. The visual theme is high-fidelity glassmorphism—no retro CRT scanlines or grainy digital noise. It uses deep royal purples (#0d0415) for the background void and razor-sharp, neon cyber-green (#00ff66) for glows and borders.",
    role: "You are a master Senior Frontend Architect specializing in modern, high-performance CSS, responsive web layouts, and interactive glassmorphic UI components.",
    task: "Draft a clean, single-file HTML/CSS component representing a system status terminal. It must include:\n1. A main card utilizing transparent glassmorphism backdrop blurs.\n2. An interactive system command input field with a pulsing neon-green cursor.\n3. A clean system node map or bandwidth status graph using sharp, glowing vector SVG paths (no pixelated curves).",
    accuracy: "Do NOT use external frameworks (no Tailwind, Bootstrap, or React). Do NOT include retro CRT scanline animations, grain overlays, or vintage low-res terminal fonts. All borders must be razor-thin (1px). Provide zero conversational filler or explanations before or after the code; return only the code block.",
    target: "Return a single, completely self-contained HTML file. Put all CSS inside a <style> block and any interactive JavaScript inside a script block. Deliver this inside a single Markdown code block.",
    examples: "Style target for the container panel:\n<div class=\"glass-card\" style=\"background: rgba(13, 4, 21, 0.7); backdrop-filter: blur(16px); border: 1px solid #00ff66; box-shadow: 0 0 20px rgba(0, 255, 102, 0.15);\">"
  },
  seo: {
    context: "We are launching a premium SaaS tool for automated cloud optimization targeting enterprise CTOs and DevOps leads who are highly sensitive to cloud spend.",
    role: "You are an elite SEO Copywriter and Conversion Rate Optimization (CRO) specialist with a deep understanding of cloud infrastructure terminology.",
    task: "Write a high-converting landing page headline, subheadline, and 3 key value propositions that directly address the pain point of runaway AWS/GCP bills.",
    accuracy: "Avoid generic SaaS buzzwords like 'synergy', 'revolutionize', or 'next-generation'. Keep the tone authoritative, technical, yet highly accessible. Do not exceed 150 words total.",
    target: "Format as a clean JSON object with keys: headline, subheadline, value_props (array of strings).",
    examples: "Headline style: 'Cut Cloud Spend by 40% in 10 Minutes. Guaranteed.'"
  },
  data: {
    context: "We have a raw CSV dataset containing monthly active user (MAU) metrics, user acquisition costs, and churn rates for the past 12 months.",
    role: "You are a Principal Data Analyst and Business Intelligence expert.",
    task: "Analyze the dataset to identify the primary drivers of churn and suggest 3 actionable retention strategies based on the data trends.",
    accuracy: "Do not make assumptions without statistical backing. Highlight any data anomalies or seasonal trends. Keep recommendations highly practical and engineering-focused.",
    target: "Provide a structured markdown report with sections: Executive Summary, Trend Analysis, and Strategic Recommendations.",
    examples: "Example trend note: 'Q3 churn spiked by 4.2% coinciding with the API deprecation event.'"
  },
  ux: {
    context: "We are redesigning the checkout flow of a high-traffic e-commerce mobile app to reduce cart abandonment rates at the payment step.",
    role: "You are a Lead UX Researcher specializing in cognitive load theory and mobile checkout optimization.",
    task: "Design a 5-question user testing script focused on identifying friction points during the payment step.",
    accuracy: "Avoid leading questions. Ensure questions are open-ended and prompt the user to think out loud. Do not include introductory or concluding remarks.",
    target: "Format as a numbered list with clear instructions for the facilitator and expected user actions.",
    examples: "Facilitator prompt: 'Now, try to complete the purchase using the saved card. Tell me what you are looking at.'"
  }
};

const FORM_FIELDS = [
  { key: 'context', css: 'input-c', letter: 'C', color: '#d946ef', title: 'CONTEXT', subtitle: 'Background & Scenario', placeholder: 'What is the background or scenario?' },
  { key: 'role', css: 'input-r', letter: 'R', color: '#00f0ff', title: 'ROLE', subtitle: 'AI Persona & Expertise', placeholder: 'Who is the AI pretending to be?' },
  { key: 'task', css: 'input-e', letter: 'E', color: '#00ff66', title: 'EXPLICIT TASK', subtitle: 'Primary Objective', placeholder: 'What precisely should the AI do?' },
  { key: 'accuracy', css: 'input-a', letter: 'A', color: '#f97316', title: 'ACCURACY CONSTRAINTS', subtitle: 'Rules & Guardrails', placeholder: 'What are the rules, negative constraints, and guardrails?' },
  { key: 'target', css: 'input-t', letter: 'T', color: '#ec4899', title: 'TARGET OUTPUT', subtitle: 'Format & Structure', placeholder: 'What layout, format, or structure is required?' },
  { key: 'examples', css: 'input-ex', letter: 'E', color: '#eab308', title: 'EXAMPLES', subtitle: 'Few-Shot Models', placeholder: 'Few-shot examples or stylistic models' }
] as const;

export default function CreatePrompting() {
  const [inputs, setInputs] = useState(PRESETS.ui);

  const [copyState, setCopyState] = useState<'idle' | 'error' | 'success'>('idle');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const loadPreset = (key: keyof typeof PRESETS) => {
    setInputs(PRESETS[key]);
  };

  const updateField = (key: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const compilePromptText = () => {
    let compiled = '';
    FORM_FIELDS.forEach(field => {
      const val = inputs[field.key as keyof typeof inputs].trim();
      if (val) {
        compiled += `[${field.title}]\n${val}\n\n`;
      }
    });
    return compiled.trim();
  };

  const copyCompiledPrompt = async () => {
    const text = compilePromptText();
    
    if (!text) {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 1500);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyState('success');
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try { document.execCommand('copy'); setCopyState('success'); } catch (e) { console.error(e); }
      document.body.removeChild(textArea);
    }

    setTimeout(() => setCopyState('idle'), 2000);
  };

  return (
    <PageWrapper>
      <div className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center select-none" style={{ background: 'linear-gradient(135deg, #07020d 0%, #110524 100%)' }}>
        
        {/* Style Blocks */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@500;700;900&display=swap');
          
          .font-orbitron { font-family: 'Orbitron', 'Inter', sans-serif; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
          
          .create-glass-panel {
            background: rgba(20, 8, 38, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 255, 102, 0.25);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .create-glass-panel:hover {
            border-color: rgba(0, 255, 102, 0.4);
            box-shadow: 0 8px 32px 0 rgba(0, 255, 102, 0.05);
          }
          
          .create-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
          .create-scrollbar::-webkit-scrollbar-track { background: rgba(7, 2, 13, 0.5); }
          .create-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 255, 102, 0.3); border-radius: 3px; }
          .create-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 255, 102, 0.6); }

          .input-c:focus-within { border-color: #d946ef !important; box-shadow: 0 0 15px rgba(217, 70, 239, 0.2) !important; }
          .input-r:focus-within { border-color: #00f0ff !important; box-shadow: 0 0 15px rgba(0, 240, 255, 0.2) !important; }
          .input-e:focus-within { border-color: #00ff66 !important; box-shadow: 0 0 15px rgba(0, 255, 102, 0.2) !important; }
          .input-a:focus-within { border-color: #f97316 !important; box-shadow: 0 0 15px rgba(249, 115, 22, 0.2) !important; }
          .input-t:focus-within { border-color: #ec4899 !important; box-shadow: 0 0 15px rgba(236, 72, 153, 0.2) !important; }
          .input-ex:focus-within { border-color: #eab308 !important; box-shadow: 0 0 15px rgba(234, 179, 8, 0.2) !important; }

          @keyframes create-pulse-glow {
            0%, 100% { box-shadow: 0 0 15px rgba(0, 255, 102, 0.4); }
            50% { box-shadow: 0 0 25px rgba(0, 255, 102, 0.7); }
          }
          .create-pulse-active { animation: create-pulse-glow 2s infinite; }

          @keyframes create-status-pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          .create-status-dot { animation: create-status-pulse 1.5s infinite; }
          
          .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out, padding 0.3s ease-out;
          }
          .accordion-item.active .accordion-content {
            max-height: 400px;
            padding-top: 1rem;
          }
          .accordion-item.active .accordion-icon {
            transform: rotate(180deg);
          }
        `}} />

        {/* Blueprint Grid Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        {/* Page Content Container */}
        <div className="relative z-10 w-full p-4 md:p-8 lg:p-12 flex flex-col justify-between" style={{ maxWidth: '1440px' }}>
          
          {/* HEADER */}
          <header className="w-full mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-[rgba(0,255,102,0.15)] pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ff66] to-[#00f0ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,102,0.3)]">
                <span className="font-orbitron font-black text-black text-xl">C</span>
              </div>
              <div>
                <h1 className="font-orbitron text-xl md:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00f0ff]">
                  C.R.E.A.T.E. PROMPT ARCHITECT
                </h1>
                <p className="text-xs text-[#8b7fa4] tracking-widest uppercase font-mono mt-1">Structured Prompt Engineering Workspace</p>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(0,255,102,0.05)] border border-[rgba(0,255,102,0.2)] text-xs font-mono text-[#00ff66]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] create-status-dot shadow-[0_0_8px_#00ff66]"></span>
              SYSTEM: ONLINE
            </div>
          </header>

          {/* MAIN DASHBOARD */}
          <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            
            {/* LEFT PANEL: THE ARCHITECT FORM */}
            <section className="lg:col-span-7 flex flex-col gap-6">
              <div className="create-glass-panel rounded-2xl p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.05)] pb-4">
                  <h2 className="font-orbitron text-lg font-bold text-[#00f0ff] tracking-wide">1. ARCHITECT COMPONENT INPUTS</h2>
                  <span className="text-xs font-mono text-[#8b7fa4]">FRAMEWORK V1.2</span>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-5">
                  {FORM_FIELDS.map(field => (
                    <div key={field.key} className={`${field.css} flex flex-col gap-2 p-4 rounded-xl bg-[rgba(20,8,38,0.4)] border border-[rgba(255,255,255,0.05)] transition-all duration-300`}>
                      <div className="flex justify-between items-center">
                        <label className={`font-orbitron text-sm font-bold flex items-center gap-2`} style={{ color: field.color }}>
                          <span className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ backgroundColor: `${field.color}1a`, border: `1px solid ${field.color}4d` }}>{field.letter}</span>
                          {field.title}
                        </label>
                        <span className="text-[10px] font-mono text-[#8b7fa4]">{field.subtitle}</span>
                      </div>
                      <textarea 
                        rows={3} 
                        className="bg-transparent border-0 outline-none focus:ring-0 text-sm text-[#f3f1f6] placeholder-[rgba(255,255,255,0.25)] resize-none font-mono create-scrollbar" 
                        placeholder={field.placeholder}
                        value={inputs[field.key as keyof typeof inputs]}
                        onChange={(e) => updateField(field.key as keyof typeof inputs, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                {/* Preset Templates Row */}
                <div className="flex flex-col gap-3 border-t border-[rgba(255,255,255,0.05)] pt-4">
                  <span className="text-xs font-mono text-[#8b7fa4] uppercase tracking-wider">Load Preset Architecture:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button onClick={() => loadPreset('ui')} className="px-3 py-2 rounded-lg bg-[rgba(20,8,38,0.8)] border border-[rgba(0,240,255,0.2)] hover:border-[#00f0ff] hover:bg-[rgba(0,240,255,0.05)] text-xs font-mono text-[#00f0ff] transition-all duration-200 text-center truncate">
                      [UI Architect]
                    </button>
                    <button onClick={() => loadPreset('seo')} className="px-3 py-2 rounded-lg bg-[rgba(20,8,38,0.8)] border border-[rgba(217,70,239,0.2)] hover:border-[#d946ef] hover:bg-[rgba(217,70,239,0.05)] text-xs font-mono text-[#d946ef] transition-all duration-200 text-center truncate">
                      [SEO Copywriter]
                    </button>
                    <button onClick={() => loadPreset('data')} className="px-3 py-2 rounded-lg bg-[rgba(20,8,38,0.8)] border border-[rgba(0,255,102,0.2)] hover:border-[#00ff66] hover:bg-[rgba(0,255,102,0.05)] text-xs font-mono text-[#00ff66] transition-all duration-200 text-center truncate">
                      [Data Analyst]
                    </button>
                    <button onClick={() => loadPreset('ux')} className="px-3 py-2 rounded-lg bg-[rgba(20,8,38,0.8)] border border-[rgba(234,179,8,0.2)] hover:border-[#eab308] hover:bg-[rgba(234,179,8,0.05)] text-xs font-mono text-[#eab308] transition-all duration-200 text-center truncate">
                      [UX Researcher]
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* RIGHT PANEL: LIVE CONSOLE COMPILER */}
            <section className="lg:col-span-5 lg:sticky lg:top-8 flex flex-col gap-6">
              <div className="create-glass-panel rounded-2xl overflow-hidden flex flex-col border border-[rgba(0,240,255,0.25)]">
                
                {/* Terminal Header */}
                <div className="bg-[rgba(7,2,13,0.8)] px-4 py-3 border-b border-[rgba(0,240,255,0.15)] flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                    <span className="text-xs font-mono text-[#8b7fa4] ml-2">prompt_compiler.sh</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#00f0ff] animate-pulse">LIVE_COMPILING</span>
                </div>

                {/* Terminal Body */}
                <div className="p-5 bg-[rgba(7,2,13,0.6)] h-[480px] overflow-y-auto create-scrollbar flex flex-col gap-4 font-mono text-xs leading-relaxed">
                  {FORM_FIELDS.map(field => {
                    const textValue = inputs[field.key as keyof typeof inputs].trim();
                    return (
                      <div key={field.key} className={`border-l-2 pl-3 py-1`} style={{ borderColor: field.color }}>
                        <div className="font-bold mb-1" style={{ color: field.color }}>[{field.title}]</div>
                        <div className={`whitespace-pre-wrap ${textValue ? 'text-[#f3f1f6]' : 'text-[#8b7fa4]'}`}>
                          {textValue || `// Waiting for ${field.key} input...`}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Copy Button Area */}
                <div className="p-4 bg-[rgba(7,2,13,0.9)] border-t border-[rgba(255,255,255,0.05)]">
                  <button 
                    onClick={copyCompiledPrompt} 
                    className={`w-full py-4 rounded-xl font-orbitron font-black text-sm tracking-wider active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 ${
                      copyState === 'idle' ? 'bg-gradient-to-r from-[#00ff66] to-[#00f0ff] text-black hover:shadow-[0_0_25px_rgba(0,255,102,0.6)] create-pulse-active' :
                      copyState === 'error' ? 'bg-gradient-to-r from-[#ef4444] to-[#f97316] text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]' :
                      'bg-[#00ff66] text-black shadow-[0_0_35px_rgba(0,255,102,0.8)]'
                    }`}
                  >
                    {copyState === 'idle' && (
                      <>
                        <Copy className="w-5 h-5" /> COPY CONSOLE INPUT
                      </>
                    )}
                    {copyState === 'error' && (
                      <>
                        <AlertTriangle className="w-5 h-5" /> ERROR: NO_INPUTS_DETECTED
                      </>
                    )}
                    {copyState === 'success' && (
                      <>
                        <Check className="w-5 h-5" /> COPY_SUCCESSFUL_NODE_COMPILED
                      </>
                    )}
                  </button>
                </div>

              </div>
            </section>

          </main>

          {/* BOTTOM EDUCATIONAL SECTION */}
          <footer className="w-full mt-8">
            <div className="create-glass-panel rounded-2xl p-6 md:p-8">
              <h3 className="font-orbitron text-lg font-bold text-[#00ff66] mb-6 tracking-wide flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#00ff66]" /> THE SCIENCE OF PROMPTING
              </h3>
              
              {/* Accordion Container */}
              <div className="flex flex-col gap-4 max-w-4xl">
                
                {/* Accordion Item 1 */}
                <div className={`accordion-item border border-[rgba(255,255,255,0.05)] rounded-xl bg-[rgba(20,8,38,0.3)] transition-all duration-300 ${activeAccordion === 0 ? 'active' : ''}`}>
                  <button onClick={() => setActiveAccordion(activeAccordion === 0 ? null : 0)} className="w-full px-5 py-4 flex justify-between items-center text-left focus:outline-none">
                    <span className="font-orbitron text-sm font-bold text-[#f3f1f6] hover:text-[#00f0ff] transition-colors duration-200">Latent Space & AI Alignment</span>
                    <ChevronDown className="accordion-icon w-4 h-4 text-[#8b7fa4] transition-transform duration-300" />
                  </button>
                  <div className="accordion-content px-5 text-xs md:text-sm text-[#8b7fa4] leading-relaxed border-t border-[rgba(255,255,255,0.02)]">
                    <div className="pb-4">
                      LLMs operate within a multi-dimensional "latent space" containing billions of parameters. By defining a precise Context [C] and Role [R], you instantly narrow down the AI's search space. This aligns the model's neural pathways with the specific domain expertise required, drastically reducing generic or hallucinated responses.
                    </div>
                  </div>
                </div>

                {/* Accordion Item 2 */}
                <div className={`accordion-item border border-[rgba(255,255,255,0.05)] rounded-xl bg-[rgba(20,8,38,0.3)] transition-all duration-300 ${activeAccordion === 1 ? 'active' : ''}`}>
                  <button onClick={() => setActiveAccordion(activeAccordion === 1 ? null : 1)} className="w-full px-5 py-4 flex justify-between items-center text-left focus:outline-none">
                    <span className="font-orbitron text-sm font-bold text-[#f3f1f6] hover:text-[#00f0ff] transition-colors duration-200">The Power of Negative Constraints</span>
                    <ChevronDown className="accordion-icon w-4 h-4 text-[#8b7fa4] transition-transform duration-300" />
                  </button>
                  <div className="accordion-content px-5 text-xs md:text-sm text-[#8b7fa4] leading-relaxed border-t border-[rgba(255,255,255,0.02)]">
                    <div className="pb-4">
                      AI models are naturally agreeable and tend to over-complicate outputs. Accuracy Constraints [A] act as critical guardrails. By explicitly stating what not to do (e.g., "Do not use external frameworks", "Avoid conversational filler"), you suppress unwanted latent pathways, forcing the model to deliver cleaner, more deterministic code or copy.
                    </div>
                  </div>
                </div>

                {/* Accordion Item 3 */}
                <div className={`accordion-item border border-[rgba(255,255,255,0.05)] rounded-xl bg-[rgba(20,8,38,0.3)] transition-all duration-300 ${activeAccordion === 2 ? 'active' : ''}`}>
                  <button onClick={() => setActiveAccordion(activeAccordion === 2 ? null : 2)} className="w-full px-5 py-4 flex justify-between items-center text-left focus:outline-none">
                    <span className="font-orbitron text-sm font-bold text-[#f3f1f6] hover:text-[#00f0ff] transition-colors duration-200">Structuring for Deterministic Outputs</span>
                    <ChevronDown className="accordion-icon w-4 h-4 text-[#8b7fa4] transition-transform duration-300" />
                  </button>
                  <div className="accordion-content px-5 text-xs md:text-sm text-[#8b7fa4] leading-relaxed border-t border-[rgba(255,255,255,0.02)]">
                    <div className="pb-4">
                      Providing a strict Target Output [T] and concrete Examples [E] (few-shot prompting) establishes a structural template for the model's response. This eliminates formatting variance, making the output instantly ready for programmatic parsing, copy-pasting, or direct integration into production environments.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </footer>
        </div>
      </div>
    </PageWrapper>
  );
}
