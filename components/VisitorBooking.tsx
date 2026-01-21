
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { apiService } from '../services/apiService';

interface VisitorBookingProps {
  orphanageId: string;
}

const VisitorBooking: React.FC<VisitorBookingProps> = ({ orphanageId }) => {
  const [visitDate, setVisitDate] = useState('');
  const [name, setName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (visitDate) {
      const fetchSlots = async () => {
        setIsLoadingSlots(true);
        setSelectedSlot(null);
        try {
          const slots = await apiService.getAvailableSlots(orphanageId, visitDate);
          setAvailableSlots(slots);
        } catch (error) {
          // handle error
        } finally {
          setIsLoadingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [visitDate, orphanageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate || !name || !selectedSlot) {
      setMessage('Please fill all fields and select a slot.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
        const result = await apiService.createBooking({
            orphanageId,
            visitDate,
            visitorName: name,
            timeSlot: selectedSlot,
        });
        if (result.bookingId) {
            setStatus('success');
            setMessage(`Booking confirmed for ${name} on ${visitDate} at ${selectedSlot}.`);
        }
    } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Failed to book appointment.');
    }
  };
  
  if (status === 'success') {
      return (
        <Card>
            <div className="p-5 text-center">
                <h2 className="text-xl font-bold text-green-600">Booking Confirmed!</h2>
                <p className="text-slate-600 mt-2">{message}</p>
                 <button onClick={() => {
                     setStatus('idle');
                     setMessage('');
                     setName('');
                     setVisitDate('');
                     setSelectedSlot(null);
                 }} className="mt-4 text-sm font-medium text-brand-blue-600 hover:underline">Book Another Visit</button>
            </div>
        </Card>
      );
  }

  return (
    <Card>
      <div className="p-5 border-b">
        <h2 className="text-xl font-bold">Book a Visit</h2>
        <p className="text-sm text-slate-500">Schedule a time to visit the institution.</p>
      </div>
      <form className="p-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md"
            required
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <label htmlFor="visitDate" className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
          <input
            type="date"
            id="visitDate"
            value={visitDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md"
            required
            disabled={status === 'loading'}
          />
        </div>
        {visitDate && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Available Slots</label>
            {isLoadingSlots ? (
              <p className="text-sm text-slate-500">Loading slots...</p>
            ) : (
              <div className="flex gap-2 flex-wrap">
                {availableSlots.length > 0 ? availableSlots.map(slot => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={status === 'loading'}
                    className={`px-3 py-1.5 text-sm rounded-md border ${selectedSlot === slot ? 'bg-brand-blue-600 text-white border-brand-blue-600' : 'bg-white hover:bg-slate-50'}`}
                  >
                    {slot}
                  </button>
                )) : <p className="text-sm text-slate-500">No slots available for this date.</p>}
              </div>
            )}
          </div>
        )}
        <button
          type="submit"
          disabled={status === 'loading' || !selectedSlot}
          className="w-full bg-brand-blue-600 text-white font-medium py-2 rounded-md hover:bg-brand-blue-700 disabled:bg-slate-400"
        >
          {status === 'loading' ? 'Booking...' : 'Confirm Booking'}
        </button>
        {status === 'error' && <p className="text-sm text-red-600">{message}</p>}
      </form>
    </Card>
  );
};

export default VisitorBooking;
