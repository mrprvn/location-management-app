"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Upload, Shield, ArrowRight, Map, Star } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    router.push("/register");
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-cyan-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-cyan-600" />
              <span className="font-playfair font-bold text-xl text-gray-900">
                LocationHub
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleSignIn}
                className="text-gray-600 hover:text-cyan-600"
              >
                Sign In
              </Button>
              <Button
                onClick={handleGetStarted}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <h1 className="font-playfair font-bold text-5xl sm:text-6xl lg:text-7xl text-gray-900 mb-6">
                Effortlessly Manage
                <span className="text-cyan-600 block">Your Locations</span>
              </h1>
              <p className="font-source-sans text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Streamline your location data with intuitive map features and
                seamless file uploads. Your complete solution for location
                management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSignIn}
                  className="px-8 py-4 text-lg border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-all duration-300 bg-transparent"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="font-source-sans text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your locations efficiently and
              securely
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full group-hover:bg-cyan-600 transition-colors duration-300">
                  <Map className="h-8 w-8 text-cyan-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-playfair font-bold text-2xl text-gray-900 mb-4">
                  Interactive Maps
                </h3>
                <p className="font-source-sans text-gray-600 leading-relaxed">
                  Visualize your locations like never before with our intuitive
                  mapping interface. Add markers, view details, and navigate
                  with ease.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full group-hover:bg-orange-500 transition-colors duration-300">
                  <Upload className="h-8 w-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-playfair font-bold text-2xl text-gray-900 mb-4">
                  Easy File Uploads
                </h3>
                <p className="font-source-sans text-gray-600 leading-relaxed">
                  Import your location data in just a few clicks. Support for
                  CSV and ZIP files with automatic validation and processing.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full group-hover:bg-green-600 transition-colors duration-300">
                  <Shield className="h-8 w-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-playfair font-bold text-2xl text-gray-900 mb-4">
                  Secure Authentication
                </h3>
                <p className="font-source-sans text-gray-600 leading-relaxed">
                  Your data is protected with enterprise-grade security. User
                  authentication and authorization keep your information safe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cyan-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div className="animate-float">
              <div className="text-4xl font-bold font-playfair mb-2">
                10,000+
              </div>
              <div className="font-source-sans text-cyan-100">
                Locations Managed
              </div>
            </div>
            <div className="animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="text-4xl font-bold font-playfair mb-2">500+</div>
              <div className="font-source-sans text-cyan-100">Happy Users</div>
            </div>
            <div className="animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-4xl font-bold font-playfair mb-2">99.9%</div>
              <div className="font-source-sans text-cyan-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="font-source-sans text-gray-600 mb-4">
                  "LocationHub transformed how we manage our retail locations.
                  The interface is intuitive and the map features are exactly
                  what we needed."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">
                      Sarah Chen
                    </div>
                    <div className="text-sm text-gray-500">
                      Operations Manager
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="font-source-sans text-gray-600 mb-4">
                  "The file upload feature saved us hours of manual data entry.
                  Clean, fast, and reliable - everything we wanted in a location
                  management tool."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">
                      Mike Rodriguez
                    </div>
                    <div className="text-sm text-gray-500">Data Analyst</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg md:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="font-source-sans text-gray-600 mb-4">
                  "Security was our top concern, and LocationHub delivered. The
                  authentication system gives us peace of mind while keeping the
                  UX smooth."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">
                      Alex Thompson
                    </div>
                    <div className="text-sm text-gray-500">IT Director</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-source-sans text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust LocationHub to manage their
            location data efficiently and securely.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            Start Free Today{" "}
            <ArrowRight className="ml-2 h-6 w-6 cursor-pointer" />
          </Button>
        </div>
      </section>
    </div>
  );
}
