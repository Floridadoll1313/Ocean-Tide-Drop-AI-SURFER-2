import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';

interface Tier {
  name: string;
  basePrice: number;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: 'Starter Access',
    basePrice: 49,
    features: [
      'Ready-to-use AI tools for everyday business tasks',
      'Simple automations that save time each week',
      'Ongoing support when you need a hand',
    ],
  },
  {
    name: 'Innovator Tier',
    basePrice: 99,
    features: [
      'AI tools plus a central business dashboard',
      'Quarterly AI opportunity and growth insights',
      'Dedicated support for your setup',
    ],
  },
  {
    name: 'Console Tier',
    basePrice: 149,
    features: [
      'Advanced AI tools and business consoles',
      'Custom automations built around your workflow',
      'Priority onboarding to get you moving faster',
    ],
  },
  {
    name: 'Full Takeover',
    basePrice: 497,
    features: [
      'A tailored AI system for your business',
      'Custom tools, workflows, and console access',
      'Direct 1-on-1 strategy and implementation guidance',
    ],
  },
];

export default function App() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [promoStatus, setPromoStatus] = useState<{ msg: string; success: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenCheckout = (tier: Tier) => {
    setSelectedTier(tier);
    setPromoCode('');
    setDiscountRate(0);
    setPromoStatus(null);
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'OCEANTIDE20') {
      setDiscountRate(0.2);
      setPromoStatus({ msg: '✓ 20% Launch discount applied!', success: true });
    } else if (!code) {
      setDiscountRate(0);
      setPromoStatus(null);
    } else {
      setDiscountRate(0);
      setPromoStatus({ msg: '• Invalid promo code.', success: false });
    }
  };

  const handleCheckoutSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedTier) return;
    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tierName: selectedTier.name,
          basePrice: selectedTier.basePrice,
          promoCode,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(`Checkout Error: ${data.error || 'Failed to initiate Stripe session.'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Network error connecting to payment gateway.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <span style={styles.brand}>Ocean Tide Drop AI SURFER</span>
          <Link to="/members" style={styles.navBtn}>Member Dashboard</Link>
        </nav>

        <header style={styles.hero}>
          <p style={styles.eyebrow}>PRACTICAL AI FOR REAL BUSINESSES</p>
          <h1>AI for your business, without the tech headache.</h1>
          <p style={styles.heroLead}>
            Ocean Tide Drop AI SURFER helps businesses automate repetitive work, respond faster,
            capture more opportunities, and put practical AI tools to work.
          </p>
          <p style={styles.heroSupport}>
            Automate repetitive work. Strengthen customer follow-up. Build smarter workflows.
            Start with a free AI visibility check and see where your biggest opportunities are.
          </p>
          <div style={styles.heroActions}>
            <Link to="/wave-check" style={styles.cta}>Get My Free AI Wave Check™</Link>
            <Link to="/members" style={styles.secondaryCta}>Explore AI Solutions</Link>
          </div>
        </header>

        <section style={styles.waveCheck} aria-labelledby="free-wave-check-title">
          <p style={styles.eyebrow}>FREE AI VISIBILITY CHECK</p>
          <h2 id="free-wave-check-title">Can AI find, understand, and recommend your business?</h2>
          <p>
            See where your online presence may be confusing AI systems, limiting visibility, or
            costing you opportunities to be discovered and recommended.
          </p>
          <Link to="/wave-check" style={styles.cta}>Start My Free Wave Check →</Link>
        </section>

        <ProductCatalog />

        <section style={styles.offer}>
          <p style={styles.eyebrow}>LAUNCH SPECIAL</p>
          <h2>Start with practical AI and save 20% 🌺</h2>
          <p>
            Use code <strong>OCEANTIDE20</strong> for 20% off recurring access while you choose the
            level of AI support that fits your business today.
          </p>
        </section>

        <section style={styles.pricing}>
          <p style={styles.eyebrow}>CHOOSE YOUR LEVEL OF SUPPORT</p>
          <h2>Find the right AI setup for your business 🏄‍♀️</h2>
          <p style={styles.pricingIntro}>
            Start with ready-to-use tools or move up to custom automations and a tailored AI system.
            Your price stays the same; the difference is how much hands-on support and customization you want.
          </p>
          <div style={styles.grid}>
            {tiers.map((tier) => (
              <div key={tier.name} style={styles.card}>
                <h3>{tier.name}</h3>
                <div style={styles.price}>${(tier.basePrice * 0.8).toFixed(2)}<small>/mo</small></div>
                <ul style={styles.featureList}>
                  {tier.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                </ul>
                <button onClick={() => handleOpenCheckout(tier)} style={styles.cta}>Choose This Plan</button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {selectedTier && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button onClick={() => setSelectedTier(null)} style={styles.close} aria-label="Close checkout">×</button>
            <h3>{selectedTier.name}</h3>
            <form onSubmit={handleCheckoutSubmit}>
              <input
                required
                type="email"
                placeholder="surfer@oceantide.ai"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={styles.input}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  placeholder="OCEANTIDE20"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  style={styles.input}
                />
                <button type="button" onClick={handleApplyPromo}>Apply</button>
              </div>
              {promoStatus && <p style={{ color: promoStatus.success ? '#4ade80' : '#f87171' }}>{promoStatus.msg}</p>}
              <p>Total: <strong>${(selectedTier.basePrice * (1 - discountRate)).toFixed(2)}/mo</strong></p>
              <button disabled={loading} style={{ ...styles.cta, width: '100%' }}>
                {loading ? 'Connecting to Stripe...' : 'Complete Registration 🚀'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#060c18', color: '#fff', fontFamily: 'system-ui, sans-serif' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 20px' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 0' },
  brand: { display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800 },
  navBtn: { background: 'linear-gradient(90deg,#00f2fe,#4facfe)', color: '#000', fontWeight: 800, padding: '10px 22px', borderRadius: 30, textDecoration: 'none' },
  hero: { textAlign: 'center', padding: '80px 20px' },
  heroLead: { maxWidth: 820, margin: '22px auto 0', fontSize: '1.25rem', lineHeight: 1.65, color: '#e2e8f0' },
  heroSupport: { maxWidth: 760, margin: '16px auto 0', lineHeight: 1.65, color: '#94a3b8' },
  heroActions: { display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginTop: 28 },
  cta: { display: 'inline-block', background: 'linear-gradient(90deg,#00f2fe,#4facfe)', color: '#000', fontWeight: 800, padding: '14px 28px', borderRadius: 30, border: 0, cursor: 'pointer', textDecoration: 'none' },
  secondaryCta: { display: 'inline-block', color: '#a5f3fc', fontWeight: 800, padding: '13px 27px', borderRadius: 30, border: '1px solid rgba(103,232,249,.5)', textDecoration: 'none' },
  waveCheck: { maxWidth: 860, margin: '0 auto 30px', padding: '44px 28px', borderRadius: 28, border: '1px solid rgba(103,232,249,.34)', background: 'linear-gradient(145deg,rgba(13,36,64,.98),rgba(6,15,28,.98))', textAlign: 'center', boxShadow: '0 22px 70px rgba(0,0,0,.24)' },
  eyebrow: { margin: '0 0 12px', color: '#67e8f9', fontSize: '.78rem', fontWeight: 900, letterSpacing: '.16em' },
  offer: { textAlign: 'center', padding: 40, maxWidth: 820, margin: '0 auto' },
  pricing: { textAlign: 'center', padding: '20px 20px 100px' },
  pricingIntro: { maxWidth: 760, margin: '12px auto 34px', color: '#94a3b8', lineHeight: 1.65 },
  grid: { display: 'flex', gap: 25, justifyContent: 'center', flexWrap: 'wrap' },
  card: { background: '#0a1426', border: '1px solid rgba(0,242,254,.4)', borderRadius: 24, padding: 30, width: 240 },
  featureList: { textAlign: 'left', paddingLeft: 18, lineHeight: 1.6, color: '#cbd5e1' },
  price: { fontSize: '2rem', fontWeight: 800, color: '#00f2fe' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', display: 'grid', placeItems: 'center', zIndex: 1000 },
  modal: { background: '#060c18', border: '1px solid #00f2fe', borderRadius: 20, padding: 30, width: '90%', maxWidth: 480 },
  close: { float: 'right', background: 'none', border: 0, color: '#fff', fontSize: 28 },
  input: { width: '100%', boxSizing: 'border-box', padding: 12, margin: '8px 0', borderRadius: 8, background: '#111827', color: '#fff', border: '1px solid #334155' },
};
