import React, { useState } from 'react';
import SettingSection from './SettingSection';
import { Wallet } from 'lucide-react';

const Plan = () => {
  
  const [currentPlan, setCurrentPlan] = useState('Basic'); 

  return (
    <SettingSection icon={Wallet} title="Plan">
      <div className="mt-6">
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-400 ">Current Plan</span>
          <span className="text-gray-500">{currentPlan}</span>
        </div>
        <button
          className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded transition duration-200 w-full sm:w-auto"
          onClick={() =>setCurrentPlan((prevPlan) => (prevPlan === 'Basic' ? 'Pro' : 'Basic')) } >
          Update Plan
        </button>
      </div>
    </SettingSection>
  );
};

export default Plan;
