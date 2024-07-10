"use client";

import { Subscription } from "@prisma/client";
import { formatMoney } from "@/libs/moneyutils";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { calculateDiscount } from "@/libs/mathematicalFunctions";
import { Decimal } from "@prisma/client/runtime/library";
import { formatMoneyString } from "@/libs/moneyutils";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Plan extends Subscription {
  characteristics: {
    id: number;
    feature: {
      id: number;
      name: string;
    };
  }[];
}

export function Plans({ plan }: { plan: Plan }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoad] = useState(false);
  const [planFree, setPlanFree] = useState(getCookie("idPlan"));

  async function selecPlan(id: number) {
    setLoad(true);
    try {
      const res = await fetch("/api/subscriptions/" + id, {
        method: "GET",
      });
      const data = await res.json();

      setCookie("idPlan", data.subscription.id);
      setCookie("namePlan", data.subscription.name);
      setCookie("pricePlan", data.subscription.price);
      setCookie("clicksPlan", data.subscription.clicks);
      setCookie("finalDiscount", data.finaldiscount);
      setCookie("discountPercentage", data.discountPercentage);

      const planInfo = {
        idPlan: data.subscription.id,
        namePlan: data.subscription.name,
        pricePlan: data.subscription.price,
        clicks: data.subscription.clicks,
        finalDiscount: data.finaldiscount,
      };

      if (id === 4) {
        const res = await fetch("/api/assignPlan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planInfo: planInfo,
          }),
        });

        router.push("/home");
      } else {
        if (pathname === "/cambiar-plan") {
          router.push("/cambiar-plan/seleccionar-tipo-pago");
        }

        if (pathname === "/crear-cuenta-distribuidor/planes") {
          router.push("/crear-cuenta-distribuidor/seleccionar-tipo-pago");
        }
      }
    } catch (error) {
      console.error("Error al obtener información del plan");
    }
  }

  return (
    <div>
      <div className="w-72 h-auto text-black shadow-lg">
        <div className="bg-white w-auto h-56 rounded-t-lg p-5 border-2">
          <section className="flex justify-center">
            <h2
              className={`font-bold p-2 rounded-sm text-white ${
                plan.id === 4
                  ? "bg-custom-green"
                  : "box-decoration-slice text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              }`}
            >
              {plan.name}
            </h2>
          </section>
          <section className="flex justify-center mt-8 h-12">
            {plan.discountActive ? (
              <div>
                <DiscountPlanInfo
                  planPrice={plan.price}
                  discountPrice={plan.discountPrice}
                  discountPercentage={plan.dicountPercentage}
                />
              </div>
            ) : (
              <h2 className="font-bold text-2xl">${formatMoney(plan.price)}</h2>
            )}
          </section>
        </div>
        <div className="bg-white flex flex-col justify-center p-5 h-60 rounded-br-lg rounded-bl-lg border-2">
          <div>
            <h2 className="font-bold text-center">Dispositivos compatibles</h2>
            <p>Computadora, teléfono y tablet</p>
          </div>

          <div className="flex justify-center mt-6">
            <ul className="list-image-[url('/images/icons/check.png')]">
              {plan.characteristics.map((characteristic) => (
                <li
                  key={characteristic.feature.id}
                  className="bg-gray-400 px-6 rounded-md w-44 text-center font-bold text-white"
                >
                  {characteristic.feature.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <hr className="text-red-900"></hr>
          </div>
          <div className="mt-1">
            <section className="flex justify-center mt-8">
              <button
                onClick={() => selecPlan(plan.id)}
                className={`w-28 p-2 rounded-md text-white ${
                  plan.id === 4
                    ? "bg-custom-green hover:bg-green-600 w-32"
                    : "bg-custom-green hover:bg-green-600"
                } 
                    ${
                      loading
                        ? "cursor-not-allowed bg-gradient-to-r bg-custom-green to-green-400 animate-pulse"
                        : ""
                    }`}
                disabled={loading || (plan.id === 4 && planFree === "4")}
              >
                {plan.id === 4 && planFree === "4"
                  ? "No disponible"
                  : plan.id === 4
                  ? "Prueba gratis"
                  : "Elegir"}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscountPlanInfo({
  planPrice,
  discountPrice,
  discountPercentage,
}: {
  planPrice: Decimal;
  discountPrice: Decimal;
  discountPercentage: number;
}) {
  const planPriceFormat = formatMoneyString(planPrice.toString());
  const planPriceInt = planPrice as unknown as number;

  const discountPriceDiscountInt = discountPrice as unknown as number;

  const planPriceDiscountFinal = calculateDiscount(
    planPriceInt,
    discountPriceDiscountInt
  );
  const planPriceDiscounFinaltFormat = formatMoneyString(
    planPriceDiscountFinal.toString()
  );

  return (
    <div className="text-center">
      <h2 className="font-bold text-2xl">
        ${planPriceDiscounFinaltFormat} <p className="text-xs">+ IVA</p>
      </h2>
      <h2 className="font-bold text-xs">{discountPercentage}% dcto.</h2>
      <del>
        <h3>${planPriceFormat}</h3>
      </del>
    </div>
  );
}
