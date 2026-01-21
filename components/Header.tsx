
import React from 'react';
import { UserRole, ViewState } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  setView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRole, setRole, setView }) => {
  const handleNavigation = (page: ViewState['page']) => {
    setView({ page });
  };
  
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    setRole(newRole);
    if(newRole === UserRole.INSPECTOR) {
        setView({ page: 'inspector' });
    } else {
        setView({ page: 'dashboard' });
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation('dashboard')}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" alt="Emblem of India" className="h-10 w-auto" />
          <div>
            <h1 className="text-lg font-bold text-brand-blue-800">Child Welfare Platform</h1>
            <p className="text-xs text-slate-500">Ministry of Women & Child Development</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
             <button onClick={() => handleNavigation('dashboard')} className="hover:text-brand-blue-600 transition-colors">Home</button>
           </nav>
           
           <div>
             <label htmlFor="role-select" className="sr-only">Select Role</label>
             <select 
               id="role-select"
               value={currentRole}
               onChange={handleRoleChange}
               className="text-sm border border-slate-300 rounded-md py-1.5 px-2 focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition"
             >
               {Object.values(UserRole).map(role => (
                 <option key={role} value={role}>{role}</option>
               ))}
             </select>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
