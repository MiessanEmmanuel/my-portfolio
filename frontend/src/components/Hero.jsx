import React from 'react';
import { ArrowRight, Check, Sparkles, Zap } from 'lucide-react';
import Button from './Button';

const Hero = ({ variant = 1 }) => {
  const features = [
    'Fully Customizable',
    'Google Fonts',
    'Bootstrap Grid',
    'Responsive',
    '24 Sections',
    '3D Editable Assets',
  ];
  
  if (variant === 1) {
    return (
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
                <Sparkles className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Premium Designs</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Production Ready
                <span className="text-primary"> Landing Page</span> Template
                for Design Startups
              </h1>
              
              <p className="text-xl text-text-secondary">
                Build stunning websites with our modern, responsive templates.
                Perfect for showcasing your design portfolio and attracting clients.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-text-primary font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="gradient" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://placehold.co/40x40/random?${i}`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm text-text-secondary">
                    <span className="font-bold text-text-primary">40+ Components</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-sm text-text-light">localhost:3000</span>
                </div>
                
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded" />
                  <div className="h-32 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 bg-surface rounded" />
                    <div className="h-20 bg-surface rounded" />
                    <div className="h-20 bg-surface rounded" />
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-xl shadow-lg">
                  <p className="text-sm font-medium">Let the team</p>
                  <p className="text-sm font-medium">work in same</p>
                  <p className="text-sm font-medium">place.</p>
                  <Button variant="secondary" size="sm" className="mt-3">
                    Sign in with Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (variant === 2) {
    return (
      <section className="relative min-h-screen flex items-center bg-background-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <span className="text-sm font-medium text-primary">Features</span>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              The world's most<br />
              powerful design<br />
              <span className="gradient-primary bg-clip-text text-transparent">workflow</span>
            </h1>
            
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              Simultaneously design, code and collaborate with your
              team all from one place.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button variant="gradient" size="lg">
                Start Free Trial
              </Button>
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 animate-float">
            <div className="w-20 h-20 bg-accent-purple rounded-2xl flex items-center justify-center">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="absolute top-1/3 right-10 animate-float-delayed">
            <div className="w-16 h-16 bg-accent-yellow rounded-full" />
          </div>
        </div>
      </section>
    );
  }
  
  // Variant 3
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold text-text-primary leading-tight">
              Drag, Drop and
              <span className="text-primary"> Mix Your Own</span>
              Landing Page
            </h1>
            
            <p className="text-xl text-text-secondary">
              All the components, elements are neatly and clean prepared,
              all you need to do is design your own landing page in minutes.
            </p>
            
            <Button variant="gradient" size="xl" className="shadow-2xl">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-30" />
            <div className="relative">
              <img
                src="https://placehold.co/600x800/6366f1/ffffff?text=Design+Preview"
                alt="Design Preview"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-yellow rounded-full" />
                  <div>
                    <p className="font-semibold">Ready to get started?</p>
                    <p className="text-sm text-text-secondary">Sign up with your email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Shapes */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-yellow/20 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;