import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PricingPage from './components/PricingPage';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
<<<<<<< HEAD
import IndustriesPage from './components/IndustriesPage';
import FeaturesPage from './components/FeaturesPage';
=======
>>>>>>> 32f3b973a2e700d5e86e8571b9af5d664df9ef1c


function App() {
  return (
    <Router>
      <TopBar/>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pricing' element={<PricingPage />} />
<<<<<<< HEAD
        <Route path='/industries' element={<IndustriesPage />} />
        <Route path='/features' element={<FeaturesPage />} />
=======
        
>>>>>>> 32f3b973a2e700d5e86e8571b9af5d664df9ef1c
      </Routes>
      <Footer/>
    </Router>

  );
}

export default App;
