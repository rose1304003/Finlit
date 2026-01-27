import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StickerBadge, { BadgeData } from './StickerBadge';
import FinFoxMascot from './FinFoxMascot';

interface StickerRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: BadgeData;
  language: 'uz' | 'ru' | 'en';
}

const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
}

const StickerRewardModal: React.FC<StickerRewardModalProps> = ({
  isOpen,
  onClose,
  badge,
  language,
}) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate confetti pieces
      const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
      }));
      setConfetti(pieces);
    }
  }, [isOpen]);

  const messages = {
    uz: {
      title: "Tabriklaymiz! 🎉",
      subtitle: "Siz yangi stiker yutdingiz!",
      foxMessage: "Ajoyib ish! Sen zo'rsan!",
      collect: "Qabul qilish",
    },
    ru: {
      title: "Поздравляем! 🎉",
      subtitle: "Вы получили новый стикер!",
      foxMessage: "Отличная работа! Ты молодец!",
      collect: "Получить",
    },
    en: {
      title: "Congratulations! 🎉",
      subtitle: "You earned a new sticker!",
      foxMessage: "Great job! You're awesome!",
      collect: "Collect",
    },
  };

  const msg = messages[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Confetti */}
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-3 h-3 pointer-events-none"
              style={{
                left: `${piece.x}%`,
                backgroundColor: piece.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              }}
              initial={{ top: '-5%', rotate: 0, opacity: 1 }}
              animate={{
                top: '105%',
                rotate: piece.rotation + 720,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: piece.delay,
                ease: 'easeIn',
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="relative w-full max-w-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Decorative top */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 opacity-20" />
            
            {/* Stars decoration */}
            <motion.div
              className="absolute top-4 left-4 text-yellow-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <motion.div
              className="absolute top-8 right-12 text-pink-500"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <PartyPopper className="w-5 h-5" />
            </motion.div>

            <div className="relative px-6 pt-8 pb-6 text-center">
              {/* Title */}
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-foreground mb-1"
              >
                {msg.title}
              </motion.h2>
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground mb-6"
              >
                {msg.subtitle}
              </motion.p>

              {/* Badge showcase */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring', damping: 10 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  {/* Glow effect behind badge */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-full blur-xl opacity-50 scale-150" />
                  <StickerBadge badge={{ ...badge, unlocked: true }} language={language} size="lg" />
                </div>
              </motion.div>

              {/* FinFox with message */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center mb-6"
              >
                <FinFoxMascot size="sm" message={msg.foxMessage} />
              </motion.div>

              {/* Collect button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={onClose}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:from-yellow-500 hover:via-orange-500 hover:to-pink-500 text-white font-bold text-lg shadow-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {msg.collect}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickerRewardModal;
