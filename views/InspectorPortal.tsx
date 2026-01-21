
import React from 'react';
import { ViewState, InspectionReport } from '../types';
import { INSPECTIONS, ORPHANAGES } from '../constants';
import Card from '../components/Card';
import Badge from '../components/Badge';

interface InspectorPortalProps {
  setView: (view: ViewState) => void;
}

const InspectionCard: React.FC<{ inspection: InspectionReport, setView: (view: ViewState) => void }> = ({ inspection, setView }) => {
    const orphanage = ORPHANAGES.find(o => o.id === inspection.orphanageId);
    if (!orphanage) return null;

    const statusColor = inspection.status === 'Completed' ? 'green' : inspection.status === 'Pending' ? 'yellow' : 'red';

    return (
        <Card className="mb-4">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h3 className="font-bold text-lg text-brand-blue-900">{orphanage.name}</h3>
                    <p className="text-sm text-slate-500">{orphanage.location}</p>
                    <p className="text-sm text-slate-600 mt-1">Inspection Date: {new Date(inspection.date).toLocaleDateString()}</p>
                </div>
                <div className="mt-3 sm:mt-0 flex flex-col sm:items-end gap-2">
                    <Badge text={inspection.status} color={statusColor} />
                    <button 
                        onClick={() => alert('This would open the inspection form/report.')}
                        className="text-sm bg-brand-blue-600 text-white font-medium py-1.5 px-3 rounded-md hover:bg-brand-blue-700 transition-colors"
                    >
                        {inspection.status === 'Pending' ? 'Start Inspection' : 'View Report'}
                    </button>
                </div>
            </div>
            {inspection.status === 'Completed' && (
                <div className="px-4 pb-4 text-sm text-slate-700 bg-slate-50 border-t">
                    <p className="font-semibold mt-2">Summary:</p>
                    <p>{inspection.summary}</p>
                </div>
            )}
        </Card>
    );
}

const InspectorPortal: React.FC<InspectorPortalProps> = ({ setView }) => {
  return (
    <div>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-slate-200">
        <h1 className="text-3xl font-bold text-brand-blue-900">Inspector Portal</h1>
        <p className="text-slate-600 mt-1">Welcome, Inspector ID: Insp01. Here are your assigned inspections.</p>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Pending Inspections</h2>
        {INSPECTIONS.filter(i => i.status === 'Pending').map(inspection => (
          <InspectionCard key={inspection.id} inspection={inspection} setView={setView} />
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Completed Inspections</h2>
        {INSPECTIONS.filter(i => i.status !== 'Pending').map(inspection => (
          <InspectionCard key={inspection.id} inspection={inspection} setView={setView} />
        ))}
      </div>
    </div>
  );
};

export default InspectorPortal;
