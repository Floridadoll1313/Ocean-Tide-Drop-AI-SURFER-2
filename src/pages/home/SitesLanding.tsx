import "./SitesLanding.css";

const revenueFunnel = ["LAND", "CAPTURE", "AUDIT", "RESULTS", "SELL", "IMPLEMENT", "RETAIN"];

const products = [
  {
    stage: "Discover",
    name: "AEO Wave Audit™",
    category: "AI Visibility & Discovery",
    description:
      "Find the visibility gaps that keep AI systems from understanding, trusting, citing, and recommending your business.",
    cta: "Run the Wave Audit",
    href: "/wave-check",
    featured: true,
  },
  {
    stage: "Diagnose",
    name: "AI Opportunity Report™",
    category: "Business AI Strategy",
    description:
      "Turn scattered AI possibilities into a prioritized list of the opportunities most likely to create measurable business value.",
    cta: "Explore Opportunities",
    href: "/members/products/ai-opportunity-report",
  },
  {
    stage: "Plan",
    name: "AEO Blueprint™",
    category: "AI Search Strategy",
    description:
      "Build a practical roadmap for becoming more visible, understandable, and authoritative across AI-powered answer engines.",
    cta: "Build the Blueprint",
    href: "/members/products/aeo-blueprint",
  },
  {
    stage: "Plan",
    name: "Automation Blueprint™",
    category: "AI Workflow Strategy",
    description:
      "Map repetitive work into AI-powered workflows that reduce manual effort, connect your tools, and make operations more scalable.",
    cta: "Map Your Workflows",
    href: "/members/products/automation-blueprint",
  },
  {
    stage: "Implement",
    name: "Wave Scout™",
    category: "Lead Generation AI",
    description:
      "Identify prospects, research buying signals, and organize opportunities so your team spends less time hunting and more time closing.",
    cta: "Ride with Wave Scout",
    href: "/members/products/wave-scout",
  },
  {
    stage: "Implement",
    name: "Sales Rider™",
    category: "AI Sales Assistant",
    description:
      "Turn leads into conversations and conversations into opportunities with an always-on sales assistant.",
    cta: "Meet Sales Rider",
    href: "/members/products/sales-rider",
  },
  {
    stage: "Implement",
    name: "Content Creator™",
    category: "AI Marketing Engine",
    description:
      "Generate strategic social posts, emails, blogs, campaigns, offers, and marketing assets while keeping your message aligned.",
    cta: "Create with Content Creator",
    href: "/members/products/content-creator",
  },
  {
    stage: "Implement",
    name: "Customer Care Cove™",
    category: "AI Customer Support",
    description:
      "Handle common questions, support after-hours conversations, triage appointments, and route the moments that need a human touch.",
    cta: "Enter Customer Care Cove",
    href: "/members/products/customer-care-cove",
  },
  {
    stage: "Implement",
    name: "Automation Architect™",
    category: "AI Business Automation",
    description:
      "Connect processes, tools, data, and AI agents to automate repetitive work and create a more scalable operation.",
    cta: "Automate the Work",
    href: "/members/products/automation-architect",
  },
  {
    stage: "Transform",
    name: "Big Kahuna™",
    category: "AI Growth Architect",
    description:
      "Bring strategy, visibility, automation, agents, workflows, and growth opportunities together into one complete AI transformation experience.",
    cta: "Go Big Kahuna",
    href: "/members/products/big-kahuna",
    featured: true,
  },
];

const brandHeroImage = "/images/otd-ai-surfers-hero.png";
const productLadderImage = "/images/ai-surfer-product-ladder.jpg";
const leadCatcherImage = "/images/ai-surfer-lead-catcher.jpg";
const contentCreatorImage = "/images/content-creator-current.jpg";
const customerCareImage = "/images/customer-care-cove.jpg";
const automationArchitectImage = "/images/automation-architect-flow.jpg";
const bigKahunaImage = "/images/big-kahuna-ai-visibility.jpg";
const starterKitImage = "/images/ai-business-starter-kit.jpg";
const fallbackImage = "/ai-surfer-logo.jpg";

function VisualFrame({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <figure className="visual-frame">
      <div className="visual-label">{label}</div>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackImage;
        }}
      />
    </figure>
  );
}

export default function SitesLanding() {
  return (
    <main className="sites-landing">
      <div className="announcement">
        <span>🌺 Launch wave</span>
        <strong>20% off recurring app access and major software console plans</strong>
        <a href="/pricing">See plans →</a>
      </div>

      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Ocean Tide Drop AI SURFER home">
          <span className="brand-mark">OTD</span>
          <span>
            <strong>Ocean Tide Drop</strong>
            <small>AI SURFER</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#product-wave">Products</a>
          <a href="/wave-check">Free Wave Check</a>
          <a className="nav-button" href="/members">Members</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <p className="eyebrow">AI VISIBILITY • AUTOMATION • GROWTH</p>
          <h1>
            Ride the AI Wave.
            <span>Build. Automate. Grow.</span>
          </h1>
          <p className="hero-lead">
            Ocean Tide Drop AI SURFER helps small businesses get found by AI, capture more leads,
            automate repetitive work, and turn AI into a practical growth system.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/wave-check">Find My Biggest AI Wave</a>
            <a className="button button-secondary" href="#how-it-works">See How It Works</a>
          </div>
          <div className="trust-line" aria-label="Key benefits">
            <span>✓ Start with a free visibility check</span>
            <span>✓ Clear business outcomes</span>
            <span>✓ Human-first implementation</span>
          </div>
        </div>

        <div className="hero-art" aria-label="OTD AI Surfers brand artwork">
          <img
            src={brandHeroImage}
            alt="OTD AI Surfers riding an AI-powered ocean wave"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackImage;
            }}
          />
          <div className="hero-art-caption">
            <strong>Built by the ocean. Powered by AI. Driven by purpose.</strong>
            <span>Ride the Wave 🌊 Grow with AI.</span>
          </div>
        </div>
      </section>

      <section className="revenue-funnel" aria-label="AI Surfer revenue funnel">
        <p className="eyebrow">YOUR COMPLETE AI SALES MACHINE</p>
        <div className="revenue-funnel-track">
          {revenueFunnel.map((stage, index) => (
            <div className="revenue-funnel-step" key={stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="problem-section" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">THE BUSINESS PROBLEM</p>
          <h2>Too many businesses are invisible, overloaded, or leaking leads.</h2>
          <p>
            AI should not become another tab to babysit. We find the bottleneck, choose the right
            solution, then build the system around the outcome you actually need.
          </p>
        </div>
        <div className="problem-grid">
          <article><span>01</span><h3>Invisible to AI</h3><p>Your business may rank in search yet still be hard for AI answer engines to understand or recommend.</p></article>
          <article><span>02</span><h3>Leaky lead flow</h3><p>Slow response times and forgotten follow-up turn good prospects into somebody else&apos;s customers.</p></article>
          <article><span>03</span><h3>Manual overload</h3><p>Repetitive admin work steals the hours that should be going into customers, strategy, and growth.</p></article>
        </div>
      </section>

      <section className="wave-check" aria-labelledby="wave-check-title">
        <div>
          <p className="eyebrow">THE ENTRY POINT</p>
          <h2 id="wave-check-title">Start with the AI Surfer Wave Check.</h2>
          <p>
            We look for your biggest visibility, lead, and automation opportunity so you know what
            deserves attention first. No AI soup. Just the next wave worth riding.
          </p>
        </div>
        <a className="button button-primary" href="/wave-check">Start My Free Wave Check →</a>
      </section>

      <section className="visual-story visual-story-ladder" aria-labelledby="ladder-title">
        <div className="visual-copy">
          <p className="eyebrow">THE PRODUCT LADDER</p>
          <h2 id="ladder-title">Start small. Build momentum. Scale when the wave is right.</h2>
          <p>
            The OTD AI Surfer ladder takes a business from its first audit to strategy, AI agents,
            automation, and eventually a connected growth system.
          </p>
          <a className="text-link" href="#product-wave">Explore every product →</a>
        </div>
        <VisualFrame
          src={productLadderImage}
          alt="AI Surfer product ladder from the AEO Wave Audit through Starter Wave, Wavemaker, Big Kahuna, and Tsunami Takeover"
          label="AI SURFER PRODUCT LADDER"
        />
      </section>

      <section className="product-section" id="product-wave" aria-labelledby="products-title">
        <div className="section-heading">
          <p className="eyebrow">THE AI SURFER PRODUCT WAVE</p>
          <h2 id="products-title">One ecosystem. Different waves for different problems.</h2>
          <p>
            Discover the opportunity, diagnose the gap, build the plan, implement the right agent or
            automation, then transform the system when your business is ready.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className={`product-card ${product.featured ? "product-card-featured" : ""}`} key={product.name}>
              <div className="product-topline">
                <span className={`stage stage-${product.stage.toLowerCase()}`}>{product.stage}</span>
                <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="product-category">{product.category}</p>
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <a className="product-card-cta button button-primary" href={product.href}>
                {product.cta} <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="visual-story visual-story-sales" aria-labelledby="sales-title">
        <VisualFrame
          src={leadCatcherImage}
          alt="Sales Rider AI Lead Catcher flow showing lead arrival, AI response, qualification, CRM integration, owner notification, and automated follow-up"
          label="SALES RIDER • THE PERFECT WAVE"
        />
        <div className="visual-copy">
          <p className="eyebrow">FROM LEAD TO CONVERSATION</p>
          <h2 id="sales-title">Stop drowning in follow-up.</h2>
          <p>
            Sales Rider turns the messy manual lead process into a repeatable flow: capture the lead,
            respond quickly, qualify the opportunity, update the CRM, alert the owner, and keep the
            conversation moving.
          </p>
          <div className="outcome-list">
            <span>⚡ Faster response</span>
            <span>🎯 Better qualification</span>
            <span>🔁 Consistent follow-up</span>
          </div>
          <a className="button button-secondary" href="/members/products/sales-rider">Meet Sales Rider</a>
        </div>
      </section>

      <section className="visual-story" aria-labelledby="content-title">
        <div className="visual-copy">
          <p className="eyebrow">ONE IDEA • MANY WAVES</p>
          <h2 id="content-title">Turn content creation into a repeatable current.</h2>
          <p>
            Content Creator takes one offer, topic, or customer question and turns it into aligned,
            reusable marketing across the channels your business actually uses.
          </p>
          <div className="outcome-list">
            <span>🗓️ More consistency</span>
            <span>👁️ More visibility</span>
            <span>⏱️ Less creation time</span>
          </div>
          <a className="button button-secondary" href="/members/products/content-creator">Create with Content Creator</a>
        </div>
        <VisualFrame
          src={contentCreatorImage}
          alt="Content Creator workflow showing idea input, brand voice, multi-channel content, scheduling, and reuse"
          label="CONTENT CREATOR • CATCH THE CONTENT CURRENT"
        />
      </section>

      <section className="visual-story" aria-labelledby="care-title">
        <VisualFrame
          src={customerCareImage}
          alt="Customer Care Cove showing AI-supported customer service moving from missed messages to responsive support"
          label="CUSTOMER CARE COVE"
        />
        <div className="visual-copy">
          <p className="eyebrow">CALM THE INBOX</p>
          <h2 id="care-title">Keep the customer current flowing.</h2>
          <p>
            Customer Care Cove helps answer common questions, cover after-hours gaps, guide appointments,
            follow up, and escalate important conversations when a real person should step in.
          </p>
          <div className="outcome-list">
            <span>😊 Happier customers</span>
            <span>📨 Fewer missed messages</span>
            <span>📞 More booked calls</span>
          </div>
          <a className="button button-secondary" href="/members/products/customer-care-cove">Enter Customer Care Cove</a>
        </div>
      </section>

      <section className="visual-story" aria-labelledby="automation-title">
        <div className="visual-copy">
          <p className="eyebrow">FROM CHAOS TO FLOW</p>
          <h2 id="automation-title">Build the system behind the business.</h2>
          <p>
            Automation Architect spots repetitive work, maps the workflow, connects the tools, automates
            the handoffs, and keeps improving the system around measurable ROI.
          </p>
          <div className="outcome-list">
            <span>⚙️ Less manual work</span>
            <span>🧭 Cleaner systems</span>
            <span>📈 Scalable operations</span>
          </div>
          <a className="button button-secondary" href="/members/products/automation-architect">Meet Automation Architect</a>
        </div>
        <VisualFrame
          src={automationArchitectImage}
          alt="Automation Architect workflow moving from scattered repetitive work to an optimized connected business system"
          label="AUTOMATION ARCHITECT"
        />
      </section>

      <section className="visual-story visual-story-visibility" aria-labelledby="visibility-title">
        <div className="visual-copy">
          <p className="eyebrow">AEO + GEO + AI DISCOVERY</p>
          <h2 id="visibility-title">Move from search rankings to AI answers.</h2>
          <p>
            Traditional SEO still matters, but AI discovery adds another layer. Big Kahuna brings
            together answer-engine optimization, generative-engine optimization, authority signals,
            content structure, and business automation into one growth strategy.
          </p>
          <div className="outcome-list">
            <span>🔎 Google visibility</span>
            <span>🤖 AI answer readiness</span>
            <span>🌊 Connected growth systems</span>
          </div>
          <a className="button button-secondary" href="/members/products/big-kahuna">Explore Big Kahuna</a>
        </div>
        <VisualFrame
          src={bigKahunaImage}
          alt="Big Kahuna AI visibility strategy showing the shift from traditional search to AI answer engines"
          label="THE BIG KAHUNA STRATEGY"
        />
      </section>

      <section className="visual-story" aria-labelledby="starter-kit-title">
        <VisualFrame
          src={starterKitImage}
          alt="AI Business Starter Kit with four simple steps to kickstart an AI-enabled business"
          label="FREE AI BUSINESS STARTER KIT"
        />
        <div className="visual-copy">
          <p className="eyebrow">FREE STARTER RESOURCE</p>
          <h2 id="starter-kit-title">Start simple. Get your first AI win.</h2>
          <p>
            The AI Business Starter Kit gives AI-curious business owners a practical first step with
            starter roles, prompts, automation ideas, and a first-win action plan.
          </p>
          <div className="outcome-list">
            <span>🧠 No tech overwhelm</span>
            <span>💬 Copy-and-use prompts</span>
            <span>🏆 First-win momentum</span>
          </div>
          <a className="button button-secondary" href="/wave-check">Start with the Free Wave Check</a>
        </div>
      </section>

      <section className="membership">
        <div className="membership-copy">
          <p className="eyebrow">YOUR AI COMMAND CENTER</p>
          <h2>Build smarter. Move faster. Keep riding.</h2>
          <p>
            Members get one place to access AI Surfer products, launch workflows, review opportunities,
            and keep the next business move visible instead of buried under twenty browser tabs.
          </p>
        </div>
        <div className="membership-actions">
          <a className="button button-primary" href="/members">Enter the Members Area</a>
          <a className="text-link" href="/pricing">View membership options →</a>
        </div>
      </section>

      <section className="final-cta">
        <p className="eyebrow">READY FOR YOUR NEXT WAVE?</p>
        <h2>Find the AI opportunity hiding in your business.</h2>
        <p>Start with the free Wave Check. We&apos;ll help you see what to fix, automate, or build next.</p>
        <a className="button button-primary" href="/wave-check">Find My Biggest AI Wave 🌊</a>
      </section>

      <footer>
        <div className="footer-brand">
          <img src={fallbackImage} alt="" />
          <div>
            <strong>Ocean Tide Drop AI SURFER</strong>
            <span>Ride the Wave 🌊 Grow with AI.</span>
          </div>
        </div>
        <div className="footer-links">
          <a href="/wave-check">Free Wave Check</a>
          <a href="/pricing">Pricing</a>
          <a href="/members">Members</a>
          <a href="tel:8438704590">Call/Text (843) 870-4590</a>
        </div>
        <p>© 2026 Ocean Tide Drop AI SURFER. Built for the next wave.</p>
      </footer>
    </main>
  );
}
