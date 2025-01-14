import { Route, Routes } from 'react-router-dom';
import './admin.css';
import OverviewPage from './components/panels/OverviewPage';
import ProductPage from './components/panels/ProductPage';
import SalesPage from './components/panels/SalesPage';
import AnalyticsPage from './components/panels/AnalyticsPage';
import SettingsPage from './components/panels/SettingsPage';
import CustomersPage from './components/panels/CustomersPage';
import LocationPage from './components/panels/LocationPage';


import Sidebar from './components/Sidebar';

function AdminApp() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">


      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80'/>
        <div className='absolute inset-0 backdrop-blur-sm'>
        </div>

      </div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/location" element={<LocationPage/>} />
        <Route path="/customers" element={<CustomersPage/>} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/sales" element={<SalesPage/>} />  
        <Route path="/analytics" element={<AnalyticsPage/>} />  
        <Route path="/settings" element={<SettingsPage/>} />  
      </Routes>
    </div>


  );
}

export default AdminApp;
