
import React, { useState } from 'react';
import { Orphanage } from '../types';
import { apiService } from '../services/apiService';

interface DonationModalProps {
  orphanage: Orphanage;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ orphanage, onClose }) => {
  const [donationType, setDonationType] = useState<'Monetary' | 'In-Kind'>('Monetary');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [receiptUrl, setReceiptUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (donationType !== 'Monetary' || !amount || parseFloat(amount) <= 0) {
        setErrorMessage('Please enter a valid amount.');
        return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await apiService.createDonation({
        orphanageId: orphanage.id,
        donationType: 'Monetary',
        amount: parseFloat(amount),
      });

      if (response.transactionId && response.receiptUrl) {
        setReceiptUrl(response.receiptUrl);
        setStatus('success');
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred.');
    }
  };

  if (status === 'success') {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 text-center">
                <h2 className="text-2xl font-bold text-green-600">Thank You!</h2>
                <p className="mt-2 text-slate-600">Your donation to {orphanage.name} was successful. A receipt has also been sent to your registered email.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                        href={receiptUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                    >
                        Download Receipt
                    </a>
                    <button onClick={onClose} className="px-6 py-2 bg-brand-blue-600 text-white font-medium rounded-md hover:bg-brand-blue-700">Close</button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-slate-800">Donate to {orphanage.name}</h2>
          <p className="text-sm text-slate-500 mt-1">Your contribution makes a difference.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-4">
              <span className="text-sm font-medium text-slate-700">Type of Donation</span>
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={() => setDonationType('Monetary')} className={`flex-1 py-2 text-sm rounded-md border ${donationType === 'Monetary' ? 'bg-brand-blue-500 text-white border-brand-blue-500' : 'bg-white text-slate-700 border-slate-300'}`}>Monetary</button>
                <button type="button" onClick={() => setDonationType('In-Kind')} className={`flex-1 py-2 text-sm rounded-md border ${donationType === 'In-Kind' ? 'bg-brand-blue-500 text-white border-brand-blue-500' : 'bg-white text-slate-700 border-slate-300'}`}>In-Kind</button>
              </div>
            </div>

            {donationType === 'Monetary' && (
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">Amount (INR)</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                  placeholder="e.g., 500"
                  required
                  disabled={status === 'loading'}
                />
              </div>
            )}

            {donationType === 'In-Kind' && (
              <div>
                <p className="text-sm text-slate-700 mb-2">This orphanage has the following needs:</p>
                <ul className="text-sm space-y-1 bg-slate-50 p-3 rounded-md border">
                  {orphanage.needs.map(need => (
                    <li key={need.item} className="flex justify-between">
                      <span>{need.item}</span>
                      <span className="font-medium text-slate-500">{need.priority} Priority</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 mt-2">Please contact the orphanage directly to coordinate in-kind donations. This portal currently only supports monetary donations.</p>
              </div>
            )}
            {status === 'error' && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
          </div>
          <div className="bg-slate-50 p-4 flex justify-end gap-3 rounded-b-lg">
            <button type="button" onClick={onClose} disabled={status === 'loading'} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:bg-slate-200">Cancel</button>
            {donationType === 'Monetary' && <button type="submit" disabled={status === 'loading'} className="px-4 py-2 text-sm font-medium text-white bg-brand-blue-600 border border-brand-blue-600 rounded-md hover:bg-brand-blue-700 disabled:bg-slate-400">{status === 'loading' ? 'Processing...' : 'Proceed to Pay'}</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;
