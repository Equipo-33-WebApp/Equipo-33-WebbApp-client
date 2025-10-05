import type { Feature } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";

const features: Feature[] = [
  {
    icon: "verified_user",
    title: "Onboarding Digital & KYC",
    description:
      "Automatiza la recopilación y validación de información y documentos, garantizando el cumplimiento normativo (KYC/AML) de forma ágil.",
  },
  {
    icon: "dynamic_form",
    title: "Formularios Dinámicos",
    description:
      "Permite a las PYMES guardar el avance de su solicitud. El proceso de carga de documentos y firma digital se realiza 100% en línea.",
  },
  {
    icon: "speed",
    title: "Reducción de Tiempos de Aprobación",
    description:
      "Nuestro motor de pre-evaluación de riesgo automatiza la revisión inicial, acelerando la respuesta y mejorando la experiencia del usuario.",
  },
];

export const Features = () => {
  return (
    // Usa bg-background y text-text
    <section id="features" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Eficiencia y Seguridad en el Proceso de Crédito
          </h2>
          <p className="mt-4 text-lg text-text/70">
            Nuestra plataforma fue diseñada para eliminar la burocracia y
            enfocar tu tiempo en crecer.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            // Usa border-primary, hover:border-primary
            <Card
              key={feature.title}
              className="border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <CardHeader>
                {/* Ícono usa bg-primary/10 y text-primary */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: "28px" }}
                  >
                    {feature.icon}
                  </span>
                </div>
                <CardTitle className="mt-4 text-text">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-text/80">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
