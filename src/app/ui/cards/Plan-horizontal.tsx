import { formatMoneyString } from "@/libs/moneyutils";
import { cookies } from "next/headers";

async function LoadPLan({ planId }: { planId: string }) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/subscriptions/" + planId,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  console.log(data.subscription)
  return data;
}

export async function CardPlanHorizontal({ planId }: { planId: string }) {
  const plan = await LoadPLan({ planId });

  const cookieStore = cookies();

  const namePlan = plan.subscription.name;
  const discountPlan = plan.finaldiscount.toString();
  const pricePlan = plan.subscription.price.toString();

  let finalPrice;

  if (discountPlan) {
    finalPrice = parseFloat(discountPlan);
  } else {
    finalPrice = parseFloat(pricePlan);
  }

  const ivaAmount = finalPrice * 0.19;
  finalPrice = finalPrice + ivaAmount;
  finalPrice = Math.round(finalPrice);
  
  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="bg-slate-400 rounded-t-lg p-3 tex font-bold">
        {namePlan}
      </div>
      <div className="bg-slate-300 rounded-br-lg p-3 rounded-bl-lg flex flex-row justify-between">
        <h1 className="mr-2">Total (IVA Incluido):</h1>
        <h1>{formatMoneyString(finalPrice.toString())}</h1>
      </div>
    </div>
  );
}
