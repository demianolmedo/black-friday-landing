import React from 'react';
import { Zap, Shield, TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

const SolucionSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Rapidez Instantánea',
      description: 'Respuestas en segundos, no en días'
    },
    {
      icon: Shield,
      title: 'Seguridad Total',
      description: 'Protección de datos garantizada'
    },
    {
      icon: TrendingUp,
      title: 'Crecimiento Asegurado',
      description: 'Escala tu negocio sin límites'
    },
    {
      icon: Users,
      title: 'Gestión Completa',
      description: 'Todo tu equipo en una plataforma'
    },
    {
      icon: Clock,
      title: 'Disponibilidad 24/7',
      description: 'Siempre activo, siempre listo'
    },
    {
      icon: DollarSign,
      title: 'Precios Justos',
      description: 'Sin cobros abusivos ni sorpresas'
    }
  ];

  return (
    <section
      id="solucion-section"
      className="relative w-full flex items-center justify-center overflow-hidden py-12 sm:py-16"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-azul-principal via-azul-principal/90 to-azul-principal"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-verde-neon/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-verde-neon/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">

          {/* Heading */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-blanco leading-tight font-outfit">
              LA <span className="text-verde-neon neon-text">SOLUCIÓN</span> QUE NECESITAS
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-inter">
              Deja atrás los problemas tradicionales y trabaja con tecnología de vanguardia
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass-card glass-card-hover rounded-2xl p-6 space-y-4 text-center group"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-verde-neon/10 flex items-center justify-center group-hover:bg-verde-neon/20 transition-all duration-300">
                      <Icon className="w-8 h-8 text-verde-neon" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blanco font-outfit">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60 font-inter">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-blanco font-outfit">
                ¿Listo para el <span className="text-verde-neon neon-text">cambio</span>?
              </h3>
              <p className="text-base sm:text-lg text-white/70 font-inter">
                Únete a cientos de empresas que ya transformaron su gestión
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => {
                  const formElement = document.getElementById('contact-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-gradient-to-r from-verde-neon to-emerald-400 text-azul-principal px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform duration-300 neon-glow font-outfit"
              >
                OBTENER MI 50% OFF
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolucionSection;
