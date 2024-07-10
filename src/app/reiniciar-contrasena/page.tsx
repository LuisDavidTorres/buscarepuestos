import Header from "../ui/header/Header";
import { ResetPasswordForm } from "../ui/forms/Reset-password";

export default function page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="p-10 md:p-10 flex justify-center">
        <div className="border-2 p-10 rounded-md shadow-md">
          <h1 className="font-bold text-3xl mb-8">Resetear Contraseña</h1>
          <p>¿Olvidaste tu Contraseña?</p>

          <p className="mt-2">
            {" "}
            Te enviaremos un email con instrucciones
            <span className="block">
              {" "}
              sobre cómo restablecer tu Contraseña.
            </span>
          </p>
          <div className="mt-5">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
