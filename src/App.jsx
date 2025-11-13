import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
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

      <main className="pt-0">
        {/* Hero Section with scroll animation */}
        <HeroSection />

        {/* Descuentos Section - Countdown */}
        <DescuentosSection />

        {/* Problema Section */}
        <ProblemaSection onCTAClick={scrollToForm} />

        {/* Solución Section */}
        <SolucionSection />

        {/* Formulario Section - Empty container */}
        <FormularioSection />
      </main>

      <FooterNew />
    </div>
  );
}

export default App;
