import { IoTimeOutline } from "react-icons/io5";
import { ReturnToTrade } from "../../buttons/Return-to-trade";

export function CardLatePayment({purchaseOrder} : {purchaseOrder: string}){
    return(
      <div className="shadow-md rounded-md border-2 p-5 mt-10">
        <section className="flex justify-center">
          <IoTimeOutline className="text-5xl" />
        </section>
        <h1 className="flex justify-center text-2xl font-bold mt-2">Algo salió mal</h1>
        <p className="flex justify-center mt-5">Ha ocurrido un error y no se ha podido procesar el pago.</p>
        <p className="flex justify-center mt-5">tiempo excedido para realizar la transacción.</p>
        <p className="flex justify-center">N°de orden: {purchaseOrder}</p>
        <p className="flex justify-center">Por favor intente nuevamente.</p>
        <section className="flex justify-center mt-8">
          <ReturnToTrade buttonText={"INTENTAR OTRZA VEZ"} route="/cambiar-plan/seleccionar-tipo-pago"/>
        </section>
      </div>
    )
}