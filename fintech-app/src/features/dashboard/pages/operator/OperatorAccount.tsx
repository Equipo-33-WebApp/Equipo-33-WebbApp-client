import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AccountFields } from "../../components/AccountFields";
import { AccountActions } from "../../components/AccountActions";
import type { DashboardOperatorAccountDataForm } from "../../types";
import { UserCard } from "../../components/UserCard";


export const OperatorAccount: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<DashboardOperatorAccountDataForm>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Conectar con backend
    // Agregar notificación
    setIsEditing(false);
  };

  if (!user) return <p className="text-gray-600">Cargando datos...</p>;

  return (
    <section className="space-y-8 animate-fade-right">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Configuración de Cuenta</h1>
      </header>

      <UserCard user={user} />
      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-6">
        <AccountFields 
          formData={formData} 
          isEditing={isEditing} 
          handleChange={handleChange} 
        />
        <AccountActions 
          isEditing={isEditing} 
          onCancel={() => setIsEditing(false)} 
          onEdit={() => setIsEditing(true)} 
        />
      </form>
    </section>
  );
};