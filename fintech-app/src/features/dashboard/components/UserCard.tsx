import { ROLE_OPERATOR, ROLE_PYME } from "@/constants/roles";
import { UserAvatar } from "./UserAvatar";

interface UserCardProps {
  user: User | null;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex flex-col sm:flex-row justify-start items-start gap-4">
    {user && (
      <>
        <UserAvatar user={user} />
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-700 text-lg">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-gray-500 text-sm">{user?.email}</p>
          {user.role === ROLE_PYME && user.pymeData && (
            <p className="text-gray-500 text-sm">
              Tipo de empresa: {user.pymeData.sector}
            </p>
          )}
          {user.role === ROLE_OPERATOR && (
            <div>
              <p className="text-gray-500 text-sm">N° de Operador:</p>
              <p className="text-xs">{user.id}</p>
            </div>
          )}
        </div>
      </>
    )}
    {!user && <p className="text-gray-500">Cargando usuario...</p>}
  </div>
);
