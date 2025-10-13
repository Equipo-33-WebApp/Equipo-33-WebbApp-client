export const StatesLegend: React.FC = () => {
    return(
      <div className="flex w-fit flex-wrap justify-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 p-1 rounded-md bg-green-100">
          <span className="text-green-700 font-medium">Aprobada</span>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-md bg-yellow-100">
          <span className="text-yellow-700 font-medium">Pendiente</span>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-md bg-red-100">
          <span className="text-red-700 font-medium">Rechazada</span>
        </div>
      </div>
    );
}