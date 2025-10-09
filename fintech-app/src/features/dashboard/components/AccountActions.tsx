export interface AccountActionsProps {
  isEditing: boolean;
  onCancel: () => void;
  onEdit: () => void;
}

export const AccountActions: React.FC<AccountActionsProps> = ({ isEditing, onCancel, onEdit }) => (
  <div className="flex justify-end gap-3 pt-4">
    {isEditing ? (
      <>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/70 transition"
        >
          Guardar cambios
        </button>
      </>
    ) : (
      <button
        type="button"
        onClick={onEdit}
        className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/70 transition"
      >
        Editar datos
      </button>
    )}
  </div>
);