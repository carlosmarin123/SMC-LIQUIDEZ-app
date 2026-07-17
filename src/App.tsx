import { useState, useEffect } from "react";
import { AppLayout } from "./components/AppLayout";
import { ToastContainer, ToastMessage, ToastType } from "./components/Toast";
import { PdfTutorView } from "./components/PdfTutorView";
import { QuizView } from "./components/QuizView";
import { VideoCoachView } from "./components/VideoCoachView";
import { TradingViewView } from "./components/TradingViewView";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("pdf-tutor");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [streakCount, setStreakCount] = useState<number>(5);

  useEffect(() => {
    // Initial check and load of streak state for the Layout profile HUD
    const savedStreak = localStorage.getItem("smc_streak");
    if (savedStreak) {
      setStreakCount(parseInt(savedStreak));
    }
  }, [activeTab]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRefreshStats = () => {
    const savedStreak = localStorage.getItem("smc_streak");
    if (savedStreak) {
      setStreakCount(parseInt(savedStreak));
    }
  };

  // Render sub-view dynamically based on selected bottom tab
  const renderView = () => {
    switch (activeTab) {
      case "pdf-tutor":
        return <PdfTutorView showToast={showToast} />;
      case "quiz":
        return (
          <QuizView 
            showToast={showToast} 
            onRefreshStats={handleRefreshStats} 
          />
        );
      case "video-coach":
        return <VideoCoachView showToast={showToast} />;
      case "tradingview":
        return <TradingViewView showToast={showToast} />;
      default:
        return <PdfTutorView showToast={showToast} />;
    }
  };

  return (
    <div className="relative">
      {/* Beautiful Customized Toast Alerts HUD */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Main High-End Smartphone Frame Layout */}
      <AppLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        showToast={showToast}
        streakCount={streakCount}
      >
        {renderView()}
      </AppLayout>
    </div>
  );
}

