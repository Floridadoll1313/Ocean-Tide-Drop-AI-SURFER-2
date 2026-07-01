export default function DashboardLayout() {
  const [view, setView] = useState("home");

  // FORCE TEST OVERRIDE:
  return <div style={{background: 'red', color: 'white', padding: 50, fontSize: 30}}>🚨 TESTING HARD OVERRIDE</div>;

  // Comment out your old return temporarily:
  // return ( ... )
}
