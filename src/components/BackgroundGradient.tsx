
import React from "react";

export const BackgroundGradient: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] bg-blue-600/20 blur-3xl rotate-12" />
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_80%)]"
        style={{ 
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 80%)",
          mixBlendMode: "multiply"
        }}
      />
      <div className="absolute inset-0 grid grid-cols-6 gap-2 opacity-20">
        {Array.from({ length: 20 }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {Array.from({ length: 6 }).map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="h-20 border border-white/10"></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
