import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, BookOpen, Film, RefreshCw, Bell, User, Battery, Wifi, Signal, 
  Settings, X, Trophy, Sparkles, Book, ChevronRight, MessageSquare, AlertCircle
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showToast: (msg: string, type: "success" | "error" | "info") => void;
  streakCount: number;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, activeTab, setActiveTab, showToast, streakCount 
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      title: "Liquidez Expuesta",
      desc: "El par GBP/USD acaba de crear un desbalance masivo en 15M. Analiza el IDM.",
      time: "Hace 5m",
      unread: true,
      category: "signal"
    },
    {
      id: "n2",
      title: "Racha Activa de Carlos",
      desc: "¡Felicidades! Mantienes una racha de study de 5 días seguidos.",
      time: "Hace 1h",
      unread: true,
      category: "achievement"
    },
    {
      id: "n3",
      title: "SMC Guide Actualizada",
      desc: "Se cargó la Guía de Mitigación de Order Blocks por el Tutor.",
      time: "Hace 2h",
      unread: false,
      category: "resource"
    }
  ]);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("Notificaciones marcadas como leídas.", "info");
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    showToast("Bandeja de notificaciones vaciada.", "info");
  };

  return (
    <div className="min-h-screen md:py-6 md:px-4 flex items-center justify-center bg-[#0d0f14] font-sans relative overflow-hidden">
      {/* Immersive background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Mock Smartphone Container */}
      <div className="w-full h-screen md:h-[820px] md:max-w-[395px] bg-[#131722]/95 border-0 md:border-[10px] md:border-[#2c303d] rounded-none md:rounded-[48px] shadow-2xl relative flex flex-col overflow-hidden text-slate-300 select-none">
        {/* Notch / Speaker bar of mobile */}
        <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2c303d] rounded-b-2xl z-40 items-center justify-center">
          <div className="w-12 h-1.5 bg-slate-950 rounded-full mb-1" />
        </div>

        {/* Dynamic Mobile Status Bar */}
        <div className="hidden md:flex h-10 px-6 pt-2.5 items-center justify-between text-slate-400 font-medium text-[11px] z-30 shrink-0">
          <span className="font-semibold text-slate-200">{currentTime}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] text-slate-300">98%</span>
              <Battery className="w-4 h-4 text-emerald-400 fill-emerald-500/30" />
            </div>
          </div>
        </div>

        {/* App Shell Custom Header */}
        <div className="px-5 pt-8 pb-3 md:py-3 border-b border-slate-850 bg-[#161a25]/60 flex items-center justify-between z-20 shrink-0">
          {/* User profile avatar info */}
          <button 
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase border border-slate-800">
                CM
              </div>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 leading-none">Trading Partner</p>
              <h1 className="text-xs font-black text-slate-200 group-hover:text-indigo-300 transition-colors mt-0.5">
                Carlos Marín
              </h1>
            </div>
          </button>

          {/* Action buttons (Notification + Settings) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowNotificationPanel(true)}
              className="w-8.5 h-8.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 flex items-center justify-center relative cursor-pointer"
            >
              <Bell className="w-4 h-4 text-slate-400 hover:text-slate-200 transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-[#131722] animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowProfileModal(true)}
              className="w-8.5 h-8.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 flex items-center justify-center cursor-pointer"
            >
              <Settings className="w-4 h-4 text-slate-400 hover:text-slate-200 transition-colors" />
            </button>
          </div>
        </div>

        {/* Main Interactive Screen Content Wrapper */}
        <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-none relative">
          {children}
        </div>

        {/* Floating notifications alert slideover panel */}
        <AnimatePresence>
          {showNotificationPanel && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute top-0 right-0 w-full h-full bg-[#131722]/98 z-50 flex flex-col shadow-2xl border-l border-slate-800"
            >
              <div className="hidden md:block h-10 shrink-0" /> {/* Spacer for notch */}
              <div className="px-5 pt-8 pb-4 md:py-4 border-b border-slate-850 bg-[#161a25]/60 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider">Centro de Señales</h3>
                </div>
                <button
                  onClick={() => setShowNotificationPanel(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Notification Items List */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2.5">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-60">
                    <Bell className="w-10 h-10 text-slate-600 mb-2.5" />
                    <p className="text-xs font-bold text-slate-400">Sin señales ni avisos</p>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Te notificaremos cuando el algoritmo de mercado exponga liquidez válida en tus pares favoritos.</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                        notif.unread
                          ? "bg-indigo-950/20 border-indigo-500/25 shadow-sm shadow-indigo-950"
                          : "bg-slate-900/30 border-slate-800"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1.5">
                          {notif.unread && (
                            <span className="w-2 h-2 bg-indigo-500 rounded-full shrink-0" />
                          )}
                          <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">
                            {notif.title}
                          </h4>
                        </div>
                        <span className="text-[8px] text-slate-500 font-medium">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        {notif.desc}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Action buttons at bottom */}
              {notifications.length > 0 && (
                <div className="p-4 border-t border-slate-850 bg-[#161a25]/60 flex gap-2 shrink-0">
                  <button
                    onClick={handleMarkAllRead}
                    className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[10px] font-bold py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Marcar todo leídos
                  </button>
                  <button
                    onClick={handleClearNotifications}
                    className="flex-1 bg-red-950/20 hover:bg-red-950/35 border border-red-900/30 text-red-300 text-[10px] font-bold py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Vaciar Bandeja
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile / Stats / Settings info modal */}
        <AnimatePresence>
          {showProfileModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-5 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="w-full bg-[#131722] border border-slate-800 rounded-[28px] overflow-hidden shadow-2xl p-5 flex flex-col gap-4 max-w-[320px]"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-850">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tu Perfil Técnico</span>
                  <button 
                    onClick={() => setShowProfileModal(false)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col items-center text-center py-2">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg border border-indigo-400/20 mb-3">
                    CM
                  </div>
                  <h3 className="text-sm font-bold text-slate-200">Carlos Marín</h3>
                  <p className="text-[10px] text-indigo-400 mt-1 uppercase tracking-widest font-black">SMC Apprentice Partner</p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Racha de Estudio:</span>
                    <span className="text-[11px] font-bold text-orange-400 flex items-center gap-1">
                      {streakCount} Días 🔥
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Rango de Analista:</span>
                    <span className="text-[11px] font-bold text-blue-400">SMC Padawan</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Pares Sincronizados:</span>
                    <span className="text-[11px] font-bold text-slate-300">EURUSD, GBPUSD</span>
                  </div>
                </div>

                <div className="mt-2 text-center text-[9px] text-slate-500">
                  SMC Inducement Mentor v1.4.0 • Desarrollado con Inteligencia Artificial
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Navigation Bar at Bottom */}
        <div className="h-[68px] bg-[#161a25] border-t border-slate-850 flex items-center justify-around px-2 shrink-0 z-30 pb-2">
          {/* PDF Tutor Tab (Primary / First) */}
          <button
            onClick={() => setActiveTab("pdf-tutor")}
            className={`flex flex-col items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all duration-300 ${
              activeTab === "pdf-tutor"
                ? "text-indigo-400 scale-105"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Tutor PDF</span>
          </button>

          {/* Quiz SMC Tab (Second) */}
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex flex-col items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all duration-300 ${
              activeTab === "quiz"
                ? "text-indigo-400 scale-105"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Quiz SMC</span>
          </button>

          {/* Video Coach Tab (Third) */}
          <button
            onClick={() => setActiveTab("video-coach")}
            className={`flex flex-col items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all duration-300 ${
              activeTab === "video-coach"
                ? "text-indigo-400 scale-105"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Film className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Videos</span>
          </button>

          {/* TradingView Tab (Fourth) */}
          <button
            onClick={() => setActiveTab("tradingview")}
            className={`flex flex-col items-center gap-1.5 py-1.5 px-3 rounded-xl transition-all duration-300 ${
              activeTab === "tradingview"
                ? "text-indigo-400 scale-105"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <RefreshCw className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider">TradingView</span>
          </button>
        </div>
      </div>
    </div>
  );
};
