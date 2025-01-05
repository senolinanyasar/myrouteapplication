import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Pages/Header';
import HomePage from './components/Pages/HomePage';
import PricingPage from './components/Pages/PricingPage';
import TopBar from './components/Pages/TopBar';
import Footer from './components/Pages/Footer';
import IndustriesPage from './components/Pages/IndustriesPage';
import FeaturesPage from './components/Pages/FeaturesPage';
import ContactPage from './components/Pages/ContactPage';
import AboutusPage from './components/Pages/AboutusPage';
import Dashboard from './components/panels/Dashboard';
import ScrollToTop from "./components/Pages/ScrollToTop";
import Register from './components/Pages/Register';
import LoginPage from './components/Pages/login';


function App() {
  return (
    <Router>
      <TopBar/>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pricing' element={<PricingPage />} />
        <Route path='/industries' element={<IndustriesPage />} />
        <Route path='/features' element={<FeaturesPage />} />
        <Route path='/aboutus' element={<AboutusPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/panel' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ScrollToTop />
      
      <Footer/>
      
    </Router>

  );
};

export default App;