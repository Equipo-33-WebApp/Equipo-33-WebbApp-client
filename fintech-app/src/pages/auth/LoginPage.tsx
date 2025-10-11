import LoginForm from "@/components/forms/LoginForm";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A438D] via-[#213547] to-[#00C853] px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl max-w-4xl w-full flex flex-col md:flex-row items-center justify-between">
        <div className="text-white md:w-1/2 mb-8 md:mb-0 md:pr-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-3 leading-tight">
            Bienvenido a  <span className="text-[#00C853]">Ventus</span>
          </h1>
          <p className="text-gray-200 text-sm">
            Inicia sesión para continuar impulsando el crecimiento de tu PyME.
          </p>
        </div>

        <div className="md:w-1/2">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
