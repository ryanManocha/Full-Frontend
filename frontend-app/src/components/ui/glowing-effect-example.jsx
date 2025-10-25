import React from 'react';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { cn } from '../../lib/utils';

// Simple example of how to use the GlowingEffect component
export function SimpleGlowingCard({ title, description, className }) {
  return (
    <div className={cn("group relative rounded-lg border border-slate-700 bg-slate-900/50 p-6 transition-all duration-300 hover:border-slate-600", className)}>
      {/* Glowing Effect */}
      <GlowingEffect
        spread={30}
        glow={true}
        disabled={false}
        proximity={50}
        inactiveZone={0.1}
        borderWidth={2}
        movementDuration={0.6}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white">
          {title}
        </h3>
        <p className="text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}

// Example usage in your components:
export function ExampleUsage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      <SimpleGlowingCard
        title="Feature 1"
        description="This card has a beautiful glowing border effect that follows your mouse cursor."
      />
      <SimpleGlowingCard
        title="Feature 2"
        description="The effect is smooth and responsive, creating an engaging user experience."
      />
      <SimpleGlowingCard
        title="Feature 3"
        description="You can customize the colors, speed, and behavior of the glowing effect."
      />
    </div>
  );
}
