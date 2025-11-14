import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TerminosCondiciones = () => {
  return (
    <>
      <Helmet>
        <title>Términos y Condiciones - Black Friday 50% OFF | RentSmart</title>
        <meta name="description" content="Términos y condiciones de la promoción Black Friday 50% OFF en alquiler de autos. Rent Smart RAC - Miami y Orlando." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.blackfriday.rentsmartrac.com/terminos-condiciones" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-azul-principal via-azul-principal to-azul-principal">
        {/* Header Navigation */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-verde-neon hover:text-verde-neon/80 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-inter text-sm sm:text-base">Volver al inicio</span>
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-12">

            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-blanco mb-4 font-outfit">
                TÉRMINOS Y CONDICIONES
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-verde-neon neon-text font-outfit">
                PROMOCIÓN "BLACK FRIDAY 50% OFF"
              </p>
              <p className="text-sm sm:text-base text-white/60 mt-4 font-inter">
                Organizador: Rent Smart RAC
              </p>
            </div>

            <div className="space-y-8 text-white/80 font-inter">

              {/* 1. Vigencia y Límite */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-blanco mb-4 font-outfit">
                  1. Vigencia y Límite de la Promoción
                </h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Período:</h3>
                    <p>
                      Esta promoción es válida únicamente el día <strong>28 de noviembre de 2025</strong> (comenzando a las 00:00 horas y finalizando a las 23:59 horas, hora del Este - ET - de EE. UU.). La promoción no será válida en otras fechas, a menos que Rent Smart RAC decida y comunique oficialmente una extensión de dicho período.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Límite de Unidades:</h3>
                    <p>
                      La oferta está estrictamente limitada a las primeras <strong>100 reservas confirmadas y pagadas</strong> que se realicen durante el período de vigencia, según el orden de registro en nuestro sistema de reservas.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Finalización de la Oferta:</h3>
                    <p>
                      La promoción finalizará automáticamente cuando se alcance el límite de las 100 reservas o al término del 28 de noviembre de 2025 (23:59 ET), lo que ocurra primero. La Empresa no está obligada a notificar públicamente el momento en que se agoten las 100 unidades.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Elegibilidad */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-blanco mb-4 font-outfit">
                  2. Elegibilidad
                </h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    La promoción es válida para clientes que cumplan con todos los requisitos estándar de alquiler de Rent Smart RAC (edad mínima, licencia de conducir válida, tarjeta de crédito para depósito de garantía, etc.).
                  </p>
                  <p>
                    La promoción es válida exclusivamente para <strong>nuevas reservas</strong>. No es retroactiva y no se puede aplicar a reservas existentes, activas, o realizadas antes del inicio de esta promoción.
                  </p>
                </div>
              </section>

              {/* 3. Detalles del Descuento */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-blanco mb-4 font-outfit">
                  3. Detalles del Descuento
                </h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    El descuento del 50% aplica única y exclusivamente sobre la <strong>tarifa base de alquiler</strong> (cargo por tiempo y kilometraje).
                  </p>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">EXCLUSIONES:</h3>
                    <p>
                      El descuento NO aplica sobre impuestos (taxes), tasas gubernamentales, cargos de aeropuerto, seguros (CDW, SLI, etc.), combustible, peajes (tolls), servicios adicionales (GPS, sillas de bebé, conductor adicional) ni ningún otro cargo complementario.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">No Acumulable:</h3>
                    <p>
                      Esta promoción no es acumulable y no puede combinarse con ningún otro descuento, oferta, cupón o tarifa corporativa.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Condiciones Generales */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-blanco mb-4 font-outfit">
                  4. Condiciones Generales
                </h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Sujeto a Disponibilidad:</h3>
                    <p>
                      Todas las reservas están sujetas a la disponibilidad de la flota de vehículos en las sedes de Miami y Orlando al momento de realizar la reserva. Ciertas categorías de vehículos (ej. lujo, exóticos, vans de alta capacidad) pueden estar excluidas de esta promoción a discreción de la Empresa.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Reservas Confirmadas:</h3>
                    <p>
                      Se considera una reserva "confirmada" aquella que ha completado exitosamente el proceso de pago o depósito requerido por la Empresa. Una cotización o consulta no constituye una reserva confirmada.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">No Transferible:</h3>
                    <p>
                      El descuento no es transferible, no es canjeable por efectivo ni tiene valor residual.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Modificación de la Promoción:</h3>
                    <p>
                      Rent Smart RAC se reserva el derecho, a su entera discreción, de modificar, suspender, cancelar o extender el período promocional. Cualquier modificación será comunicada a través de los canales oficiales de la Empresa.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Verificación:</h3>
                    <p>
                      La Empresa se reserva el derecho de verificar la validez de las reservas y de invalidar cualquier reserva que se determine como fraudulenta o que no cumpla con estos términos.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Ventana de Viaje */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-blanco mb-4 font-outfit">
                  5. Ventana de Viaje (Fechas de Alquiler) y Fechas Restringidas
                </h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    El alquiler reservado con esta promoción debe iniciar y finalizar entre el <strong>1 de diciembre de 2025</strong> y el <strong>30 de junio de 2026</strong>.
                  </p>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Fechas Restringidas (Blackout Dates):</h3>
                    <p>
                      Esta promoción no será válida para alquileres que incluyan los siguientes períodos:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li>20 de diciembre de 2025 al 5 de enero de 2026</li>
                      <li>Semana Santa 2026</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. Política de Modificaciones */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-blanco mb-4 font-outfit">
                  6. Política de Modificaciones
                </h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    Cualquier modificación realizada a una reserva confirmada bajo esta promoción (ej. cambio de fechas, cambio de categoría de vehículo) <strong>anulará el descuento del 50% OFF</strong>. La reserva se ajustará a la tarifa estándar vigente al momento de la modificación.
                  </p>
                </div>
              </section>

              {/* 7. Política de Cancelación */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-blanco mb-4 font-outfit">
                  7. Política de Cancelación, Reembolso y No Presentación
                </h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Carácter No Reembolsable:</h3>
                    <p>
                      El monto total pagado al momento de confirmar la reserva <strong>no es reembolsable</strong> bajo ningún concepto.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Cancelación con más de 48 horas de antelación:</h3>
                    <p>
                      Si el cliente solicita la cancelación de la reserva con más de 48 horas de antelación a la fecha y hora programadas para la entrega del vehículo, el monto pagado no será reembolsado, pero se convertirá en un <strong>crédito (Store Credit)</strong> por el valor total pagado, válido para una futura reserva con la Empresa durante los siguientes 12 meses.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Cancelación con menos de 48 horas o No Presentación (No-Show):</h3>
                    <p>
                      Si la cancelación se solicita dentro de las 48 horas previas a la fecha y hora de entrega, o si el cliente no se presenta a recoger el vehículo (No-Show), el cliente <strong>perderá el 100% del monto pagado</strong>. Este monto será retenido como penalidad por cancelación tardía y no dará derecho a reembolso ni a crédito futuro.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Incumplimiento de Requisitos:</h3>
                    <p>
                      Si el cliente se presenta a recoger el vehículo pero no cumple con los requisitos indispensables de alquiler (ej. licencia de conducir válida y vigente, tarjeta de crédito a nombre del titular con fondos suficientes para el depósito de garantía, edad mínima requerida), la reserva será cancelada y se considerará una cancelación dentro de las 48 horas. Esto resultará en la <strong>pérdida total (100%) del monto pagado</strong>.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-verde-neon mb-2">Rechazo Voluntario del Vehículo:</h3>
                    <p>
                      Si el cliente, habiendo cumplido los requisitos, decide voluntariamente no alquilar el vehículo por cualquier razón personal o de percepción (ej. "el auto es más pequeño de lo que imaginé", "ya no lo necesito"), siempre que el vehículo entregado corresponda a la categoría reservada, esto se tratará como una cancelación en sitio y resultará en la <strong>pérdida total (100%) del monto pagado</strong>.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. Aceptación */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-blanco mb-4 font-outfit">
                  8. Aceptación
                </h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <p>
                    La participación en esta promoción y el pago de la reserva implican la <strong>aceptación total e incondicional</strong> de todos estos Términos y Condiciones.
                  </p>
                </div>
              </section>

            </div>

            {/* Footer CTA */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <Link
                to="/"
                className="inline-block px-8 py-4 bg-verde-neon text-azul-principal font-bold rounded-full hover:bg-verde-neon/90 transition-all duration-300 shadow-lg hover:shadow-verde-neon/50 font-outfit text-lg"
              >
                Volver al inicio
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TerminosCondiciones;
