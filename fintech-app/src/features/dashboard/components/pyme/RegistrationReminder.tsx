import { CheckCircledIcon, CircleIcon } from "@/components/icons";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const RegistrationReminder: React.FC = () => {

  const { isAuthenticated, hasPymeData, hasKyc, isFullyRegistered } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      {!isFullyRegistered && (
        <div className="bg-white/80 p-6 rounded-xl shadow-md border border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Completa tu registro
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-700">
              {isAuthenticated ? <CheckCircledIcon classname="text-accent w-5 h-5" /> : <CircleIcon />}
              <span>Cuenta creada</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              {hasPymeData ? <CheckCircledIcon classname="text-accent w-5 h-5" /> : <CircleIcon />}
              <span>Datos de empresa</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              {hasKyc ? <CheckCircledIcon classname="text-accent w-5 h-5" /> : <CircleIcon />}
              <span>Validación KYC</span>
            </li>
          </ul>

          {(!hasPymeData || !hasKyc) && (
            <button
              onClick={() => navigate(ROUTES.REGISTER)}
              className="bg-accent text-white px-5 py-2 rounded-lg hover:bg-accent/80 transition"
            >
              Completar registro
            </button>
          )}
        </div>
      )}

      {isFullyRegistered && (
        <div className="flex flex-col justify-center items-center bg-green-50 p-5 rounded-xl border border-green-200 text-green-800">
          <CheckCircledIcon classname="w-10 h-10 text-accent" />
          <p>
            Tu registro está completo. Habilitadas todas las funciones.
          </p>
        </div>
      )}
    </>
  )
}

