import Header from "@/app/ui/header/Header";
import { ResetPasswordTokenForm } from "@/app/ui/forms/Reset-password-token";

async function verifyToken(token: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/api/token/" + token, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Pragma: "no-cache",
    },
  });
  if (res.ok) {
    return true;
  } else {
    return false;
  }
}

async function page({ params }: { params: { token: string } }) {
  const { token } = params;
  const tokenIsValid = await verifyToken(token);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {tokenIsValid ? (
        <div className="p-10 md:p-10 flex justify-center xl:justify-start">
          <div>
            <h1 className="font-bold text-3xl mb-8">Restablecer Contraseña</h1>
            <p>Ingresa tu nueva contraseña</p>
            <div className="mt-5">
              <ResetPasswordTokenForm token={token} />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10 bg-white shadow-md rounded-md max-w-md w-full mx-auto mt-36">
          <div className="flex justify-center mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
          </div>
          <p className="text-center">
            El token de restablecimiento de contraseña proporcionado no es
            válido. Esto puede deberse a que el enlace ha caducado o ya ha sido
            utilizado. Por favor, solicita un nuevo enlace para continuar.
          </p>
        </div>
      )}
    </div>
  );
}

export default page;
