import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, BookOpen, ExternalLink, RefreshCw, BarChart2, ShieldAlert,
  ChevronRight, Award, Compass, Layers, CheckCircle2, AlertTriangle
} from "lucide-react";

interface TradingViewViewProps {
  showToast: (msg: string, type: "success" | "error" | "info") => void;
}

export const TradingViewView: React.FC<TradingViewViewProps> = ({ showToast }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<"EURUSD" | "GBPUSD" | "XAUUSD">("XAUUSD");
  const [activeIdeaCategory, setActiveIdeaCategory] = useState<string>("all");

  const symbolsMap = {
    EURUSD: {
      title: "EUR/USD • Euro / Dólar Estadounidense",
      id: "FX:EURUSD",
      chartUrl: "https://s.tradingview.com/widgetembed/?symbol=FX:EURUSD&theme=dark&locale=es&interval=15",
      gaugeUrl: "https://s.tradingview.com/embed-widget/technical-analysis/?locale=es#%7B%22interval%22%3A%2215m%22%2C%22width%22%3A%22100%25%22%2C%22isTransparent%22%3Atrue%2C%22height%22%3A%22100%25%22%2C%22symbol%22%3A%22FX%3AEURUSD%22%2C%22showIntervalTabs%22%3Afalse%2C%22theme%22%3A%22dark%22%7D",
    },
    GBPUSD: {
      title: "GBP/USD • Libra Esterlina / Dólar",
      id: "FX:GBPUSD",
      chartUrl: "https://s.tradingview.com/widgetembed/?symbol=FX:GBPUSD&theme=dark&locale=es&interval=15",
      gaugeUrl: "https://s.tradingview.com/embed-widget/technical-analysis/?locale=es#%7B%22interval%22%3A%2215m%22%2C%22width%22%3A%22100%25%22%2C%22isTransparent%22%3Atrue%2C%22height%22%3A%22100%25%22%2C%22symbol%22%3A%22FX%3AGBPUSD%22%2C%22showIntervalTabs%22%3Afalse%2C%22theme%22%3A%22dark%22%7D",
    },
    XAUUSD: {
      title: "XAU/USD • Oro / Dólar Estadounidense",
      id: "OANDA:XAUUSD",
      chartUrl: "https://s.tradingview.com/widgetembed/?symbol=OANDA:XAUUSD&theme=dark&locale=es&interval=15",
      gaugeUrl: "https://s.tradingview.com/embed-widget/technical-analysis/?locale=es#%7B%22interval%22%3A%2215m%22%2C%22width%22%3A%22100%25%22%2C%22isTransparent%22%3Atrue%2C%22height%22%3A%22100%25%22%2C%22symbol%22%3A%22OANDA%3AXAUUSD%22%2C%22showIntervalTabs%22%3Afalse%2C%22theme%22%3A%22dark%22%7D",
    }
  };

  const handleSymbolChange = (sym: "EURUSD" | "GBPUSD" | "XAUUSD") => {
    setSelectedSymbol(sym);
    showToast(`Cargando gráfico interactivo de ${sym}...`, "info");
  };

  const tradingviewIdeas = [
    {
      id: "idea_gold",
      title: "Expansión del Oro (XAU/USD) y Caza de Liquidez",
      desc: "El Oro está aumentando exponencialmente. Análisis institucional del barrido de máximos históricos y mitigación en zonas de descuento diario.",
      author: "SMC_Gold_Strategist",
      category: "liquidity",
      likes: "3,410",
      pair: "XAU/USD",
      url: "https://es.tradingview.com/ideas/?type=education",
      analysis: [
        "El aumento masivo del Oro responde a la inyección de capital en busca de refugio.",
        "Antes de cada impulso alcista, el algoritmo barre la liquidez de venta minorista por debajo del IDM de 15M.",
        "Se recomienda vigilar el bloque de órdenes extremo originador para un ratio riesgo/beneficio óptimo."
      ]
    },
    {
      id: "idea1",
      title: "Estructura Alcista con Inducement (IDM)",
      desc: "Cómo identificar el primer retroceso válido. El precio toma liquidez del IDM en sesión de Londres y reacciona en el OB Extremo.",
      author: "SMC_Master_Mentor",
      category: "inducement",
      likes: "1,240",
      pair: "EUR/USD",
      url: "https://es.tradingview.com/ideas/?type=education",
      analysis: [
        "El punto más bajo del primer retroceso válido actúa como IDM.",
        "Las órdenes retail de compra anticipada colocan stops por debajo de este punto.",
        "El algoritmo interbancario barre el nivel, mitigando un Order Block oculto antes del BOS."
      ]
    },
    {
      id: "idea2",
      title: "Mitigación de Order Blocks Decisionales",
      desc: "Análisis técnico de cuándo entrar en el OB Decisional vs. el OB Extremo. Cómo filtrar falsos rompimientos usando temporalidades menores.",
      author: "Institutional_Flow",
      category: "orderblocks",
      likes: "940",
      pair: "GBP/USD",
      url: "https://es.tradingview.com/ideas/?type=education",
      analysis: [
        "El OB Decisional es el que genera la fuerza para romper el último máximo/mínimo.",
        "Debe tener un desbalance visible (Fair Value Gap/FVG) adyacente.",
        "Si no toma liquidez previa antes del OB Decisional, prefiere buscar el Extremo."
      ]
    },
    {
      id: "idea3",
      title: "Diferencia Real entre CHoCH y BOS",
      desc: "No te dejes engañar por rompimientos de mecha. Aprende a mapear estructuras usando cuerpos de velas para confirmar la continuación de la tendencia.",
      author: "SmartMoneyCo",
      category: "structure",
      likes: "1,820",
      pair: "EUR/USD",
      url: "https://es.tradingview.com/ideas/?type=education",
      analysis: [
        "CHoCH es el primer cambio de carácter que rompe el extremo estructural opuesto.",
        "BOS es la confirmación continuista del movimiento a favor de la tendencia.",
        "Cierre con cuerpo de vela en temporalidad de 15M/1H es indispensable para validez."
      ]
    },
    {
      id: "idea4",
      title: "Liquidity Sweeps y Sesión Asiática",
      desc: "Estrategia de rango asiático. Barrido del máximo y mínimo de Asia durante la apertura de Londres para capturar liquidez de alta precisión.",
      author: "Liquidity_SMC",
      category: "liquidity",
      likes: "2,050",
      pair: "EUR/USD & GBP/USD",
      url: "https://es.tradingview.com/ideas/?type=education",
      analysis: [
        "El rango de Asia acumula volumen de stops en ambos extremos.",
        "Londres barre un lado para inducir volumen atrapado.",
        "La verdadera expansión ocurre en la dirección contraria del barrido inicial."
      ]
    }
  ];

  const filteredIdeas = activeIdeaCategory === "all" 
    ? tradingviewIdeas 
    : tradingviewIdeas.filter(idea => idea.category === activeIdeaCategory);

  return (
    <div className="flex flex-col gap-4 pb-6">
      
      {/* Header Info */}
      <div className="bg-gradient-to-r from-[#17223b] to-[#161a25] p-4 rounded-3xl border border-blue-500/15 shadow-md flex justify-between items-center">
        <div>
          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            Integración de Mercado
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-2 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Terminal de Ideas TradingView
          </h2>
        </div>
        
        {/* Toggle EUR/USD vs GBP/USD vs XAU/USD */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 gap-0.5">
          <button
            onClick={() => handleSymbolChange("EURUSD")}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
              selectedSymbol === "EURUSD"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            EUR
          </button>
          <button
            onClick={() => handleSymbolChange("GBPUSD")}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
              selectedSymbol === "GBPUSD"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            GBP
          </button>
          <button
            onClick={() => handleSymbolChange("XAUUSD")}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
              selectedSymbol === "XAUUSD"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ORO
          </button>
        </div>
      </div>

      {/* Real Live Interactive TradingView Chart */}
      <div className="bg-[#11131a] rounded-2xl border border-slate-850 overflow-hidden shadow-lg h-[260px] relative flex flex-col">
        <div className="px-3.5 py-2 bg-[#171a26]/90 border-b border-slate-850 flex items-center justify-between text-slate-400 text-[10px] shrink-0 font-semibold">
          <span className="text-slate-200 flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
            Gráfico en Vivo {selectedSymbol} (15M)
          </span>
          <span className="text-[9px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-1.5 py-0.5 rounded uppercase font-black">
            INTERACTIVO
          </span>
        </div>
        
        {/* TradingView Widget Iframe Embed */}
        <div className="flex-1 w-full bg-[#131722]">
          <iframe
            key={selectedSymbol}
            src={symbolsMap[selectedSymbol].chartUrl}
            className="w-full h-full border-0 select-none"
            allowFullScreen
            title={`TradingView Chart ${selectedSymbol}`}
          />
        </div>
      </div>

      {/* Indicator Widget & Call To Action */}
      <div className="grid grid-cols-5 gap-3">
        {/* Technical Gauge (3-cols) */}
        <div className="col-span-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
            Análisis Técnico 15M
          </span>
          <div className="w-full h-16 flex items-center justify-center overflow-hidden">
            <iframe
              key={`gauge-${selectedSymbol}`}
              src={symbolsMap[selectedSymbol].gaugeUrl}
              className="w-full h-[180px] scale-[0.68] -mt-10 border-0 pointer-events-none"
              title={`TradingView Gauge ${selectedSymbol}`}
            />
          </div>
        </div>

        {/* Call to TradingView Link (2-cols) */}
        <a
          href="https://es.tradingview.com/ideas/?type=education"
          target="_blank"
          referrerPolicy="no-referrer"
          onClick={() => showToast("Abriendo Ideas Educativas de TradingView en nueva pestaña...", "success")}
          className="col-span-2 bg-gradient-to-b from-indigo-950/45 to-[#161a25] p-3 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 hover:from-indigo-900/50 transition-all duration-300 flex flex-col items-center justify-center text-center group"
        >
          <Compass className="w-5 h-5 text-indigo-400 group-hover:scale-110 group-hover:text-indigo-300 transition-transform mb-1.5" />
          <span className="text-[9px] font-black text-slate-200 uppercase tracking-wide leading-tight">
            Explorar Ideas
          </span>
          <span className="text-[8px] text-indigo-400 mt-1 font-bold flex items-center gap-0.5">
            TradingView <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </a>
      </div>

      {/* Educational Ideas Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-500" />
            Guías de Análisis (SMC Concepts)
          </h3>
          
          <a
            href="https://es.tradingview.com/ideas/?type=education"
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-[9px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-0.5"
          >
            Ver más en TV ↗
          </a>
        </div>

        {/* Filter Badges */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: "all", label: "Todos" },
            { id: "inducement", label: "Inducement" },
            { id: "orderblocks", label: "Order Blocks" },
            { id: "structure", label: "Estructura" },
            { id: "liquidity", label: "Liquidez" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveIdeaCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase transition-all shrink-0 cursor-pointer ${
                activeIdeaCategory === cat.id
                  ? "bg-slate-800 text-indigo-300 border border-indigo-500/30"
                  : "bg-slate-950/40 text-slate-400 border border-transparent hover:text-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Ideas Feed list */}
        <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto scrollbar-thin pr-1">
          {filteredIdeas.map((idea) => (
            <div 
              key={idea.id}
              className="p-3 rounded-xl bg-slate-900/40 border border-slate-850 hover:border-slate-800 transition-all flex flex-col gap-2.5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-indigo-500/10 text-indigo-400 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase border border-indigo-500/20">
                      {idea.pair}
                    </span>
                    <span className="text-[9px] text-slate-500">por {idea.author}</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-200 mt-1 leading-tight">
                    {idea.title}
                  </h4>
                </div>
                <span className="text-[9px] font-bold text-amber-500 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded-full uppercase">
                  SMC
                </span>
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                {idea.desc}
              </p>

              {/* Tutor's technical insights check list */}
              <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-850">
                <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1 mb-1.5">
                  <Award className="w-3 h-3" />
                  Mapeo Estructural del Tutor
                </span>
                <div className="flex flex-col gap-1">
                  {idea.analysis.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[10px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outbound Link */}
              <a
                href={idea.url}
                target="_blank"
                referrerPolicy="no-referrer"
                onClick={() => showToast(`Navegando a la lección de ${idea.category} en TradingView...`, "info")}
                className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold py-1.5 rounded-lg text-center transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                Analizar Idea en TradingView <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
