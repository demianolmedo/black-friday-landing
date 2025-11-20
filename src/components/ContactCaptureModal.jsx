import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check } from 'lucide-react';
import { countries } from '../data/countries';

const ContactCaptureModal = ({ isOpen, onComplete }) => {
  const [formData, setFormData] = useState({
    countryCode: '+1',
    phoneNumber: '',
    email: ''
  });

  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const dropdownRef = useRef(null);

  // Filtrar países según búsqueda
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch) ||
    country.dialCode.includes(countrySearch)
  ).slice(0, 50);

  // Validar teléfono según país seleccionado
  const validatePhoneNumber = (number, dialCode) => {
    if (!number) {
      setPhoneError('');
      return false;
    }

    const country = countries.find(c => c.dialCode === dialCode);
    if (!country) {
      setPhoneError('');
      return false;
    }

    const digitCount = number.replace(/\D/g, '').length;
    const minDigits = country.minDigits || 7;
    const maxDigits = country.maxDigits || 15;

    if (digitCount < minDigits || digitCount > maxDigits) {
      setPhoneError(`Debe tener entre ${minDigits} y ${maxDigits} dígitos`);
      return false;
    }

    setPhoneError('');
    return true;
  };

  // Validar email
  const validateEmail = (email) => {
    if (!email) {
      setEmailError('');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }

    return isValid;
  };

  // Validar formulario completo
  useEffect(() => {
    const phoneValid = validatePhoneNumber(formData.phoneNumber, formData.countryCode);
    const emailValid = validateEmail(formData.email);
    setIsFormValid(phoneValid && emailValid);
  }, [formData]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country) => {
    setFormData(prev => ({ ...prev, countryCode: country.dialCode }));
    setShowCountryDropdown(false);
    setCountrySearch('');
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d\s]/g, '');
    setFormData(prev => ({ ...prev, phoneNumber: value }));
  };

  const handleEmailChange = (e) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const contactData = {
        phone: `${formData.countryCode}${formData.phoneNumber.replace(/\s/g, '')}`,
        email: formData.email
      };

      // Guardar datos en localStorage
      localStorage.setItem('contactData', JSON.stringify(contactData));

      // 🔥 TRACKING: Enviar datos al backend
      if (window.trackHQContactCapture) {
        window.trackHQContactCapture(contactData);
      }

      onComplete();
    }
  };

  if (!isOpen) return null;

  const selectedCountry = countries.find(c => c.dialCode === formData.countryCode);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop - No clickeable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-md bg-azul-principal/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-blanco font-bold text-xl text-center font-outfit">
                Completar Información
              </h2>
              <p className="text-white/70 text-sm text-center mt-2 font-inter">
                Para continuar con tu cotización
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Teléfono */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2 font-inter">
                  Número Telefónico
                </label>
                <div className="flex gap-2">
                  {/* Country Code Selector */}
                  <div className="relative w-32" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-3 text-blanco text-left flex items-center justify-between hover:bg-white/15 transition-all"
                    >
                      <span className="text-lg">{selectedCountry?.flag}</span>
                      <span className="text-sm">{formData.countryCode}</span>
                    </button>

                    {/* Dropdown */}
                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-azul-principal/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-64 overflow-hidden z-50">
                        {/* Search */}
                        <div className="p-2 border-b border-white/10 sticky top-0 bg-azul-principal/95">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Buscar..."
                              className="w-full bg-white/10 border border-white/20 rounded-lg pl-9 pr-3 py-2 text-blanco text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-verde-neon font-inter"
                              autoFocus
                            />
                          </div>
                        </div>

                        {/* Countries List */}
                        <div className="overflow-y-auto max-h-52">
                          {filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className="w-full px-3 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-blanco text-sm transition-colors font-inter"
                            >
                              <span className="text-base">{country.flag}</span>
                              <span className="flex-1 truncate">{country.name}</span>
                              <span className="text-white/70">{country.dialCode}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Number Input */}
                  <div className="flex-1">
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="123 4567890"
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-blanco placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-verde-neon transition-all font-inter"
                    />
                  </div>
                </div>
                {phoneError && (
                  <p className="text-red-400 text-xs mt-1 font-inter">{phoneError}</p>
                )}
                {formData.phoneNumber && !phoneError && (
                  <p className="text-verde-neon text-xs mt-1 flex items-center gap-1 font-inter">
                    <Check className="w-3 h-3" /> Número válido
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2 font-inter">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  placeholder="tu@email.com"
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-blanco placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-verde-neon transition-all font-inter"
                />
                {emailError && (
                  <p className="text-red-400 text-xs mt-1 font-inter">{emailError}</p>
                )}
                {formData.email && !emailError && (
                  <p className="text-verde-neon text-xs mt-1 flex items-center gap-1 font-inter">
                    <Check className="w-3 h-3" /> Email válido
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full bg-gradient-to-r from-verde-neon to-emerald-400 hover:from-verde-neon/90 hover:to-emerald-400/90 text-azul-principal font-black text-base px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2 font-outfit"
              >
                Continuar con Cotización
              </button>

              {!isFormValid && (
                <p className="text-white/60 text-xs text-center font-inter">
                  Completa todos los campos correctamente
                </p>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactCaptureModal;
