import Header from "@/app/ui/header/Header";
import { VerifyEmailAccountForm } from "@/app/ui/forms/Verify-email-account";

export default function Page() {
  return (
    <>
      <main className="min-h-screen h-auto bg-white dark:text-black">
        <Header />
        <div className="flex justify-center p-8">
          <div className="w-full lg:w-8/12">
            <div className="flex flex-col space-y-2">
              <label>
                <span>Paso </span>
                <span className="font-bold">2 </span>
                <span>de </span>
                <span className="font-bold">5</span>
              </label>
              <h1 className="text-xl font-bold">
                Ingresar código de verificación
              </h1>
            </div>
            <div className="mt-2">
              <VerifyEmailAccountForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
