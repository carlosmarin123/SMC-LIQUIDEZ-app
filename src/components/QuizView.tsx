import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, Trophy, Award, Star, ChevronRight, CheckCircle2, 
  HelpCircle, RefreshCw, Layers, Sparkles, BookOpen, Clock, Play
} from "lucide-react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  graphic: string;
  concept: string;
}

interface Deck {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  cards: Flashcard[];
}

interface QuizViewProps {
  showToast: (msg: string, type: "success" | "error" | "info") => void;
  onRefreshStats: () => void;
}

const ANKI_DECKS: Deck[] = [
  {
    id: "deck-structure",
    name: "Estructuras y Rompimientos",
    description: "Mapeo institucional, BOS, CHoCH, Altos Fuertes y Bajos Débiles.",
    icon: "Layers",
    color: "from-blue-600 to-indigo-500",
    cards: [
      {
        id: "struct-c1",
        concept: "BOS Válido",
        front: "¿Qué se requiere obligatoriamente para confirmar un BOS válido en SMC?",
        back: "Para que un Break of Structure (BOS) sea válido, el precio DEBE haber tomado primero un Inducement (IDM) previo para capturar liquidez, y el cuerpo de la vela debe cerrar por encima (alcista) o debajo (bajista) del extremo estructural anterior. Los rompimientos únicamente con mechas son solo tomas de liquidez, no BOS.",
        graphic: "H1 (Alto)   IDM (Barrido)\n───▲───────────▼───────────► BOS (Cierre de vela)\n                       ▲\n                      OB Mitigado"
      },
      {
        id: "struct-c2",
        concept: "BOS vs CHoCH",
        front: "¿Cuál es la diferencia crítica entre un BOS y un CHoCH?",
        back: "El BOS (Break of Structure) es un rompimiento continuista de la estructura a favor del flujo de órdenes (Order Flow) actual tras capturar liquidez. El CHoCH (Change of Character) es el primer cambio de tendencia legítimo, y ocurre al romperse el último mínimo fuerte (en tendencia alcista) o máximo fuerte (en tendencia bajista) tras una toma de liquidez.",
        graphic: "Alcista: ▲ alto -> ▼ mínimo fuerte -> █ BOS continuo\nCHoCH:   ▼ mínimo fuerte roto -> █ Cambio a Bajista"
      },
      {
        id: "struct-c3",
        concept: "Alto Fuerte",
        front: "¿Qué es un 'Alto Fuerte' (Strong High) en una estructura bajista?",
        back: "Es el máximo estructural que genera el impulso que toma el Inducement (IDM) y rompe el mínimo estructural anterior (BOS bajista). Es un punto altamente protegido por el flujo de órdenes institucional y difícil de romper sin un cambio real de carácter.",
        graphic: "[Strong High] (Máximo Protegido)\n     █\n    █ █          [Inducement]\n   █   █              █\n        █   ▲        █ █   ▲\n         █ █ █      █   █ █ █\n          ▼   ▼    ▼     ▼   ▼ [BOS Bajista]"
      },
      {
        id: "struct-c4",
        concept: "Fuerza del Cuerpo",
        front: "¿Por qué un rompimiento únicamente con mecha de vela no se considera BOS?",
        back: "Porque las mechas representan tomas de liquidez (sweeps) o mitigaciones rápidas del algoritmo interbancario. No demuestran suficiente fuerza o volumen de contratos institucional comprometidos. Solo el cierre con cuerpo de vela confirma que el flujo de órdenes mantiene la dirección elegida.",
        graphic: "Mecha sola:  ───┼─── (Toma de Liquidez / Sweep)\nCuerpo vela: ───███── (BOS Confirmado)"
      }
    ]
  },
  {
    id: "deck-liquidity",
    name: "Liquidez e Inducement (IDM)",
    description: "Retrocesos válidos, captura de liquidez, Asia sweeps y trampas de mercado.",
    icon: "Sparkles",
    color: "from-amber-500 to-orange-500",
    cards: [
      {
        id: "liq-c1",
        concept: "Inducement (IDM)",
        front: "¿Qué es el Inducement (IDM) y dónde se ubica exactamente en el gráfico?",
        back: "Es el primer retroceso válido del precio más cercano en la estructura. Se ubica en el mínimo de ese retroceso (en estructura alcista) o en el máximo (en estructura bajista). El mercado induce a operar de forma anticipada a los minoristas y luego barre este nivel para cargar liquidez antes de la verdadera expansión.",
        graphic: "Impulso Alcista ───► Retroceso [IDM] ───► Impulso (IDM Barrido)\n                             ▲\n                   (Retail compra aquí temprano)"
      },
      {
        id: "liq-c2",
        concept: "Retroceso Válido",
        front: "¿Cómo se diferencia un retroceso válido de un retroceso falso para marcar IDM?",
        back: "Un retroceso válido requiere que la vela actual barra o rompa el máximo/mínimo de la vela previa que tiene el punto más alto/bajo. Si la vela está contenida completamente dentro del rango de la vela anterior (Inside Bar), el movimiento no es un retroceso estructural válido.",
        graphic: "Vela Madre [█] -> Inside Bar [│] (NO VÁLIDO)\nVela Madre [█] -> Mínimo/Máximo roto [█] (RETROCESO VÁLIDO)"
      },
      {
        id: "liq-c3",
        concept: "Rango Asiático",
        front: "¿Qué es la Liquidez del Rango Asiático (Asian Range) y cómo se opera?",
        back: "Es la acumulación de stop losses por encima y por debajo del rango de consolidación que se forma durante la sesión asiática. Londres barre un extremo (captura stops) e induce volumen atrapado. La verdadera expansión ocurre en la dirección contraria del barrido inicial.",
        graphic: "[Asia Range] ───► Londres barre máximo ───► Cae a Nueva York\n   █████                 ▲ (Sweeps stops)\n  (Lateral)"
      },
      {
        id: "liq-c4",
        concept: "OB sin Inducement",
        front: "¿Qué sucede cuando el precio llega a un Order Block (OB) sin haber tomado IDM previo?",
        back: "El Order Block corre un peligro extremo de ser roto y fallar (actuando como trampa de liquidez minorista). El algoritmo interbancario necesita el combustible de la liquidez de venta para comprar, por lo que usará el OB fallido como incentivo y barrerá más profundo.",
        graphic: "OB sin IDM = Trampa Retail (S/R)\nSuele ser roto con fuerza (Stop hunt)."
      }
    ]
  },
  {
    id: "deck-gold",
    name: "Oro / XAUUSD & Order Blocks",
    description: "Análisis técnico del Oro, ineficiencias de mercado, FVG y refinamiento de entradas.",
    icon: "Trophy",
    color: "from-yellow-500 to-amber-600",
    cards: [
      {
        id: "gold-c1",
        concept: "Volatilidad del Oro",
        front: "¿Por qué el Oro (XAU/USD) es altamente reactivo a los bloques de órdenes extremos?",
        back: "El Oro es un activo de altísima volatilidad y volumen. El algoritmo interbancario acumula grandes órdenes en el 'Originating Block' (Extremo) y tiende a barrer de manera agresiva los bloques decisionales intermedios para eliminar manos débiles antes del gran rally alcista o bajista.",
        graphic: "XAU/USD: Agresivo y veloz\n[OB Decisional] ───► Barrido con mecha profunda\n[OB Extremo] ───► Reacción perfecta hacia nuevos máximos"
      },
      {
        id: "gold-c2",
        concept: "OB de Alta Probabilidad",
        front: "¿Qué características validan un Order Block institucional de alta probabilidad?",
        back: "1. Debe haber causado un desbalance real en el precio (Fair Value Gap/Imbalance visible).\n2. Debe haber tomado liquidez previa (un máximo/mínimo anterior o IDM).\n3. Debe haber originado el rompimiento estructural (BOS o CHoCH).",
        graphic: "[1. Toma Liquidez] ──► [2. Deja FVG/Desbalance] ──► [3. Hace BOS]"
      },
      {
        id: "gold-c3",
        concept: "Fair Value Gap",
        front: "¿Qué es el Fair Value Gap (FVG) / Imbalance?",
        back: "Es una ineficiencia en el mercado representada por un espacio vacío entre el mínimo de la Vela 1 y el máximo de la Vela 3 en un ciclo de 3 velas. Actúa como un imán gravitacional porque las instituciones deben regresar a equilibrar el precio (entregar precios eficientes).",
        graphic: "Vela 1:  ██ [mínimo]\nVela 2:  ███████  ◄── [ESPACIO VACÍO = FVG]\nVela 3:       ██ [máximo]"
      },
      {
        id: "gold-c4",
        concept: "Rompimiento Histórico",
        front: "¿Cómo operar el Oro (XAU/USD) cuando barre un máximo histórico?",
        back: "No entres a mercado de inmediato. Espera un barrido de liquidez claro en temporalidades de 15M o 5M (mecha larga que toma el máximo), seguido de un Change of Character (CHoCH) bajista con cuerpo de vela en 1M. Mitiga el Order Block decisional para una entrada refinada con stop corto.",
        graphic: "Sweep de Máximo Histórico [▲] ──► CHoCH Bajista [▼]\n───► Mitiga OB decisional ───► Caída libre"
      }
    ]
  }
];

export const QuizView: React.FC<QuizViewProps> = ({ showToast, onRefreshStats }) => {
  // Streak state stored in LocalStorage
  const [streak, setStreak] = useState<number>(5);
  const [streakDays, setStreakDays] = useState<boolean[]>([true, true, true, true, true, false, false]); // Sun to Sat
  
  // Anki State
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [deckCompleted, setDeckCompleted] = useState<boolean>(false);
  const [studiedCount, setStudiedCount] = useState<number>(0);

  useEffect(() => {
    // Load progress from LocalStorage
    const savedStreak = localStorage.getItem("smc_streak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    } else {
      localStorage.setItem("smc_streak", "5");
    }

    const savedDays = localStorage.getItem("smc_streak_days");
    if (savedDays) {
      try {
        setStreakDays(JSON.parse(savedDays));
      } catch (e) {
        // Fallback
      }
    } else {
      localStorage.setItem("smc_streak_days", JSON.stringify([true, true, true, true, true, false, false]));
    }
  }, []);

  const handleClaimStreak = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem("smc_streak", newStreak.toString());
    
    // Set current weekday as active
    const today = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    const updatedDays = [...streakDays];
    updatedDays[today] = true;
    setStreakDays(updatedDays);
    localStorage.setItem("smc_streak_days", JSON.stringify(updatedDays));

    onRefreshStats();
    showToast("¡Racha de estudio de Anki reclamada! Excelente consistencia hoy, Carlos.", "success");
  };

  const handleStartDeck = (deck: Deck) => {
    setSelectedDeck(deck);
    setCurrentCardIdx(0);
    setIsFlipped(false);
    setDeckCompleted(false);
    showToast(`Iniciando Mazo Anki: ${deck.name}`, "success");
  };

  const handleGradeCard = (grade: "again" | "hard" | "good" | "easy") => {
    setIsFlipped(false);
    setStudiedCount((prev) => prev + 1);

    let nextInterval = "";
    let toastType: "success" | "info" = "success";
    switch (grade) {
      case "again":
        nextInterval = "1 min";
        toastType = "info";
        showToast("Repasando pronto. Agendada para el final de la sesión.", "info");
        break;
      case "hard":
        nextInterval = "6 min";
        showToast("Establecida como Difícil. Repaso agendado en 6m.", "success");
        break;
      case "good":
        nextInterval = "1 día";
        showToast("¡Entendido! Repaso agendado para mañana.", "success");
        break;
      case "easy":
        nextInterval = "3 días";
        showToast("¡Fácil! Repaso agendado en 3 días.", "success");
        break;
    }

    // If "Again", we can push a copy of this card to the end of the deck or just continue
    if (selectedDeck) {
      if (currentCardIdx + 1 < selectedDeck.cards.length) {
        setCurrentCardIdx((prev) => prev + 1);
      } else {
        setDeckCompleted(true);
        // Automatically claim streak when finishing an entire deck
        handleClaimStreak();
      }
    }
  };

  const handleExitDeck = () => {
    setSelectedDeck(null);
    setDeckCompleted(false);
    setCurrentCardIdx(0);
    setIsFlipped(false);
  };

  return (
    <div className="flex flex-col gap-4 pb-1 md:pb-6">
      {/* Welcome & Stats Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-[#161a25] to-indigo-950 p-4 rounded-3xl border border-indigo-500/15 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-12 bottom-0 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/25 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Spaced Repetition (SRS)
          </span>
          <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/25">
            Anki Emulator v1.4
          </span>
        </div>
        
        <h2 className="text-base font-bold text-slate-100 mt-2.5">SMC Active Recall - Anki Cards</h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Memoriza reglas institucionales de alta precisión. Reclama tu racha de estudio diaria para mantener la disciplina técnica.
        </p>

        <div className="flex items-center gap-4 mt-3.5 pt-3.5 border-t border-slate-850/80">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4.5 h-4.5 text-orange-500 fill-orange-500" />
            <div>
              <p className="text-[9px] text-slate-500 leading-none font-bold uppercase">Racha Anki</p>
              <p className="text-xs font-black text-slate-200 mt-0.5">{streak} Días 🔥</p>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-850" />
          <div className="flex items-center gap-1.5">
            <Award className="w-4.5 h-4.5 text-amber-500 fill-amber-500/10" />
            <div>
              <p className="text-[9px] text-slate-500 leading-none font-bold uppercase">Tarjetas repasadas</p>
              <p className="text-xs font-black text-slate-200 mt-0.5">{studiedCount} Repasos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Streak Grid */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4.5 h-4.5 text-orange-500" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Consistencia Diaria</h3>
          </div>
          <button 
            onClick={handleClaimStreak}
            className="text-[9px] font-black text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-lg cursor-pointer uppercase tracking-wider"
          >
            Marcar Hoy
          </button>
        </div>

        <div className="flex items-center justify-between gap-1.5">
          {["D", "L", "M", "M", "J", "V", "S"].map((day, idx) => {
            const isCompleted = streakDays[idx];
            return (
              <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-[9px] font-semibold text-slate-500">{day}</span>
                <div
                  className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    isCompleted
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-emerald-950/40 shadow-inner"
                      : "bg-slate-950/60 border-slate-850 text-slate-600"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Container: Deck selection or active review */}
      <AnimatePresence mode="wait">
        {!selectedDeck ? (
          <motion.div
            key="decks-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider">Mazos de Memoria (SMC Decks)</h3>
            </div>

            <div className="flex flex-col gap-3">
              {ANKI_DECKS.map((deck) => {
                let iconEl = <Layers className="w-5 h-5 text-blue-400" />;
                if (deck.icon === "Sparkles") iconEl = <Sparkles className="w-5 h-5 text-amber-400" />;
                if (deck.icon === "Trophy") iconEl = <Trophy className="w-5 h-5 text-yellow-400" />;

                return (
                  <div 
                    key={deck.id}
                    className="p-4 rounded-2xl bg-slate-900/40 border border-slate-850 hover:border-slate-800 transition-all flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800`}>
                          {iconEl}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-200 uppercase tracking-wide">{deck.name}</h4>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{deck.cards.length} TARJETAS</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase">
                        Active Recall
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                      {deck.description}
                    </p>

                    <button
                      onClick={() => handleStartDeck(deck)}
                      className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-200 text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:border-indigo-500/35 group"
                    >
                      <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20 group-hover:scale-110 transition-transform" />
                      Estudiar Mazo Ahora
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : deckCompleted ? (
          <motion.div
            key="deck-completed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#161a25]/60 rounded-2xl border border-slate-800 p-5 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 bg-emerald-500/15 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/30 mb-3 animate-bounce">
              <Trophy className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-black text-slate-200 uppercase tracking-wider">¡Mazo Completado, Carlos!</h4>
            <p className="text-xs text-indigo-300 font-bold mt-1 uppercase tracking-widest">{selectedDeck.name}</p>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed px-2">
              Excelente sesión de recall activo. Tus intervalos de repetición espaciada se han actualizado. ¡Has asegurado tu racha de estudio diaria!
            </p>

            <div className="flex gap-2.5 w-full mt-5">
              <button
                onClick={() => handleStartDeck(selectedDeck)}
                className="flex-1 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 text-xs font-bold py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Repetir Mazo
              </button>
              <button
                onClick={handleExitDeck}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 rounded-xl transition-all cursor-pointer"
              >
                Regresar a Mazos
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="deck-study"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-3"
          >
            <div className="flex justify-between items-center bg-slate-900/60 p-2 px-3.5 rounded-xl border border-slate-800">
              <button
                onClick={handleExitDeck}
                className="text-[10px] font-black text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                ◀ Mazos
              </button>
              <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">
                {selectedDeck.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">
                {currentCardIdx + 1} / {selectedDeck.cards.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300"
                style={{ width: `${((currentCardIdx) / selectedDeck.cards.length) * 100}%` }}
              />
            </div>

            {/* Simulated Spaced Repetition Flashcard */}
            <div className="min-h-[290px] relative w-full perspective-1000">
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="front-card"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full min-h-[280px] bg-[#161a25]/85 border border-slate-800 p-5 rounded-2xl shadow-lg flex flex-col justify-between items-center text-center cursor-pointer relative overflow-hidden"
                    onClick={() => setIsFlipped(true)}
                  >
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[8px] font-black text-indigo-400 uppercase tracking-widest">
                      {selectedDeck.cards[currentCardIdx].concept}
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 py-4">
                      <HelpCircle className="w-8 h-8 text-indigo-500 mb-3 opacity-80" />
                      <h4 className="text-xs font-black text-slate-100 uppercase tracking-wide leading-relaxed px-1">
                        PREGUNTA DE MEMORIA
                      </h4>
                      <p className="text-xs text-slate-200 font-bold mt-2 leading-relaxed px-2">
                        {selectedDeck.cards[currentCardIdx].front}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2 animate-pulse">
                      Haz clic en la tarjeta para revelar respuesta
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back-card"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full min-h-[280px] bg-slate-900 border border-slate-800 p-4.5 rounded-2xl shadow-lg flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex justify-between items-center">
                        <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black px-2 py-0.5 rounded border border-emerald-500/25 uppercase tracking-widest">
                          {selectedDeck.cards[currentCardIdx].concept}
                        </span>
                        <span className="text-[8px] text-slate-500 font-bold uppercase">REVELADO</span>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                        {selectedDeck.cards[currentCardIdx].back}
                      </p>

                      {/* Technical Concept ASCII Art Visualizer */}
                      <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-850 font-mono text-[9px] text-indigo-300 leading-snug whitespace-pre overflow-x-auto select-none mt-1 shadow-inner text-center">
                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest block mb-1">
                          Representación Estructural
                        </span>
                        {selectedDeck.cards[currentCardIdx].graphic}
                      </div>
                    </div>

                    <div className="text-[9px] font-black text-slate-500 uppercase text-center mt-2.5 tracking-wider">
                      ¿Qué tan fácil fue recordar este concepto?
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Anki Grading Action Buttons */}
            <AnimatePresence>
              {isFlipped && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="grid grid-cols-4 gap-1.5 mt-1"
                >
                  <button
                    onClick={() => handleGradeCard("again")}
                    className="bg-red-950/30 hover:bg-red-950/50 border border-red-900/30 text-red-300 p-2 rounded-xl flex flex-col items-center gap-0.5 cursor-pointer transition-all"
                  >
                    <span className="text-[9px] font-black uppercase">OTRA VEZ</span>
                    <span className="text-[8px] font-mono opacity-80 font-bold">{"< 1 min"}</span>
                  </button>
                  <button
                    onClick={() => handleGradeCard("hard")}
                    className="bg-amber-950/30 hover:bg-amber-950/50 border border-amber-900/30 text-amber-300 p-2 rounded-xl flex flex-col items-center gap-0.5 cursor-pointer transition-all"
                  >
                    <span className="text-[9px] font-black uppercase">DIFÍCIL</span>
                    <span className="text-[8px] font-mono opacity-80 font-bold">{"< 6 min"}</span>
                  </button>
                  <button
                    onClick={() => handleGradeCard("good")}
                    className="bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-900/30 text-emerald-300 p-2 rounded-xl flex flex-col items-center gap-0.5 cursor-pointer transition-all"
                  >
                    <span className="text-[9px] font-black uppercase">BIEN</span>
                    <span className="text-[8px] font-mono opacity-80 font-bold">1 día</span>
                  </button>
                  <button
                    onClick={() => handleGradeCard("easy")}
                    className="bg-blue-950/30 hover:bg-blue-950/50 border border-blue-900/30 text-blue-300 p-2 rounded-xl flex flex-col items-center gap-0.5 cursor-pointer transition-all"
                  >
                    <span className="text-[9px] font-black uppercase">FÁCIL</span>
                    <span className="text-[8px] font-mono opacity-80 font-bold">3 días</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
