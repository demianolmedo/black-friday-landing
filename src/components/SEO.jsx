import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = () => {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RentSmart Car Rental",
    "url": "https://www.blackfriday.rentsmartrac.com",
    "logo": "https://www.blackfriday.rentsmartrac.com/favicon/android-chrome-512x512.png",
    "description": "Black Friday car rental deals - Save up to 50% on car rentals in Miami and Orlando",
    "foundingDate": "2022",
    "email": "reservas@rentsmartrac.com",
    "telephone": "+1-786-272-5447",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3930 NW 27th Street",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "postalCode": "33142",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.facebook.com/RENTSMARTRAC/",
      "https://www.instagram.com/rentsmartrac",
      "https://www.tiktok.com/@rentsmartrac"
    ]
  };

  // Local Business - Miami
  const miamiBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "RentSmart Car Rental - Miami",
    "url": "https://www.blackfriday.rentsmartrac.com",
    "telephone": "+1-786-272-5447",
    "email": "reservas@rentsmartrac.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3930 NW 27th Street",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "postalCode": "33142",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.7617",
      "longitude": "-80.1918"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "currenciesAccepted": "USD"
  };

  // Local Business - Orlando
  const orlandoBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": "RentSmart Car Rental - Orlando",
    "url": "https://www.blackfriday.rentsmartrac.com",
    "telephone": "+1-786-956-3254",
    "email": "reservas@rentsmartrac.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5530 Butler National Dr",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32812",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.4294",
      "longitude": "-81.3088"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "currenciesAccepted": "USD"
  };

  // FAQ Schema - CRITICAL for LLMs (ChatGPT, Claude, Perplexity)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué incluye el precio de Black Friday?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Todas las tarifas de Black Friday incluyen seguro completo contra colisiones, cobertura de responsabilidad civil, kilometraje ilimitado y entrega gratuita en el aeropuerto o hotel. Sin cargos ocultos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tengo que pagar extra cuando llegue?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. El precio en la cotización es el precio final. Sin sorpresas, sin cargos adicionales al recoger el vehículo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué métodos de pago aceptan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aceptamos VISA, Mastercard, American Express y efectivo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo devolver el auto en otra ciudad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "¡Sí! Alquileres de ida disponibles. Devuelve en Miami, Orlando o Fort Lauderdale."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué documentos necesito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pasaporte/licencia de conducir válida, tarjeta de crédito y comprobante de residencia. Edad mínima 21 años."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto es el descuento de Black Friday?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ahorra hasta 50% en alquiler de autos durante Black Friday. La promoción es válida hasta agotar cupos. Reserva ahora para asegurar tu descuento."
        }
      },
      {
        "@type": "Question",
        "name": "¿Hay filas o esperas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. En RentSmart eliminamos las filas. Entregamos el auto directamente en tu hotel, Airbnb o aeropuerto. Sin esperas, sin complicaciones."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo funciona el proceso de alquiler?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Firmas, aterrizas y manejas. Proceso simple: completa tu reserva, recoge el auto al llegar y comienza a disfrutar. Sin complicaciones, sin esperas innecesarias."
        }
      }
    ]
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Black Friday Car Rental",
    "provider": {
      "@type": "Organization",
      "name": "RentSmart Car Rental"
    },
    "areaServed": [
      "Miami, FL",
      "Orlando, FL",
      "Fort Lauderdale, FL"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Vehicle Classes",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Car",
            "name": "Economy"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Car",
            "name": "SUV"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Car",
            "name": "Premium"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Car",
            "name": "Van"
          }
        }
      ]
    }
  };

  // Offer Schema - Black Friday Deal
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": "Black Friday Car Rental Special - 50% OFF",
    "description": "Ahorra hasta 50% en alquiler de autos en Miami y Orlando",
    "url": "https://www.blackfriday.rentsmartrac.com",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-11-01T00:00:00Z",
    "validThrough": "2025-12-31T23:59:59Z",
    "seller": {
      "@type": "Organization",
      "name": "RentSmart Car Rental"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.blackfriday.rentsmartrac.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Descuentos",
        "item": "https://www.blackfriday.rentsmartrac.com#descuentos-section"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Cotización",
        "item": "https://www.blackfriday.rentsmartrac.com#contact-form"
      }
    ]
  };

  return (
    <Helmet>
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Miami Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(miamiBusinessSchema)}
      </script>

      {/* Orlando Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(orlandoBusinessSchema)}
      </script>

      {/* FAQ Schema - CRITICAL for LLMs */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>

      {/* Offer Schema */}
      <script type="application/ld+json">
        {JSON.stringify(offerSchema)}
      </script>

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
