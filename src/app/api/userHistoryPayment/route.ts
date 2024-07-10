import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toString();

    const user = await prisma.userAccount.findFirst({
      where: {
        email,
      },
    });

    const userSubscription = await prisma.userSubscription.findFirst({
      where: {
        idUser: user?.id,
      },
    });

    const paymentDetails = await prisma.paymentDetail.findMany({
      where: {
        idUserSubscription: Number(userSubscription?.id),
      },
      orderBy: {
        paymentDate: "desc",
      }
    });

    if (!paymentDetails) {
      return NextResponse.json(
        {
          message: "No hay pagos registrados",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(paymentDetails);

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toString();

    const requestBody = await request.json();
    const planInfo = requestBody.planInfo;

    const PriceDiscount = planInfo.finalDiscount;
    let amount = planInfo.pricePlan;
    
    if (PriceDiscount) {
      amount = PriceDiscount
    }

    if(!PriceDiscount){
      amount = amount
    }

    const user = await prisma.userAccount.findUnique({
      where: {
        email,
      },
    });

    const userSubscription = await prisma.userSubscription.findFirst({
      where: {
        idUser: user?.id,
      },
    });

    const paymentDetail = await prisma.paymentDetail.create({
      data: {
        idUserSubscription: Number(userSubscription?.id),
        paymentMethod: "Webpay",
        paymentDate: new Date(),
        paymentDescription: planInfo.namePlan,
        paymentAmount: amount,
      },
    });

    return NextResponse.json(
      {
        message: "Pago registrado exitosamente",
      },
      {
        status: 200,
      }
    );
    
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
