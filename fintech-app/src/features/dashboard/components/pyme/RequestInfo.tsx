export const RequestInfo: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-6">
    <h2 className="text-lg font-semibold text-gray-800">Información importante</h2>

    <p className="text-gray-700 text-sm leading-relaxed">
        En nuestra entidad trabajamos bajo normativas del <strong>Banco Central de la República Argentina (BCRA)</strong> y los estándares de transparencia financiera. Toda solicitud será evaluada según el historial crediticio, la documentación presentada y la capacidad de pago de la empresa.
    </p>

    <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
      <li>Créditos destinados a fines comerciales o productivos.</li>
      <li>Evaluación de antigüedad de la empresa e ingresos.</li>
      <li>Documentación adicional: balances, constancias impositivas, etc.</li>
      <li>Monto máximo según categoría fiscal y comportamiento financiero.</li>
      <li>Tasas y plazos sujetos a la política vigente.</li>
    </ul>

    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <h3 className="text-blue-700 font-semibold mb-1">Recomendaciones antes de solicitar:</h3>
      <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
        <li>Verificá que tu información fiscal y bancaria esté actualizada.</li>
        <li>Mantené un registro positivo de pagos anteriores.</li>
        <li>Prepará documentos en PDF.</li>
        <li>Considerá el impacto en la proyección financiera.</li>
      </ul>
    </div>
  </div>
);