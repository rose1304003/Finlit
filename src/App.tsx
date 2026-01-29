import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// Check if user has completed onboarding
const hasCompletedOnboarding = (): boolean => {
  return localStorage.getItem('finlit_onboarding_complete') === 'true';
};

const setOnboardingComplete = (): void => {
  localStorage.setItem('finlit_onboarding_complete', 'true');
};

type AppPhase = 'splash' | 'onboarding' | 'app';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('splash');

  useEffect(() => {
    // Check if we should skip onboarding
    const skipOnboarding = hasCompletedOnboarding();
    
    // For development, uncomment to always show splash/onboarding:
    // localStorage.removeItem('finlit_onboarding_complete');
    
    if (skipOnboarding) {
      // Still show splash briefly, then go to app
      const timer = setTimeout(() => {
        setPhase('app');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSplashComplete = () => {
    if (hasCompletedOnboarding()) {
      setPhase('app');
    } else {
      setPhase('onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    setOnboardingComplete();
    setPhase('app');
  };

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

            {/* Main App */}
            {phase === 'app' && (
              <BrowserRouter>
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
                  {/* Legacy redirect */}
                  <Route path="/events/:id" element={<Navigate to="/projects" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* Global AI Chatbot - always visible */}
                <AIChatbot />
              </BrowserRouter>
            )}
          </TooltipProvider>
        </GamificationProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
