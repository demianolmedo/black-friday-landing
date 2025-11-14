import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WhatsAppModal = ({ isOpen, onClose, selectedCity }) => {
  const [formData, setFormData] = useState({
    lugarEntrega: '',
    lugarDevolucion: '',
    fechaHoraRecogida: '',
    fechaHoraEntrega: '',
    email: ''
  });

  const [availableReturnLocations, setAvailableReturnLocations] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  // Opciones de lugares por zona
  const locations = {
    miamiZone: [
      { value: 'Miami International Airport', label: 'Miami International Airport' },
      { value: 'Ft. Lauderdale Airport', label: 'Ft. Lauderdale Airport' },
      { value: 'Rent Smart Office - Miami', label: 'Rent Smart Office - Miami' },
      { value: 'Hotel/Residence - Miami', label: 'Hotel/Residence - Miami' }
    ],
    orlandoZone: [
      { value: 'Orlando International Airport', label: 'Orlando International Airport' },
      { value: 'Rent Smart Office - Orlando', label: 'Rent Smart Office - Orlando' },
      { value: 'Hotel/Residence - Orlando', label: 'Hotel/Residence - Orlando' }
    ]
  };

  // Determinar zona según lugar de entrega
  const getZoneFromLocation = (location) => {
    const isMiamiZone = locations.miamiZone.some(loc => loc.value === location);
    return isMiamiZone ? 'miamiZone' : 'orlandoZone';
  };

  // Actualizar lugares de devolución cuando cambia lugar de entrega
  useEffect(() => {
    if (formData.lugarEntrega) {
      const zone = getZoneFromLocation(formData.lugarEntrega);
      setAvailableReturnLocations(locations[zone]);

      // Resetear lugar de devolución si no está en la zona correcta
      if (formData.lugarDevolucion) {
        const isValid = locations[zone].some(loc => loc.value === formData.lugarDevolucion);
        if (!isValid) {
          setFormData(prev => ({ ...prev, lugarDevolucion: '' }));
        }
      }
    } else {
      setAvailableReturnLocations([]);
      setFormData(prev => ({ ...prev, lugarDevolucion: '' }));
    }
  }, [formData.lugarEntrega]);

  // Validar formulario completo
  useEffect(() => {
    const isValid =
      formData.lugarEntrega !== '' &&
      formData.lugarDevolucion !== '' &&
      formData.fechaHoraRecogida !== '' &&
      formData.fechaHoraEntrega !== '' &&
      formData.email !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    setIsFormValid(isValid);
  }, [formData]);

  // Obtener fecha/hora mínima actual + 24 horas
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 24); // Agregar 24 horas
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Obtener fecha/hora mínima de entrega (recogida + 24 horas)
  const getMinReturnDateTime = () => {
    if (!formData.fechaHoraRecogida) return getMinDateTime();

    const pickupDate = new Date(formData.fechaHoraRecogida);
    pickupDate.setHours(pickupDate.getHours() + 24); // Agregar 24 horas a la fecha de recogida
    const year = pickupDate.getFullYear();
    const month = String(pickupDate.getMonth() + 1).padStart(2, '0');
    const day = String(pickupDate.getDate()).padStart(2, '0');
    const hours = String(pickupDate.getHours()).padStart(2, '0');
    const minutes = String(pickupDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Enviar datos por WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    // Formatear fechas
    const formatDateTime = (dateTimeStr) => {
      const date = new Date(dateTimeStr);
      return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };

    // Construir mensaje
    const mensaje = `Hola, quiero cotizar un auto.

Entrega: ${formData.lugarEntrega}
Devolucion: ${formData.lugarDevolucion}
Recogida: ${formatDateTime(formData.fechaHoraRecogida)}
Entrega: ${formatDateTime(formData.fechaHoraEntrega)}
Email: ${formData.email}`;

    // Abrir WhatsApp
    const url = `https://wa.me/17868624340?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    // Cerrar modal y resetear formulario
    setTimeout(() => {
      onClose();
      setFormData({
        lugarEntrega: '',
        lugarDevolucion: '',
        fechaHoraRecogida: '',
        fechaHoraEntrega: '',
        email: ''
      });
    }, 500);
  };

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevenir scroll del body cuando modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-azul-principal/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-azul-principal/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-blanco font-bold text-xl md:text-2xl font-outfit">
                      Solicitar Cotización
                    </h2>
                    <p className="text-white/70 text-sm mt-1 font-inter">
                      Completa tus datos y envíalos por WhatsApp para recibir atención personalizada inmediata
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 ml-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-blanco rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Lugar de Entrega */}
                  <div className="relative">
                    <select
                      id="lugarEntrega"
                      name="lugarEntrega"
                      value={formData.lugarEntrega}
                      onChange={handleInputChange}
                      required
                      className="peer w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 pt-6 pb-2 text-blanco focus:outline-none focus:ring-2 focus:ring-verde-neon focus:border-transparent transition-all duration-300 appearance-none cursor-pointer font-inter"
                    >
                      <option value="" className="bg-azul-principal text-blanco"></option>
                      <optgroup label="Miami / Ft. Lauderdale" className="bg-azul-principal text-verde-neon font-bold">
                        {locations.miamiZone.map(loc => (
                          <option key={loc.value} value={loc.value} className="bg-azul-principal text-blanco">
                            {loc.label}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Orlando" className="bg-azul-principal text-verde-neon font-bold">
                        {locations.orlandoZone.map(loc => (
                          <option key={loc.value} value={loc.value} className="bg-azul-principal text-blanco">
                            {loc.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <label
                      htmlFor="lugarEntrega"
                      className="absolute left-4 top-2 text-white/70 text-xs font-medium transition-all duration-300 pointer-events-none font-inter"
                    >
                      Lugar de entrega
                    </label>
                  </div>

                  {/* Lugar de Devolución */}
                  <div className="relative">
                    <select
                      id="lugarDevolucion"
                      name="lugarDevolucion"
                      value={formData.lugarDevolucion}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.lugarEntrega}
                      className="peer w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 pt-6 pb-2 text-blanco focus:outline-none focus:ring-2 focus:ring-verde-neon focus:border-transparent transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                    >
                      <option value="" className="bg-azul-principal text-blanco"></option>
                      {availableReturnLocations.map(loc => (
                        <option key={loc.value} value={loc.value} className="bg-azul-principal text-blanco">
                          {loc.label}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="lugarDevolucion"
                      className="absolute left-4 top-2 text-white/70 text-xs font-medium transition-all duration-300 pointer-events-none font-inter"
                    >
                      {formData.lugarEntrega ? 'Lugar de devolución' : 'Primero seleccione lugar de entrega'}
                    </label>
                  </div>

                  {/* Fecha y Hora de Recogida */}
                  <div className="relative">
                    <input
                      id="fechaHoraRecogida"
                      name="fechaHoraRecogida"
                      type="datetime-local"
                      value={formData.fechaHoraRecogida}
                      onChange={handleInputChange}
                      min={getMinDateTime()}
                      required
                      className="peer w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 pt-6 pb-2 text-blanco focus:outline-none focus:ring-2 focus:ring-verde-neon focus:border-transparent transition-all duration-300 cursor-pointer font-inter"
                      style={{ colorScheme: 'dark' }}
                    />
                    <label
                      htmlFor="fechaHoraRecogida"
                      className="absolute left-4 top-2 text-white/70 text-xs font-medium transition-all duration-300 pointer-events-none font-inter"
                    >
                      Fecha y hora de recogida
                    </label>
                  </div>

                  {/* Fecha y Hora de Entrega */}
                  <div className="relative">
                    <input
                      id="fechaHoraEntrega"
                      name="fechaHoraEntrega"
                      type="datetime-local"
                      value={formData.fechaHoraEntrega}
                      onChange={handleInputChange}
                      min={getMinReturnDateTime()}
                      required
                      disabled={!formData.fechaHoraRecogida}
                      className="peer w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 pt-6 pb-2 text-blanco focus:outline-none focus:ring-2 focus:ring-verde-neon focus:border-transparent transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                      style={{ colorScheme: 'dark' }}
                    />
                    <label
                      htmlFor="fechaHoraEntrega"
                      className="absolute left-4 top-2 text-white/70 text-xs font-medium transition-all duration-300 pointer-events-none font-inter"
                    >
                      Fecha y hora de entrega
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative md:col-span-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      className="peer w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 pt-6 pb-2 text-blanco placeholder:text-transparent focus:outline-none focus:ring-2 focus:ring-verde-neon focus:border-transparent transition-all duration-300 font-inter"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-2 text-white/90 text-xs font-medium transition-all duration-300 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs bg-azul-principal/90 px-1 rounded peer-placeholder-shown:bg-transparent peer-focus:bg-azul-principal/90 font-inter"
                    >
                      Correo electrónico
                    </label>
                  </div>
                </div>

                {/* Botón Submit */}
                <div className="flex flex-col gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50 text-blanco font-bold text-base md:text-lg px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/50 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 disabled:hover:scale-100 disabled:hover:shadow-lg font-outfit"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Hablar con un agente
                  </button>

                  {!isFormValid && (
                    <p className="text-white/60 text-xs text-center font-inter">
                      Por favor completa todos los campos para continuar
                    </p>
                  )}
                </div>
              </form>

              {/* Estilos CSS para select arrow y datetime inputs */}
              <style jsx>{`
                select {
                  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
                  background-repeat: no-repeat;
                  background-position: right 12px center;
                  padding-right: 32px;
                }

                /* Hacer que todo el input datetime-local sea clickeable */
                input[type="datetime-local"] {
                  cursor: pointer;
                }

                /* Expandir el área clickeable del calendario picker para cubrir todo el input */
                input[type="datetime-local"]::-webkit-calendar-picker-indicator {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  width: auto;
                  height: auto;
                  cursor: pointer;
                  background: transparent;
                  color: transparent;
                }

                /* Mostrar el icono del calendario en su posición normal */
                input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover {
                  background: transparent;
                }
              `}</style>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppModal;
