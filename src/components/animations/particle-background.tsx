import React from 'react';

export const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="particles absolute inset-0 opacity-40" />
      
      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-gradient-purple rounded-full animate-float opacity-60" />
      <div className="absolute top-40 right-16 w-1 h-1 bg-gradient-orange rounded-full animate-bounce-gentle opacity-50" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-gradient-purple-light rounded-full animate-glow-pulse opacity-40" />
      <div className="absolute top-60 right-8 w-2 h-2 bg-gradient-orange-light rounded-full animate-float opacity-50" />
      <div className="absolute bottom-60 right-32 w-1 h-1 bg-gradient-purple rounded-full animate-bounce-gentle opacity-60" />
    </div>
  );
};