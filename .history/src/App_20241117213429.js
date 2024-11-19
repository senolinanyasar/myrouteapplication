import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PricingPage from './components/PricingPage';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import IndustriesPage from './components/IndustriesPage';


function App() {
  return (
    <Router>
      <TopBar/>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pricing' element={<PricingPage />} />
        <Route path='/ındusties' element={<IndustriesPage />} />
      </Routes>
      <Footer/>
    </Router>

  );
}

export default App;
