import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth, AuthProvider } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Loader2, Eye, EyeOff, Utensils } from "lucide-react";

// Login form schema
const loginSchema = z.object({
  username: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

// Registration form schema
const registerSchema = z.object({
  username: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

function AuthPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  // Redirect if already logged in
  if (user) {
    setLocation("/home");
    return null;
  }

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  // Registration form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle login form submission
  function onLoginSubmit(values: LoginFormValues) {
    // In prototype mode, just redirect to the home page
    setLocation("/home");
    
    // This would normally call the API
    // loginMutation.mutate({
    //   username: values.username,
    //   password: values.password,
    // });
  }

  // Handle registration form submission
  function onRegisterSubmit(values: RegisterFormValues) {
    // In prototype mode, just redirect to the home page
    setLocation("/home");
    
    // This would normally call the API
    // registerMutation.mutate({
    //   username: values.username,
    //   password: values.password,
    // });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 text-neutral-500 hover:text-primary"
                onClick={() => setLocation("/")}
              >
                <i className="ri-arrow-left-line text-lg"></i>
                <span className="sr-only">Back to splash</span>
              </Button>
              <div className="flex-shrink-0 flex items-center">
                <Utensils className="text-primary h-6 w-6 mr-2" />
                <span className="font-semibold text-xl tracking-tight text-primary">Campus Crave</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-neutral-700">
                <span className="sr-only">View help</span>
                <i className="ri-question-line text-lg"></i>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow grid md:grid-cols-2 items-center px-4 py-12">
        {/* Login/Register Form Section */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-white shadow-md rounded-xl">
            <CardContent className="pt-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-50">
                  <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-white">Sign In</TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-white">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                  <div className="text-center mb-6">
                    <Utensils className="h-12 w-12 text-primary mx-auto" />
                    <h2 className="mt-4 text-center text-3xl font-bold text-neutral-900">Welcome back!</h2>
                    <p className="mt-2 text-center text-sm text-neutral-600">
                      Sign in to discover campus eats
                    </p>
                  </div>

                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      {/* Email Field */}
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="you@example.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password Field */}
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="••••••••"
                                  type={showPassword ? "text" : "password"}
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Remember Me & Forgot Password */}
                      <div className="flex items-center justify-between">
                        <FormField
                          control={loginForm.control}
                          name="rememberMe"
                          render={({ field }) => (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="remember-me"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <label
                                htmlFor="remember-me"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Remember me
                              </label>
                            </div>
                          )}
                        />

                        <Button variant="link" className="p-0 h-auto text-yellow-500 hover:text-yellow-500/90">
                          Forgot password?
                        </Button>
                      </div>

                      {/* Submit Button */}
                      <Button 
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Sign in"
                        )}
                      </Button>
                    </form>
                  </Form>

                  {/* OAuth Options */}
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-neutral-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        <i className="ri-google-fill text-lg mr-2 text-red-500"></i>
                        <span>Google</span>
                      </Button>
                      <Button variant="outline" className="w-full">
                        <i className="ri-apple-fill text-lg mr-2"></i>
                        <span>Apple</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Registration Form */}
                <TabsContent value="register">
                  <div className="text-center mb-6">
                    <Utensils className="h-12 w-12 text-primary mx-auto" />
                    <h2 className="mt-4 text-center text-3xl font-bold text-neutral-900">Create account</h2>
                    <p className="mt-2 text-center text-sm text-neutral-600">
                      Sign up to discover campus eats
                    </p>
                  </div>

                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      {/* Email Field */}
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="you@example.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password Field */}
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="••••••••"
                                  type={showRegisterPassword ? "text" : "password"}
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                >
                                  {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Confirm Password Field */}
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="••••••••"
                                  type={showConfirmPassword ? "text" : "password"}
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Terms & Conditions */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" />
                          <label
                            htmlFor="terms"
                            className="text-sm text-neutral-600"
                          >
                            I agree to the{" "}
                            <Button variant="link" className="p-0 h-auto text-yellow-500 hover:text-yellow-600">
                              Terms of Service
                            </Button>
                            {" "}and{" "}
                            <Button variant="link" className="p-0 h-auto text-yellow-500 hover:text-yellow-600">
                              Privacy Policy
                            </Button>
                          </label>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button 
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create account"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* App Description Section */}
        <div className="hidden md:flex flex-col justify-center items-center p-8">
          <div className="max-w-md space-y-6">
            <div className="text-center">
              <Utensils className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">Campus Crave</h1>
              <p className="text-xl text-neutral-700 mb-8">
                Discover the best places to eat near your campus
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-2">
                  <i className="ri-restaurant-line text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900">Find Campus Restaurants</h3>
                  <p className="text-neutral-600">Discover restaurants near your campus, filtered by your preferences.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-2">
                  <i className="ri-heart-line text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900">Save Your Favorites</h3>
                  <p className="text-neutral-600">Create a personalized list of your favorite dining spots.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-2">
                  <i className="ri-filter-line text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900">Filter by Preferences</h3>
                  <p className="text-neutral-600">Find places that match your dietary needs and budget.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Utensils className="text-primary h-6 w-6 mr-2" />
                <span className="font-semibold text-xl tracking-tight text-primary">Campus Crave</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow grid md:grid-cols-2 items-center px-4 py-12">
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-white shadow-md rounded-xl">
            <CardContent className="pt-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-blue-50">
                  <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-white">Sign In</TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-white">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <div className="text-center mb-6">
                    <Utensils className="h-12 w-12 text-primary mx-auto" />
                    <h2 className="mt-4 text-center text-3xl font-bold text-neutral-900">Welcome back!</h2>
                    <p className="mt-2 text-center text-sm text-neutral-600">
                      Sign in to discover campus eats
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <Input type="email" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">Sign in</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="register">
                  <div className="text-center mb-6">
                    <Utensils className="h-12 w-12 text-primary mx-auto" />
                    <h2 className="mt-4 text-center text-3xl font-bold text-neutral-900">Create account</h2>
                    <p className="mt-2 text-center text-sm text-neutral-600">
                      Sign up to discover campus eats
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <Input type="email" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">Create account</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="hidden md:flex flex-col justify-center items-center p-8">
          <div className="max-w-md space-y-6">
            <div className="text-center">
              <Utensils className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">Campus Crave</h1>
              <p className="text-xl text-neutral-700 mb-8">
                Discover the best places to eat near your campus
              </p>
            </div>
          </div>
        </div>
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
