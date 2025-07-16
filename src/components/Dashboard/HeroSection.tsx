import React, { useState, useEffect } from 'react';
import { Play, Pause, Heart, Shield, Users, Award } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      title: "Advanced Healthcare Management",
      subtitle: "Streamline your hospital operations with our comprehensive management system",
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200",
      icon: Heart,
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "Patient-Centered Care",
      subtitle: "Deliver exceptional patient experiences with integrated care coordination",
      image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1200",
      icon: Users,
      color: "from-green-600 to-green-800"
    },
    {
      title: "Secure & Compliant",
      subtitle: "HIPAA-compliant platform ensuring patient data security and privacy",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200",
      icon: Shield,
      color: "from-purple-600 to-purple-800"
    },
    {
      title: "Award-Winning Platform",
      subtitle: "Trusted by healthcare professionals worldwide for excellence in care",
      image: "https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1200",
      icon: Award,
      color: "from-orange-600 to-orange-800"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length]);

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8 border-4 border-gradient-to-r from-blue-400 to-purple-600">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.color} opacity-85`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between px-12 py-8">
        <div className="text-white max-w-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div className="h-1 w-16 bg-white bg-opacity-60 rounded-full"></div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 leading-tight animate-fade-in">
            {currentSlideData.title}
          </h1>
          
          <p className="text-xl mb-8 text-white text-opacity-95 leading-relaxed font-light">
            {currentSlideData.subtitle}
          </p>

          <div className="flex space-x-4">
            <button className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>

        {/* Floating Stats Cards */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,250+</p>
                <p className="text-sm opacity-80">Active Patients</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-sm opacity-80">Success Rate</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm opacity-80">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-12 flex items-center space-x-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-300 shadow-lg"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white bg-opacity-40 hover:bg-opacity-60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-20 right-20 animate-bounce opacity-60">
        <div className="w-6 h-6 bg-white bg-opacity-40 rounded-full shadow-lg"></div>
      </div>
      <div className="absolute bottom-32 right-32 animate-pulse opacity-40">
        <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full shadow-lg"></div>
      </div>
      <div className="absolute top-1/2 right-10 animate-ping opacity-30">
        <div className="w-4 h-4 bg-white bg-opacity-50 rounded-full"></div>
      </div>
    </div>
  );
};

export default HeroSection;