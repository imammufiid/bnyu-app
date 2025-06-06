import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TimerPage } from '../pages/TimerPage';
import { SettingsPage } from '../pages/SettingsPage';
import { HistoryPage } from '../pages/HistoryPage';
import {RankPage} from "../pages/RankPage.tsx";

type LayoutProps = {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [selectedItem, setSelectedItem] = useState('timer');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderContent = () => {
    switch (selectedItem) {
      case 'timer':
        return <TimerPage />;
      case 'settings':
        return <SettingsPage />;
      case 'history':
        return <HistoryPage />;
      case 'rank':
        return <RankPage />;
      default:
        return children;
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar 
        onSelect={setSelectedItem} 
        selectedItem={selectedItem} 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <main className="flex-1 w-full p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}; 