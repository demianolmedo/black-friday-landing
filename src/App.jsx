import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CachetadaSection from './components/CachetadaSection';
import DescuentosSection from './components/DescuentosSection';
import ProblemaSection from './components/ProblemaSection';
import SolucionSection from './components/SolucionSection';
import FormularioSection from './components/FormularioSection';
import FooterNew from './components/FooterNew';

function App() {
  // Scroll to contact form
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-azul-principal">
      <Navbar />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <HeroSection />

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Cachetada Section - Scroll Animation */}
        <CachetadaSection />

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Descuentos Section - Countdown */}
        <DescuentosSection />

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Problema Section */}
        <ProblemaSection onCTAClick={scrollToForm} />

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Solución Section */}
        <SolucionSection />

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Formulario Section - Empty container */}
        <FormularioSection />
      </main>

      <FooterNew />
    </div>
  );
}

export default App;
