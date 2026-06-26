export default function Dashboard({ userTier }: { userTier: string }) {
  return (
    <div className="min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold">📊 Dashboard</h1>
      <p>User Tier: {userTier}</p>
    </div>
  );
}