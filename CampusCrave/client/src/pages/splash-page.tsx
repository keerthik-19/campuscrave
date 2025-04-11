import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SplashPage() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);

  // Simulate loading and auto-redirect after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Handle getting started button click
  const handleGetStarted = () => {
    setLocation("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6 max-w-md w-full text-center">
        {/* Logo */}
        <div className="relative">
          <div className="bg-white p-5 rounded-full shadow-md">
            <Utensils className="h-16 w-16 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2">
            <span className="px-2 py-1 bg-yellow-400 text-white text-xs rounded-full font-medium">
              Beta
            </span>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-bold text-gray-900">
          Campus <span className="text-primary">Crave</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg text-gray-600 mt-2">
          Discover the best campus dining options
        </p>

        {/* Loading Indicator or Get Started Button */}
        {loading ? (
          <div className="flex flex-col items-center space-y-3 mt-8">
            <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary animate-pulse"
                style={{ 
                  width: '100%',
                  animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              />
            </div>
            <p className="text-sm text-gray-500">Loading amazing food options...</p>
          </div>
        ) : (
          <Button 
            className="mt-8 bg-primary hover:bg-primary/90 text-white px-8 py-6 h-auto"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        )}

        {/* Footer Text */}
        <p className="text-xs text-gray-500 mt-16">
          © 2025 Campus Crave. All rights reserved.
        </p>
      </div>
    </div>
  );
}