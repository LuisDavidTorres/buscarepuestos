import { Plans } from "@/app/ui/cards/Plans";
import { Subscription } from "@prisma/client";
import { SupportInformation } from "@/app/ui/ListComponents/Support-information";
import { CarouselFlowbite } from "@/app/ui/carousel/Carousel-flowbite";
import { DashboardHeader } from "../ui/header/Dashboard";
import { headers } from "next/headers";

export const revalidate: number = 0;

interface Plan extends Subscription {
  characteristics: {
    id: number;
    feature: {
      id: number;
      name: string;
    };
  }[];
}

async function loadPlans() {
  const res = await fetch(process.env.NEXT_PLUBLIC_API_URL+"/api/subscriptions", {
    cache: "no-store",
    headers: new Headers(headers()),
  });

  const data = await res.json();
  return data;
}

async function page() {
  const plans = await loadPlans();

  const maxDiscount = plans.reduce((max: any, plan: Plan) => {
    if (plan.discountActive && plan.dicountPercentage > max) {
      return plan.dicountPercentage;
    }
    return max;
  }, 0);

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <div className="flex justify-center p-8">
        <div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between xl:items-center flex-col xl:flex-row space-y-4 xl:space-y-0">
              {" "}
              <h1 className="text-xl font-bold">Selecciona tu Plan</h1>
              <div className="flex items-center bg-amber-100 shadow-xl rounded-md h-8 w-96 gap-1 justify-center">
                <h1 className="font-bold dark:text-black">
                  Compra con hasta un {maxDiscount.toString()}% de descuento
                </h1>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                </span>
              </div>
            </div>
          </div>
          <div className="hidden xl:block">
            {" "}
            <div className="mt-6 flex flex-row gap-5">
              {plans.map((plan: Plan) => (
                <div key={plan.id}>
                  <Plans plan={plan} />
                </div>
              ))}
            </div>
          </div>
          <div className="xl:hidden w-72">
            <CarouselFlowbite plans={plans} />
          </div>
        </div>
      </div>
      <section className="p-10">
        <SupportInformation />
      </section>
    </div>
  );
}

export default page;
