import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserCard } from "../../components/UserCard";
import { HomeStatsCard } from "../../components/HomeStatsCard";
import { useRequestStats } from "../../hooks/useRequestStats";
import { ROUTES } from "@/constants/routes";


export const PymeHome: React.FC = () => {
  const { user } = useAuth();
  const stats = useRequestStats();
  const navigate = useNavigate();


  return (
    <section className="space-y-6 animate-fade-right">
      <h1 className="text-2xl font-semibold text-gray-800">
        Bienvenido, {user?.firstName}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HomeStatsCard statsData={stats} />
        </div>

        <div className="flex flex-col gap-6">
          <UserCard user={user} />
          <button
            onClick={() => navigate(ROUTES.DASHBOARD.PYME.REQUEST)}
            className="bg-accent text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-accent/70 transition"
          >
            Solicitar nuevo crédito
          </button>
        </div>
      </div>
    </section>
  );
};
