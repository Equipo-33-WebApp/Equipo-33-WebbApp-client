import type { Testimonial } from "./types";

const testimonials: Testimonial[] = [
  {
    name: "Javier López",
    role: "Dueño de Restaurante",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    quote:
      "El proceso de solicitud de crédito fue increíblemente rápido y sencillo. Pude obtener la financiación que mi negocio necesitaba sin pasar por la burocracia bancaria tradicional. ¡Un verdadero alivio!",
  },
  {
    name: "Mariana Soto",
    role: "CEO de Startup Tecnológica",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=200",
    quote:
      "La plataforma me permitió cargar todos los documentos requeridos de forma digital y firmar en minutos. El tiempo de respuesta fue clave para cerrar un proyecto grande a tiempo.",
  },
  {
    name: "Andrés Gil",
    role: "Gerente de Logística PYME",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200",
    quote:
      "Necesitaba liquidez urgente para expandir mi flota. Fintech Co. no solo me dio la mejor tasa, sino que su herramienta de pre-aprobación me dio certeza casi inmediata. Excelente para PYMES.",
  },
];

export const Testimonials = () => {
  return (
    // Se usa un fondo blanco para contrastar con bg-background
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Historias de Éxito Empresarial
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col items-center text-center"
            >
              <img
                alt={testimonial.name}
                // Anillo de acento usando ring-accent
                className="h-24 w-24 rounded-full object-cover ring-4 ring-accent/20"
                src={testimonial.image}
              />
              <blockquote className="mt-6 text-lg text-text/80">
                <p>"{testimonial.quote}"</p>
              </blockquote>
              <footer className="mt-4">
                <p className="text-base font-semibold text-text">
                  {testimonial.name}
                </p>
                <p className="text-sm text-text/60">{testimonial.role}</p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
