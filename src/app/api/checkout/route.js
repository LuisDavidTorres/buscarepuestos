import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";
import { getDolarPrice } from "@/libs/moneyutils";

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const envieroment = new paypal.core.LiveEnvironment(clientId, clientSecret);

const client = new paypal.core.PayPalHttpClient(envieroment);

export async function POST(req) {
  try {
    const request = new paypal.orders.OrdersCreateRequest();

    const requestBody = await req.json();
    const planInfo = requestBody.planInfo;
    const PriceDiscount = planInfo.finalDiscount;
    let PricePlan = planInfo.pricePlan;

    if (PriceDiscount) {
      PricePlan = await getDolarPrice(PriceDiscount);
    }

    if(!PriceDiscount){
      PricePlan = await getDolarPrice(PricePlan);
    }

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: "Bolsa de " + planInfo.name,
          amount: {
            currency_code: "USD",
            value: PricePlan,
          },
        },
      ],

      application_context: {
        brand_name: "comercio",
        locale: "es-ES",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
        },
      },
    });

    const response = await client.execute(request);
    console.log(response);

    return NextResponse.json({
      id: response.result.id,
    });
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json(
      {
        error: "Error creating PayPal order",
      },
      { status: 500 }
    );
  }
}
