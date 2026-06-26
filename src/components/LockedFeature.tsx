import React from "react";

type Props = {
  unlocked: boolean;
  title: string;
  children: React.ReactNode;
};

export default function LockedFeature({ unlocked, title, children }: Props) {
  if (!unlocked) {
    return (
      <div className="p-6 rounded-xl bg-slate-900 opacity-50 border border-slate-700">
        <h3 className="text-lg font-semibold mb-2">🔒 {title}</h3>
        <p className="text-slate-400 text-sm">
          Upgrade tier to unlock this module.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-blue-600">
      <h3 className="text-lg font-semibold mb-3">⚡ {title}</h3>
      {children}
    </div>
  );
}