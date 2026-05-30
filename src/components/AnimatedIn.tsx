// src/components/AnimateIn.tsx
import React from 'react';
import { MotiView } from 'moti';

// Define clear TypeScript contracts for props
interface AnimateInProps {
  children: React.ReactNode;
  type?: 'left' | 'right' | 'up' | 'down'; // Sliding entry directional choices
  delay?: number;                           // Optional timing delay for staggered lists
  className?: string;                       // NativeWind / Tailwind CSS classes support
}

export default function AnimateIn({ 
  children, 
  type = 'up', 
  delay = 0, 
  className = '' 
}: AnimateInProps) {
  
  // Define spatial translation offsets based on the selected type
  const getStartingDirection = () => {
    switch (type) {
      case 'left':  return { translateX: -60, translateY: 0 };
      case 'right': return { translateX: 60,  translateY: 0 };
      case 'down':  return { translateX: 0,   translateY: -50 };
      case 'up':
      default:      return { translateX: 0,   translateY: 50 };
    }
  };

  const startingOffset = getStartingDirection();

  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.96, // Subtle scale-in downsize for a premium feel
        ...startingOffset,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        translateX: 0,
        translateY: 0,
      }}
      transition={{
        type: 'spring',
        damping: 17,
        mass: 0.8,
        delay: delay, // Automatically applies timing delays when provided
      }}
      className={className}
    >
      {children}
    </MotiView>
  );
}