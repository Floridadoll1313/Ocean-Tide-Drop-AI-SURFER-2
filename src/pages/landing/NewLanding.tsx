<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🌀⛵️Ocean Tide Drop 🌸 AI 🏄‍♀️ 💦</title>
  <style>
    :root {
      --teal-glow: #00F2FE;
      --teal-hover: #4FACFE;
      --text-light: #ffffff;
      --text-muted: #cbd5e1;
      --glass-bg: rgba(10, 20, 38, 0.65);
      --glass-border: rgba(0, 242, 254, 0.4);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    body {
      color: var(--text-light);
      /* Use your background image across the layout */
      background: #060c18 url('1000165255.png') no-repeat center top;
      background-size: 100% auto;
      min-height: 100vh;
    }

    /* Announcement Banner */
    .announcement-bar {
      background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
      color: #000;
      text-align: center;
      padding: 12px 15px;
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.5px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Top Navigation Header */
    .nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px 0 10px;
    }

    .brand-logo {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #fff;
      text-shadow: 0 0 12px rgba(0, 242, 254, 0.6);
    }

    .nav-btn {
      background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
      color: #000;
      font-weight: 700;
      padding: 10px 22px;
      border-radius: 30px;
      text-decoration: none;
      font-size: 0.9rem;
      box-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
    }

    /* Section 1: Yacht Hero */
    .hero {
      text-align: center;
      padding: 100px 20px 220px;
    }

    .hero h1 {
      font-size: 3rem;
      font-weight: 900;
      margin-bottom: 18px;
      text-shadow: 0 0 20px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 242, 254, 0.5);
      line-height: 1.2;
    }

    .hero p {
      font-size: 1.25rem;
      color: var(--text-muted);
      max-width: 750px;
      margin: 0 auto 35px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.9);
    }

    .main-cta {
      display: inline-block;
      background: linear-gradient(90deg, #00F2FE 0%, #4FACFE 100%);
      color: #000;
      font-weight: 800;
      font-size: 1.15rem;
      padding: 18px 42px;
      border-radius: 50px;
      text-decoration: none;
      box-shadow: 0 0 25px rgba(0, 242, 254, 0.5);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .main-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 35px rgba(0, 242, 254, 0.8);
    }

    /* Section 2: Coral Offer Callout */
    .offer-section {
      padding: 60px 20px 180px;
      text-align: center;
    }

    .glass-panel {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(8px);
      border-radius: 20px;
      padding: 40px;
      max-width: 850px;
      margin: 0 auto;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }

    .glass-panel h2 {
      font-size: 2rem;
      color: var(--teal-glow);
      margin-bottom: 15px;
    }

    .offer-highlights {
      list-style: none;
      margin-top: 25px;
      text-align: left;
      display: inline-block;
    }

    .offer-highlights li {
      margin-bottom: 12px;
      font-size: 1.1rem;
    }

    /* Section 3: Wave Cards Pricing Tier */
    .pricing-section {
      padding: 0 20px 120px;
      text-align: center;
    }

    .pricing-section h2 {
      font-size: 2.4rem;
      margin-bottom: 50px;
      text-shadow: 0 0 15px rgba(0, 242, 254, 0.5);
    }

    .pricing-grid {
      display: flex;
      gap: 25px;
      justify-content: center;
      align-items: stretch;
      flex-wrap: wrap;
    }

    .price-card {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(10px);
      border-radius: 24px 24px 16px 16px;
      padding: 35px 25px;
      width: 100%;
      max-width: 270px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      transition: transform 0.3s, border-color 0.3s;
    }

    .price-card:hover {
      transform: translateY(-5px);
      border-color: var(--teal-glow);
    }

    .card-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 15px;
    }

    .pricing-display {
      margin: 15px 0;
    }

    .original-price {
      text-decoration: line-through;
      color: var(--text-muted);
      font-size: 1rem;
    }

    .discount-price {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--teal-glow);
      display: block;
    }

    .features-list {
      list-style: none;
      margin: 20px 0 25px;
      color: var(--text-muted);
      text-align: left;
      font-size: 0.95rem;
    }

    .features-list li {
      margin-bottom: 10px;
      padding-left: 18px;
      position: relative;
    }

    .features-list li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--teal-glow);
      font-weight: bold;
    }

    .card-btn {
      display: block;
      background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
      color: #000;
      font-weight: 700;
      padding: 12px;
      border-radius: 25px;
      text-decoration: none;
      font-size: 0.95rem;
      box-shadow: 0 0 15px rgba(0, 242, 254, 0.3);
    }
  </style>
</head>
<body>

  <!-- Top Launch Banner -->
  <div class="announcement-bar">
    🌀 LAUNCH WEEK SPECIAL: Get 20% OFF with code <strong>OCEANTIDE20</strong> at checkout! ⛵️
  </div>

  <div class="container">
    
    <!-- Navigation Header -->
    <nav class="nav-header">
      <div class="brand-logo">🌀⛵️Ocean Tide Drop 🌸 AI 🏄‍♀️ 💦</div>
      <a href="#pricing" class="nav-btn">Member Dashboard</a>
    </nav>

    <!-- Top Section (Over Yacht Image) -->
    <header class="hero">
      <h1>🌀⛵️Ocean Tide Drop 🌸 AI 🏄‍♀️ 💦</h1>
      <p>High-powered digital tools, custom automation, and specialized software consoles built to ride the next wave. Claim your launch discount today!</p>
      <a href="#pricing" class="main-cta">Get Started & Save 20%</a>
    </header>

    <!-- Middle Section (Over Coral Reef & Turtle Image) -->
    <section class="offer-section">
      <div class="glass-panel">
        <h2>Exclusive Launch Discount 🌸</h2>
        <p>To celebrate our official launch, new customers get <strong>20% off</strong> recurring app access and major software console plans. Enter code <code>OCEANTIDE20</code> at checkout to lock in your rate.</p>
        <ul class="offer-highlights">
          <li>💦 <strong>Instant Setup:</strong> Immediate access to your dashboard and specialized consoles.</li>
          <li>🏄‍♀️ <strong>Locked-In Rate:</strong> Keep your launch discount active as long as your subscription is live.</li>
          <li>🌀 <strong>Full Support:</strong> Smooth onboarding and custom automation builds included.</li>
        </ul>
      </div>
    </section>

    <!-- Bottom Section (Over Wave Glass Cards Image) -->
    <section class="pricing-section" id="pricing">
      <h2>Select Your Tier ⛵️</h2>
      <div class="pricing-grid">
        
        <!-- Tier 1 -->
        <div class="price-card">
          <div>
            <h3 class="card-title">Starter Access</h3>
            <div class="pricing-display">
              <span class="original-price">$49/mo</span>
              <span class="discount-price">$39.20<small style="font-size: 0.9rem;">/mo</small></span>
            </div>
            <ul class="features-list">
              <li>Full app access</li>
              <li>Standard automation flows</li>
              <li>Continuous support</li>
            </ul>
          </div>
          <a href="#" class="card-btn">Claim Tier</a>
        </div>

        <!-- Tier 2 -->
        <div class="price-card">
          <div>
            <h3 class="card-title">Innovator Tier</h3>
            <div class="pricing-display">
              <span class="original-price">$99/mo</span>
              <span class="discount-price">$79.20<small style="font-size: 0.9rem;">/mo</small></span>
            </div>
            <ul class="features-list">
              <li>Full app + dashboard</li>
              <li>Quarterly AI forecasts</li>
              <li>Dedicated local support</li>
            </ul>
          </div>
          <a href="#" class="card-btn">Claim Tier</a>
        </div>

        <!-- Tier 3 -->
        <div class="price-card">
          <div>
            <h3 class="card-title">Console Tier</h3>
            <div class="pricing-display">
              <span class="original-price">$149/mo</span>
              <span class="discount-price">$119.20<small style="font-size: 0.9rem;">/mo</small></span>
            </div>
            <ul class="features-list">
              <li>Full app access + major consoles</li>
              <li>Custom automation builds</li>
              <li>Priority fast-track onboarding</li>
            </ul>
          </div>
          <a href="#" class="card-btn">Claim Tier</a>
        </div>

        <!-- Tier 4 -->
        <div class="price-card">
          <div>
            <h3 class="card-title">Full Takeover</h3>
            <div class="pricing-display">
              <span class="original-price">$497/mo</span>
              <span class="discount-price">$397.60<small style="font-size: 0.9rem;">/mo</small></span>
            </div>
            <ul class="features-list">
              <li>Custom AI ecosystem build</li>
              <li>Exclusive console permissions</li>
              <li>Direct 1-on-1 mentorship</li>
            </ul>
          </div>
          <a href="#" class="card-btn">Claim Tier</a>
        </div>

      </div>
    </section>

  </div>

</body>
</html>
