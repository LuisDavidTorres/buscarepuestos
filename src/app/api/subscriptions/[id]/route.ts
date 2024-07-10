import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { calculateDiscount } from "@/libs/mathematicalFunctions";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        id: parseInt(params.id, 10),
      },
    });

    if (!subscription)
      return NextResponse.json(
        { message: "Suscripción no existe" },
        { status: 404 }
      );

    if (subscription.discountActive === true) {
      const finaldiscount = calculateDiscount(
        subscription.price.toNumber(),
        subscription.discountPrice.toNumber()
      );
      const discountPercentage = subscription.dicountPercentage;

      return NextResponse.json({
        subscription,
        finaldiscount,
        discountPercentage,
      });
    }

    return NextResponse.json({subscription});
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
