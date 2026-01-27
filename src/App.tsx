import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import AIChatbot from "@/components/AIChatbot";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectNewsDetail from "./pages/ProjectNewsDetail";
import Calculators from "./pages/Calculators";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <GamificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/events/:id" element={<ProjectNewsDetail />} />
              <Route path="/calculators" element={<Calculators />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* Global AI Chatbot */}
            <AIChatbot />
          </BrowserRouter>
        </TooltipProvider>
      </GamificationProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
