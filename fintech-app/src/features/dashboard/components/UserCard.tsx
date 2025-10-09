import defaultAvatar from "@/assets/defaultAvatar.webp";
import { ROLE_PYME } from "@/constants/roles";

interface UserCardProps {
  user: User | null
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex items-center gap-4">
    {user && (
      <>
        <picture>
          <img
            src={user?.avatar || defaultAvatar}
            alt={`${user?.firstName} avatar`}
            className="w-16 h-16 rounded-full object-cover border border-gray-200 ring-4 ring-accent/20"
          />
        </picture>
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-700 text-lg">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-gray-500 text-sm">{user?.email}</p>
          {user.role === ROLE_PYME ? (
            <p className="text-gray-500 text-sm">
              Tipo de empresa: {user?.businessType}
            </p>
          ):(
            <p className="text-gray-500 text-sm">
              N° de Operador: 5433235
            </p>
          )}
        </div>
      </>
    )}
    {!user && <p className="text-gray-500">Cargando usuario...</p>}
  </div>
);