import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// SMC chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "El mensaje es requerido." });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Friendly, highly technical and encouraging local response when GEMINI_API_KEY is not defined
      return res.json({
        text: `**[Modo Demo Local de SMC Coach]**\n\n¡Hola Carlos! Estoy ejecutando en modo demo local porque tu clave secreta de API no está registrada en los Secrets de la app (puedes configurarla en la pestaña de configuración si lo deseas).\n\nComo tu coach de SMC, déjame responderte directamente sobre tu duda:\n\n**Inducement (IDM):** Es el primer retroceso válido que crea el mercado antes de barrer la liquidez. Los traders retail ven esto como soporte/resistencia y entran apresuradamente. El algoritmo barre este punto para capturar liquidez de stop-losses, activa las órdenes reales de las instituciones y entonces continúa la tendencia real validando el **BOS** (Break of Structure).\n\n¿Quieres que simulemos un ejemplo de estructura alcista o bajista hoy para tu sesión de estudio?`,
      });
    }

    const systemInstruction = `Eres un mentor experto en SMC (Smart Money Concepts) y Algoritmo Interbancario, apodado "SMC Coach".
Tu único alumno es Carlos, y debes hablarle en español técnico, profesional pero sumamente alentador y motivador.
Tu especialidad es explicar estructuras de mercado avanzadas:
- Inducement (IDM): El primer retroceso válido que se barre para validar un BOS o CHoCH.
- BOS (Break of Structure): Rotura de estructura a favor de la tendencia tras barrer el IDM.
- CHoCH (Change of Character): Cambio de carácter o de tendencia cuando se rompe el último punto estructural fuerte.
- Order Blocks (OB): Bloques de órdenes donde las instituciones mitigan sus posiciones.

Explica de forma visual y didáctica. Usa analogías sencillas, detalla cómo los creadores de mercado inducen al retail (trampas de soporte y resistencia) antes de los movimientos institucionales.
Escribe tus respuestas de manera organizada con negritas, viñetas y pequeños diagramas ASCII sencillos si ayudan a ilustrar las velas o impulsos. Mantén las respuestas ideales para una lectura fluida en dispositivos móviles.`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message });
    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    return res.status(500).json({
      error: "Ocurrió un error al contactar al SMC Coach. Inténtalo de nuevo.",
    });
  }
});

async function startServer() {
  // Configure Vite or production static server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SMC Server running on port ${PORT}`);
  });
}

startServer();
