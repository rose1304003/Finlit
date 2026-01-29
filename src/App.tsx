import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from "@/contexts/LanguageContext";
import { GamificationProvider } from "@/contexts/GamificationContext";

// Screens
import SplashScreen from "@/components/SplashScreen";
import OnboardingScreen from "@/components/OnboardingScreen";
import AIChatbot from "@/components/AIChatbot";

// Pages
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Calculators from "./pages/Calculators";
import Quiz from "./pages/Quiz";
import Library from "./pages/Library";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import GlossaryPage from "./pages/GlossaryPage";
import BookDetail from "./pages/BookDetail";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Safe localStorage wrapper for Telegram Mini Apps
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail in restricted environments
    }
  }
};

// Check if user has completed onboarding
const hasCompletedOnboarding = (): boolean => {
  return safeLocalStorage.getItem('finlit_onboarding_complete') === 'true';
};

const setOnboardingComplete = (): void => {
  safeLocalStorage.setItem('finlit_onboarding_complete', 'true');
};

type AppPhase = 'splash' | 'onboarding' | 'app';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('splash');
  const [error, setError] = useState<string | null>(null);

  // ✅ NEW: Catch runtime crashes and show your fallback instead of blank screen
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      console.error("Window error:", event.error || event.message);
      setError(event.message || "Unknown error");
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled rejection:", event.reason);
      setError(String(event.reason || "Unhandled promise rejection"));
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  useEffect(() => {
    try {
      const skipOnboarding = hasCompletedOnboarding();
      
      if (skipOnboarding) {
        const timer = setTimeout(() => {
          setPhase('app');
        }, 2500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error('App initialization error:', e);
      setPhase('app'); // Skip to app on error
    }
  }, []);

  const handleSplashComplete = () => {
    try {
      if (hasCompletedOnboarding()) {
        setPhase('app');
      } else {
        setPhase('onboarding');
      }
    } catch {
      setPhase('app');
    }
  };

  const handleOnboardingComplete = () => {
    setOnboardingComplete();
    setPhase('app');
  };

  // Error boundary fallback
  if (error) {
    return (
      <div className="min-h-screen bg-[#13593F] flex items-center justify-center p-4">
        <div className="text-white text-center">
          <p>Something went wrong</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-white text-[#13593F] rounded-lg"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <GamificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            
            <AnimatePresence mode="wait">
              {/* Splash Screen */}
              {phase === 'splash' && (
                <SplashScreen onComplete={handleSplashComplete} />
              )}

              {/* Onboarding Screen */}
              {phase === 'onboarding' && (
                <OnboardingScreen onComplete={handleOnboardingComplete} />
              )}
            </AnimatePresence>

            {/* Main App - Using HashRouter for Telegram compatibility */}
            {phase === 'app' && (
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/projects/:id/posts/:postId" element={<ProjectDetail />} />
                  <Route path="/calculators" element={<Calculators />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/library/:id" element={<BookDetail />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/glossary" element={<GlossaryPage />} />
                  <Route path="/challenges" element={<Challenges />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/events/:id" element={<Navigate to="/projects" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* Global AI Chatbot */}
                <AIChatbot />
              </HashRouter>
            )}
          </TooltipProvider>
        </GamificationProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
