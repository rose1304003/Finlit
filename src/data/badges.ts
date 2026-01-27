import { BadgeData } from '@/components/StickerBadge';
import { badgeDefinitions } from '@/contexts/GamificationContext';

// Re-export badge definitions as BadgeData format for backward compatibility
export const allBadges: BadgeData[] = badgeDefinitions.map(badge => ({
  id: badge.id,
  icon: badge.icon,
  name: badge.name,
  unlocked: false, // Will be computed by GamificationContext
  rarity: badge.rarity,
}));
