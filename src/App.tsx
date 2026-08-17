import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Tier { name: string; basePrice: number; features: string[]; }
const tiers: Tier[] = [
  { name: 'Starter Access', basePrice: 49, features: ['Full app access', 'Standard automation flows', 'Continuous support'] },
  { name: 'Innovator Tier', basePrice: 99, features: ['Full app + dashboard', 'Quarterly AI forecasts', 'Dedicated local support'] },
  { name: 'Console Tier', basePrice: 149, features: ['Full app access + major consoles', 'Custom automation builds', 'Priority fast-track onboarding'] },
  { name: 'Full Takeover', basePrice: 497, features: ['Custom AI ecosystem build', 'Exclusive console permissions', 'Direct 1-on-1 mentorship'] }
];

export default function App() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [promoStatus, setPromoStatus] = useState<{ msg: string; success: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenCheckout = (tier: Tier) => { setSelectedTier(tier); setPromoCode(''); setDiscountRate(0); setPromoStatus(null); };
  const handleApplyPromo = () => {
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'OCEANTIDE20') { setDiscountRate(0.2); setPromoStatus({ msg: '✓ 20% Launch discount applied!', success: true }); }
    else if (!cleanCode) { setDiscountRate(0); setPromoStatus(null); }
    else { setDiscountRate(0); setPromoStatus({ msg: '• Invalid promo code.', success: false }); }
  };
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!selectedTier) return; setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tierName: selectedTier.name, basePrice: selectedTier.basePrice, promoCode }) });
      const data = await response.json();
      if (data.url) window.location.href = data.url; else alert(`Checkout Error: ${data.error || 'Failed to initiate Stripe session.'}`);
    } catch (err) { console.error(err); alert('Network error connecting to payment gateway.'); } finally { setLoading(false); }
  };

  return <div style={styles.pageWrapper}>
    <style>{`@keyframes glow{0%{box-shadow:0 0 15px rgba(0,242,254,.4)}50%{box-shadow:0 0 25px rgba(0,242,254,.8)}100%{box-shadow:0 0 15px rgba(0,242,254,.4)}}.cta-btn:hover{transform:translateY(-2px);filter:brightness(1.1)}.price-card:hover{transform:translateY(-5px);border-color:#00F2FE!important}`}</style>
    <div style={styles.announcementBar}>🌊 LAUNCH WEEK SPECIAL: Get 20% OFF with code <strong>OCEANTIDE20</strong> at checkout! 🏄‍♀️</div>
    <div style={styles.container}>
      <nav style={styles.navHeader}>
        <div style={styles.brandLogo}><img src="/ocean_tide_logo.png" alt="Ocean Tide Drop AI Surfer" style={styles.logoImage}/><span>Ocean Tide Drop AI</span></div>
        <Link to="/members" className="cta-btn" style={styles.navBtn}>Member Dashboard</Link>
      </nav>
      <header style={styles.hero}>
        <h1 style={styles.heroTitle}>🌊🏄‍♀️ Ocean Tide Drop AI 🌺 🐟</h1>
        <p style={styles.heroText}>High-powered digital tools, custom automation, and specialized software consoles built to ride the next wave. Claim your launch discount today!</p>
        <Link to="/members" className="cta-btn" style={styles.mainCta}>Get Started & Save 20%</Link>
      </header>
      <section style={styles.offerSection}><div style={styles.glassPanel}><h2 style={styles.offerTitle}>Exclusive Launch Discount 🌺</h2><p>To celebrate our official launch, new customers get <strong>20% off</strong> recurring app access and major software console plans. Enter code <code style={styles.codeBlock}>OCEANTIDE20</code> at checkout.</p><ul style={styles.offerHighlights}><li style={styles.offerLi}>💦 <strong>Instant Setup:</strong> Immediate access to your dashboard and specialized consoles.</li><li style={styles.offerLi}>🏄‍♀️ <strong>Locked-In Rate:</strong> Keep your launch discount active as long as your subscription is live.</li><li style={styles.offerLi}>🌊 <strong>Full Support:</strong> Smooth onboarding and custom automation builds included.</li></ul></div></section>
      <section style={styles.pricingSection} id="pricing"><h2 style={styles.pricingHeader}>Select Your Tier 🏄‍♀️</h2><div style={styles.pricingGrid}>{tiers.map(tier => <div key={tier.name} className="price-card" style={styles.priceCard}><div><h3 style={styles.cardTitle}>{tier.name}</h3><div style={{margin:'15px 0'}}><span style={styles.originalPrice}>${tier.basePrice.toFixed(2)}/mo</span><span style={styles.discountPrice}>${(tier.basePrice*.8).toFixed(2)}<small>/mo</small></span></div><ul style={styles.featuresList}>{tier.features.map((f,i)=><li key={i} style={styles.featureItem}>✓ {f}</li>)}</ul></div><button className="cta-btn" style={styles.cardBtn} onClick={()=>handleOpenCheckout(tier)}>Claim Tier</button></div>)}</div></section>
    </div>
    {selectedTier && <div style={styles.modalOverlay}><div style={styles.modalContent}><button style={styles.modalClose} onClick={()=>setSelectedTier(null)}>&times;</button><h3 style={styles.modalTitle}>{selectedTier.name}</h3><p style={styles.modalText}>Complete registration to unlock console permissions.</p><form onSubmit={handleCheckoutSubmit}><div style={styles.formGroup}><label style={styles.formLabel}>Email Address</label><input type="email" required placeholder="surfer@oceantide.ai" value={email} onChange={e=>setEmail(e.target.value)} style={styles.formInput}/></div><div style={styles.formGroup}><label style={styles.formLabel}>Promo Code</label><div style={{display:'flex',gap:10}}><input type="text" placeholder="OCEANTIDE20" value={promoCode} onChange={e=>setPromoCode(e.target.value)} style={styles.formInput}/><button type="button" onClick={handleApplyPromo} style={styles.promoBtn}>Apply</button></div>{promoStatus&&<span style={{fontSize:'.85rem',marginTop:5,display:'block',color:promoStatus.success?'#4ade80':'#f87171'}}>{promoStatus.msg}</span>}</div><div style={styles.totalBox}><span>Total Due Now:</span><strong style={styles.totalPrice}>${(selectedTier.basePrice*(1-discountRate)).toFixed(2)}/mo</strong></div><button type="submit" className="cta-btn" disabled={loading} style={{...styles.cardBtn,marginTop:20,opacity:loading?.7:1}}>{loading?'Connecting to Stripe...':'Complete Registration 🚀'}</button></form></div></div>}
  </div>;
}

const styles: {[key:string]: React.CSSProperties} = {
  pageWrapper:{minHeight:'100vh',background:'#060c18',color:'#fff',fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',lineHeight:1.5},announcementBar:{background:'linear-gradient(90deg,#00f2fe,#4facfe)',color:'#000',textAlign:'center',padding:'12px 15px',fontWeight:700,fontSize:'.95rem',position:'sticky',top:0,zIndex:100},container:{maxWidth:1200,margin:'0 auto',padding:'0 20px'},navHeader:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'30px 0 10px'},brandLogo:{display:'flex',alignItems:'center',gap:12,fontSize:'1.25rem',fontWeight:800,letterSpacing:1,textTransform:'uppercase',textShadow:'0 0 12px rgba(0,242,254,.6)'},logoImage:{width:48,height:48,objectFit:'contain',borderRadius:12},navBtn:{background:'linear-gradient(90deg,#00f2fe,#4facfe)',color:'#000',fontWeight:700,padding:'10px 22px',borderRadius:30,textDecoration:'none',fontSize:'.9rem'},hero:{textAlign:'center',padding:'80px 20px 100px'},heroTitle:{fontSize:'3rem',fontWeight:900,marginBottom:18,textShadow:'0 0 20px rgba(0,0,0,.8),0 0 10px rgba(0,242,254,.5)'},heroText:{fontSize:'1.25rem',color:'#cbd5e1',maxWidth:750,margin:'0 auto 35px'},mainCta:{display:'inline-block',background:'linear-gradient(90deg,#00f2fe,#4facfe)',color:'#000',fontWeight:800,fontSize:'1.15rem',padding:'18px 42px',borderRadius:50,textDecoration:'none',boxShadow:'0 0 25px rgba(0,242,254,.5)'},offerSection:{padding:'20px 20px 80px',textAlign:'center'},glassPanel:{background:'rgba(10,20,38,.75)',border:'1px solid rgba(0,242,254,.4)',backdropFilter:'blur(12px)',borderRadius:20,padding:40,maxWidth:850,margin:'0 auto'},offerTitle:{color:'#00F2FE',fontSize:'2rem',marginBottom:15},codeBlock:{background:'rgba(0,242,254,.15)',padding:'2px 8px',borderRadius:4,color:'#00F2FE'},offerHighlights:{listStyle:'none',marginTop:25,textAlign:'left',display:'inline-block'},offerLi:{marginBottom:12,fontSize:'1.1rem'},pricingSection:{padding:'0 20px 120px',textAlign:'center'},pricingHeader:{fontSize:'2.4rem',marginBottom:50,textShadow:'0 0 15px rgba(0,242,254,.5)'},pricingGrid:{display:'flex',gap:25,justifyContent:'center',flexWrap:'wrap'},priceCard:{background:'rgba(10,20,38,.75)',border:'1px solid rgba(0,242,254,.4)',backdropFilter:'blur(10px)',borderRadius:24,padding:'35px 25px',width:'100%',maxWidth:260,display:'flex',flexDirection:'column',justifyContent:'space-between',transition:'all .3s ease'},cardTitle:{fontSize:'1.3rem',fontWeight:700},originalPrice:{textDecoration:'line-through',color:'#cbd5e1',fontSize:'1rem'},discountPrice:{fontSize:'2.2rem',fontWeight:800,color:'#00F2FE',display:'block'},featuresList:{listStyle:'none',margin:'20px 0 25px',color:'#cbd5e1',textAlign:'left',fontSize:'.95rem'},featureItem:{marginBottom:10},cardBtn:{width:'100%',background:'linear-gradient(90deg,#00f2fe,#4facfe)',color:'#000',fontWeight:700,padding:12,border:0,borderRadius:25,fontSize:'.95rem',cursor:'pointer'},modalOverlay:{position:'fixed',inset:0,background:'rgba(0,0,0,.85)',backdropFilter:'blur(8px)',display:'flex',justifyContent:'center',alignItems:'center',zIndex:1000},modalContent:{background:'#060c18',border:'1px solid #00F2FE',borderRadius:20,padding:35,width:'90%',maxWidth:480,position:'relative'},modalClose:{position:'absolute',top:15,right:20,background:'none',border:0,color:'#fff',fontSize:'1.5rem',cursor:'pointer'},modalTitle:{fontSize:'1.6rem',color:'#00F2FE',marginBottom:10},modalText:{color:'#cbd5e1',fontSize:'.95rem'},formGroup:{marginTop:15,textAlign:'left'},formLabel:{display:'block',fontSize:'.85rem',color:'#cbd5e1',marginBottom:5},formInput:{width:'100%',padding:12,borderRadius:8,border:'1px solid rgba(0,242,254,.4)',background:'rgba(255,255,255,.05)',color:'#fff',fontSize:'1rem',boxSizing:'border-box'},promoBtn:{background:'#00F2FE',border:0,padding:'0 15px',borderRadius:8,fontWeight:'bold',cursor:'pointer'},totalBox:{marginTop:20,textAlign:'left',background:'rgba(255,255,255,.05)',padding:12,borderRadius:8,display:'flex',justifyContent:'space-between'},totalPrice:{color:'#00F2FE',fontSize:'1.3rem'}
};
