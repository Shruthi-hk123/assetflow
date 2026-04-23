import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AssetList from './components/AssetList';
import EmployeeList from './components/EmployeeList';
import Reports from './components/Reports';
import SecurityCenter from './components/SecurityCenter';
import AuditLogs from './components/AuditLogs';
import SmartAssistant from './components/SmartAssistant';
import CommandPalette from './components/CommandPalette';
import NotificationCenter from './components/NotificationCenter';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'assets':
        return <AssetList />;
      case 'employees':
        return <EmployeeList />;
      case 'reports':
        return <Reports />;
      case 'security':
        return <SecurityCenter />;
      case 'audit':
        return <AuditLogs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </Layout>
      <SmartAssistant />
      <CommandPalette 
        open={isCommandPaletteOpen} 
        setOpen={setIsCommandPaletteOpen} 
        setActiveTab={setActiveTab} 
      />
      <NotificationCenter />
      <Toaster position="top-right" />
    </>
  );
}
