import { useState } from "react";
import { loginUser } from "@/api/auth";
import { cn } from "@/utils/cn";
import { Link, useNavigate } from "react-router-dom";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log(email, password);
            // llamamos a la funcion de login            
            const res = await loginUser({ email, password });
            console.log("Acceso Exitoso", res);

            // Guarda en localStorage
            if (res?.data?.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                // Redirige al dashboard
                navigate("/dashboard");
            }

        } catch {
            setError("Correo o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto"
        >
            <h2 className="text-3xl font-extrabold text-center text-[--color-text] mb-8">
                Iniciar sesión
            </h2>

            {error && (
                <p className="text-[--color-error] text-center mb-4 bg-red-50 py-2 rounded-lg">
                    {error}
                </p>
            )}

            <div className="mb-5 text-left">
                <label className="block mb-2 font-medium text-[--color-text] text-sm">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition"
                    placeholder="tucorreo@correo.com"
                />
            </div>

            <div className="mb-6 text-left">
                <label className="block mb-2 font-medium text-[--color-text] text-sm">
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition"
                    placeholder="********"
                />
            </div>


            <button
                type="submit"
                disabled={loading}
                className={cn(
                    "w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md transform",
                    loading
                        ? "bg-primary/70 text-white cursor-not-allowed"
                        : "bg-primary text-white hover:bg-[#163a78] active:bg-[#122f63] hover:scale-[1.02] hover:shadow-lg"
                )}
            >
                {loading ? "Cargando..." : "Ingresar"}
            </button>

            <p className="text-center text-sm mt-6 text-gray-500">
                ¿No tienes cuenta?{" "}
                <Link
                    to="/register"
                    className="text-[--color-accent] font-semibold hover:underline"
                >
                    Registrate aquí
                </Link>
            </p>
        </form>
    );
}

