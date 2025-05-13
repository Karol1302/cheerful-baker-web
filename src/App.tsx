
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import CategoryGallery from "./pages/CategoryGallery";
import Sets from "./pages/Sets";
import SetDetail from "./pages/SetDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ui/ScrollToTop";
import CookieSettings from "./components/ui/CookieSettings";

// ScrollToTop component to handle scrolling to top on route changes
const ScrollToTopOnNavigation = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTopOnNavigation />
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:categoryId" element={<CategoryGallery />} />
          <Route path="/sets" element={<Sets />} />
          <Route path="/sets/:setId" element={<SetDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ScrollToTop />
        <CookieSettings />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
