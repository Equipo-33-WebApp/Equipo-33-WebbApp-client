import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/utils/cn";
import { ROLE_PYME } from "@/constants/roles";
import type { DashboardMenuItem } from "@/features/dashboard/types";
import { 
  PieChartIcon,
  ReturnIcon,
  UserIcon,
  LogoutIcon,
  DashboardIcon,
  ClipboardIcon,
  PencilIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

interface DashboardLayoutProps {
  role: string
}

const pymeMenu : DashboardMenuItem[] = [
  { id: "pyme-home", label: "Resumen", to: ROUTES.DASHBOARD.PYME.OVERVIEW, icon: DashboardIcon },
  { id: "pyme-applications", label: "Mis Solicitudes", to: ROUTES.DASHBOARD.PYME.APPLICATIONS, icon: ClipboardIcon },
  { id: "request", label: "Solicitar Crédito", to: ROUTES.DASHBOARD.PYME.REQUEST, icon: PencilIcon },
  { id: "py-account", label: "Mi Cuenta", to: ROUTES.DASHBOARD.PYME.ACCOUNT, icon: UserIcon },
];

const operatorMenu : DashboardMenuItem[] = [
  { id: "operator-home", label: "Resumen", to: ROUTES.DASHBOARD.OPERATOR.OVERVIEW, icon: DashboardIcon },
  { id: "applications-review", label: "Ver Solicitudes", to: ROUTES.DASHBOARD.OPERATOR.REVIEW, icon: ClipboardIcon },
  { id: "reports", label: "Reportes y Métricas", to: ROUTES.DASHBOARD.OPERATOR.REPORTS, icon: PieChartIcon },
  { id: "op-account", label: "Mi Cuenta", to: ROUTES.DASHBOARD.OPERATOR.ACCOUNT, icon: UserIcon },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { logout } = useAuth();
  const menuItems = role === ROLE_PYME ? pymeMenu : operatorMenu;

  return (
    <div className="min-h-screen flex">
      <aside className="w-[200px] md:w-64 bg-gradient-to-b from-gray-900  to-sky-950 text-white flex flex-col p-4 fixed h-full">
        <div className="flex items-center justify-center gap-4 mb-6">
          <NavLink to={ROUTES.BASE} title="Volver a Landing"><ReturnIcon /></NavLink>
          <h2 className="text-lg font-semibold w-full h-full">
            Panel {role === ROLE_PYME ? "PyME" : "Operador"}
          </h2>
        </div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md transition text-gray-400! hover:text-white! flex gap-4",
                    isActive ? "bg-blue-800 text-white!" : "hover:bg-gray-800"
                  )
                }
              >
                {Icon && <Icon />}
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="h-full flex items-end">
          <Button onClick={() => logout()} size="sm">
            <LogoutIcon /> Cerrar Sesión
          </Button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 p-6 pl-[220px] md:pl-[300px]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

