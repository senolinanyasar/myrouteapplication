import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import PricingPage from './components/PricingPage';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pricing' element={<PricingPage />} />
      </Routes>
    </Router>

  );
}

export default App;
