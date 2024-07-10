import { formatDate } from "@/libs/dateUtils";
import { formatMoney } from "@/libs/moneyutils";

export function PaymentHistorial({ detailPayment } : { detailPayment: any[] }) {
  return (
    <>
      <div className="hidden lg:flex mt-10 border-2 justify-between p-2 px-8 rounded-md bg-gray-100 text-base">
        <p className="font-bold flex-1 text-left">Fecha</p>
        <p className="font-bold flex-1 text-left">Monto</p>
        <p className="font-bold flex-1 text-left">Descripción</p>
        <p className="font-bold flex-1 text-left">Método de pago</p>
      </div>

      <ul className="w-full mt-2 space-y-4">
        {detailPayment.map((payment) => (
          <li key={payment.id} className="border-2 rounded-md p-4 bg-white shadow-md">
            <div className="lg:hidden mb-2">
              <p className="text-xs font-bold">Fecha</p>
              <p className="text-xs">{formatDate(payment.paymentDate)}</p>
            </div>
            <div className="lg:hidden mb-2">
              <p className="text-xs font-bold">Monto</p>
              <p className="text-xs">${formatMoney(payment.paymentAmount)}</p>
            </div>
            <div className="lg:hidden mb-2">
              <p className="text-xs font-bold">Descripción</p>
              <p className="text-xs">Plan {payment.paymentDescription}</p>
            </div>
            <div className="lg:hidden mb-2">
              <p className="text-xs font-bold">Método de pago</p>
              <p className="text-xs">{payment.paymentMethod}</p>
            </div>

            <div className="hidden lg:flex justify-between text-base">
              <p className="flex-1 text-left">{formatDate(payment.paymentDate)}</p>
              <p className="flex-1 text-left">${formatMoney(payment.paymentAmount)}</p>
              <p className="flex-1 text-left">Plan {payment.paymentDescription}</p>
              <p className="flex-1 text-left">{payment.paymentMethod}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}


