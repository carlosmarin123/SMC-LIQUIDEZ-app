import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, MessageSquare, Send, Book, RefreshCw, FileText, Bot, User, Check, Sparkles, HelpCircle } from "lucide-react";
import { PRELOADED_GUIDES } from "../data";
import { SMCGuide, Message } from "../types";

interface PdfTutorViewProps {
  showToast: (msg: string, type: "success" | "error" | "info") => void;
}

export const PdfTutorView: React.FC<PdfTutorViewProps> = ({ showToast }) => {
  // Guide upload simulation states
  const [guides, setGuides] = useState<SMCGuide[]>(PRELOADED_GUIDES);
  const [selectedGuide, setSelectedGuide] = useState<SMCGuide>(PRELOADED_GUIDES[0]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chatbot states
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "¡Hola Carlos! Soy tu **SMC Coach**. He cargado la *Guía Avanzada de Inducement (IDM).pdf* como contexto activo.\n\n¿Tienes alguna duda sobre cómo el algoritmo interbancario utiliza los máximos o mínimos de retroceso para acumular órdenes antes de expandir? ¡Pregúntame lo que quieras!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle simulated file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      showToast("Por favor, sube únicamente archivos en formato PDF.", "error");
      return;
    }

    simulateUpload(file.name);
  };

  const simulateUpload = (fileName: string) => {
    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newGuide: SMCGuide = {
              id: `guide-${Date.now()}`,
              name: fileName,
              size: "1.8 MB",
              pages: Math.floor(Math.random() * 20) + 10,
              contentSnippet: "Contenido personalizado de Smart Money Concepts analizado con éxito por la red neuronal del Coach..."
            };

            setGuides((prevGuides) => [newGuide, ...prevGuides]);
            setSelectedGuide(newGuide);
            setUploading(false);
            showToast(`¡Documento "${fileName}" analizado con éxito por el SMC Coach!`, "success");

            // Add notification message from Bot
            setMessages((prevMsgs) => [
              ...prevMsgs,
              {
                sender: "bot",
                text: `¡Fabuloso, Carlos! Acabo de leer completo tu documento **"${fileName}"**.\n\nHe extraído los conceptos clave sobre bloques de mitigación, zonas OTE y liquidez expuesta. ¿En qué sección te gustaría que nos enfoquemos para poner a prueba tu ojo técnico?`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const selectGuideContext = (guide: SMCGuide) => {
    setSelectedGuide(guide);
    showToast(`Contexto activo cambiado a: ${guide.name}`, "info");
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: `Carlos, he ajustado mis parámetros de análisis a la guía: **"${guide.name}"**.\n\n*Resumen cargado:* ${guide.contentSnippet}\n\n¿Qué concepto de este manual te está causando dolores de cabeza en los gráficos en vivo?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Clear input field if sending typed text
    if (!textToSend) setInputText("");

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { sender: "user", text, timestamp };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      showToast("Error al procesar consulta con el Coach de IA.", "error");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Carlos, lo siento. He tenido una pequeña interrupción en la lectura del flujo institucional. ¿Podrías volver a enviarme tu mensaje para responderte con precisión?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const PRESET_QUESTIONS = [
    "¿Cómo identifico un retroceso válido para IDM?",
    "¿Por qué el precio barre el IDM antes de reaccionar?",
    "¿Cuál es la diferencia entre BOS y CHoCH?"
  ];

  return (
    <div className="flex flex-col gap-4 h-full pb-4">
      
      {/* Guides Section */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Book className="w-4 h-4 text-indigo-400" />
          <span>Biblioteca y Guías Activas</span>
        </h3>

        {/* Horizontal scroll list of available guides */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {guides.map((guide) => {
            const isSelected = selectedGuide.id === guide.id;
            return (
              <button
                key={guide.id}
                onClick={() => selectGuideContext(guide)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border shrink-0 text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-indigo-950/40 border-indigo-500 text-indigo-100 shadow-md shadow-indigo-950/50"
                    : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <FileText className={`w-4 h-4 ${isSelected ? "text-indigo-400" : "text-slate-500"}`} />
                <div>
                  <h4 className="text-[11px] font-bold max-w-[130px] truncate leading-tight">{guide.name}</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5">{guide.pages} págs • {guide.size}</p>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 ml-1 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Interactive Drag-and-drop simulation area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="bg-slate-900/30 hover:bg-slate-900/50 transition-all duration-300 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            className="hidden"
          />

          {uploading ? (
            <div className="w-full max-w-[200px] flex flex-col items-center">
              <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin mb-2" />
              <p className="text-[11px] font-bold text-slate-300">Analizando PDF de SMC...</p>
              <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-150"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-500 mt-1">{uploadProgress}% cargado</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud className="w-7 h-7 text-slate-500 group-hover:text-indigo-400 transition-colors duration-300 mb-1.5" />
              <p className="text-[11px] font-semibold text-slate-300 group-hover:text-slate-200">
                ¿Tienes un nuevo PDF de SMC?
              </p>
              <p className="text-[9px] text-slate-500 mt-0.5">
                Haz clic para simular subida y analizarlo con el Tutor IA
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Chatbot Section */}
      <div className="flex-1 bg-slate-950/80 rounded-2xl border border-slate-800/80 flex flex-col min-h-[300px] max-h-[420px] overflow-hidden shadow-lg relative">
        <div className="bg-slate-900/50 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              SMC Coach Conversacional
            </span>
          </div>
          <div className="flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/15">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span className="text-[9px] font-bold text-indigo-400">Gemini AI</span>
          </div>
        </div>

        {/* Conversation Console */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 scrollbar-thin">
          {messages.map((msg, idx) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={idx}
                className={`flex gap-2 w-[88%] ${isBot ? "self-start" : "self-end flex-row-reverse"}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-xs font-bold ${
                    isBot
                      ? "bg-indigo-950 border-indigo-500/30 text-indigo-400"
                      : "bg-slate-800 border-slate-700 text-slate-200"
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <div
                    className={`rounded-2xl p-3 text-[11px] leading-relaxed shadow-sm whitespace-pre-line ${
                      isBot
                        ? "bg-slate-900/70 text-slate-300 border border-slate-800/80 rounded-tl-sm"
                        : "bg-indigo-600 text-white rounded-tr-sm"
                    }`}
                  >
                    {/* Crude Markdown parser for bold styling in text */}
                    {msg.text.split("\n").map((line, lIdx) => {
                      // Process bold text **example**
                      const parts = line.split(/\*\*(.*?)\*\*/g);
                      return (
                        <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>
                          {parts.map((part, pIdx) => {
                            if (pIdx % 2 === 1) {
                              return <strong key={pIdx} className="text-slate-100 font-bold">{part}</strong>;
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>
                  <span
                    className={`text-[8px] text-slate-500 px-1 ${isBot ? "text-left" : "text-right"}`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Loading indicator */}
          {isLoading && (
            <div className="flex gap-2 self-start w-[88%]">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-indigo-950 border border-indigo-500/30 text-indigo-400 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl rounded-tl-sm p-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Prompt shortcuts rail */}
        <div className="px-3 py-1.5 bg-slate-900/30 border-t border-slate-900 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <div className="shrink-0 text-slate-500">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          {PRESET_QUESTIONS.map((question, qIdx) => (
            <button
              key={qIdx}
              onClick={() => handleSendMessage(question)}
              className="bg-slate-950 hover:bg-slate-900 transition-colors text-[9px] font-medium text-indigo-300 border border-indigo-500/10 px-2.5 py-1 rounded-full shrink-0"
            >
              {question}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-2.5 bg-slate-900/60 border-t border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Pregúntale al SMC Coach..."
            disabled={isLoading}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 p-2 rounded-xl text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
