
// This is a MOCK API service to simulate backend interactions.
// In a real application, this would use `fetch` to make network requests.

const MOCK_API_LATENCY = 800; // ms

// A helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  /**
   * Creates a new monetary donation record.
   */
  createDonation: async (payload: {
    orphanageId: string;
    donationType: 'Monetary';
    amount: number;
  }): Promise<{ transactionId: string; receiptUrl: string }> => {
    console.log('API CALL: POST /api/donations', payload);
    await delay(MOCK_API_LATENCY);

    // Validation Simulation
    if (payload.amount <= 0) {
      throw new Error('Donation amount must be positive.');
    }
    if (!payload.orphanageId) {
        throw new Error('Orphanage must be specified.');
    }
    
    // Success Response
    return {
      transactionId: `txn_${Date.now()}`,
      receiptUrl: `/receipts/receipt_${Date.now()}.pdf`,
    };
  },

  /**
   * Fetches available time slots for a given date.
   */
  getAvailableSlots: async (orphanageId: string, date: string): Promise<string[]> => {
    console.log('API CALL: GET /api/bookings/slots', { orphanageId, date });
    await delay(MOCK_API_LATENCY);
    // Simulate some slots being booked
    if (new Date(date).getDate() % 2 === 0) {
        return ['10:00-11:00'];
    }
    return ['10:00-11:00', '14:00-15:00'];
  },

  /**
   * Creates a new visitor booking.
   */
  createBooking: async (payload: {
    orphanageId: string;
    visitorName: string;
    visitDate: string;
    timeSlot: string;
  }): Promise<{ bookingId: string, status: string }> => {
    console.log('API CALL: POST /api/bookings', payload);
    await delay(MOCK_API_LATENCY);

    if (!payload.visitorName || !payload.visitDate || !payload.timeSlot) {
        throw new Error('All fields are required for booking.');
    }

    return {
        bookingId: `bk_${Date.now()}`,
        status: 'Confirmed'
    }
  },

  /**
   * Fetches detailed fund allocation records.
   */
  getFundAllocations: async (orphanageId: string): Promise<any[]> => {
      console.log('API CALL: GET /api/funds/allocations', { orphanageId });
      await delay(MOCK_API_LATENCY);
      return [
        { id: 'F001', source: 'Government', amount: 50000, usageCategory: 'Infrastructure', date: '2023-09-01', proofUrl: '/proofs/inv_1.pdf' },
        { id: 'F002', source: 'Public Donation', amount: 15000, usageCategory: 'Education', date: '2023-09-15', proofUrl: '/proofs/inv_2.pdf' },
        { id: 'F003', source: 'Public Donation', amount: 10000, usageCategory: 'Healthcare', date: '2023-10-02', proofUrl: '/proofs/inv_3.pdf' },
      ];
  },

  /**
   * Uploads a proof of utilization file.
   */
  uploadUtilizationProof: async (file: File, allocationDetails: {
      orphanageId: string,
      source: string,
      amount: number,
      usageCategory: string,
  }): Promise<{ fileUrl: string }> => {
      console.log('API CALL: POST /api/funds/upload', { file, ...allocationDetails });
      await delay(MOCK_API_LATENCY * 2); // File uploads take longer

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
          throw new Error('File size cannot exceed 5MB.');
      }

      return {
          fileUrl: `/proofs/${file.name}`
      }
  }
};
