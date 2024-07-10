import { HeaderOut } from "../ui/header/Out";
import { PaymentSecurity } from "../ui/payment/Payment-security";
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { setCookie, getCookie, getCookies, deleteCookie, hasCookie } from 'cookies-next';
import { cookies, headers } from 'next/headers';


interface PageProps {
  params: {
    token: string;
  };
  searchParams: {
    token_ws: string;
    TBK_TOKEN: string;
    TBK_ID_SESION: string;
    TBK_ORDEN_COMPRA: string;
  };
}

async function loadToken(
  token_ws: any,
  TBK_TOKEN: any,
  TBK_ID_SESION: any,
  TBK_ORDEN_COMPRA: any
) {

  const requestBody = {
    token_ws: token_ws,
    TBK_TOKEN: TBK_TOKEN,
    TBK_ID_SESION: TBK_ID_SESION,
    TBK_ORDEN_COMPRA: TBK_ORDEN_COMPRA,
  };

  const res = await fetch(
    process.env.NEXT_PLUBLIC_API_URL + "/api/checkoutTransbank",
    {
      method: "PUT",
      body: JSON.stringify(requestBody),
      cache: "no-cache",
    }
  );
  
  const data = await res.json();
  
  const redirecTo = data.redirectTo;
  const authorization = data?.responseTbkToken;
  const response_code = authorization?.response_code;
  const status = authorization?.status;
  
  const jwtPayload = {
    buy_order: authorization?.buy_order,
    amount: authorization?.amount,
    authorization_code: authorization?.authorization_code,
    transaction_date: authorization?.transaction_date,
    payment_type_code: authorization?.payment_type_code,
    installments_number: authorization?.installments_number,
    installments_amount: authorization?.installments_amount,
    card_number: authorization?.card_detail.card_number,
  };

  const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;
  
  if (!SECRET_JWT_KEY) {
    console.log("La firma no es válida porque no hay una clave secreta definida.");

    throw new Error('Clave secreta JWT no definida.');
  }

  const token = jwt.sign(jwtPayload, SECRET_JWT_KEY);

  const idPlan = getCookie("idPlan", { cookies });
  const namePlan = getCookie("namePlan", { cookies });
  const pricePlan = getCookie("pricePlan", { cookies });
  const clicks = getCookie("clicksPlan", { cookies });
  const finalDiscount = getCookie("finalDiscount", { cookies });

  const planInfo = {
    idPlan,
    namePlan,
    pricePlan,
    clicks,
    finalDiscount,
  };

  const customHeaders = new Headers(headers());
  customHeaders.append("Content-Type", "application/json");

  if(redirecTo === "/pago-autorizado" && response_code === 0 && status === "AUTHORIZED"){
    
    const response = await fetch(process.env.NEXT_PLUBLIC_API_URL + "/api/assignPlan", {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify({
        planInfo: planInfo,
      }),
    });
  
    if(response.ok){
      const response = await fetch(process.env.NEXT_PLUBLIC_API_URL + "/api/userHistoryPayment", {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify({
          planInfo: planInfo,
        }),
      });
    }

    redirect(`${redirecTo}?oc=${token}`);
  }

  if(redirecTo === "/pago-autorizado" && response_code !== 0){
    redirect(`${"/pago-anulado"}?oc=${TBK_ORDEN_COMPRA}`);
  }

  if(redirecTo === "/pago-fuera-de-plazo"){
    redirect(`${redirecTo}?oc=${TBK_ORDEN_COMPRA}`);
  }

  if(redirecTo === "/pago-anulado"){
    redirect(`${redirecTo}?oc=${TBK_ORDEN_COMPRA}`);
  }

  return data;
}

async function page({ params, searchParams }: PageProps) {
  const { token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA } = searchParams;

  await loadToken(token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA);

  return (
    <>
      <HeaderOut />
      <div className="min-h-screen bg-white">
        <div className="flex justify-center">
          <section className="flex justify-items-center items-center space-x-5 mt-40">
            <PaymentSecurity/>
          </section>
        </div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <svg
            width="150"
            height="100"
            viewBox="0 0 150 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
          >
            <circle cx="30" cy="50" r="8">
              <animate
                attributeName="cx"
                begin="0s"
                dur="1s"
                values="30;115;30"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="60" cy="50" r="8" fill="white" opacity="0.3">
              <animate
                attributeName="cx"
                begin="0.2s"
                dur="1s"
                values="30;115;30"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="90" cy="50" r="8" fill="white" opacity="0.3">
              <animate
                attributeName="cx"
                begin="0.4s"
                dur="1s"
                values="30;115;30"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>
    </>
  );
}

export default page;
