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

  // Placeholder for playing sounds - in production, this would actually play audio
  const playSound = (soundType: 'click' | 'success' | 'reward' | 'error') => {
    if (!soundEnabled) return;
    
    // In production, this would play actual audio files
    console.log(`🔊 Playing sound: ${soundType}`);
  };

  return {
    soundEnabled,
    toggleSound,
    playSound,
  };
};
