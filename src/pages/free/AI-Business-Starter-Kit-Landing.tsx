export default function StarterKit({ tier, rank }) {
  return (
    <div className="space-y-12">

      {/* 🟢 PUBLIC SURFACE */}
      <header>
        <h1>AI Business Starter Kit</h1>
        <p>Surf Edition — start building your AI income wave 🌊</p>
      </header>

      <section>
        <h2>What you’ll build</h2>
        <p>Preview of transformation system...</p>
      </section>

      {/* 🟤 STEP 1 */}
      <TierGate tier={tier} minTier="bronze" rank={rank}>
        <section>
          <h2>Step 1: Pick Your AI Role</h2>
          <p>Unlocked automation foundation...</p>
        </section>
      </TierGate>

      {/* 🔵 STEP 2–4 */}
      <TierGate tier={tier} minTier="wave" rank={rank}>

        <SectionGate title="Step 2: Copy Starter Prompts"
          preview="AI connects your ideas into usable prompts..." />

        <SectionGate title="Step 3: Automate One Task"
          preview="Your first workflow starts forming..." />

        <SectionGate title="Step 4: First Win System"
          preview="Revenue activation system..." />

      </TierGate>

      {/* 🌋 BONUS */}
      <TierGate tier={tier} minTier="tsunami" rank={rank}>
        <section className="p-6 border border-yellow-400/20">
          <h2>🔥 Bonus Vault</h2>
          <p>Advanced automation + scaling systems</p>
        </section>
      </TierGate>

    </div>
  );
}