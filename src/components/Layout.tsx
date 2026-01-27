import React, { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  showSearch?: boolean;
  showBack?: boolean;
  title?: string;
  hideBottomNav?: boolean;
  hideHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showSearch = false,
  showBack = false,
  title,
  hideBottomNav = false,
  hideHeader = false,
}) => {
  return (
    <div className="min-h-screen bg-background">
      {!hideHeader && <Header showSearch={showSearch} showBack={showBack} title={title} />}
      <main className={hideBottomNav ? '' : 'pb-20'}>
        {children}
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default Layout;
