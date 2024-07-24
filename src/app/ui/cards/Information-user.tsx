import { getServerSession } from "next-auth";
import { formatNameSpareType } from "@/libs/formatName";
import { PlanRedirect } from "../buttons/Plans-redirect";

async function LoadInformationUser({ email }: { email: string }) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/" + email,
    {
      next: { revalidate: 0 },
    }
  );
  const { user, CompanyCardBrands } = await res.json();
  return { user, CompanyCardBrands };
}

export async function InformationUser() {
  const session = await getServerSession();
  let email = session?.user?.email?.toString();

  email = email || "";

  const user = await LoadInformationUser({ email });

  const subscription = user?.user?.subscription;

  function capitalizeWords(str: string) {
    return str?.replace(/\b\w/g, (l) => l.toUpperCase());
  }

  return (
    <div className="bg-white">
      <h1 className="text-lg font-bold mb-4">Información Personal</h1>
      <div className="flex mb-2 space-x-2 flex-wrap">
        <p>Nombre de Representante:</p>
        <p className="font-bold break-all">{user?.user?.company.contactName}</p>
      </div>
      <div className="flex mb-2 space-x-2 overflow-x-auto">
        <p  className="whitespace-nowrap">Correo:</p>
        <p className="font-bold whitespace-nowrap flex-shrink-0">{user?.user?.email}</p>
      </div>
      <div className="flex mb-2 space-x-2">
        <p>Teléfono:</p>
        <p className="font-bold">{user?.user?.company.phoneNumber}</p>
      </div>
      <div className="flex mb-2 space-x-2">
        <p>Empresa:</p>
        <p className="font-bold">{user?.user?.company.name}</p>
      </div>
      <div className="flex mb-2 space-x-2">
        <p>Rut Empresa:</p>
        <p className="font-bold">{user?.user?.company.rut}</p>
      </div>
      <div className="flex mb-2 space-x-2">
        <p>Giro:</p>
        <p className="font-bold">
          {capitalizeWords(user?.user?.company.businessLine)}
        </p>
      </div>
      <div className="flex mb-2 space-x-2">
        <p>Tipo de Repuesto:</p>
        <p className="font-bold">
          {formatNameSpareType(user?.user?.company.rubric)}
        </p>
      </div>
      <div>
        <p>Marca de autos registradas</p>
        <div className="px-6 pt-4 pb-2 sm:w-3/4">
          {user?.CompanyCardBrands?.map((brand: any) => (
            <span
              key={brand.car.idCardBrand}
              className="inline-block bg-gray-200 hover:bg-slate-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {brand.car.nameCarBrand}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {subscription?.[0] === undefined ? (
          <div>
            <p className="text-gray-500 text-base mb-3">
              ¡Ups! Parece que aún no has seleccionado ningún plan. ¿Te gustaría
              explorar nuestras opciones?
            </p>
            <section className="flex justify-center">
              <PlanRedirect />
            </section>
          </div>
        ) : (
          <div>
            {" "}
            <h1 className="text-lg font-bold mb-2">Información tu plan</h1>
            <div className="border-2 rounded-md p-4 w-3/3 lg:w-5/12 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div>
                <h1 className="font-bold">
                  Plan {subscription?.[0]?.subscription.name}
                </h1>
              </div>
              <div className="mt-2">
                <p>{subscription?.[0]?.subscription.clicks} Clicks</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
