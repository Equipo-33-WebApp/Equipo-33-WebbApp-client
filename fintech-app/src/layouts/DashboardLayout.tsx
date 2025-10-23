import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
  PencilIcon,
  HomeIcon
} from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

interface DashboardLayoutProps {
  role: string
}

const pymeMenu: DashboardMenuItem[] = [
  { id: "pyme-home", label: "Resumen", to: ROUTES.DASHBOARD.PYME.OVERVIEW, icon: DashboardIcon },
  { id: "pyme-applications", label: "Mis Solicitudes", to: ROUTES.DASHBOARD.PYME.APPLICATIONS, icon: ClipboardIcon },
  { id: "request", label: "Solicitar Crédito", to: ROUTES.DASHBOARD.PYME.REQUEST, icon: PencilIcon },
  { id: "py-account", label: "Mi Cuenta", to: ROUTES.DASHBOARD.PYME.ACCOUNT, icon: UserIcon },
];

const operatorMenu: DashboardMenuItem[] = [
  { id: "operator-home", label: "Resumen", to: ROUTES.DASHBOARD.OPERATOR.OVERVIEW, icon: DashboardIcon },
  { id: "applications-review", label: "Ver Solicitudes", to: ROUTES.DASHBOARD.OPERATOR.REVIEW, icon: ClipboardIcon },
  { id: "reports", label: "Reportes y Métricas", to: ROUTES.DASHBOARD.OPERATOR.REPORTS, icon: PieChartIcon },
  { id: "op-account", label: "Mi Cuenta", to: ROUTES.DASHBOARD.OPERATOR.ACCOUNT, icon: UserIcon },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { logout, isFullyRegistered } = useAuth();
  const navigate = useNavigate();
  const menuItems = role === ROLE_PYME ? pymeMenu : operatorMenu;

  const [collapsed, setCollapsed] = useState(true);

  const commonButtons = [
    {
      id: "go-landing",
      label: "Ir a Landing",
      onClick: () => navigate(ROUTES.BASE),
      icon: HomeIcon
    },
    {
      id: "logout",
      label: "Cerrar Sesión",
      onClick: () => logout(),
      icon: LogoutIcon
    },
  ];

  return (
    <div className="min-h-screen flex">
      <aside
        className={cn(
          "bg-gradient-to-b from-gray-900 to-sky-950 text-white flex flex-col p-4 fixed h-[100dvh] z-50 transition-all duration-300",
          collapsed ? "w-[70px]" : "w-[240px] md:w-64",
          !collapsed && ""
        )}
      >

        <div className="flex items-center mb-6 gap-4">
          <button
            onClick={() => setCollapsed(prev => !prev)}
            className="p-2 rounded-md hover:bg-gray-800 transition"
            title={collapsed ? "Expandir menú" : "Colapsar menú"}
          >
            <ReturnIcon
              classname={cn(
                "w-6 h-6 transition-transform duration-300",
                collapsed && "rotate-180"
              )}
            />
          </button>

          <h2
            className={cn(
              "text-lg font-semibold transition-all duration-300 overflow-hidden whitespace-nowrap",
              collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            )}
          >
            Panel {role === ROLE_PYME ? "PyME" : "Operador"}
          </h2>

        </div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isDisabled =
              !isFullyRegistered &&
              (item.id === "pyme-applications" || item.id === "request");

            return (
              <NavLink
                key={item.id}
                to={isDisabled ? "#" : item.to}
                onClick={(e) => isDisabled && e.preventDefault()}
                className={({ isActive }) =>
                  cn(
                    "px-2 py-2 rounded-md transition flex gap-4",
                    isDisabled
                      ? "text-gray-500 cursor-not-allowed opacity-60 pointer-events-none"
                      : isActive
                        ? "bg-primary text-white!"
                        : "text-gray-400! hover:text-white! hover:bg-gray-800"
                  )
                }
                title={collapsed ? item.label : ""}
              >
                <div className="flex justify-center items-center">
                  {Icon && <Icon />}
                </div>
                <span
                  className={cn(
                    "transition-all duration-300 overflow-hidden whitespace-nowrap",
                    collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
        <nav className="mt-auto flex flex-col gap-2">
          {commonButtons.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                onClick={item.onClick}
                size="sm"
                className="w-full flex items-center justify-start bg-transparent! pl-2! text-gray-400! hover:text-white!"
                title={collapsed ? item.label : ""}
              >
                <div className="flex justify-center items-center">
                  <Icon />
                </div>
                <span
                  className={cn(
                    "transition-all duration-300 overflow-hidden whitespace-nowrap",
                    collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  )}
                >
                  {item.label}
                </span>
              </Button>
            )
          })}
        </nav>
      </aside>

      <main
        className={cn(
          "flex-1 bg-gray-50 p-6 transition-all duration-300 pl-[80px] overflow-hidden",
          collapsed ? "md:pl-[90px]" : "md:pl-[300px]"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

