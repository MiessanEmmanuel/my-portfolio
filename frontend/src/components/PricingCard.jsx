import React from 'react';
import { Check, X } from 'lucide-react';
import Button from './Button';

const PricingCard = ({ 
  title, 
  price, 
  period = 'month', 
  features = [], 
  highlighted = false,
  buttonText = 'Get Started',
  variant = 'primary'
}) => {
  const cardClass = highlighted 
    ? 'relative bg-gradient-to-br from-primary to-primary-dark text-white transform scale-105 shadow-2xl' 
    : 'bg-white dark:bg-surface-dark border border-border dark:border-border';
    
  return (
    <div className={`rounded-2xl p-8 transition-smooth hover:shadow-xl ${cardClass}`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent-yellow text-background-dark px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <h3 className={`text-2xl font-bold ${highlighted ? 'text-white' : 'text-text-primary dark:text-text-dark'}`}>
            {title}
          </h3>
          <div className="mt-4">
            <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-text-primary dark:text-text-dark'}`}>
              {typeof price === 'string' ? price : `$${price}`}
            </span>
            {typeof price !== 'string' && (
              <span className={`text-lg ${highlighted ? 'text-white/80' : 'text-text-secondary dark:text-text-light'}`}>
                /{period}
              </span>
            )}
          </div>
        </div>
        
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className={`mt-1 ${highlighted ? 'text-white' : 'text-primary'}`}>
                {feature.included ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <X className="w-5 h-5 opacity-40" />
                )}
              </div>
              <span className={`${highlighted ? 'text-white' : feature.included ? 'text-text-primary dark:text-text-dark' : 'text-text-light dark:text-text-secondary'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={highlighted ? 'secondary' : variant} 
          size="md" 
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;