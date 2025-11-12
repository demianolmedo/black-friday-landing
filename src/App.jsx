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

      <main>
        <Hero />
        <CountdownTimer targetDate={blackFridayEndDate} />
        <ContentSection onCTAClick={scrollToForm} />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;
