import { prisma } from "@/libs/prisma";
import { NextResponse } from 'next/server';
import { NextApiResponse } from "next";
import { headers, cookies } from 'next/headers'
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { WebpayPlus } from 'transbank-sdk';
import { Options, Environment} from 'transbank-sdk';

export async function PUT(request: Request, res: NextApiResponse) {
  try{

    const body = await request.json();

    let token = body.token_ws;
    let tbkToken = body.TBK_TOKEN;

    if (token && !tbkToken) {
      //Caso 1 Autorización aceptada

      const commerceCode = process.env.TBK_API_KEY_ID;
      const apiKeySecret = process.env.TBK_API_KEY_SECRET;
      
      if (!commerceCode || !apiKeySecret) {
        throw new Error('Las credenciales de Transbank no están configuradas correctamente.');
      }

      const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKeySecret, Environment.Production));
      const response = await tx.commit(token);

      return NextResponse.json({ redirectTo: '/pago-autorizado', responseTbkToken: response });

    }else if (!token && !tbkToken){
      //Caso 2 rechazada
      return NextResponse.json({ redirectTo: '/pago-fuera-de-plazo' });

    }else if (!token && tbkToken){
      //Caso 3 pago cancelado por el usuario
      return NextResponse.json({ redirectTo: '/pago-anulado' });

    }else if (token && tbkToken) {
      //Caso 4 El pago es invalido
      return NextResponse.json({ redirectTo: '/pago-autorizado' });

    }
    
    return NextResponse.json(
      {
        message: "Exito al realizar la solicitud",
        
      },
      {
        status: 500,
      }
    );



  }catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Error",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
  
}

export async function POST(request: Request) {
    try{
        const session = await getServerSession(authOptions);
        const email = session?.user?.email?.toString();

        const requestBody = await request.json();
        const planInfo = requestBody.planInfo;
        const PriceDiscount = planInfo.finalDiscount;
        let amount = planInfo.pricePlan;
    
        if (PriceDiscount) {
          amount = parseFloat(PriceDiscount);
        }
    
        if(!PriceDiscount){
          amount = parseFloat(amount);
        }

        const ivaAmount = amount * 0.19;
        amount = amount + ivaAmount;
        amount = Math.round(amount);

        const user = await prisma.userAccount.findUnique({
          where: {
            email: email,
          },
        });
    
        if (!user) throw new Error("usuario no encontrado");

        let buyOrder = "O-" + Math.floor(Math.random() * 10000000) + 1;
        let returnUrl = process.env.NEXT_PLUBLIC_API_URL + "/redireccionar";
        let session_id = user.id.toString();

        const commerceCode = process.env.TBK_API_KEY_ID;
        const apiKeySecret = process.env.TBK_API_KEY_SECRET;
        
        if (!commerceCode || !apiKeySecret) {
          throw new Error('Las credenciales de Transbank no están configuradas correctamente.');
        }
    
        const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKeySecret, Environment.Production));

        const response = await tx.create(buyOrder, session_id , amount, returnUrl);

        console.log(response)

        if(response){
            return NextResponse.json(response)

        }

        return NextResponse.json(
            {
              message: "Transacción de pago creada exitosamente",
            },
            {
              status: 201,
            }
          );

    } catch (error) {
        if (error instanceof Error) {
          return NextResponse.json(
            {
              message: "Error",
              error: error.message,
            },
            {
              status: 500,
            }
          );
        }
    }


}
