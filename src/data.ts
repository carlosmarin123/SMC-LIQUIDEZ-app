import { QuizQuestion, SMCGuide, VideoAnnotation, ChartScenario } from "./types";

export const SMC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Qué valida la formación de un verdadero Break of Structure (BOS) alcista en SMC?",
    options: [
      "El simple cruce de una línea de tendencia por parte del precio.",
      "La toma o barrido de liquidez del Inducement (IDM) seguido por el cierre de vela por encima del máximo estructural anterior.",
      "Un cruce de medias móviles exponenciales de 50 y 200 períodos.",
      "Cuando una vela cierra por debajo del mínimo anterior en una tendencia alcista."
    ],
    correctIndex: 1,
    explanation: "En SMC, un BOS no se valida simplemente rompiendo un máximo. Primero, el precio debe barrer el Inducement (IDM) para capturar liquidez institucional, y luego el cuerpo de la vela debe cerrar por encima del máximo estructural anterior para confirmar la continuación alcista."
  },
  {
    id: 2,
    question: "¿Qué es exactamente el Inducement (IDM) en una estructura de mercado?",
    options: [
      "La zona de soporte más fuerte del mercado donde siempre hay que comprar.",
      "El último bloque de órdenes (Order Block) antes del inicio de una gran tendencia.",
      "El primer retroceso válido del precio que los traders minoristas confunden con un cambio de estructura y es barrido para capturar liquidez.",
      "La noticia macroeconómica que induce pánico en los traders retail."
    ],
    correctIndex: 2,
    explanation: "El Inducement (IDM) representa el primer retroceso válido del precio. Los traders retail ingresan apresuradamente creyendo que es una zona de compra o venta sólida (soporte/resistencia), pero el algoritmo interbancario barre este punto buscando stop-losses (liquidez) antes de continuar."
  },
  {
    id: 3,
    question: "¿Cuál es la diferencia crítica entre un BOS (Break of Structure) y un CHoCH (Change of Character)?",
    options: [
      "No hay diferencia, son dos términos alternativos para el mismo concepto.",
      "El BOS es la continuación de la tendencia actual; el CHoCH es el primer cambio de tendencia (carácter) al romper el último mínimo/máximo estructural fuerte.",
      "El CHoCH se da únicamente en temporalidades diarias; el BOS ocurre solo en 1 minuto.",
      "Un BOS requiere volumen masivo; el CHoCH se da con bajo volumen."
    ],
    correctIndex: 1,
    explanation: "El BOS (Break of Structure) confirma que la tendencia existente continúa de forma saludable tras capturar liquidez. El CHoCH (Change of Character) indica el fin de la tendencia actual y el posible inicio de una nueva estructura opuesta al romper el extremo estructural fuerte."
  },
  {
    id: 4,
    question: "Si el precio llega a un Order Block (OB) pero no ha tomado el Inducement (IDM) previo, ¿qué es lo más probable que ocurra?",
    options: [
      "El Order Block reaccionará perfectamente ya que tiene un desbalance enorme.",
      "El precio ignorará el Order Block, lo romperá para tomar el IDM (u otra liquidez inferior) y convertirá el OB en un 'Breaker' antes de reaccionar.",
      "El mercado entrará en rango lateral indefinidamente.",
      "La operación se cerrará automáticamente en break-even."
    ],
    correctIndex: 1,
    explanation: "La liquidez es el combustible del mercado. Si un Order Block no tiene un Inducement (IDM) o liquidez previa que haya sido tomada, ese OB corre un alto riesgo de ser barrido por completo para buscar liquidez más profunda."
  }
];

export const PRELOADED_GUIDES: SMCGuide[] = [
  {
    id: "guide-idm-master",
    name: "Guía Avanzada de Inducement (IDM).pdf",
    size: "3.4 MB",
    pages: 18,
    contentSnippet: "La liquidez estructural (IDM) es la piedra angular del trading de precisión. Esta guía desglosa los retrocesos válidos vs. falsos y enseña a marcar la liquidez interna..."
  },
  {
    id: "guide-smc-blueprint",
    name: "SMC Core Blueprint - Estructuras de Mercado.pdf",
    size: "5.1 MB",
    pages: 32,
    contentSnippet: "Aprende el mapeo estructural definitivo paso a paso: CHoCH, BOS, validación de altos y bajos fuertes mediante barridos de liquidez e identificación de Order Blocks premium..."
  },
  {
    id: "guide-ob-mitigation",
    name: "Mitigación de Bloques de Órdenes (OB) e Imbalances.pdf",
    size: "2.8 MB",
    pages: 14,
    contentSnippet: "Análisis institucional del Order Block óptimo. Identifica zonas de oferta y demanda con Fair Value Gap (FVG) no mitigados en el descuento para entradas de alta tasa de acierto..."
  }
];

export const VIDEO_ANNOTATIONS: VideoAnnotation[] = [
  {
    timeInSeconds: 0,
    label: "Introducción y Vibe de Mercado",
    concept: "Liquidity",
    description: "Análisis introductorio del gráfico EURUSD. Contexto general de la sesión de hoy."
  },
  {
    timeInSeconds: 24,
    label: "Creación del Impulso Estructural",
    concept: "Liquidity",
    description: "El precio acelera al alza dejando un desbalance masivo (Fair Value Gap)."
  },
  {
    timeInSeconds: 65,
    label: "El Retroceso Minorista (IDM)",
    concept: "IDM",
    description: "Se genera el primer retroceso válido. El precio induce compras tempranas. Marcamos este punto crítico."
  },
  {
    timeInSeconds: 120,
    label: "Barrido de Liquidez de IDM",
    concept: "Liquidity",
    description: "¡Fuerza bajista repentina! El mercado barre el mínimo del IDM, atrapando compradores. Aquí reacciona en un Order Block decisivo."
  },
  {
    timeInSeconds: 185,
    label: "Confirmación del BOS Alcista",
    concept: "BOS",
    description: "El precio rompe el máximo anterior con cuerpo de vela. Se valida oficialmente el Break of Structure."
  },
  {
    timeInSeconds: 260,
    label: "Bloque de Órdenes Institucional (OB)",
    concept: "OB",
    description: "Ubicación del bloque óptimo (OB Decisional + OB Extremo) que originó el barrido de liquidez. Zona óptima de entrada."
  },
  {
    timeInSeconds: 315,
    label: "Cambio de Carácter (CHoCH) de Confirmación",
    concept: "CHoCH",
    description: "El precio falla en hacer un nuevo alto y rompe el mínimo estructural fuerte. Fin de la tendencia alcista de corto plazo."
  }
];

export const SIMULATOR_SCENARIOS: ChartScenario[] = [
  {
    id: "scen-bullish",
    name: "Tendencia Alcista Estructural",
    description: "Identifica el Inducement (IDM) correcto en esta subida para validar la continuación del movimiento alcista (BOS).",
    trend: "bullish",
    candles: [
      { id: 1, open: 40, high: 65, low: 35, close: 60, isUp: true },
      { id: 2, open: 60, high: 80, low: 55, close: 75, isUp: true },
      { id: 3, open: 75, high: 95, low: 70, close: 90, isUp: true },
      { id: 4, open: 90, high: 110, low: 85, close: 105, isUp: true, label: "Alto Estructural Temporal" },
      // Retroceso (Candles 5, 6, 7) - Esto forma el primer retroceso válido
      { id: 5, open: 105, high: 108, low: 75, close: 80, isUp: false, label: "Retroceso Válido" },
      { id: 6, open: 80, high: 88, low: 65, close: 70, isUp: false },
      { id: 7, open: 70, high: 85, low: 68, close: 82, isUp: true },
      // Segundo impulso hacia arriba (Candles 8, 9, 10)
      { id: 8, open: 82, high: 115, low: 80, close: 110, isUp: true },
      { id: 9, open: 110, high: 125, low: 105, close: 120, isUp: true },
      // Barrido de liquidez (Candle 11, 12, 13)
      { id: 10, open: 120, high: 122, low: 60, close: 65, isUp: false, label: "Barrido Institucional" },
      { id: 11, open: 65, high: 75, low: 58, close: 72, isUp: true, label: "Mitigación Order Block" },
      { id: 12, open: 72, high: 135, low: 70, close: 130, isUp: true, label: "BOS Alcista Confirmado" }
    ],
    points: [
      {
        id: "p1",
        candleIndex: 3,
        type: "RETAIL_TRAP",
        price: 85,
        name: "Soporte Retail Falso",
        correct: false,
        feedback: "¡Trampa de Soporte Retail! Las instituciones saben que colocas tus stops justo debajo de esta vela. No es un retroceso válido, es liquidez pura."
      },
      {
        id: "p2",
        candleIndex: 5,
        type: "IDM",
        price: 65,
        name: "Inducement Válido (IDM)",
        correct: true,
        feedback: "¡Excelente, Carlos! Este es el mínimo del primer retroceso válido (IDM) antes de que el precio rompiera el máximo anterior. Al barrer este mínimo (Candle 10), el algoritmo captura liquidez institucional alcista."
      },
      {
        id: "p3",
        candleIndex: 10,
        type: "BOS_TRIGGER",
        price: 58,
        name: "Order Block Extremo",
        correct: false,
        feedback: "Este es el Order Block Extremo donde el precio reaccionó tras barrer el IDM. No es el IDM en sí, sino la zona de entrada óptima."
      }
    ]
  },
  {
    id: "scen-bearish",
    name: "Trampa Estructural Bajista",
    description: "Identifica el Inducement (IDM) en una estructura bajista para validar un verdadero BOS bajista.",
    trend: "bearish",
    candles: [
      { id: 1, open: 130, high: 135, low: 110, close: 115, isUp: false },
      { id: 2, open: 115, high: 120, low: 95, close: 100, isUp: false },
      { id: 3, open: 100, high: 105, low: 80, close: 85, isUp: false },
      { id: 4, open: 85, high: 102, low: 80, close: 100, isUp: true, label: "Retroceso Válido" },
      { id: 5, open: 100, high: 115, low: 95, close: 110, isUp: true, label: "Máximo de IDM" },
      { id: 6, open: 110, high: 112, low: 85, close: 90, isUp: false },
      { id: 7, open: 90, high: 92, low: 65, close: 70, isUp: false, label: "Mínimo Temporal" },
      // Barrido del Inducement hacia arriba (Candles 8, 9)
      { id: 8, open: 70, high: 122, low: 68, close: 120, isUp: true, label: "Barrido Institucional" },
      // Caída fuerte post-barrido (Candles 10, 11)
      { id: 9, open: 120, high: 122, low: 55, close: 60, isUp: false, label: "Reacción en OB Bajista" },
      { id: 10, open: 60, high: 62, low: 45, close: 48, isUp: false, label: "BOS Bajista Confirmado" }
    ],
    points: [
      {
        id: "p4",
        candleIndex: 4,
        type: "IDM",
        price: 115,
        name: "Inducement Válido (IDM)",
        correct: true,
        feedback: "¡Brillante, Carlos! Ese es el alto del primer retroceso válido antes del nuevo impulso bajista. Al barrer este máximo (Candle 8), el algoritmo atrapó a vendedores retail apresurados y activó órdenes institucionales de venta."
      },
      {
        id: "p5",
        candleIndex: 2,
        type: "RETAIL_TRAP",
        price: 105,
        name: "Resistencia Retail Falsa",
        correct: false,
        feedback: "Esta es una simple resistencia menor. Los minoristas colocan stops arriba de este nivel, por lo que es combustible de liquidez para las instituciones."
      },
      {
        id: "p6",
        candleIndex: 7,
        type: "BOS_TRIGGER",
        price: 122,
        name: "Bloque de Mitigación",
        correct: false,
        feedback: "Este es el punto más alto del barrido de liquidez. Es la zona perfecta de entrada en venta en un Order Block, pero no es el Inducement de origen."
      }
    ]
  }
];
