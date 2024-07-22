import { PaymentHistorial } from "@/app/ui/ListComponents/Payment-historial";
import { headers } from "next/headers";

async function loadHistory() {
  const res = await fetch(process.env.NEXT_PLUBLIC_API_URL+"/api/userHistoryPayment", {
    cache: "no-cache",
    headers: headers(),
  });
  const data = await res.json();
  return data;
}

async function Page() {
  const paymentDetails = await loadHistory();

  return (
    <div className="min-h-screen bg-white p-6 rounded-md dark:text-black">
      <h1 className="font-bold text-3xl flex justify-center">Historial de Pagos</h1>
      <div className="mt-10">
        {paymentDetails.length === undefined || paymentDetails ? (
          <p className=" text-gray-500 text-base">Aun no hay pagos registrados</p>
        ) : (
          <PaymentHistorial detailPayment={paymentDetails} />
        )}
      </div>
    </div>
  );
}

export default Page;
