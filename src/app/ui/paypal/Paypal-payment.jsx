"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function PaypalPayment() {
  //Información del plan seleccionado
  const idPlan = getCookie("idPlan");
  const namePlan = getCookie("namePlan");
  const pricePlan = getCookie("pricePlan");
  const clicks = getCookie("clicksPlan");
  const finalDiscount = getCookie("finalDiscount");

  const planInfo = {
    idPlan,
    namePlan,
    pricePlan,
    clicks,
    finalDiscount,
  };

  const router = useRouter();

  function redirecHome() {
    router.push("/home");
  }

  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        }}
      >
        <PayPalButtons
          createOrder={async () => {
            const res = await fetch("/api/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                planInfo: planInfo,
              }),
            });
            const order = await res.json();
            console.log(order);
            return order.id;
          }}
          onApprove={async (data, actions) => {
            try {
              const orderID = data.orderID;
              const captureDetails = await actions.order.capture();
              console.log("Orden capturada:", captureDetails);

              const res = await fetch("/api/assignPlan", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  planInfo: planInfo,
                }),
              });
              if (res.ok) {
                const response = await fetch("/api/userHistoryPayment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    planInfo: planInfo,
                  }),
                });
              } else {
                const errorMessage = await res.text();
                alert(errorMessage);
              }
            } catch (err) {
              console.log(err);
            }
            redirecHome();
          }}
          onCancel={(data) => {
            console.log(data);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
