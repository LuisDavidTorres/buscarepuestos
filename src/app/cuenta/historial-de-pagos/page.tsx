import { PaymentHistorial } from "@/app/ui/ListComponents/Payment-historial";
import { headers } from "next/headers";

async function loadHistory() {
  // Obtener los encabezados de Next.js
  const nextHeaders = headers();

  // Verificar los encabezados
  console.log('Next Headers:', nextHeaders);

  // Crear un nuevo objeto Headers a partir del existente
  const headersConfig = new Headers(nextHeaders);

  // Verificar los encabezados después de crear el nuevo objeto Headers
  console.log('Headers Config:', headersConfig);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userHistoryPayment`, {
      cache: "no-cache",
      headers: headersConfig,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching user history payment:', error);
    return []; // Devolver un arreglo vacío en caso de error para evitar errores en el renderizado
  }
}

async function Page() {
  const paymentDetails = await loadHistory();

  return (
    <div className="min-h-screen bg-white p-6 rounded-md dark:text-black">
      <h1 className="font-bold text-3xl flex justify-center">Historial de Pagos</h1>
      <div className="mt-10">
        {paymentDetails.length === 0 ? (
          <p className="text-gray-500 text-base">Aun no hay pagos registrados</p>
        ) : (
          <PaymentHistorial detailPayment={paymentDetails} />
        )}
      </div>
    </div>
  );
}

export default Page;
