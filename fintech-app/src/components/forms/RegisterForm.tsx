import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { registerUser } from "@/api/auth";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        taxId: "",
        companyName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (formData.password !== formData.confirmPassword) {
                setError("Las contraseñas no coinciden");
                setLoading(false);
                return;
            }

            const payload = {
                firstName: formData.companyName,
                lastName: "pyme",
                email: formData.email,
                password: formData.password,
                phone: "9999999999"
            };

            const res = await registerUser(payload);


            console.log("Registrando:", res);

           
            localStorage.setItem("user", JSON.stringify(res.data.user));


            navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Error al registrarse. Inténtalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-extrabold text-center text-[var(--color-text)] mb-6">
                Crear cuenta
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                        RUC / Tax ID
                    </label>
                    <input
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                        placeholder="12345678901"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                        Nombre de empresa
                    </label>
                    <input
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                        placeholder="Mi Empresa SAC"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                        Correo electrónico
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                        placeholder="empresa@correo.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                        Contraseña
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                        placeholder="********"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--color-text)]">
                        Confirmar contraseña
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
                        placeholder="********"
                    />
                </div>

                {error && (
                    <p className="text-[var(--color-error)] text-sm text-center">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                        "w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md transform",
                        loading
                            ? "bg-[var(--color-primary)]/70 text-white cursor-not-allowed"
                            : "bg-[var(--color-primary)] text-white hover:bg-[#163a78] active:bg-[#122f63] hover:scale-[1.02] hover:shadow-lg"
                    )}
                >
                    {loading ? "Registrando..." : "Registrar mi empresa"}
                </button>
            </form>

            <p className="text-center text-sm mt-4 text-[var(--color-text)]">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-[var(--color-primary)] font-medium hover:underline">
                    Inicia sesión
                </Link>
            </p>
        </div>
    );
}
