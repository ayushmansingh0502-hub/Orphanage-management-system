
import React from 'react';
import { Orphanage, ViewState } from '../types';
import { ORPHANAGES, VerifiedIcon, UnverifiedIcon, LocationIcon } from '../constants';
import Card from '../components/Card';
import Badge from '../components/Badge';

interface DashboardProps {
  setView: (view: ViewState) => void;
}

const OrphanageCard: React.FC<{ orphanage: Orphanage, setView: (view: ViewState) => void }> = ({ orphanage, setView }) => (
  <Card className="transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col">
    <div className="p-4 flex-grow flex flex-col">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-brand-blue-900">{orphanage.name}</h3>
        {orphanage.isVerified ? (
          <Badge text="Verified" color="green" icon={<VerifiedIcon />} />
        ) : (
          <Badge text="Pending Verification" color="yellow" icon={<UnverifiedIcon />} />
        )}
      </div>
      <div className="flex items-center text-slate-500 text-sm mt-1 gap-1">
        <LocationIcon />
        <span>{orphanage.location}</span>
      </div>
      <p className="text-sm text-slate-600 mt-2 flex-grow">{orphanage.description}</p>
      <button 
        onClick={() => setView({ page: 'orphanage', params: { id: orphanage.id } })}
        className="mt-4 w-full bg-brand-blue-600 text-white font-medium py-2 rounded-md hover:bg-brand-blue-700 transition-colors"
      >
        View Details & Donate
      </button>
    </div>
  </Card>
);

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-brand-blue-900">Support a Child's Future</h1>
        <p className="text-lg text-slate-600 mt-2 max-w-3xl mx-auto">
          Browse government-registered child care institutions. Your donations are transparently tracked and utilized for the welfare of children.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ORPHANAGES.map(orphanage => (
          <OrphanageCard key={orphanage.id} orphanage={orphanage} setView={setView} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
