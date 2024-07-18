"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

interface RedirectData {
  token: string;
  url: string;
}

export function TransbankPayment() {
  const [redirectData, setRedirectData] = useState<RedirectData | null>(null);

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

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/checkoutTransbank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planInfo: planInfo,
        }),
      });

      if (!res.ok) {
        throw new Error(`error! estado: ${res.status}`);
      }

      const data: RedirectData = await res.json();
      setRedirectData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div>
      {redirectData ? (
        <form action={redirectData.url} method="POST" id="transbank-form">
          <input type="hidden" name="token_ws" value={redirectData.token} />
          <button
            type="submit"
            className="w-40 h-14 border-2 flex justify-center items-center shadow-md p-6 rounded hover:bg-slate-100"
          >
            <img
              src="https://keroscosmetic.cl/wp-content/uploads/2020/12/logo-web-pay-plus.png"
              alt="WebpayTransbank"
            ></img>
          </button>
        </form>
      ) : (
        <div className="w-40 h-14 bg-gradient-to-l from-slate-100 to-slate-300 rounded animate-pulse"></div>
      )}
    </div>
  );
}
