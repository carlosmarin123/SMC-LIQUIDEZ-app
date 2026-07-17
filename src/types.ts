export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface SMCGuide {
  id: string;
  name: string;
  size: string;
  pages: number;
  contentSnippet: string;
}

export interface VideoAnnotation {
  timeInSeconds: number;
  label: string;
  concept: "IDM" | "BOS" | "CHoCH" | "OB" | "Liquidity";
  description: string;
}

export interface ChartScenario {
  id: string;
  name: string;
  description: string;
  trend: "bullish" | "bearish";
  candles: {
    id: number;
    open: number;
    high: number;
    low: number;
    close: number;
    isUp: boolean;
    label?: string;
  }[];
  points: {
    id: string;
    candleIndex: number;
    type: "IDM" | "RETAIL_TRAP" | "BOS_TRIGGER" | "SWING_HIGH" | "SWING_LOW";
    price: number;
    name: string;
    correct: boolean;
    feedback: string;
  }[];
}
