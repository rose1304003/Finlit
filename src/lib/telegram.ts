// Telegram WebApp SDK Integration

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    start_param?: string;
  };
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
  };
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
  openTelegramLink: (url: string) => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
}

class TelegramService {
  private webApp: TelegramWebApp | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      this.webApp = window.Telegram.WebApp;
      this.init();
    }
  }

  private init() {
    if (!this.webApp) return;
    
    // Signal that app is ready
    this.webApp.ready();
    
    // Expand to full height
    this.webApp.expand();
    
    // Set theme colors
    this.webApp.setHeaderColor('#0f1419');
    this.webApp.setBackgroundColor('#0f1419');
  }

  get isAvailable(): boolean {
    return this.webApp !== null;
  }

  get user() {
    return this.webApp?.initDataUnsafe.user || null;
  }

  get startParam(): string | undefined {
    return this.webApp?.initDataUnsafe.start_param;
  }

  get colorScheme(): 'light' | 'dark' {
    return this.webApp?.colorScheme || 'dark';
  }

  // Haptic Feedback
  hapticImpact(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') {
    this.webApp?.HapticFeedback.impactOccurred(style);
  }

  hapticNotification(type: 'error' | 'success' | 'warning') {
    this.webApp?.HapticFeedback.notificationOccurred(type);
  }

  hapticSelection() {
    this.webApp?.HapticFeedback.selectionChanged();
  }

  // Main Button
  showMainButton(text: string, onClick: () => void) {
    if (!this.webApp) return;
    this.webApp.MainButton.setText(text);
    this.webApp.MainButton.onClick(onClick);
    this.webApp.MainButton.show();
  }

  hideMainButton() {
    this.webApp?.MainButton.hide();
  }

  setMainButtonLoading(loading: boolean) {
    if (!this.webApp) return;
    if (loading) {
      this.webApp.MainButton.showProgress();
    } else {
      this.webApp.MainButton.hideProgress();
    }
  }

  // Back Button
  showBackButton(onClick: () => void) {
    if (!this.webApp) return;
    this.webApp.BackButton.onClick(onClick);
    this.webApp.BackButton.show();
  }

  hideBackButton() {
    this.webApp?.BackButton.hide();
  }

  // Navigation
  openLink(url: string, tryInstantView = false) {
    this.webApp?.openLink(url, { try_instant_view: tryInstantView });
  }

  openTelegramLink(url: string) {
    this.webApp?.openTelegramLink(url);
  }

  close() {
    this.webApp?.close();
  }
}

export const telegram = new TelegramService();

// Deep link parser for bot navigation
export const parseDeepLink = (startParam?: string): string => {
  if (!startParam) return '/';
  
  // Format: section_id (e.g., "projects_finright", "calculators", "news_123")
  const parts = startParam.split('_');
  const section = parts[0];
  const id = parts.slice(1).join('_');

  switch (section) {
    case 'projects':
      return id ? `/projects/${id}` : '/projects';
    case 'calculators':
      return id ? `/calculators/${id}` : '/calculators';
    case 'news':
      return id ? `/news/${id}` : '/news';
    case 'library':
      return '/library';
    case 'contact':
      return '/contact';
    default:
      return '/';
  }
};
