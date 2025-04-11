import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/home-page";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import OnboardingPage from "@/pages/onboarding-page";
import RestaurantsPage from "@/pages/restaurants-page";
import SplashPage from "@/pages/splash-page";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SplashPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/restaurants" component={RestaurantsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
