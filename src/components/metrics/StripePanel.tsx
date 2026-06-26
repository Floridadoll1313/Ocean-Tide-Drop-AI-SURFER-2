export default function StripePanel() {
  const fakeRevenue = {
    today: 42,
    week: 318,
    month: 1420,
  };

  return (
    <div className="glass">
      <h2 className="text-xl font-bold">💳 Stripe Flow</h2>

      <p className="mt-2">Today: ${fakeRevenue.today}</p>
      <p>This Week: ${fakeRevenue.week}</p>
      <p>This Month: ${fakeRevenue.month}</p>
    </div>
  );
}