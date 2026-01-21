
import { Orphanage, Donation, InspectionReport } from "./types";

export const ORPHANAGES: Orphanage[] = [
  {
    id: 'O001',
    name: 'Asha Kiran Children\'s Home',
    location: 'Bangalore, Karnataka',
    imageUrl: 'https://picsum.photos/seed/asha/600/400',
    description: 'Asha Kiran provides a safe and nurturing environment for orphaned and abandoned children, focusing on education and holistic development.',
    isVerified: true,
    registrationId: 'WCD/KA/2010/12345',
    childrenCount: 52,
    needs: [
      { item: 'Rice (kg)', quantity: 100, priority: 'High' },
      { item: 'School Notebooks', quantity: 200, priority: 'High' },
      { item: 'Winter Blankets', quantity: 60, priority: 'Medium' },
    ],
    fundUtilization: [
      { category: 'Education', percentage: 35 },
      { category: 'Nutrition', percentage: 30 },
      { category: 'Healthcare', percentage: 15 },
      { category: 'Operations', percentage: 20 },
    ],
  },
  {
    id: 'O002',
    name: 'Bal Vikas Trust',
    location: 'Pune, Maharashtra',
    imageUrl: 'https://picsum.photos/seed/balvikas/600/400',
    description: 'Bal Vikas is dedicated to the care of children with special needs, offering specialized therapy, education, and vocational training.',
    isVerified: true,
    registrationId: 'WCD/MH/2015/67890',
    childrenCount: 35,
    needs: [
      { item: 'Medical Supplies', quantity: 50, priority: 'High' },
      { item: 'Nutritional Supplements', quantity: 100, priority: 'High' },
      { item: 'Therapy Equipment', quantity: 5, priority: 'Medium' },
    ],
    fundUtilization: [
      { category: 'Specialized Care', percentage: 40 },
      { category: 'Nutrition', percentage: 25 },
      { category: 'Education', percentage: 20 },
      { category: 'Infrastructure', percentage: 15 },
    ],
  },
  {
    id: 'O003',
    name: 'Naya Savera Foundation',
    location: 'Jaipur, Rajasthan',
    imageUrl: 'https://picsum.photos/seed/naya/600/400',
    description: 'Naya Savera focuses on rescuing and rehabilitating children from vulnerable situations, with a strong emphasis on mental health and counseling.',
    isVerified: false,
    registrationId: 'WCD/RJ/2018/11223',
    childrenCount: 41,
    needs: [
      { item: 'Laptops for e-learning', quantity: 10, priority: 'High' },
      { item: 'Sports Equipment', quantity: 20, priority: 'Medium' },
      { item: 'Story Books (Hindi)', quantity: 150, priority: 'Low' },
    ],
    fundUtilization: [
      { category: 'Education', percentage: 40 },
      { category: 'Mental Health', percentage: 25 },
      { category: 'Nutrition', percentage: 20 },
      { category: 'Recreation', percentage: 15 },
    ],
  },
];

export const DONATIONS: Donation[] = [
    { id: 'D001', orphanageId: 'O001', donor: 'R. Sharma', type: 'Monetary', amount: 5000, date: '2023-10-15' },
    { id: 'D002', orphanageId: 'O001', donor: 'Anonymous', type: 'In-Kind', items: [{ item: 'School Notebooks', quantity: 50 }], date: '2023-10-14' },
    { id: 'D003', orphanageId: 'O002', donor: 'Anonymous', type: 'Monetary', amount: 25000, date: '2023-10-12' },
    { id: 'D004', orphanageId: 'O003', donor: 'Tech Solutions Inc.', type: 'In-Kind', items: [{ item: 'Laptops for e-learning', quantity: 5 }], date: '2023-10-11' },
    { id: 'D005', orphanageId: 'O001', donor: 'Anonymous', type: 'Monetary', amount: 200, date: '2023-10-10' },
    { id: 'D006', orphanageId: 'O001', donor: 'Anonymous', type: 'Monetary', amount: 200, date: '2023-10-10' },
    { id: 'D007', orphanageId: 'O001', donor: 'Anonymous', type: 'Monetary', amount: 200, date: '2023-10-10' },
];

export const INSPECTIONS: InspectionReport[] = [
    { 
        id: 'I001', 
        orphanageId: 'O001', 
        inspectorId: 'Insp01', 
        date: '2023-09-20', 
        status: 'Completed',
        summary: 'Asha Kiran maintains excellent standards of hygiene and safety. Nutrition program is well-managed. Minor improvements suggested for record-keeping.',
        scores: { hygiene: 95, safety: 98, nutrition: 92, compliance: 88 }
    },
    { 
        id: 'I002', 
        orphanageId: 'O002', 
        inspectorId: 'Insp02', 
        date: '2023-10-05', 
        status: 'Completed',
        summary: 'Bal Vikas provides exceptional specialized care. Facilities are well-maintained. Documentation is in order.',
        scores: { hygiene: 90, safety: 95, nutrition: 94, compliance: 96 }
    },
    { 
        id: 'I003', 
        orphanageId: 'O003', 
        inspectorId: 'Insp01', 
        date: '2023-10-25', 
        status: 'Pending',
        summary: 'Scheduled inspection to review compliance status and facilities.',
        scores: { hygiene: 0, safety: 0, nutrition: 0, compliance: 0 }
    },
];

// SVG Icons
export const VerifiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
);

export const UnverifiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
);

export const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="m9.69 18.933.003.001a9.7 9.7 0 0 1-2.912-1.834 9.7 9.7 0 0 1-2.15-2.65L4.5 14.35l-.003-.004a9.7 9.7 0 0 1-1.3-3.64c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75a9.7 9.7 0 0 1-1.3 3.64l-.003.004-.13.159a9.7 9.7 0 0 1-2.15 2.65 9.7 9.7 0 0 1-2.912 1.834l-.003-.001a.75.75 0 0 1-.69 0l-.003-.001Z" clipRule="evenodd" />
      <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
);
