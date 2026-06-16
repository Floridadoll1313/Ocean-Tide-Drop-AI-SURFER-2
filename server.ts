import http from "http";

type OfferRequest = {
  business_niche: string;
  target_audience: string;
  goal: string;
};

function generateOffer({ business_niche, target_audience, goal }: OfferRequest) {
  const waveNames = [
    "Tsunami Launch",
    "WaveMaker Pro",
    "Ocean Funnel System",
    "BlueCurrent Offer Engine",
    "High Tide Revenue Kit",
  ];

  const pick = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const offerName = `${pick(waveNames)} for ${business_niche}`;

  return {
    offer_name: offerName,
    tagline: `Turn ${business_niche} into a client-generating wave machine`,
    4_tier_pricing: {
      basic: `Starter Wave — $29/month: simple tools for ${target_audience}`,
      growth: `Rising Tide — $79/month: automation + lead capture for ${goal}`,
      pro: `Breakwater Pro — $149/month: full AI system + optimization`,
      enterprise: `Ocean Dominion — $399/month: done-for-you AI growth system`,
    },
    sales_pitch: `We help ${target_audience} in ${business_niche} stop chasing clients and start pulling them in automatically using AI-powered systems built for ${goal}.`,
    quick_ad_hook: `Stop working harder. Start riding automated client waves in ${business_niche} today.`,
  };
}

const server = http.createServer((req, res) => {
  // CORS (so your frontend doesn't freak out)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/offer-builder") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const data: OfferRequest = JSON.parse(body);

        if (!data.business_niche || !data.target_audience || !data.goal) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: "Missing required fields 🌊" })
          );
          return;
        }

        const result = generateOffer(data);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Server wave crashed 🌊💥" }));
      }
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🌊 AI Offer Builder running on port ${PORT}`);
});