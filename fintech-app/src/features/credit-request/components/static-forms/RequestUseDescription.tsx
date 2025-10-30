export const RequestUseDescription: React.FC = () => {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">
        Descripción del uso (opcional)
      </label>
      <textarea
        maxLength={500}
        className="w-full rounded-lg p-3 resize-none bg-gray-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
        rows={3}
        placeholder="Describe brevemente el propósito del crédito"
      />
    </div>
  )
}