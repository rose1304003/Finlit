import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FinLitLogo } from './SplashScreen';

interface OnboardingScreenProps {
  onComplete: () => void;
}

// 3D-style illustrations for onboarding
const OnboardingIllustration: React.FC = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    {/* Floating coins */}
    <motion.div 
      className="absolute top-4 left-8 text-3xl"
      animate={{ 
        y: [-5, 5, -5],
        rotate: [0, 10, 0]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      🪙
    </motion.div>
    <motion.div 
      className="absolute top-12 right-12 text-2xl"
      animate={{ 
        y: [5, -5, 5],
        rotate: [0, -15, 0]
      }}
      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
    >
      🪙
    </motion.div>
    <motion.div 
      className="absolute bottom-8 left-12 text-xl"
      animate={{ 
        y: [-3, 3, -3],
      }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    >
      🪙
    </motion.div>

    {/* Stars */}
    <motion.div 
      className="absolute top-8 right-20 text-pink-400 text-xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      ⭐
    </motion.div>
    <motion.div 
      className="absolute bottom-20 right-8 text-purple-400 text-lg"
      animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
    >
      ✨
    </motion.div>
    <motion.div 
      className="absolute top-20 left-4 text-pink-300 text-sm"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    >
      ✦
    </motion.div>

    {/* Stack of books */}
    <motion.div 
      className="absolute right-4 top-8 text-4xl"
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      📚
    </motion.div>

    {/* Globe and Book - center */}
    <motion.div 
      className="relative"
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <div className="text-7xl">🌍</div>
      <motion.div 
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-4xl"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        📖
      </motion.div>
      {/* Small stars around globe */}
      <motion.div 
        className="absolute -top-2 -left-2 text-yellow-400"
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ⭐
      </motion.div>
    </motion.div>
  </div>
);

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    // Open FINLIT NETWORK Telegram bot for app registration
    // This is the main registration bot for the entire FINLIT NETWORK app
    window.open('https://t.me/finlitnetwork_bot', '_blank');
    // Complete onboarding after short delay
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #13593F 0%, #0f4a33 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Subtle glow effect at top */}
      <div 
        className="absolute top-0 left-0 right-0 h-96"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(5, 220, 127, 0.2) 0%, transparent 60%)'
        }}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <OnboardingIllustration />
        </motion.div>

        {/* Text */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-white mb-2">
            FINLIT NETWORK
          </h1>
          <p className="text-xl text-white">
            ILOVASIGA XUSH KELIBSIZ
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.button
          onClick={handleStart}
          disabled={isLoading}
          className="mt-12 w-full max-w-sm py-4 bg-white rounded-2xl font-bold text-lg shadow-lg disabled:opacity-70"
          style={{ color: '#13593F' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Yuklanmoqda...
            </motion.span>
          ) : (
            'BOSHLASH'
          )}
        </motion.button>

        {/* Skip option */}
        <motion.button
          onClick={handleSkip}
          className="mt-4 text-white/60 text-sm underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          O'tkazib yuborish
        </motion.button>
      </div>

      {/* Bottom home indicator */}
      <div className="pb-4 flex justify-center">
        <div className="w-36 h-1 bg-white/30 rounded-full" />
      </div>
    </motion.div>
  );
};

export default OnboardingScreen;
