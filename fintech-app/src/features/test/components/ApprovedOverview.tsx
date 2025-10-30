import { CheckCircledIcon } from "@/components/icons"
import { HomeStatsCard } from "@/features/dashboard/components/HomeStatsCard";
import { UserCard } from "@/features/dashboard/components/UserCard";
import { useRequestStats } from "@/features/dashboard/hooks/useRequestStats";
import { userMock } from "../constants/user";

export const ApprovedOverview: React.FC = () => {

  const stats = useRequestStats();



  return (
    <section className="space-y-6 animate-fade-right">
      <h1 className="text-2xl font-semibold text-gray-800">
        Bienvenido, Juan
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">

          <div className="bg-green-50 border border-green-200 mb-4 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3 text-green-800">
              <CheckCircledIcon classname="w-8 h-8 text-green-500" />
              <div>
                <p className="font-semibold text-lg">Solicitud aprobada</p>
                <p className="text-sm text-green-700">
                  Tu solicitud fue aprobada exitosamente. Podés ver los detalles para continuar con el desembolso.
                </p>
              </div>
            </div>

            <button
              onClick={() => window.location.href = "/test/apreq"}
              className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition"
            >
              Ver detalles
            </button>
          </div>


          <HomeStatsCard statsData={stats} />
        </div>

        <div className="flex flex-col gap-6">
          <UserCard user={userMock} />

          <div className="flex flex-col justify-center items-center bg-green-50 p-5 rounded-xl border border-green-200 text-green-800">
            <CheckCircledIcon classname="w-10 h-10 text-accent" />
            <p>
              Tu registro está completo. Habilitadas todas las funciones.
            </p>
          </div>


          <button
            className={`px-6 py-3 rounded-lg text-lg font-medium transition
              bg-accent text-white hover:bg-accent/70 cursor-pointer`}
          >
            Solicitar nuevo crédito
          </button>

        </div>

      </div>
    </section>
  )
}