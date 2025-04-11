import { useState } from "react";
import { useLocation } from "wouter";
import { Utensils, MapPin, School, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// List of example campuses
const CAMPUSES = [
  "NYIT Manhattan",
  "NYU",
  "Columbia",
  "Other Campus"
];

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<number>(1);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [selectedCampus, setSelectedCampus] = useState<string>("");
  
  // Calculate progress percentage
  const progressPercentage = (step / 3) * 100;
  
  // Simulate requesting location
  const handleLocationRequest = () => {
    setLocationLoading(true);
    
    // Simulate location request with timeout
    setTimeout(() => {
      setLocationEnabled(true);
      setLocationLoading(false);
      setStep(2);
    }, 1500);
  };
  
  // Handle campus selection
  const handleCampusSelection = (value: string) => {
    setSelectedCampus(value);
  };
  
  // Handle proceeding to restaurants page
  const handleFindRestaurants = () => {
    setStep(3);
    // For now, just redirect to a placeholder page
    // Later this would go to the actual restaurants listing
    setTimeout(() => {
      setLocation("/restaurants");
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 text-neutral-500 hover:text-primary"
                onClick={() => setLocation("/home")}
              >
                <i className="ri-arrow-left-line text-lg"></i>
                <span className="sr-only">Back to home</span>
              </Button>
              <div className="flex-shrink-0 flex items-center">
                <Utensils className="text-primary h-6 w-6 mr-2" />
                <span className="font-semibold text-xl tracking-tight text-primary">Campus Crave</span>
                <span className="ml-2 px-2 py-1 bg-yellow-400 text-white text-xs rounded-full font-medium">Beta</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl bg-white rounded-xl overflow-hidden">
          <div className="h-2">
            <Progress value={progressPercentage} className="rounded-none" />
          </div>
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Utensils className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-neutral-900">Welcome to Campus Crave!</h1>
                  <p className="mt-2 text-neutral-600">
                    Let's get you started by setting your location and campus.
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 bg-blue-50 flex flex-col items-center space-y-4">
                  <MapPin className="h-12 w-12 text-primary" />
                  <h2 className="text-lg font-medium text-neutral-900">Enable Location Services</h2>
                  <p className="text-sm text-center text-neutral-600">
                    We need your location to show nearby restaurant options.
                  </p>
                  
                  <Button 
                    onClick={handleLocationRequest}
                    disabled={locationLoading || locationEnabled}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    {locationLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Getting Location...
                      </>
                    ) : locationEnabled ? (
                      <>
                        <MapPin className="mr-2 h-4 w-4" />
                        Location Enabled
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <School className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-neutral-900">Select Your Campus</h1>
                  <p className="mt-2 text-neutral-600">
                    Choose your campus to find the best nearby food options.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Select onValueChange={handleCampusSelection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAMPUSES.map((campus) => (
                        <SelectItem key={campus} value={campus}>
                          {campus}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={handleFindRestaurants}
                    disabled={!selectedCampus}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Find Restaurants Near Me
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6 text-center">
                <Loader2 className="h-16 w-16 text-primary mx-auto animate-spin" />
                <h1 className="text-2xl font-bold text-neutral-900">Finding restaurants near you...</h1>
                <p className="text-neutral-600">
                  Discovering the best places to eat near {selectedCampus}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Utensils className="text-primary h-5 w-5 mr-2" />
            <span className="text-sm font-medium text-primary">Campus Crave</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 Campus Crave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}