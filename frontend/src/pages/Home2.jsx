import React from 'react';

import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { 
  Boxes, 
  Brush, 
  Camera,
  Cpu,
  Database,
  FileCode,
  Figma,
  Github,
  Layers3,
  Monitor,
  PenTool,
  Rocket,
  Sparkles,
  Terminal,
  Users,
  Wand2
} from 'lucide-react';
import NavBar from '../components/Navbar';

const Home2 = () => {
  const features = [
    {
      icon: <Terminal size={24} />,
      title: 'Developer First',
      description: 'Built by developers for developers with clean, maintainable code.',
      color: 'purple',
    },
    {
      icon: <Layers3 size={24} />,
      title: 'Component Based',
      description: 'Modular architecture for easy customization and scalability.',
      color: 'primary',
    },
    {
      icon: <Cpu size={24} />,
      title: 'High Performance',
      description: 'Optimized for speed with lazy loading and code splitting.',
      color: 'yellow',
    },
    {
      icon: <Database size={24} />,
      title: 'Backend Ready',
      description: 'Easy integration with any backend API or database.',
      color: 'green',
    },
    {
      icon: <Monitor size={24} />,
      title: 'Cross Browser',
      description: 'Tested on all modern browsers for consistent experience.',
      color: 'blue',
    },
    {
      icon: <Github size={24} />,
      title: 'Version Control',
      description: 'Git-friendly structure with clear commit history.',
      color: 'secondary',
    },
  ];
  
  const pricingPlans = [
    {
      title: 'Standard',
      price: 23,
      period: 'month',
      features: [
        { text: '5 Active Projects', included: true },
        { text: '20+ Components', included: true },
        { text: 'Basic Templates', included: true },
        { text: 'Community Support', included: true },
        { text: 'Monthly Updates', included: true },
        { text: 'Commercial Use', included: false },
        { text: 'Priority Support', included: false },
      ],
    },
    {
      title: 'Ultimate',
      price: 69,
      period: 'month',
      highlighted: true,
      features: [
        { text: 'Unlimited Projects', included: true },
        { text: '40+ Components', included: true },
        { text: 'All Premium Templates', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Weekly Updates', included: true },
        { text: 'Commercial License', included: true },
        { text: 'Custom Requests', included: true },
      ],
    },
  ];
  
  const editorFeatures = [
    {
      icon: <Wand2 size={20} />,
      title: 'Smart Suggestions',
      description: 'AI-powered code completion',
    },
    {
      icon: <FileCode size={20} />,
      title: 'Live Preview',
      description: 'See changes in real-time',
    },
    {
      icon: <Boxes size={20} />,
      title: 'Component Library',
      description: 'Drag and drop components',
    },
    {
      icon: <PenTool size={20} />,
      title: 'Design Tools',
      description: 'Built-in design editor',
    },
  ];
  
  const designAssets = [
    { icon: <Figma size={40} />, name: 'Figma Files', count: '50+' },
    { icon: <Brush size={40} />, name: 'UI Kits', count: '20+' },
    { icon: <Camera size={40} />, name: 'Stock Photos', count: '1000+' },
    { icon: <Sparkles size={40} />, name: '3D Assets', count: '100+' },
  ];
  
  return (
    <div className="min-h-screen bg-background-dark text-white">
      <NavBar variant={2} />
      <Hero variant={2} />
      
      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-surface-dark to-background-dark" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary">Powerful Features</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2">
              Built for modern development
            </h2>
            <p className="text-xl text-text-light mt-4 max-w-2xl mx-auto">
              Everything you need to create stunning applications with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-surface-dark/50 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-smooth"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${feature.color}/20 text-${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Code Editor Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-medium text-primary">Smart Development</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-6">
                Code with confidence
              </h2>
              <p className="text-xl text-text-light mb-8">
                Our intelligent code editor helps you write better code faster with real-time suggestions and error detection.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {editorFeatures.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-text-light">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <Button variant="gradient" size="lg">
                Try the Editor <Rocket className="ml-2" size={20} />
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
              <div className="relative bg-surface-dark rounded-2xl overflow-hidden border border-white/10">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-sm text-text-light">App.jsx</span>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="text-text-light">
                    <span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;
                  </div>
                  <div className="text-text-light mt-2">
                    <span className="text-purple-400">import</span> {'{ '}<span className="text-yellow-400">Button</span>{' }'} <span className="text-purple-400">from</span> <span className="text-green-400">'./components'</span>;
                  </div>
                  <div className="mt-4">
                    <span className="text-blue-400">const</span> <span className="text-yellow-400">App</span> {/* = () => */} {'{'}
                  </div>
                  <div className="ml-4 mt-2">
                    <span className="text-purple-400">return</span> (
                  </div>
                  <div className="ml-8 mt-2">
                    <span className="text-gray-400">{'<'}</span><span className="text-red-400">div</span> <span className="text-yellow-400">className</span>=<span className="text-green-400">"app"</span><span className="text-gray-400">{'>'}</span>
                  </div>
                  <div className="ml-12 mt-2">
                    <span className="text-gray-400">{'<'}</span><span className="text-blue-400">Button</span><span className="text-gray-400">{'>'}</span>Click me<span className="text-gray-400">{'</'}</span><span className="text-blue-400">Button</span><span className="text-gray-400">{'>'}</span>
                  </div>
                  <div className="ml-8 mt-2">
                    <span className="text-gray-400">{'</'}</span><span className="text-red-400">div</span><span className="text-gray-400">{'>'}</span>
                  </div>
                  <div className="ml-4 mt-2">);</div>
                  <div className="mt-2">{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Design Assets */}
      <section className="py-20 bg-surface-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-secondary">Premium Resources</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2">
              Editable 3D Assets
            </h2>
            <p className="text-xl text-text-light mt-4 max-w-2xl mx-auto">
              Access our library of premium design resources and 3D assets.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {designAssets.map((asset, index) => (
              <div 
                key={index}
                className="bg-background-dark/50 backdrop-blur border border-white/10 rounded-2xl p-8 text-center hover:border-secondary/50 transition-smooth group"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-secondary/20 to-accent-purple/20 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-smooth">
                  {asset.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{asset.name}</h3>
                <p className="text-3xl font-bold text-secondary">{asset.count}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="gradient" size="lg">
              Browse All Assets
            </Button>
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary">Simple Pricing</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2">
              Choose your plan
            </h2>
            <p className="text-xl text-text-light mt-4">
              Transparent pricing for teams of all sizes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={plan.highlighted ? 'transform scale-105' : ''}>
                <PricingCard {...plan} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-50" />
            <div className="relative bg-gradient-to-r from-primary to-secondary p-12 rounded-3xl text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Start building today
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already creating amazing projects with our tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="xl">
                  Get Started Free
                </Button>
                <Button variant="ghost" size="xl" className="text-white hover:bg-white/20">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer variant={2} />
    </div>
  );
};

export default Home2;