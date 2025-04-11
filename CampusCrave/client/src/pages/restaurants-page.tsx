import { useState } from "react";
import { Utensils, Star, Search, MapPin, Filter, X, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

// Define dietary options
type DietaryOption = "vegetarian" | "vegan" | "halal" | "kosher" | "gluten-free";

// Define price range
type PriceRange = 1 | 2 | 3 | 4; // $ to $$$$

// Placeholder restaurant data
const RESTAURANTS = [
  {
    id: 1,
    name: "The Campus Grill",
    type: "American",
    rating: 4.5,
    distance: "0.2 miles",
    deliveryTime: "15-20 min",
    priceRange: 2 as PriceRange, // $$
    dietaryOptions: ["halal", "gluten-free"] as DietaryOption[],
    imageUrl: ""
  },
  {
    id: 2,
    name: "Fresh Wok",
    type: "Chinese",
    rating: 4.2,
    distance: "0.4 miles",
    deliveryTime: "20-30 min",
    priceRange: 1 as PriceRange, // $
    dietaryOptions: ["vegetarian"] as DietaryOption[],
    imageUrl: ""
  },
  {
    id: 3,
    name: "Burrito Express",
    type: "Mexican",
    rating: 4.7,
    distance: "0.5 miles",
    deliveryTime: "15-25 min",
    priceRange: 2 as PriceRange, // $$
    dietaryOptions: ["vegetarian", "vegan"] as DietaryOption[],
    imageUrl: ""
  },
  {
    id: 4,
    name: "Pizza Palace",
    type: "Italian",
    rating: 4.3,
    distance: "0.3 miles",
    deliveryTime: "20-30 min",
    priceRange: 2 as PriceRange, // $$
    dietaryOptions: ["vegetarian", "kosher"] as DietaryOption[],
    imageUrl: ""
  },
  {
    id: 5,
    name: "Sushi Spot",
    type: "Japanese",
    rating: 4.8,
    distance: "0.7 miles",
    deliveryTime: "25-35 min",
    priceRange: 3 as PriceRange, // $$$
    dietaryOptions: ["gluten-free"] as DietaryOption[],
    imageUrl: ""
  },
  {
    id: 6,
    name: "Cafe Corner",
    type: "Coffee & Bakery",
    rating: 4.6,
    distance: "0.1 miles",
    deliveryTime: "10-15 min",
    priceRange: 1 as PriceRange, // $
    dietaryOptions: ["vegetarian", "vegan", "gluten-free"] as DietaryOption[],
    imageUrl: ""
  }
];

export default function RestaurantsPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<number[]>([1, 4]); // Default to all price ranges
  const [dietaryFilters, setDietaryFilters] = useState<Record<DietaryOption, boolean>>({
    "vegetarian": false,
    "vegan": false,
    "halal": false,
    "kosher": false,
    "gluten-free": false
  });
  
  // Handle dietary filter change
  const handleDietaryFilterChange = (option: DietaryOption, checked: boolean) => {
    setDietaryFilters(prev => ({
      ...prev,
      [option]: checked
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setPriceFilter([1, 4]);
    setDietaryFilters({
      "vegetarian": false,
      "vegan": false,
      "halal": false,
      "kosher": false,
      "gluten-free": false
    });
  };
  
  // Check if any dietary filters are active
  const hasActiveDietaryFilters = Object.values(dietaryFilters).some(value => value);
  
  // Filter restaurants by search query, price range, and dietary options
  const filteredRestaurants = RESTAURANTS.filter(restaurant => {
    // Text search filter
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price range filter
    const withinPriceRange = 
      restaurant.priceRange >= priceFilter[0] && 
      restaurant.priceRange <= priceFilter[1];
    
    // Dietary filter
    let passesDietaryFilter = true;
    
    // Only apply dietary filter if at least one is selected
    if (hasActiveDietaryFilters) {
      // Check if the restaurant has all selected dietary options
      passesDietaryFilter = Object.entries(dietaryFilters)
        .filter(([_, isSelected]) => isSelected) // Get only selected filters
        .every(([option]) => restaurant.dietaryOptions.includes(option as DietaryOption));
    }
    
    return matchesSearch && withinPriceRange && passesDietaryFilter;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
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
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <a href="#" className="text-primary border-b-2 border-primary px-1 py-2 text-sm font-medium">
                  Restaurants
                </a>
                <a href="#" className="text-gray-500 hover:text-primary border-b-2 border-transparent hover:border-primary px-1 py-2 text-sm font-medium">
                  My Favorites
                </a>
                <a href="#" className="text-gray-500 hover:text-primary border-b-2 border-transparent hover:border-primary px-1 py-2 text-sm font-medium">
                  Orders
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
              <Button variant="outline" className="flex items-center">
                <i className="ri-user-line mr-1"></i>
                <span>Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow p-4">
        <div className="max-w-7xl mx-auto">
          {/* Campus and location info */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NYIT Manhattan</h1>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Broadway, New York, NY</span>
              </div>
            </div>
            <Button variant="outline" className="text-primary border-primary">
              Change Campus
            </Button>
          </div>
          
          {/* Search and filter bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search restaurants or cuisines" 
                className="pl-10 h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                  <SheetDescription>
                    Customize your restaurant search with filters
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  {/* Price Range */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Budget</h3>
                      <div className="font-medium">
                        {"$".repeat(priceFilter[0])} - {"$".repeat(priceFilter[1])}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">$</span>
                      <Slider
                        value={priceFilter}
                        min={1}
                        max={4}
                        step={1}
                        onValueChange={(value) => setPriceFilter(value as number[])}
                        className="flex-1"
                      />
                      <span className="text-sm">$$$$</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Dietary Restrictions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Dietary Restrictions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(Object.keys(dietaryFilters) as DietaryOption[]).map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`filter-${option}`} 
                            checked={dietaryFilters[option]}
                            onCheckedChange={(checked) => 
                              handleDietaryFilterChange(option, checked as boolean)
                            }
                          />
                          <Label htmlFor={`filter-${option}`} className="text-sm capitalize">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <SheetFooter className="flex justify-between sm:justify-between">
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="mt-4"
                  >
                    Reset
                  </Button>
                  <SheetClose asChild>
                    <Button 
                      className="mt-4 bg-primary hover:bg-primary/90"
                    >
                      Apply Filters
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Restaurant grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  {/* Placeholder for restaurant image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Utensils className="h-12 w-12" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-400 hover:bg-yellow-500 text-white">
                      {restaurant.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{restaurant.name}</h3>
                      <p className="text-sm text-gray-500">{restaurant.type}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-500">
                      <i className="ri-heart-line text-lg"></i>
                    </Button>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500 space-x-3">
                    <span>{restaurant.distance}</span>
                    <span>•</span>
                    <span>{restaurant.deliveryTime}</span>
                    <span>•</span>
                    <span className="font-medium">
                      {"$".repeat(restaurant.priceRange)}
                    </span>
                  </div>
                  
                  {/* Dietary options */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {restaurant.dietaryOptions.map((option) => (
                      <Badge key={option} variant="outline" className="text-xs">
                        {option}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
                    View Menu
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400">
                <Search className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No restaurants found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search term.</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Utensils className="text-primary h-5 w-5 mr-2" />
            <span className="text-sm font-medium text-primary">Campus Crave</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-primary">Help</a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary">Terms</a>
          </div>
          <p className="text-sm text-gray-500 mt-4 md:mt-0">© 2025 Campus Crave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}