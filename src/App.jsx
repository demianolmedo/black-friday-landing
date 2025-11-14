import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DescuentosSection from './components/DescuentosSection';
import ProblemaSection from './components/ProblemaSection';
import SolucionSection from './components/SolucionSection';
import FormularioSection from './components/FormularioSection';
import FooterNew from './components/FooterNew';
import ReservationsPage from './pages/ReservationsPage';
import TerminosCondiciones from './pages/TerminosCondiciones';
import SEO from './components/SEO';

function HomePage() {
  // Scroll to contact form
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-azul-principal">
      <SEO />
      <Navbar />

      <main className="pt-0">
        {/* Hero Section with scroll animation */}
        <HeroSection />

        {/* Descuentos Section - Countdown */}
        <DescuentosSection onCTAClick={scrollToForm} />

        {/* Problema Section */}
        <ProblemaSection onCTAClick={scrollToForm} />

        {/* Solución Section */}
        <SolucionSection />

        {/* Formulario Section - HQ Integration */}
        <FormularioSection />
      </main>

      <FooterNew />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Términos y Condiciones */}
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />

          {/* Rutas de Reservations para HQ */}
          <Route
            path="/reservations-miami"
            element={
              <ReservationsPage
                brand="tgnod2fe-peiu-myim-xv1r-pdcpmrppkgsp"
                city="miami"
              />
            }
          />
          <Route
            path="/reservations-orlando"
            element={
              <ReservationsPage
                brand="y4clmciv-fp5g-dlrp-yadw-1babsnc1xqyt"
                city="orlando"
              />
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
