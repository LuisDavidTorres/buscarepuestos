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
      include: {
        subscription: true,
      },
    });

    if (user && user.subscription) {
      let subscriptionClicks = user.subscription.reduce((total, sub) => {
        return total + sub.clicks;
      }, 0);
      
      return NextResponse.json(subscriptionClicks);
      
    } else {
      return NextResponse.json(
        {
          message: "No tienes suscripción",
        },
        {
          status: 403,
        }
      );
    }
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
