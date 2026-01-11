// Animation utilities for smooth cinematic effects
export const animations = {
  // Fade animations
  fadeIn: {
    animation: 'fadeIn 0.5s ease-out',
  },
  fadeOut: {
    animation: 'fadeOut 0.3s ease-in',
  },

  // Slide animations
  slideInFromBottom: {
    animation: 'slideInFromBottom 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  slideInFromTop: {
    animation: 'slideInFromTop 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  slideInFromLeft: {
    animation: 'slideInFromLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  slideInFromRight: {
    animation: 'slideInFromRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  },

  // Scale animations
  scaleIn: {
    animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  scaleOut: {
    animation: 'scaleOut 0.2s ease-in',
  },

  // Zoom animations
  zoomIn: {
    animation: 'zoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  zoomOut: {
    animation: 'zoomOut 0.3s ease-in',
  },

  // Bounce animations
  bounceIn: {
    animation: 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Pulse animations
  pulse: {
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  pulseSlow: {
    animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
};

// Hover effects
export const hoverEffects = {
  lift: {
    transition:
      'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    },
  },

  glow: {
    transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
    },
  },

  scale: {
    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  rotate: {
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'rotate(5deg)',
    },
  },
};

// Transition presets
export const transitions = {
  smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  sharp: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Keyframe definitions (to be added to CSS)
export const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.8);
    }
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4);
    }
  }
`;

// Animation classes for Tailwind
export const animationClasses = {
  'animate-fade-in': 'animate-[fadeIn_0.5s_ease-out]',
  'animate-fade-out': 'animate-[fadeOut_0.3s_ease-in]',
  'animate-slide-in-bottom': 'animate-[slideInFromBottom_0.6s_cubic-bezier(0.16,1,0.3,1)]',
  'animate-slide-in-top': 'animate-[slideInFromTop_0.4s_cubic-bezier(0.16,1,0.3,1)]',
  'animate-slide-in-left': 'animate-[slideInFromLeft_0.5s_cubic-bezier(0.16,1,0.3,1)]',
  'animate-slide-in-right': 'animate-[slideInFromRight_0.5s_cubic-bezier(0.16,1,0.3,1)]',
  'animate-scale-in': 'animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]',
  'animate-zoom-in': 'animate-[zoomIn_0.5s_cubic-bezier(0.16,1,0.3,1)]',
  'animate-bounce-in': 'animate-[bounceIn_0.8s_cubic-bezier(0.68,-0.55,0.265,1.55)]',
  'animate-pulse-slow': 'animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]',
  'animate-float': 'animate-[float_3s_ease-in-out_infinite]',
  'animate-glow': 'animate-[glow_2s_ease-in-out_infinite]',
  'animate-shimmer': 'animate-[shimmer_2s_linear_infinite]',
};

// Utility functions for animations
export function getAnimationDelay(index: number, baseDelay = 100): string {
  return `${index * baseDelay}ms`;
}

export function getStaggeredAnimation(
  index: number,
  animation: keyof typeof animationClasses
): string {
  return `${animationClasses[animation]} animation-delay-${index * 100}`;
}

// Animation variants for different states
export const animationVariants = {
  loading: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  success: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  error: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};
