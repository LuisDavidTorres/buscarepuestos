import { formatMoneyString } from "@/libs/moneyutils";
import { cookies } from "next/headers";

export function CardPlanHorizontal() {
  const cookieStore = cookies();

  const namePlan = cookieStore.get("namePlan");
  const discountPlan = cookieStore.get("finalDiscount")?.value.toString();
  const pricePlan = cookieStore.get("pricePlan")?.value.toString();

  let finalPrice;

  if (discountPlan) {
    finalPrice = discountPlan;
  } else {
    finalPrice = pricePlan;
  }

  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="bg-slate-400 rounded-t-lg p-3 tex font-bold">
        {namePlan?.value}
      </div>
      <div className="bg-slate-300 rounded-br-lg p-3 rounded-bl-lg flex flex-row justify-between">
        <h1 className="mr-2">Total:</h1>
        <h1>{formatMoneyString(finalPrice)}</h1>
      </div>
    </div>
  );
}
