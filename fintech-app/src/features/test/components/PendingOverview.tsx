import { CheckCircledIcon } from "@/components/icons";
import { HomeStatsCard } from "@/features/dashboard/components/HomeStatsCard";
import { UserCard } from "@/features/dashboard/components/UserCard";
import { useRequestStats } from "@/features/dashboard/hooks/useRequestStats";
import { userMock } from "../constants/user";

export const PendingOverview: React.FC = () => {
  const stats = useRequestStats();


  return (
    <section className="space-y-6 animate-fade-right">
      <h1 className="text-2xl font-semibold text-gray-800">
        Bienvenido, Juan
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="lg:col-span-2">

            <div className="bg-green-100 text-gray-700 px-6 py-3 rounded-xl shadow-md mb-4">
              ✅ Tu solicitud fue creada con éxito.
              <br />
              Puedes ver su estado más abajo.
            </div>

          </div>

          <div className="bg-yellow-50 border border-yellow-200 mb-4 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3 text-yellow-800">
              <CheckCircledIcon classname="w-8 h-8 text-yellow-500" />
              <div>
                <p className="font-semibold text-lg">Solicitud en revisión</p>
                <p className="text-sm text-yellow-700">
                  Tu solicitud de crédito está pendiente de aprobación por un operador bancario.
                </p>
              </div>
            </div>

            <button
              onClick={() => window.location.href = "/test/req"}
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition"
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