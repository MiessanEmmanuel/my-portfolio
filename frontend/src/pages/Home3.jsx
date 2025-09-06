import React from 'react';
import NavBar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { 
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  Code2,
  FileText,
  Folder,
  Gift,
  Globe2,
  Layers,
  Layout,
  Lock,
  MessageSquare,
  Palette,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users2,
  Zap
} from 'lucide-react';

const Home3 = () => {
  const workflow = [
    {
      number: '01',
      title: 'Research & Planning',
      description: 'Define your goals and understand your target audience.',
      icon: <Brain size={24} />,
    },
    {
      number: '02',
      title: 'Design & Prototype',
      description: 'Create stunning designs with our intuitive tools.',
      icon: <Palette size={24} />,
    },
    {
      number: '03',
      title: 'Develop & Test',
      description: 'Build your project with clean, scalable code.',
      icon: <Code2 size={24} />,
    },
    {
      number: '04',
      title: 'Launch & Scale',
      description: 'Deploy your project and grow your business.',
      icon: <Rocket size={24} />,
    },
  ];
  
  const benefits = [
    {
      icon: <Clock size={32} />,
      title: 'Save Time',
      value: '80%',
      description: 'Faster development with pre-built components',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Increase Revenue',
      value: '3x',
      description: 'Better conversion with optimized designs',
    },
    {
      icon: <Users2 size={32} />,
      title: 'Happy Customers',
      value: '10K+',
      description: 'Trusted by developers worldwide',
    },
    {
      icon: <Award size={32} />,
      title: 'Award Winning',
      value: '25+',
      description: 'Industry recognition for excellence',
    },
  ];
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechStart',
      content: 'This platform transformed how we build products. The quality and speed of development improved dramatically.',
      rating: 5,
      image: 'https://placehold.co/60x60/6366f1/ffffff?text=SJ',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      content: 'The best investment we made this year. Clean code, amazing support, and constant updates.',
      rating: 5,
      image: 'https://placehold.co/60x60/ec4899/ffffff?text=MC',
    },
    {
      name: 'Emily Davis',
      role: 'Product Designer',
      content: 'Beautiful designs that actually convert. Our landing page performance increased by 250%.',
      rating: 5,
      image: 'https://placehold.co/60x60/a855f7/ffffff?text=ED',
    },
  ];
  
  const faqItems = [
    {
      question: 'What\'s included in the premium package?',
      answer: 'Premium includes all templates, components, lifetime updates, priority support, and commercial license.',
    },
    {
      question: 'Can I use this for client projects?',
      answer: 'Yes! Our commercial license allows you to use the templates for unlimited client projects.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your purchase.',
    },
    {
      question: 'How often do you release updates?',
      answer: 'We release updates weekly with new components, bug fixes, and improvements.',
    },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <NavBar variant={3} />
      <Hero variant={3} />
      
      {/* Workflow Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary">Our Process</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mt-2">
              From idea to launch in 4 steps
            </h2>
            <p className="text-xl text-text-secondary mt-4 max-w-2xl mx-auto">
              Our streamlined workflow helps you build faster and smarter.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-smooth">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-text-secondary">{step.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="text-primary/30" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-medium text-secondary">Why Choose Us</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mt-2 mb-6">
                Build faster, scale better
              </h2>
              <p className="text-xl text-text-secondary mb-8">
                Our platform empowers teams to create exceptional digital experiences with speed and confidence.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-primary">{benefit.icon}</div>
                    <div className="text-3xl font-bold text-text-primary">{benefit.value}</div>
                    <div className="text-sm font-medium text-text-primary">{benefit.title}</div>
                    <div className="text-sm text-text-secondary">{benefit.description}</div>
                  </div>
                ))}
              </div>
              
              <Button variant="gradient" size="lg" className="mt-8">
                Start Building Today
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg animate-float">
                    <BarChart3 className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-semibold text-text-primary">Analytics Dashboard</h4>
                    <p className="text-sm text-text-secondary mt-2">Track performance metrics</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-2xl shadow-lg">
                    <Layout className="w-8 h-8 mb-3" />
                    <h4 className="font-semibold">Responsive Design</h4>
                    <p className="text-sm mt-2">Perfect on all devices</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <Shield className="w-8 h-8 text-accent-green mb-3" />
                    <h4 className="font-semibold text-text-primary">Secure & Reliable</h4>
                    <p className="text-sm text-text-secondary mt-2">Enterprise-grade security</p>
                  </div>
                  <div className="bg-gradient-to-br from-secondary to-accent-purple text-white p-6 rounded-2xl shadow-lg animate-float-delayed">
                    <Zap className="w-8 h-8 mb-3" />
                    <h4 className="font-semibold">Lightning Fast</h4>
                    <p className="text-sm mt-2">Optimized performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary">Testimonials</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mt-2">
              Loved by developers worldwide
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-yellow fill-accent-yellow" />
                  ))}
                </div>
                <p className="text-text-secondary mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-text-secondary">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary">FAQ</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mt-2">
              Frequently asked questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="group bg-white border border-border rounded-xl">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="text-lg font-semibold text-text-primary pr-4">
                    {item.question}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-text-secondary group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-text-secondary">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-text-secondary mb-4">Still have questions?</p>
            <Button variant="outline">
              Contact Support <MessageSquare className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-8">
            <Gift className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Limited Time Offer - 50% OFF</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of teams building amazing products with our platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="secondary" size="xl">
              Get Started Now
            </Button>
            <Button variant="ghost" size="xl" className="text-white hover:bg-white/20">
              View Live Demo
            </Button>
          </div>
          
          <p className="text-sm text-white/70">
            No credit card required • 30-day money back guarantee
          </p>
        </div>
      </section>
      
      <Footer variant={1} />
    </div>
  );
};

export default Home3;