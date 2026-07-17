import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, Video, Compass, ExternalLink, HelpCircle, Award, 
  Clock, BookOpen, Layers, CheckCircle2, Tv, Sparkles
} from "lucide-react";

interface VideoCoachViewProps {
  showToast: (msg: string, type: "success" | "error" | "info") => void;
}

export const VideoCoachView: React.FC<VideoCoachViewProps> = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState<"youtube" | "shorts">("youtube");
  const [selectedYtVideo, setSelectedYtVideo] = useState({
    id: "mS8ZzR_qOks", // Top-tier SMC spanish educational video
    title: "Estructura de Mercado SMC: BOS, CHoCH & Inducement",
    author: "Smart Money Academy",
    duration: "14:20"
  });

  const youtubeVideos = [
    {
      id: "mS8ZzR_qOks",
      title: "Estructura de Mercado SMC: BOS, CHoCH & Inducement",
      author: "Smart Money Academy",
      duration: "14:20",
      description: "La mejor guía introductoria para mapear estructuras institucionales paso a paso. Aprende a marcar altos y bajos fuertes confirmando la toma de liquidez interna."
    },
    {
      id: "S_8P338D5Gk",
      title: "Cómo Encontrar la Entrada Perfecta usando Order Blocks",
      author: "Institutional Trader",
      duration: "11:45",
      description: "Aprende el concepto de mitigación de bloques de órdenes decisionales y extremos. Identifica desbalances (FVG) de alta probabilidad en el descuento."
    },
    {
      id: "q_rshv8WJcM",
      title: "Estrategia del Rango de Asia y Barridos en Londres",
      author: "Trading de Precisión",
      duration: "18:10",
      description: "Cómo operar el barrido de liquidez de la sesión asiática en las aperturas de Londres y Nueva York para operaciones intradía 1:5+ de ratio riesgo/beneficio."
    }
  ];

  const socialShorts = [
    {
      id: "short1",
      platform: "TikTok",
      title: "¿Qué es el Inducement (IDM)? Explicación Rápida",
      creator: "@smc_carlos_partner",
      duration: "0:58",
      views: "125K",
      color: "from-teal-600 to-emerald-500",
      notes: "El primer retroceso válido que induce a los minoristas a comprar temprano. El mercado barre este punto buscando liquidez.",
      url: "https://www.tiktok.com/tag/smartmoneyconcepts"
    },
    {
      id: "short2",
      platform: "Instagram",
      title: "Cómo Evitar Falsas Rupturas (Fakeouts) en 60s",
      creator: "@institucional_trader_reel",
      duration: "1:00",
      views: "94K",
      color: "from-pink-600 to-rose-500",
      notes: "Los BOS de mecha no son válidos. Solo confirma la continuación estructural si el cuerpo de la vela cierra por encima.",
      url: "https://www.instagram.com/explore/tags/smartmoneyconcepts/"
    },
    {
      id: "short3",
      platform: "TikTok",
      title: "El Secreto del Order Block con Imbalance (FVG)",
      creator: "@smc_hacks",
      duration: "0:45",
      views: "180K",
      color: "from-violet-600 to-indigo-500",
      notes: "Un bloque de órdenes sin FVG tiene un 70% menos de probabilidades de reaccionar. El desbalance es el imán de liquidez.",
      url: "https://www.tiktok.com/tag/orderblock"
    }
  ];

  const handleSelectYtVideo = (video: typeof youtubeVideos[0]) => {
    setSelectedYtVideo(video);
    showToast(`Cargando video de YouTube: ${video.title}`, "success");
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      
      {/* Category selector */}
      <div className="bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800 flex justify-between items-center">
        <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5 ml-1">
          <Tv className="w-4 h-4 text-red-500 animate-pulse" />
          <span>SMC Coach de Videos</span>
        </h3>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850">
          <button
            onClick={() => {
              setActiveTab("youtube");
              showToast("Mostrando clases maestras de YouTube...", "info");
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
              activeTab === "youtube"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            YouTube
          </button>
          <button
            onClick={() => {
              setActiveTab("shorts");
              showToast("Mostrando Shorts y Reels educativos...", "info");
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
              activeTab === "shorts"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Reels / TikTok
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "youtube" ? (
          <motion.div
            key="youtube-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4"
          >
            {/* Active Embedded YouTube Player Card */}
            <div className="bg-slate-950 rounded-2xl border border-slate-850 overflow-hidden shadow-lg flex flex-col">
              <div className="aspect-video w-full bg-slate-900 relative">
                <iframe
                  key={selectedYtVideo.id}
                  src={`https://www.youtube.com/embed/${selectedYtVideo.id}?autoplay=0&rel=0`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedYtVideo.title}
                />
              </div>

              {/* Video metadata */}
              <div className="p-3 bg-slate-900/95 border-t border-slate-850">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                      YouTube Class
                    </span>
                    <h3 className="text-xs font-black text-slate-100 mt-1 leading-normal">
                      {selectedYtVideo.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-semibold">
                      Coach: {selectedYtVideo.author}
                    </p>
                  </div>
                  <span className="text-[9px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded shrink-0">
                    {selectedYtVideo.duration} mins
                  </span>
                </div>
              </div>
            </div>

            {/* Curated YouTube list */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Colección de Clases Maestras (SMC)
              </h4>

              <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto scrollbar-thin pr-1">
                {youtubeVideos.map((video) => {
                  const isSelected = selectedYtVideo.id === video.id;
                  return (
                    <button
                      key={video.id}
                      onClick={() => handleSelectYtVideo(video)}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-300 flex items-start gap-3 cursor-pointer group ${
                        isSelected
                          ? "bg-[#161a25] border-indigo-500 text-indigo-200 shadow shadow-indigo-950"
                          : "bg-slate-900/40 border-slate-850 text-slate-300 hover:border-slate-800"
                      }`}
                    >
                      <div className="w-16 aspect-video bg-slate-950 rounded-lg flex items-center justify-center shrink-0 border border-slate-800 relative group-hover:border-indigo-500/30 transition-colors">
                        <Play className={`w-5 h-5 ${isSelected ? "text-indigo-400 fill-indigo-400/20" : "text-slate-500 fill-slate-500/10 group-hover:text-indigo-400"} transition-all`} />
                        <span className="absolute bottom-0.5 right-0.5 text-[8px] font-mono bg-slate-900/80 px-1 rounded text-slate-400">
                          {video.duration}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-[11px] font-bold leading-tight text-slate-200 group-hover:text-indigo-400 transition-colors">
                          {video.title}
                        </h5>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                          {video.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="shorts-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4"
          >
            {/* Introductory text */}
            <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-2xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
              <p className="text-[10px] text-slate-400 leading-normal">
                Explora shorts y reels diseñados para entender conceptos específicos de SMC en menos de 1 minuto. Puedes repasar las notas estructurales del Coach o abrir el video original.
              </p>
            </div>

            {/* Vertical social shorts list */}
            <div className="flex flex-col gap-2.5 max-h-[360px] overflow-y-auto scrollbar-thin pr-1">
              {socialShorts.map((short) => (
                <div 
                  key={short.id}
                  className="p-3 rounded-2xl bg-slate-900/30 border border-slate-850 hover:border-slate-800 transition-all flex flex-col gap-2.5"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[8px] font-black text-white uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${
                        short.platform === "TikTok" ? "from-indigo-600 to-pink-500" : "from-pink-600 to-orange-500"
                      }`}>
                        {short.platform}
                      </span>
                      <span className="text-[9px] text-slate-500 font-bold">{short.creator}</span>
                    </div>
                    <span className="text-[8px] text-slate-400 font-mono flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-indigo-400" /> {short.duration}s
                    </span>
                  </div>

                  <div className="flex gap-3 items-start">
                    {/* Visual Mock Player Thumbnail */}
                    <a 
                      href={short.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      onClick={() => showToast(`Abriendo ${short.platform} Short...`, "success")}
                      className={`w-14 h-20 bg-gradient-to-tr ${short.color} rounded-xl border border-white/10 flex items-center justify-center shrink-0 relative shadow group overflow-hidden cursor-pointer`}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      <Play className="w-5 h-5 text-white fill-white/25 drop-shadow group-hover:scale-110 transition-transform z-10" />
                    </a>

                    {/* Explanatory notes & details */}
                    <div className="flex-1">
                      <h4 className="text-[11px] font-bold text-slate-100 leading-snug">
                        {short.title}
                      </h4>
                      
                      {/* Coach structural guide block */}
                      <div className="mt-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-850/80">
                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-0.5 mb-1">
                          <Award className="w-2.5 h-2.5" /> Concepto Clave
                        </span>
                        <p className="text-[10px] text-slate-400 leading-normal font-medium">
                          {short.notes}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Outbound Link Button */}
                  <a
                    href={short.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    onClick={() => showToast(`Redirigiendo a ${short.platform} original...`, "success")}
                    className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-black py-1.5 rounded-xl text-center transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Ver en {short.platform} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
