import React, { useState, useEffect } from 'react';
import { ArrowRight, Code2, Users, Zap, CheckCircle, Calendar, Trophy, Sparkles, MessageSquare, Target, Rocket, Star } from 'lucide-react';

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeOffer, setActiveOffer] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const TIMER_KEY = 'flash_sale_end_date';
    let targetDate;

    const savedEndDate = localStorage.getItem(TIMER_KEY);
    if (savedEndDate) {
      targetDate = new Date(savedEndDate);
    } else {
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 3);
      localStorage.setItem(TIMER_KEY, targetDate.toISOString());
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        localStorage.removeItem(TIMER_KEY);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const offers = [
   /*  {
      id: 'free',
      title: 'Accompagnement Libre',
      price: 'Gratuit',
      duration: 'À votre rythme',
      features: [
        'Accès à la communauté',
        'Ressources partagées',
        'Sessions de groupe',
        'Forum d\'entraide',
        'Webinaires mensuels',
      ],
      color: 'from-blue-500 to-purple-600',
      popular: false,
      link: 'https://chat.whatsapp.com/EcFlyHAZ9jAFy1NFH3u2EM?mode=ac_t',
    }, */
    {
      id: 'free',
      title: 'Accompagnement Privé ( Période de Test )',
      price: '15 000',
       sale : '5000',
      currency: 'FCFA',
      duration: '45 jours',
      features: [
        'Sessions privées 45 jours',
        'Revue de code approfondie',
        'Projets sur mesure',
        'Support prioritaire 24/7',
        'Accès à vie aux ressources'
      ],
      color: 'from-orange-500 to-pink-600',
      popular: true,
      link: 'https://tally.so/r/3x50by',

    },
     {
      id: 'premium',
      title: 'Coaching Personnel',
      price: '55 000',
      sale : null,
      currency: 'FCFA',
      duration: '2 mois',
      features: [
        'Mentorat personnalisé 1-1',
        'Session présentiel',
        'Sessions privées illimitées',
        'Revue de code approfondie',
        'Notions Avancées',
        'Projets réel en vue de revenus',
        'Support prioritaire 24/7',
        'Accès à vie aux ressources',
  
      ],
      color: 'from-blue-500 to-purple-600',
      popular: false,
      link: 'https://chat.whatsapp.com/EcFlyHAZ9jAFy1NFH3u2EM?mode=ac_t',

    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Countdown Timer - Sticky */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-4 px-4 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
            <span className="text-lg font-bold">⚡ OFFRE FLASH - FIN DANS:</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="bg-black/30 px-3 py-2 rounded-lg">
                <span className="text-2xl font-bold">{String(timeLeft.days || 0).padStart(2, '0')}</span>
              </div>
              <span className="text-sm">J</span>
            </div>
            <div className="text-2xl font-bold">:</div>
            <div className="flex items-center gap-1">
              <div className="bg-black/30 px-3 py-2 rounded-lg">
                <span className="text-2xl font-bold">{String(timeLeft.hours || 0).padStart(2, '0')}</span>
              </div>
              <span className="text-sm">H</span>
            </div>
            <div className="text-2xl font-bold">:</div>
            <div className="flex items-center gap-1">
              <div className="bg-black/30 px-3 py-2 rounded-lg">
                <span className="text-2xl font-bold">{String(timeLeft.minutes || 0).padStart(2, '0')}</span>
              </div>
              <span className="text-sm">M</span>
            </div>
            <div className="text-2xl font-bold">:</div>
            <div className="flex items-center gap-1">
              <div className="bg-black/30 px-3 py-2 rounded-lg">
                <span className="text-2xl font-bold animate-pulse">{String(timeLeft.seconds || 0).padStart(2, '0')}</span>
              </div>
              <span className="text-sm">S</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Transformez votre carrière de développeur avec OPENCODE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Devenez le Dev
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Que Vous Rêvez d'Être
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Accompagnement personnalisé pour maîtriser les technologies modernes et décrocher le job de vos rêves
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('offers').scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Découvrir les offres
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button 
              onClick={() => document.getElementById('offers').scrollIntoView({ behavior: 'smooth' })}
          
            className="px-8 py-4 border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105">
              En savoir plus
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <Code2 className="w-12 h-12 text-blue-400/50" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <Zap className="w-16 h-16 text-purple-400/50" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Trophy className="w-10 h-10 text-yellow-400/50" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pourquoi nous choisir ?
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Objectifs Personnalisés",
                description: "Un parcours adapté à vos besoins et vos ambitions professionnelles"
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Support Continu",
                description: "Accompagnement quotidien pour surmonter tous vos obstacles techniques"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Résultats Garantis",
                description: "Des compétences concrètes pour booster votre carrière rapidement"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Choisissez votre accompagnement
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`relative group transform transition-all duration-500 hover:scale-105 ${
                  activeOffer === offer.id ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setActiveOffer(offer.id)}
                onMouseLeave={() => setActiveOffer(null)}
              >
                {offer.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      Plus populaire
                    </div>
                  </div>
                )}

                <div className={`relative h-full p-8 rounded-3xl border ${
                  offer.popular ? 'border-orange-500/50' : 'border-white/20'
                } bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm overflow-hidden`}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-2">{offer.title}</h3>
                    <div className="mb-6">
                      {offer.price === 'Gratuit' ? (
                        <p className="text-4xl font-bold text-gray-300">{offer.price}</p>
                      ) : (
                        <p className="text-4xl font-bold">
                          {offer.sale ?
                           <> <span className='text-lg underline !text-yellow-300 line-through'>{offer.price} {offer.currency}</span> <span >5000</span> <span className="text-xl text-gray-400">{offer.currency}</span> </>
                          : <> <span>{offer.price} </span> <span className="text-xl text-gray-400">{offer.currency}</span> </>}
                          
                        </p>
                      )}
                      <p className="text-gray-400 flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4" />
                        {offer.duration}
                      </p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {offer.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a className={` block text-center  w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                      offer.popular
                        ? 'bg-gradient-to-r from-orange-500 to-pink-600 hover:shadow-2xl hover:shadow-orange-600/50'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`} href={offer.link}>
                      {offer.price === 'Gratuit' ? 'Commencer gratuitement' : 'Démarrer maintenant'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Prêt à transformer votre carrière ?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Rejoignez des centaines de développeurs qui ont déjà boosté leur carrière
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-600/50">
              <span className="relative z-10 flex items-center gap-2">
                Commencer maintenant
                <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;