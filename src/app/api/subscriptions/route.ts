import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toString();

    const user = await prisma.userAccount.findFirst({
      where: {
        email: email,
      },
    })

    const userHasFreePlan =  user?.hasFreePlan;

    const subscriptions = await prisma.subscription.findMany({
      include: {
        characteristics: {
          include: {
            feature: true,
          },
        },
      },
      where: {
        NOT: {
          // Si el usuario tiene un plan gratuito, no se le mostrará el plan gratuito
          id: userHasFreePlan ? 4 : 0,
        }
      },
      orderBy:{
        id: "desc"
      }
    });
    return NextResponse.json(subscriptions);
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
