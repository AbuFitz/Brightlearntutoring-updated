import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GetStartedProvider } from "@/contexts/GetStartedContext";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Index from "./pages/Index.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import Safeguarding from "./pages/Safeguarding.tsx";
import CookiesPolicy from "./pages/Cookies.tsx";
import AreasWeCover from "./pages/AreasWeCover.tsx";
import LocationPage from "./pages/LocationPage.tsx";
import FAQPage from "./pages/FAQPage.tsx";
import TopicPage from "./pages/TopicPage.tsx";
import GuidesHub from "./pages/GuidesHub.tsx";
import GuidePage from "./pages/GuidePage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GetStartedProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/enquire" element={<Index />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/safeguarding" element={<Safeguarding />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/online-maths-tutor" element={<AreasWeCover />} />
            <Route path="/online-maths-tutor/:slug" element={<LocationPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/guides" element={<GuidesHub />} />
            <Route path="/guides/:guideSlug" element={<GuidePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/:topicSlug" element={<TopicPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
          <WhatsAppButton />
        </BrowserRouter>
      </GetStartedProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
