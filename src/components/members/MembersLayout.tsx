export default function MembersLayout() {
  const [tideMode, setTideMode] = useState<TideMode>("auto");
  const tide = getTideInfo(tideMode);

  return (
    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        bg-fixed
        bg-no-repeat
        text-white
      "
      style={{
        backgroundImage: 'url("/OTD-AI-Surfer-Members-bg.png")',
      }}
    >
      <div className={`min-h-screen p-6 ${tide.overlay}`}>
        <div className="flex gap-6">
          <aside
            className="
              hidden
              md:flex
              w-80
              flex-col
              rounded-3xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              p-6
              shadow-2xl
              h-fit
            "
          >
            {/* Sidebar Contents */}
          </aside>

          {/* Ensure child routes render transparently over the background */}
          <main className="flex-1 bg-transparent">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
