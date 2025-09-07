import React from 'react';

const FeatureCard = ({ icon, title, description, color = 'primary' }) => {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    yellow: 'bg-accent-yellow/10 text-accent-yellow',
    purple: 'bg-accent-purple/10 text-accent-purple',
    blue: 'bg-accent-blue/10 text-accent-blue',
    green: 'bg-accent-green/10 text-accent-green',
  };
  
  return (
    <div className="group p-6 bg-white dark:bg-surface-dark rounded-2xl border border-border dark:border-border hover:border-primary/30 hover:shadow-lg transition-smooth">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${colors[color]} group-hover:scale-110 transition-smooth`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;