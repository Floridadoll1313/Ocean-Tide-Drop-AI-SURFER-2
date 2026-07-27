import { Outlet } from "react-router-dom";

export default function MembersLayout() {
  return (
    <div className="min-h-screen bg-red-900 text-white">

      <h1 className="text-4xl p-10">
        MEMBERS LAYOUT IS LOADING
      </h1>

      <Outlet />

    </div>
  );
}
