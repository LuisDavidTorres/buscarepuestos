import { ReturnToTrade } from "../../buttons/Return-to-trade";
import { CiCircleCheck } from "react-icons/ci";
import { formatDate, formatTime } from "@/libs/dateUtils";
import { format_payment_type_code } from "@/libs/payment";
import { formatMoneyInt } from "@/libs/moneyutils";
import { calculateNetPrice } from "@/libs/mathematicalFunctions";

interface PaymentDetails {
  amount: number;
  buy_order: string;
  authorization_code: string;
  transaction_date: string;
  payment_type_code: string;
  installments_number: number;
  installments_amount: number;
  card_number: string;
}

export async function CardSuccessfulPayment({
  details,
}: {
  details: PaymentDetails;
}) {

  const neto = await calculateNetPrice(details.amount);
  const totalQuantity = await details.amount;
  const iva = totalQuantity - neto
  
  return (
    <div className="shadow-md rounded-md border-2 p-5 mt-5">
      <section className="flex justify-center">
        <CiCircleCheck className="text-custom-green text-5xl" />
      </section>
      <h1 className="flex justify-center text-xl sm:text-2xl font-bold mt-2">
        ¡Tu pago se realizó con éxito!
      </h1>
      <p className="flex justify-center mt-5">
        Neto: ${formatMoneyInt(neto)}
      </p>
      <p className="flex justify-center mt-1">
        IVA (19%): {formatMoneyInt(iva)}
      </p>
      <p className="flex justify-center mt-1 font-bold">
        Monto Total: ${formatMoneyInt(totalQuantity)}
      </p>
      <p className="flex justify-center mt-1">
        N°de orden: {details.buy_order}
      </p>
      <p className="flex justify-center mt-1">
        Código de autorización: {details.authorization_code}
      </p>
      <p className="flex justify-center mt-1">
        Fecha de la transacción: {formatDate(details.transaction_date)}
      </p>
      <p className="flex justify-center mt-1">
        Hora de la transacción: {formatTime(details.transaction_date)}
      </p>
      <p className="flex justify-center mt-1">
        Tipo de pago: {format_payment_type_code(details.payment_type_code)}
      </p>
      <p className="flex justify-center mt-1">
        Tipo de cuota: {format_payment_type_code(details.payment_type_code)}
      </p>
      <p className="flex justify-center mt-1">
        Cantidad de cuotas: {details.installments_number}
      </p>
      {details.installments_amount && (
        <p className="flex justify-center mt-1">
          Monto de cuota: {details.installments_amount}
        </p>
      )}
      <p className="flex justify-center mt-1">
        Últimos dígitos de la tarjeta bancaria: {details.card_number}
      </p>
      <p className="flex justify-center mt-1">Medio de pago: Webpay</p>
      <p className="flex justify-center mt-4">
        {/*Descripción de los bienes y/o servicios*/}
      </p>
      <section className="flex justify-center mt-8">
        <ReturnToTrade
          buttonText={"VOLVER A BUSCAREPUESTOS.CL"}
          route="/home"
        />
      </section>
    </div>
  );
}
