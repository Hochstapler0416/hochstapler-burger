import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import SpeisekartePage from "@/pages/SpeisekartePage";
import UeberUnsPage from "@/pages/UeberUnsPage";
import GaleriePage from "@/pages/GaleriePage";
import KontaktPage from "@/pages/KontaktPage";
import ImpressumPage from "@/pages/ImpressumPage";
import DatenschutzPage from "@/pages/DatenschutzPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/speisekarte" component={SpeisekartePage} />
      <Route path="/ueber-uns" component={UeberUnsPage} />
      <Route path="/galerie" component={GaleriePage} />
      <Route path="/kontakt" component={KontaktPage} />
      <Route path="/impressum" component={ImpressumPage} />
      <Route path="/datenschutz" component={DatenschutzPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
