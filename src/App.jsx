import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CountdownTimer from './components/CountdownTimer';
import ContentSection from './components/ContentSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  // Scroll to contact form
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Set Black Friday end date (you can modify this)
  const blackFridayEndDate = '2025-11-29T23:59:59';

  return (
    <div className="min-h-screen bg-navy-dark">
      <Header />

      <main className="pt-24 sm:pt-28">
        {/* Hero Section */}
        <section id="hero-section" className="relative">
          <Hero />
        </section>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Countdown Section */}
        <section id="countdown-section" className="relative">
          <CountdownTimer />
        </section>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Problema & Solución Section */}
        <section id="problema-section" className="relative">
          <ContentSection onCTAClick={scrollToForm} />
        </section>

        {/* Hidden anchor for solution */}
        <div id="solucion-section" className="absolute -mt-32"></div>

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Contact Form Section */}
        <section id="contact-form-section" className="relative">
          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
