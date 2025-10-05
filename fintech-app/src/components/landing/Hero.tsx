import { Button } from "../ui/Button";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // Imagen enfocada en el negocio y la estrategia financiera
          backgroundImage:
            'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200")',
        }}
      />
      {/* Overlay oscuro para mejorar la legibilidad del texto blanco */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />

      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Financiación Ágil para el Crecimiento de Tu PYME.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-gray-200">
            Obtén el capital que necesitas para tu negocio sin trámites
            complejos. Digital, rápido y seguro. Enfócate en crecer, nosotros
            nos encargamos del crédito.
          </p>
          <div className="mt-10 flex gap-4">
            <Button size="lg" variant="accent">
              Solicitar Financiación
            </Button>
            {/* El botón outline mantiene la estética en el Hero (fondo oscuro) */}
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Saber Más
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
