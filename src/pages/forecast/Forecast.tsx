import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Waves, TrendingUp, Info, Zap, Wind } from "lucide-react";

const FORECAST_DATA = [
  { time: '06:00', intensity: 45, frequency: 12 },
  { time: '09:00', intensity: 65, frequency: 18 },
  { time: '12:00', intensity: 85, frequency: 24 },
  { time: '15:00', intensity: 95, frequency: 32 },
  { time: '18:00', intensity: 75, frequency: 28 },
  { time: '21:00', intensity: 55, frequency: 15 },
  { time: '00:00', intensity: 40, frequency: 10 },
];

const TRENDS = [
  { name: "Cinematic Raw", val: 85, color: "#00eaff" },
  { name: "Mythic Noir", val: 72, color: "#ff5E00" },
  { name: "Analog Flux", val: 58, color: "#ec4899" },
  { name: "Hyper Surreal", val: 92, color: "#8b5cf6" },
];

export default function Forecast() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <div className="flex flex-col items-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5E00]/10 border border-[#ff5E00]/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#ff5E00] mb-6">
            <TrendingUp className="w-3 h-3" />
            Neural Swell Monitoring
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase text-white tracking-tighter text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Forecast <span className="text-[#ff5E00]">Center</span>
          </h1>
          <p className="mt-6 text-white/40 text-sm md:text-base uppercase tracking-[0.2em] font-medium text-center max-w-2xl text-balance">
            Real-time tracking of creative frequencies and aesthetic trend waves across the digital shore.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-10">
            <div className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">Frequency Amplitude</h2>
                  <p className="text-[10px] uppercase text-white/40 tracking-widest">24-Hour Predictive Neural Mapping</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#00eaff]">
                    <div className="w-2 h-2 rounded-full bg-[#00eaff]" />
                    Intensity
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#ff5E00]">
                    <div className="w-2 h-2 rounded-full bg-[#ff5E00]" />
                    Frequency
                  </div>
                </div>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={FORECAST_DATA}>
                    <defs>
                      <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00eaff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00eaff" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFrequency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff5E00" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ff5E00" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="rgba(255,255,255,0.2)" 
                      fontSize={10} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.2)" 
                      fontSize={10} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(0,234,255,0.2)',
                        borderRadius: '16px',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                      }}
                    />
                    <Area type="monotone" dataKey="intensity" stroke="#00eaff" fillOpacity={1} fill="url(#colorIntensity)" strokeWidth={3} />
                    <Area type="monotone" dataKey="frequency" stroke="#ff5E00" fillOpacity={1} fill="url(#colorFrequency)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               {[
                 { label: "Neural Flow", val: "94.2", color: "#00eaff", icon: <Zap className="w-5 h-5"/> },
                 { label: "Swell Height", val: "8.5m", color: "#ff5E00", icon: <Waves className="w-5 h-5"/> },
                 { label: "Wind Torque", val: "24kts", color: "#ec4899", icon: <Wind className="w-5 h-5"/> },
               ].map((stat, i) => (
                 <div key={i} className="glass-card p-6 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center text-center">
                   <div className="p-3 rounded-2xl bg-white/5 mb-4" style={{ color: stat.color }}>{stat.icon}</div>
                   <div className="text-2xl font-black italic uppercase text-white mb-1 tracking-tighter">{stat.val}</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Side Info Panel */}
          <div className="space-y-10">
            <div className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5">
              <h3 className="text-xl font-black italic uppercase text-white mb-8 tracking-tighter">Rising Trends</h3>
              <div className="space-y-6">
                {TRENDS.map((trend, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-white/60">{trend.name}</span>
                      <span style={{ color: trend.color }}>{trend.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${trend.val}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full shadow-[0_0_10px_currentColor]"
                        style={{ backgroundColor: trend.color, color: trend.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-[#ff5E00]/30 bg-[#ff5E00]/5 flex items-start gap-6">
              <div className="p-3 rounded-2xl bg-[#ff5E00]/10 text-[#ff5E00]">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase text-white mb-2">Creative Storm Alert</h4>
                <p className="text-xs text-white/50 leading-relaxed uppercase tracking-wider">
                  Major aesthetic shift detected in the cinematic RAW sector. Prepare metadata for high-contrast output.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
