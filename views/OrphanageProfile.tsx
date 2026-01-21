
import React, { useState } from 'react';
import { Orphanage, UserRole, ViewState } from '../types';
import { VerifiedIcon, UnverifiedIcon, LocationIcon } from '../constants';
import Card from '../components/Card';
import Badge from '../components/Badge';
import DonationModal from '../components/DonationModal';
import UtilizationChart from '../components/UtilizationChart';
import VisitorBooking from '../components/VisitorBooking';
import FundUtilizationDetail from '../components/FundUtilizationDetail';

interface OrphanageProfileProps {
  orphanage: Orphanage;
  setView: (view: ViewState) => void;
  userRole: UserRole;
}

const OrphanageProfile: React.FC<OrphanageProfileProps> = ({ orphanage, setView, userRole }) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setView({ page: 'dashboard' })} className="mb-6 text-sm font-medium text-brand-blue-600 hover:underline">
        &larr; Back to Dashboard
      </button>

      <Card className="mb-8">
        <div>
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-brand-blue-900">{orphanage.name}</h1>
              {orphanage.isVerified ? (
                <Badge text="Govt. Verified" color="green" icon={<VerifiedIcon />} className="px-3 py-1.5" />
              ) : (
                <Badge text="Verification Pending" color="red" icon={<UnverifiedIcon />} className="px-3 py-1.5" />
              )}
            </div>
            <div className="flex items-center text-slate-500 text-sm mt-1 gap-1 mb-4">
              <LocationIcon />
              <span>{orphanage.location}</span>
            </div>
            <p className="text-slate-600 mb-4">{orphanage.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm mb-auto">
                <div><span className="font-semibold">Registration ID:</span> {orphanage.registrationId}</div>
                <div><span className="font-semibold">Number of Children:</span> {orphanage.childrenCount}</div>
            </div>
             {orphanage.isVerified && (userRole === UserRole.PUBLIC || userRole === UserRole.ORPHANAGE_ADMIN) && (
              <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="mt-6 w-full md:w-auto self-start bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors text-lg"
                >
                  Donate Now
                </button>
             )}
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <div className="p-5 border-b">
                <h2 className="text-xl font-bold">Immediate Needs (In-Kind)</h2>
            </div>
            <div className="p-5">
                <ul className="space-y-3">
                    {orphanage.needs.map(need => (
                        <li key={need.item} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-md">
                            <div>
                                <span className="font-semibold">{need.item}</span>
                                <span className="text-slate-500"> (Qty: {need.quantity})</span>
                            </div>
                            <Badge text={need.priority} color={need.priority === 'High' ? 'red' : need.priority === 'Medium' ? 'yellow' : 'blue'} />
                        </li>
                    ))}
                </ul>
            </div>
        </Card>

        {userRole === UserRole.PUBLIC && <VisitorBooking orphanageId={orphanage.id} />}
        
        <Card>
            <div className="p-5 border-b">
                <h2 className="text-xl font-bold">Public Fund Utilization</h2>
                <p className="text-sm text-slate-500">Breakdown of how public donations are utilized.</p>
            </div>
            <div className="p-5">
                <UtilizationChart data={orphanage.fundUtilization} />
            </div>
        </Card>
        
        {(userRole === UserRole.ORPHANAGE_ADMIN || userRole === UserRole.GOVERNMENT) && (
            <FundUtilizationDetail orphanageId={orphanage.id} userRole={userRole} />
        )}
      </div>

      {isDonationModalOpen && <DonationModal orphanage={orphanage} onClose={() => setIsDonationModalOpen(false)} />}
    </div>
  );
};

export default OrphanageProfile;
