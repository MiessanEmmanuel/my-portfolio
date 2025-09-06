import React from 'react';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import TemplateCard from '../components/TemplateCard';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { 
  Palette, 
  Code, 
  Layers, 
  Smartphone, 
  Globe, 
  Zap,
  CheckCircle,
  Users,
  BarChart,
  Shield,
  Sparkles,
  Package
} from 'lucide-react';
import NavBar from '../components/Navbar';

const Home1 = () => {
  const features = [
    {
      icon: <Palette size={24} />,
      title: 'Beautiful Design',
      description: 'Crafted with attention to detail and modern design principles.',
      color: 'primary',
    },
    {
      icon: <Code size={24} />,
      title: 'Clean Code',
      description: 'Well-structured, commented code that\'s easy to understand and modify.',
      color: 'secondary',
    },
    {
      icon: <Layers size={24} />,
      title: '40+ Components',
      description: 'Extensive library of reusable components for rapid development.',
      color: 'purple',
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Fully Responsive',
      description: 'Looks perfect on all devices, from mobile to desktop.',
      color: 'yellow',
    },
    {
      icon: <Globe size={24} />,
      title: 'SEO Optimized',
      description: 'Built with best practices for search engine optimization.',
      color: 'blue',
    },
    {
      icon: <Zap size={24} />,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance out of the box.',
      color: 'green',
    },
  ];
  
  const pricingPlans = [
    {
      title: 'Starter',
      price: 29,
      features: [
        { text: 'Up to 5 projects', included: true },
        { text: 'Basic components', included: true },
        { text: 'Email support', included: true },
        { text: 'Free updates', included: true },
        { text: 'Premium templates', included: false },
        { text: 'Priority support', included: false },
      ],
    },
    {
      title: 'Professional',
      price: 79,
      highlighted: true,
      features: [
        { text: 'Unlimited projects', included: true },
        { text: 'All components', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Free updates', included: true },
        { text: 'Premium templates', included: true },
        { text: 'Commercial license', included: true },
      ],
    },
    {
      title: 'Business',
      price: 199,
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Custom components', included: true },
        { text: 'Phone & chat support', included: true },
        { text: 'Source files included', included: true },
        { text: 'Team collaboration', included: true },
        { text: 'White-label rights', included: true },
      ],
    },
  ];
  
  const templates = [
    {
      image: 'from-primary to-primary-light',
      title: 'Automation Platform',
      category: 'SaaS',
      description: 'Modern automation platform template with dashboard components.',
      gradient: true,
    },
    {
      image: 'from-secondary to-secondary-light',
      title: 'Component Library',
      category: 'Development',
      description: 'Comprehensive component library for rapid development.',
      gradient: true,
    },
    {
      image: 'from-accent-purple to-accent-blue',
      title: 'Cross-platform Deployment',
      category: 'DevOps',
      description: 'Deploy your applications across multiple platforms seamlessly.',
      gradient: true,
    },
    {
      image: 'https://placehold.co/400x300/6366f1/ffffff?text=Native+Prototype',
      title: 'Native-like Prototyping',
      category: 'Design',
      description: 'Create prototypes that feel like native applications.',
    },
  ];
  
  const stats = [
    { value: '10K+', label: 'Happy Customers' },
    { value: '500+', label: 'Templates Created' },
    { value: '99%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support Available' },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <NavBar variant={1} />
      <Hero variant={1} />
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary">Features</span>
            <h2 className="text-4xl font-bold text-text-primary mt-2">
              Everything you need to build amazing websites
            </h2>
            <p className="text-xl text-text-secondary mt-4 max-w-2xl mx-auto">
              Our templates come packed with features to help you create stunning websites quickly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Templates Section */}
      <section id="templates" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-sm font-medium text-primary">Templates</span>
              <h2 className="text-4xl font-bold text-text-primary mt-2">
                10+ Premade Templates
              </h2>
              <p className="text-xl text-text-secondary mt-4">
                Including Hero Header, Features, Pricing Table, Login, Contact, Timer-line, Call to action and much more...
              </p>
            </div>
            <Button variant="outline">
              View All Templates
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <TemplateCard key={index} {...template} />
            ))}
          </div>
          
          <div className="mt-16 p-8 bg-gradient-to-r from-primary to-primary-dark rounded-2xl text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Go from ideation to design and done.
                </h3>
                <p className="text-white/80 text-lg">
                  Research & background summary
                </p>
              </div>
              <Button variant="secondary" size="lg">
                Find the Right Plan
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary">Premium Designs</span>
            <h2 className="text-4xl font-bold text-text-primary mt-2">
              Stunning Trending Designs
            </h2>
            <p className="text-xl text-text-secondary mt-4 max-w-2xl mx-auto">
              Let us help you bring an extremely clean and trendy design style.
            </p>
            
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-text-primary mb-2">
                Find the Right Plan.
              </h3>
              <p className="text-text-secondary">
                Flexible pricing options for businesses of all sizes.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-text-secondary">
              Ready to get started? 
              <span className="text-primary font-medium ml-1">Sign up with your email</span>
            </p>
            <Button variant="gradient" size="lg" className="mt-6">
              Get Started
            </Button>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-accent-yellow/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-accent-yellow mr-2" />
            <span className="text-sm font-medium text-accent-yellow">Limited Time Offer</span>
          </div>
          
          <h2 className="text-5xl font-bold text-text-primary mb-6">
            Ready to build your dream portfolio?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join thousands of developers and designers who are already using our templates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl">
              Get Started Now
            </Button>
            <Button variant="outline" size="xl">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
      
      <Footer variant={1} />
    </div>
  );
};

export default Home1;