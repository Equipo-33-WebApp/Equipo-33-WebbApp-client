import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_PYME } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

export const CallToAction = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    // Usa bg-background
    <section id="contact" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
          ¿Listo para Impulsar el Crecimiento de Tu Negocio?
        </h2>
        <p className="mt-4 text-lg text-text/70">
          Únete a cientos de PYMES que ya están obteniendo financiación ágil y
          segura con Fintech Co.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="accent"
            onClick={() => isAuthenticated && user?.role === ROLE_PYME 
              ? navigate(ROUTES.DASHBOARD.PYME.REQUEST) 
              : navigate(ROUTES.LOGIN) 
            }
          >
            Solicitar Financiación Hoy
          </Button>
          <Button size="lg" variant="outline">
            Preguntas Frecuentes
          </Button>
        </div>
      </div>
    </section>
  );
};
