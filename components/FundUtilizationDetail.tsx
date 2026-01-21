
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { apiService } from '../services/apiService';
import { FundAllocation, UserRole } from '../types';

interface FundUtilizationDetailProps {
  orphanageId: string;
  userRole: UserRole;
}

const FundUtilizationDetail: React.FC<FundUtilizationDetailProps> = ({ orphanageId, userRole }) => {
  const [allocations, setAllocations] = useState<FundAllocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for new allocation form (for admin)
  const [source, setSource] = useState('Government');
  const [amount, setAmount] = useState('');
  const [usageCategory, setUsageCategory] = useState('Food');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAllocations = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getFundAllocations(orphanageId);
        setAllocations(data);
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllocations();
  }, [orphanageId]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setProofFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile || !amount) {
        setMessage('Amount and proof file are required.');
        return;
    }
    setIsSubmitting(true);
    setMessage('');
    try {
        const result = await apiService.uploadUtilizationProof(proofFile, {
            orphanageId,
            source,
            amount: parseFloat(amount),
            usageCategory,
        });
        // In a real app, we would add the new allocation to the list
        setMessage(`Successfully uploaded proof: ${result.fileUrl}`);
        // Reset form
        setAmount('');
        setProofFile(null);
    } catch(err) {
        setMessage(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Card className="lg:col-span-2">
      <div className="p-5 border-b">
        <h2 className="text-xl font-bold">Detailed Fund Tracking</h2>
        <p className="text-sm text-slate-500">Immutable log of all fund allocations and expenditures.</p>
      </div>
      <div className="p-5">
        {userRole === UserRole.ORPHANAGE_ADMIN && (
            <form onSubmit={handleSubmit} className="p-4 mb-6 bg-slate-50 border rounded-lg space-y-3">
                <h3 className="font-semibold">Log New Expenditure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <label className="block font-medium">Fund Source</label>
                        <select value={source} onChange={e => setSource(e.target.value)} className="w-full p-2 border rounded-md">
                            <option>Government</option>
                            <option>Public Donation</option>
                        </select>
                    </div>
                     <div>
                        <label className="block font-medium">Usage Category</label>
                        <select value={usageCategory} onChange={e => setUsageCategory(e.target.value)} className="w-full p-2 border rounded-md">
                            <option>Food</option>
                            <option>Education</option>
                            <option>Healthcare</option>
                            <option>Infrastructure</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Amount (INR)</label>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 border rounded-md" required/>
                    </div>
                    <div>
                        <label className="block font-medium">Upload Proof (Bill/Receipt)</label>
                        <input type="file" onChange={handleFileChange} className="w-full text-xs" required/>
                    </div>
                </div>
                 <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-brand-blue-600 text-white text-sm font-medium rounded-md disabled:bg-slate-400">{isSubmitting ? 'Uploading...' : 'Submit Record'}</button>
                 {message && <p className="text-sm mt-2">{message}</p>}
            </form>
        )}
        <div className="space-y-2">
          {isLoading ? <p>Loading records...</p> : allocations.map(item => (
            <div key={item.id} className="grid grid-cols-5 gap-2 p-2 border-b text-sm items-center">
                <span className="col-span-1">{new Date(item.date).toLocaleDateString()}</span>
                <span className={`col-span-1 font-medium ${item.source === 'Government' ? 'text-blue-600' : 'text-green-600'}`}>{item.source}</span>
                <span className="col-span-1">{item.usageCategory}</span>
                <span className="col-span-1 font-mono text-right">₹{item.amount.toLocaleString('en-IN')}</span>
                <a href={item.proofUrl} target="_blank" rel="noopener noreferrer" className="col-span-1 text-right text-blue-500 hover:underline text-xs">View Proof</a>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default FundUtilizationDetail;
