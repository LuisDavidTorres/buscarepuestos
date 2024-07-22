import { DashboardHeader } from "../ui/header/Dashboard";
import { UpdateCarBrandsForm } from "../ui/forms/Update-car-brands";
import { getServerSession } from "next-auth";

async function LoadInformationUser({ email }: { email: string }) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user/" + email, {
    cache: "no-cache",
    headers: {
      Pragma: "no-cache",
    },
  });
  const { CompanyCardBrands } = await res.json();
  return { CompanyCardBrands };
}

async function Page() {
  const session = await getServerSession();
  let email = session?.user?.email?.toString();

  email = email || "";

  const user = await LoadInformationUser({ email });
  let carBrands = user.CompanyCardBrands;

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <div className="p-10 md:p-10 flex justify-center dark:text-black">
        <div className="shadow-md p-10">
          <h1 className="font-bold text-3xl mb-10">Agregar o Quitar Marcas</h1>
          <UpdateCarBrandsForm carBrands={carBrands} />
        </div>
      </div>
    </div>
  );
}

export default Page;
