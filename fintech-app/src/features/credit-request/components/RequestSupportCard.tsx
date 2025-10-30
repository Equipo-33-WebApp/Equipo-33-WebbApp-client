export const RequestSupportCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Necesitás ayuda?</h3>
      <p className="text-sm text-gray-600 mb-4">
        Si tenés dudas sobre qué documentos subir, contactá con nuestro equipo de soporte.
      </p>
      <button className="w-full bg-accent text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
        Contactar soporte
      </button>
    </div>
  )
}