import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, Building, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form data:', data);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 5000);
  };

  const InputField = ({ icon: Icon, label, name, type = 'text', placeholder, validation, error }) => (
    <div className="space-y-2">
      <label className="text-white/80 text-sm sm:text-base font-medium flex items-center space-x-2">
        <Icon className="w-4 h-4 text-neon-green" />
        <span>{label}</span>
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
          className={`
            w-full px-4 py-3 sm:py-4 bg-navy-blue/50 backdrop-blur-sm
            border ${error ? 'border-red-500' : 'border-white/20'}
            rounded-lg text-white placeholder:text-white/40
            focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20
            transition-all duration-300
          `}
        />
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-xs sm:text-sm flex items-center space-x-1">
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );

  if (isSubmitted) {
    return (
      <section id="contact-form" className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-blue to-navy-dark"></div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-blue/40 backdrop-blur-sm border border-neon-green/50 rounded-2xl p-8 sm:p-12 text-center space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-neon-green animate-pulse-slow" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              ¡Gracias por tu interés!
            </h3>
            <p className="text-white/70 text-base sm:text-lg">
              Hemos recibido tu solicitud. Nos pondremos en contacto contigo muy pronto para aplicar tu descuento del 50%.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-blue to-navy-dark"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center space-y-4 mb-10 sm:mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            APROVECHA TU{' '}
            <span className="text-neon-green">DESCUENTO</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Completa el formulario y asegura tu 50% OFF en la inscripción
          </p>
        </div>

        {/* Form */}
        <div className="relative animate-slide-left">
          {/* Background image placeholder */}
          <div className="absolute inset-0 opacity-5">
            <img
              src="/src/assets/Fondos e imagenes/Formulario.png"
              alt="Background"
              className="w-full h-full object-cover rounded-2xl"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          <div className="relative bg-navy-blue/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  icon={User}
                  label="Nombre completo"
                  name="fullName"
                  placeholder="Juan Pérez"
                  validation={{
                    required: 'El nombre es requerido',
                    minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                  }}
                  error={errors.fullName}
                />

                <InputField
                  icon={Mail}
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  placeholder="juan@ejemplo.com"
                  validation={{
                    required: 'El correo es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Correo inválido'
                    }
                  }}
                  error={errors.email}
                />
              </div>

              {/* Phone and Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  icon={Phone}
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  validation={{
                    required: 'El teléfono es requerido',
                    pattern: {
                      value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                      message: 'Teléfono inválido'
                    }
                  }}
                  error={errors.phone}
                />

                <InputField
                  icon={Building}
                  label="Empresa / Inmobiliaria"
                  name="company"
                  placeholder="Mi Empresa S.A."
                  validation={{
                    required: 'La empresa es requerida'
                  }}
                  error={errors.company}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm sm:text-base font-medium flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-neon-green" />
                  <span>¿Cuántas propiedades gestionas?</span>
                </label>
                <textarea
                  placeholder="Cuéntanos sobre tu negocio..."
                  rows="4"
                  {...register('message', {
                    required: 'Este campo es requerido',
                    minLength: { value: 10, message: 'Mínimo 10 caracteres' }
                  })}
                  className={`
                    w-full px-4 py-3 bg-navy-blue/50 backdrop-blur-sm
                    border ${errors.message ? 'border-red-500' : 'border-white/20'}
                    rounded-lg text-white placeholder:text-white/40
                    focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20
                    transition-all duration-300 resize-none
                  `}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs sm:text-sm flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.message.message}</span>
                  </p>
                )}
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  {...register('terms', {
                    required: 'Debes aceptar los términos'
                  })}
                  className="mt-1 w-5 h-5 rounded border-white/20 bg-navy-blue/50 text-neon-green focus:ring-neon-green focus:ring-offset-0"
                />
                <label htmlFor="terms" className="text-white/70 text-xs sm:text-sm leading-relaxed">
                  Acepto los términos y condiciones y autorizo el uso de mis datos para contacto comercial
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-400 text-xs sm:text-sm flex items-center space-x-1 -mt-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.terms.message}</span>
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full bg-gradient-to-r from-neon-green to-emerald-400
                  hover:from-neon-green-light hover:to-emerald-300
                  text-navy-dark font-bold text-base sm:text-lg
                  px-8 py-4 sm:py-5 rounded-full
                  transition-all duration-300 transform hover:scale-105
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center space-x-3
                  shadow-lg hover:shadow-2xl
                "
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin"></div>
                    <span>ENVIANDO...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>OBTENER MI 50% OFF</span>
                  </>
                )}
              </button>

              {/* Security note */}
              <p className="text-center text-white/50 text-xs">
                🔒 Tu información está segura y protegida
              </p>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
