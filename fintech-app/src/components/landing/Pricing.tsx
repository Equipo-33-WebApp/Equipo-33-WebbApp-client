import { cn } from "@/utils/cn";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";

interface Plan {
  name: string;
  description: string;
  amount: string;
  features: string[];
  isFeatured: boolean;
}

const plans: Plan[] = [
  {
    name: "Capital de Trabajo",
    description:
      "Ideal para gestionar el día a día, cubrir gastos operativos y mantener la liquidez.",
    amount: "Hasta $50K",
    features: [
      "Respuesta en 24 horas",
      "Plazo flexible (1-12 meses)",
      "Documentación mínima",
      "Sin penalización por prepago",
    ],
    isFeatured: false,
  },
  {
    name: "Crédito de Expansión",
    description:
      "Financiación robusta para proyectos de crecimiento, compra de equipos o expansión de mercado.",
    amount: "Hasta $500K",
    features: [
      "Respuesta prioritaria (12 horas)",
      "Plazo extendido (1-3 años)",
      "Análisis de riesgo detallado",
      "Asesoría financiera gratuita",
    ],
    isFeatured: true,
  },
  {
    name: "Línea de Crédito Flexible",
    description:
      "Acceso recurrente a fondos, perfecto para proyectos con flujo de caja impredecible.",
    amount: "Rotativo",
    features: [
      "Solo pagas lo que usas",
      "Tasa preferencial",
      "Renovación automática",
      "Ideal para inventario o servicios",
    ],
    isFeatured: false,
  },
];

export const Pricing = () => {
  return (
    // Usa bg-white para contrastar con el fondo general
    <section id="pricing" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Opciones de Financiación a la Medida de Tu PYME
          </h2>
          <p className="mt-4 text-lg text-text/70">
            Encuentra el monto y el plazo que mejor se adaptan a tus objetivos
            de negocio.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col border-2 transition-all duration-300",
                // Estilos para el plan destacado
                plan.isFeatured
                  ? "border-primary shadow-2xl scale-[1.02] bg-primary/5"
                  : "border-slate-200 hover:border-primary/50"
              )}
            >
              <CardHeader className="text-center">
                <CardTitle
                  className={cn(
                    "text-2xl font-bold",
                    plan.isFeatured ? "text-primary" : "text-text"
                  )}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription className="mt-2 text-base text-text/70">
                  {plan.description}
                </CardDescription>

                <p className="mt-4 text-4xl font-extrabold tracking-tight text-text">
                  {plan.amount}
                  <span className="text-base font-medium text-text/60">
                    {" "}
                    monto máximo
                  </span>
                </p>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow p-6 pt-0">
                <ul className="flex-grow space-y-3 border-y border-slate-200 py-6 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-text/80"
                    >
                      {/* Ícono de tilde verde usando text-accent */}
                      <span className="material-symbols-outlined text-accent text-lg mt-0.5">
                        check_circle
                      </span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  // El botón destacado usa la variante 'default' (azul primario)
                  variant={plan.isFeatured ? "default" : "outline"}
                  size="lg"
                  className="w-full mt-auto"
                >
                  Ver Requisitos
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
