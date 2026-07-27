import { Outlet } from "react-router-dom";

export default function MembersLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <main>
        <Outlet />
      </main>

    </div>
  );
}
