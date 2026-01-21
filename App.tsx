
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './views/Dashboard';
import OrphanageProfile from './views/OrphanageProfile';
import InspectorPortal from './views/InspectorPortal';
import { UserRole, ViewState } from './types';
import { ORPHANAGES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ page: 'dashboard' });
  const [role, setRole] = useState<UserRole>(UserRole.PUBLIC);

  const handleSetView = (newView: ViewState) => {
    window.scrollTo(0, 0);
    setView(newView);
  };
  
  const selectedOrphanage = useMemo(() => {
    if (view.page === 'orphanage' && view.params?.id) {
      return ORPHANAGES.find(o => o.id === view.params.id);
    }
    return undefined;
  }, [view]);

  const renderView = () => {
    switch (view.page) {
      case 'orphanage':
        return selectedOrphanage ? <OrphanageProfile orphanage={selectedOrphanage} setView={handleSetView} userRole={role} /> : <Dashboard setView={handleSetView} />;
      case 'inspector':
        return <InspectorPortal setView={handleSetView} />;
      case 'dashboard':
      default:
        return <Dashboard setView={handleSetView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Header currentRole={role} setRole={setRole} setView={handleSetView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
