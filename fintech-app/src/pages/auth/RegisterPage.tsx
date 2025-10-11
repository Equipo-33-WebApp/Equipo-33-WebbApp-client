import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-text)] to-[var(--color-accent)] px-6 py-10">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-10 shadow-2xl w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Panel izquierdo - texto / marca (visible en md+) */}
        <div className="text-white md:w-1/2 mb-6 md:mb-0 md:pr-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
            Bienvenido a <span className="text-[var(--color-accent)]">Ventus</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-md mx-auto md:mx-0">
            Registra tu empresa para acceder a herramientas financieras y gestionar tu crecimiento con confianza.
          </p>
        </div>

        {/* Panel derecho - formulario */}
        <div className="md:w-1/2 w-full">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
