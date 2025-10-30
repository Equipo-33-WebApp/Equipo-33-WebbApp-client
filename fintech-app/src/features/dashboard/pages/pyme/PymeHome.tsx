import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserCard } from "../../components/UserCard";
import { HomeStatsCard } from "../../components/HomeStatsCard";
import { useRequest } from "../../hooks/useRequest";
import { ROUTES } from "@/constants/routes";
import { CheckCircledIcon, CircleIcon } from "@/components/icons";
import { PymeRecentRequestsCard } from "../../components/pyme/PymeRecentRequestsCard";


export const PymeHome: React.FC = () => {
  const { user, isAuthenticated, hasPymeData, hasKyc, isFullyRegistered } = useAuth();
  const { stats } = useRequest();
  const navigate = useNavigate();

  return (
    <section className="space-y-6 animate-fade-right">
      <h1 className="text-2xl font-semibold text-gray-800">
        Bienvenido, {user?.firstName}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <HomeStatsCard statsData={stats} />
          {isFullyRegistered && <PymeRecentRequestsCard />} 
        </div>

        <div className="flex flex-col gap-6">
          <UserCard user={user} />

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

          <button
            onClick={() => navigate(ROUTES.DASHBOARD.PYME.REQUEST)}
            disabled={!isFullyRegistered}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition 
              ${isFullyRegistered
                ? "bg-accent text-white hover:bg-accent/70 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed! opacity-70"
              }`}
          >
            Solicitar nuevo crédito
          </button>

        </div>

      </div>
    </section>
  );
};
