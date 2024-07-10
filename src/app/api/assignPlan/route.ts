import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  revalidatePath('/crear-cuenta-distribuidor/planes');
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toString();

  const requestBody = await request.json();
  const planInfo = requestBody.planInfo;

  try {
    const user = await prisma.userAccount.findFirst({
      where: {
        email: email,
      },
    });

    const userSubscription = await prisma.userSubscription.findFirst({
      where: {
        idUser: user?.id,
      },
    });

    if (!userSubscription) {
      const assignPlan = await prisma.userSubscription.create({
        data: {
          idUser: Number(user?.id),
          idSubscription: Number(planInfo.idPlan),
          clicks: Number(planInfo.clicks),
        },
      });

      if (planInfo.idPlan === 4) {
        const hasFreePLan = await prisma.userAccount.update({
          where: {
            id: user?.id,
          },
          data: {
            hasFreePlan: true,
          },
        });
      }
    }

    if (userSubscription) {
      const updatePlan = await prisma.userSubscription.update({
        where: {
          id: userSubscription.id,
        },
        data: {
          idSubscription: Number(planInfo.idPlan),
          clicks: userSubscription.clicks + Number(planInfo.clicks),
        },
      });

      if (planInfo.idPlan === 4) {
        const hasFreePLan = await prisma.userAccount.update({
          where: {
            id: user?.id,
          },
          data: {
            hasFreePlan: true,
          },
        });
      }
    }

    return NextResponse.json(
      {
        message: "Usuario asignado al plan correctamente",
      },
      {
        status: 201,
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

export async function PUT(request: Request) {
  try {
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
