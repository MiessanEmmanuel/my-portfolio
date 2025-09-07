import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

const TemplateCard = ({ 
  image, 
  title, 
  category, 
  description,
  demoUrl = '#',
  gradient = false 
}) => {
  return (
    <div className="group relative bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-border dark:border-border hover:border-primary/30 hover:shadow-xl transition-smooth">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {gradient ? (
          <div className={`w-full h-full bg-gradient-to-br ${image}`} />
        ) : (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <a 
              href={demoUrl}
              className="bg-white text-text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-smooth flex items-center gap-2"
            >
              Live Demo <ExternalLink size={16} />
            </a>
            <button className="bg-white/20 backdrop-blur p-2 rounded-lg hover:bg-white/30 transition-smooth">
              <Heart size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <span className="text-sm font-medium text-primary">{category}</span>
        <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark mt-2 mb-3">{title}</h3>
        <p className="text-text-secondary dark:text-text-light line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default TemplateCard;