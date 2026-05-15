import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { CreditCard, Package, History, ShieldCheck, Clock } from "lucide-react";

interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Timestamp;
  tierId: string;
}

export default function Profile() {
  const { user, userData, loading } = useAuth();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'payments'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPayments(snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        } as PaymentRecord)));
      }, (error) => {
        console.error("Error fetching payments:", error);
      });
      
      return () => unsubscribe();
    }
  }, [user]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 rounded-full border-4 border-[#00eaff] border-t-transparent animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const subStatus = userData?.subscriptionStatus || 'none';

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full text-left py-10 px-6">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12 text-[#00eaff] drop-shadow-[0_0_20px_#00eaff]">
          Your Profile
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="glass-card p-8 rounded-3xl border border-[#00eaff]/20 relative overflow-hidden bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} className="w-24 h-24 rounded-full border-4 border-[#00eaff]" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#00eaff]/20 border-4 border-[#00eaff] flex items-center justify-center text-4xl font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.displayName || "Surfer"}</h2>
                  <p className="text-cyan-200">{user.email}</p>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#00eaff]">
                    <ShieldCheck className="w-3 h-3" />
                    {userData?.role || 'Surfer'}
                  </div>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Account ID</h3>
                  <p className="text-sm font-mono bg-black/40 p-3 rounded-lg text-white/70 border border-white/10 break-all">{user.uid}</p>
                </div>
                
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Provider</h3>
                  <p className="text-sm bg-black/40 p-3 rounded-lg text-white/70 border border-white/10 capitalize">
                    {user.providerData[0]?.providerId.split('.')[0] || "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <History className="w-6 h-6 text-[#00eaff]" />
                  <h3 className="text-xl font-bold text-white">Payment History</h3>
                </div>
                {payments.length > 0 && (
                  <span className="text-xs font-black uppercase tracking-widest text-white/40">{payments.length} Transactions</span>
                )}
              </div>

              {payments.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-black/20">
                  <Clock className="w-10 h-10 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">No payment history found.</p>
                  <a href="/pricing" className="mt-4 inline-block text-[#00eaff] text-[10px] font-black uppercase tracking-[0.2em] hover:underline">View Tiers</a>
                </div>
              ) : (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00eaff]/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#00eaff]/10 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-[#00eaff]" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white capitalize">{payment.tierId?.replace(/-/g, ' ') || 'Subscription'}</div>
                          <div className="text-[10px] text-white/40 uppercase tracking-wider">
                            {payment.createdAt?.toDate().toLocaleDateString(undefined, { dateStyle: 'medium' })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">
                          {(payment.amount / 100).toLocaleString(undefined, { style: 'currency', currency: payment.currency.toUpperCase() })}
                        </div>
                        <div className={`text-[9px] font-black uppercase tracking-widest ${payment.status === 'succeeded' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {payment.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Status */}
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-[#00eaff]/30 bg-gradient-to-br from-[#00eaff]/10 to-transparent backdrop-blur-md">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#00eaff] mb-6">Status</h3>
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 border-4 ${subStatus === 'active' ? 'border-green-500 bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-white/20 bg-white/5'}`}>
                  <Package className={`w-10 h-10 ${subStatus === 'active' ? 'text-green-400' : 'text-white/20'}`} />
                </div>
                <div className="text-2xl font-black italic uppercase tracking-tighter text-white mb-1">
                  {subStatus === 'active' ? 'Inner Circle' : 'Free Rider'}
                </div>
                <div className={`text-[10px] font-black uppercase tracking-widest ${subStatus === 'active' ? 'text-green-400' : 'text-white/40'}`}>
                  {subStatus === 'active' ? 'Membership Active' : 'No Active Subscription'}
                </div>
                
                {subStatus !== 'active' && (
                  <button 
                    onClick={() => window.location.href = '/pricing'}
                    className="mt-8 w-full py-3 rounded-xl bg-[#00eaff] text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_10px_20px_rgba(0,234,255,0.3)]"
                  >
                    Upgrade Now
                  </button>
                )}
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5 text-center">
              <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                Tools are being calibrated for your current frequency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
