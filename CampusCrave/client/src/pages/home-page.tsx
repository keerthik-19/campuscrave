import { Button } from "@/components/ui/button";
import { Utensils, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function HomePage() {
  const [, setLocation] = useLocation();
  
  // Mock user data for demonstration
  const user = {
    id: 1,
    username: "demo@campus.edu"
  };
  
  // Sample function to simulate logout
  const handleLogout = () => setLocation('/auth');
  const isPending = false;
    
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Utensils className="text-primary h-6 w-6 mr-2" />
                <span className="font-semibold text-xl tracking-tight text-primary">Campus Crave</span>
                <span className="ml-2 px-2 py-1 bg-yellow-400 text-white text-xs rounded-full font-medium">Beta</span>
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <a href="#" className="text-primary border-b-2 border-primary px-1 py-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="text-gray-500 hover:text-primary border-b-2 border-transparent hover:border-primary px-1 py-2 text-sm font-medium">
                  Restaurants
                </a>
                <a href="#" className="text-gray-500 hover:text-primary border-b-2 border-transparent hover:border-primary px-1 py-2 text-sm font-medium">
                  My Favorites
                </a>
                <a href="#" className="text-gray-500 hover:text-primary border-b-2 border-transparent hover:border-primary px-1 py-2 text-sm font-medium">
                  About
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
                  <i className="ri-notification-3-line text-xl"></i>
                </Button>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-yellow-400 ring-2 ring-white"></span>
              </div>
              
              {/* Navigation buttons */}
              <Button 
                variant="outline"
                className="flex items-center bg-white hover:bg-gray-50 border-gray-200"
                onClick={() => setLocation('/auth')}
              >
                <i className="ri-arrow-go-back-line mr-1"></i>
                <span>Back</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleLogout}
                disabled={isPending}
                className="flex items-center"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <i className="ri-logout-box-line mr-1"></i>
                    <span>Sign Out</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Welcome banner */}
        <div className="bg-blue-50 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Welcome to <span className="text-primary">Campus Crave</span>, {user.username.split('@')[0]}!
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the best places to eat near your campus, personalized to your taste.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Find Restaurants
                </Button>
                <Button variant="outline" className="border-yellow-400 text-yellow-500 hover:bg-yellow-50">
                  My Favorites
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured section placeholder */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Near You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">Campus Restaurant {i}</h3>
                    <p className="text-sm text-gray-500">Delicious food options for students</p>
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="ri-star-fill"></i>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">125 reviews</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-blue-50 border-t border-blue-100">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Facebook</span>
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Instagram</span>
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <i className="ri-twitter-fill text-xl"></i>
              </a>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center md:text-right text-sm text-gray-500">
                &copy; 2025 Campus Crave. All rights reserved.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-blue-100 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex items-center justify-center md:justify-start">
              <Utensils className="text-primary h-5 w-5 mr-2" />
              <span className="text-sm font-medium text-primary">Campus Crave</span>
            </div>
            <div className="mt-8 md:mt-0 flex justify-center md:justify-end space-x-6">
              <Button variant="link" className="text-gray-500 hover:text-primary p-0 h-auto">
                <span className="text-sm">Privacy</span>
              </Button>
              <Button variant="link" className="text-gray-500 hover:text-primary p-0 h-auto">
                <span className="text-sm">Terms</span>
              </Button>
              <Button variant="link" className="text-yellow-500 hover:text-yellow-600 p-0 h-auto">
                <span className="text-sm">Help Center</span>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
