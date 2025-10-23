import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AccountFields } from "../../components/AccountFields";
import { AccountActions } from "../../components/AccountActions";
import type { DashboardPymeAccountDataForm } from "../../types";
import { UserCard } from "../../components/UserCard";


export const PymeAccount: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<DashboardPymeAccountDataForm>({
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
        <p className="text-gray-600 text-sm mt-1">
          Aquí puedes ver y actualizar los datos de tu cuenta y empresa.
        </p>
      </header>

      <UserCard user={user} />
      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Información de la Cuenta</h2>
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