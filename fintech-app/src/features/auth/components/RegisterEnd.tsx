import { CheckCircledIcon } from "@/components/icons";

interface RegisterEndProps {
  onFinish: () => void;
}
export default function RegisterEnd({ onFinish }: RegisterEndProps) {
  return (
    <div className="text-center space-y-6 h-[380px] flex flex-col items-center justify-center">
      <CheckCircledIcon classname="text-accent w-24 h-24" />
      <h2 className="text-2xl font-bold text-white">
        ¡Registro completado!
      </h2>
      <p className="text-gray-300">
        Ya completaste todos los pasos del registro.
        Ahora puedes acceder a todas las funciones del sistema.
      </p>

      <button
        onClick={onFinish}
        className="w-full py-3 rounded-xl font-semibold bg-[var(--color-primary)] 
                   text-white hover:bg-[#163a78] hover:scale-[1.02] 
                   transition-all duration-300"
      >
        Ir al Dashboard
      </button>
    </div>
  )
}