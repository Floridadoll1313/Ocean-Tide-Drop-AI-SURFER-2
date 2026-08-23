import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';

interface Tier {
  name: string;
  basePrice: number;
  features: string[];
}

const tiers: Tier[] = [
  { name: 'Starter Access', basePrice: 49, features: ['Full app access', 'Standard automation flows', 'Continuous support'] },
  { name: 'Innovator Tier', basePrice: 99, features: ['Full app + dashboard', 'Quarterly AI forecasts', 'Dedicated local support'] },
  { name: 'Console Tier', basePrice: 149, features: ['Full app access + major consoles', 'Custom automation builds', 'Priority fast-track onboarding'] },
  { name: 'Full Takeover', basePrice: 497, features: ['Custom AI ecosystem build', 'Exclusive console permissions', 'Direct 1-on-1 mentorship'] },
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
      <div style={styles.bar}>
        🌊 LAUNCH WEEK SPECIAL: Get 20% OFF with code <strong>OCEANTIDE20</strong> at checkout! 🏄‍♀️
      </div>

      <div style={styles.container}>
        <nav style={styles.nav}>
          <div style={styles.brand}>
            <img src="/ocean_tide_logo.png" alt="Ocean Tide Drop AI Surfer" style={styles.logo} />
            <span>Ocean Tide Drop AI</span>
          </div>
          <Link to="/members" style={styles.navBtn}>Member Dashboard</Link>
        </nav>

        <header style={styles.hero}>
          <h1>🌊🏄‍♀️ Ocean Tide Drop AI 🌺 🐟</h1>
          <p>High-powered digital tools, custom automation, and specialized software consoles built to ride the next wave.</p>
          <div style={styles.heroActions}>
            <Link to="/wave-check" style={styles.cta}>Get My Free AI Wave Check™</Link>
            <Link to="/members" style={styles.secondaryCta}>Explore Membership</Link>
          </div>
        </header>

        <section style={styles.waveCheck} aria-labelledby="free-wave-check-title">
          <p style={styles.eyebrow}>FREE AI VISIBILITY CHECK</p>
          <h2 id="free-wave-check-title">Can AI find and recommend your business?</h2>
          <p>Discover the visibility gaps that may keep AI systems from understanding, trusting, citing, and recommending your business.</p>
          <Link to="/wave-check" style={styles.cta}>Start My Free Wave Check →</Link>
        </section>

        <ProductCatalog />

        <section style={styles.offer}>
          <h2>Exclusive Launch Discount 🌺</h2>
          <p>New customers get <strong>20% off</strong> recurring app access and major software console plans.</p>
        </section>

        <section style={styles.pricing}>
          <h2>Select Your Tier 🏄‍♀️</h2>
          <div style={styles.grid}>
            {tiers.map((tier) => (
              <div key={tier.name} style={styles.card}>
                <h3>{tier.name}</h3>
                <div style={styles.price}>${(tier.basePrice * 0.8).toFixed(2)}<small>/mo</small></div>
                <ul>
                  {tier.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                </ul>
                <button onClick={() => handleOpenCheckout(tier)} style={styles.cta}>Claim Tier</button>
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
  bar: { background: 'linear-gradient(90deg,#00f2fe,#4facfe)', color: '#000', textAlign: 'center', padding: 12, fontWeight: 700 },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 20px' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 0' },
  brand: { display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800 },
  logo: { width: 48, height: 48, objectFit: 'contain', borderRadius: 12 },
  navBtn: { background: 'linear-gradient(90deg,#00f2fe,#4facfe)', color: '#000', fontWeight: 800, padding: '10px 22px', borderRadius: 30, textDecoration: 'none' },
  hero: { textAlign: 'center', padding: '80px 20px' },
  heroActions: { display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginTop: 28 },
  cta: { display: 'inline-block', background: 'linear-gradient(90deg,#00f2fe,#4facfe)', color: '#000', fontWeight: 800, padding: '14px 28px', borderRadius: 30, border: 0, cursor: 'pointer', textDecoration: 'none' },
  secondaryCta: { display: 'inline-block', color: '#a5f3fc', fontWeight: 800, padding: '13px 27px', borderRadius: 30, border: '1px solid rgba(103,232,249,.5)', textDecoration: 'none' },
  waveCheck: { maxWidth: 860, margin: '0 auto 30px', padding: '44px 28px', borderRadius: 28, border: '1px solid rgba(103,232,249,.34)', background: 'linear-gradient(145deg,rgba(13,36,64,.98),rgba(6,15,28,.98))', textAlign: 'center', boxShadow: '0 22px 70px rgba(0,0,0,.24)' },
  eyebrow: { margin: '0 0 12px', color: '#67e8f9', fontSize: '.78rem', fontWeight: 900, letterSpacing: '.16em' },
  offer: { textAlign: 'center', padding: 40 },
  pricing: { textAlign: 'center', padding: '20px 20px 100px' },
  grid: { display: 'flex', gap: 25, justifyContent: 'center', flexWrap: 'wrap' },
  card: { background: '#0a1426', border: '1px solid rgba(0,242,254,.4)', borderRadius: 24, padding: 30, width: 240 },
  price: { fontSize: '2rem', fontWeight: 800, color: '#00f2fe' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.85)', display: 'grid', placeItems: 'center', zIndex: 1000 },
  modal: { background: '#060c18', border: '1px solid #00f2fe', borderRadius: 20, padding: 30, width: '90%', maxWidth: 480 },
  close: { float: 'right', background: 'none', border: 0, color: '#fff', fontSize: 28 },
  input: { width: '100%', boxSizing: 'border-box', padding: 12, margin: '8px 0', borderRadius: 8, background: '#111827', color: '#fff', border: '1px solid #334155' },
};
