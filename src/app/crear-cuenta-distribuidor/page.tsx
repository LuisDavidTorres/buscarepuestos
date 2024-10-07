import { Register_account_distribuitor } from "../ui/forms/Register-account-distributor";
import Header from "../ui/header/Header";

export default function Page() {
  return (
    <>
      <main className="min-h-screen">
        <Header />
        <div className="bg-white flex justify-center p-8 dark:text-black min-h-screen">
          <div className="w-full lg:w-8/12">
            <div className="flex flex-col space-y-2">
              <label>
                <span>Paso </span>
                <span className="font-bold">1 </span>
                <span>de </span>
                <span className="font-bold">5</span>
              </label>
              <h1 className="text-xl font-bold">Registro Empresa</h1>
              <h2
                className="text-xs text-gray-900 uppercase tracking-wide leading-6"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "normal",
                }}
              >
                Comienza ahora y encuentra los requerimientos de tu mercado.
                Estamos comprometidos a ofrecerte un servicio rápido y seguro
                que facilite la gestión de ventas y potencie tu negocio.
              </h2>
            </div>
            <div className="mt-2">
              <Register_account_distribuitor />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
