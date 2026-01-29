import { useState, useEffect } from 'react';

export const useSoundSettings = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('finlit-sound-enabled');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('finlit-sound-enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const playSound = (soundType: 'click' | 'success' | 'reward' | 'error') => {
    if (!soundEnabled) return;
    console.log(`Playing sound: ${soundType}`);
  };

  return {
    soundEnabled,
    toggleSound,
    playSound,
  };
};
