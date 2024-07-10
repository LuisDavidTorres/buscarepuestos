import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toString();

  const body = await request.json();
  const idQuotation = body.quoteId;

  try {
    const user = await prisma.userAccount.findFirst({
      where: {
        email: email,
      },
      include: {
        subscription: true,
      },
    });

    if (user?.subscription.length === 0) {
      return NextResponse.json(
        {
          message: "No tienes clicks disponibles",
        },
        {
          status: 404,
        }
      );
    }

    if (user && user.subscription) {
      let subscriptionClicks = user.subscription.map((sub) => sub.clicks);

      if (subscriptionClicks.length === 0) {
        return NextResponse.json(
          {
            message: "No tienes clicks disponibles",
          },
          {
            status: 403,
          }
        );
      }

      if (Number(subscriptionClicks) > 0) {
        subscriptionClicks = subscriptionClicks.map((clicks) => clicks - 1);
        console.log(subscriptionClicks);

        const quotationUser = await prisma.userQuotation.findFirst({
          where: {
            idQuotation: idQuotation,
            idUser: user.id,
          },
        });

        if (quotationUser) {
          return NextResponse.json(
            {
              message: "Ya has aceptado esta cotización",
            },
            {
              status: 403,
            }
          );
        }

        const updatedClicks = await prisma.userSubscription.update({
          where: {
            idUser: user.id,
          },
          data: {
            clicks: Number(subscriptionClicks),
          },
        });

        const updatedQuotation = await prisma.quotation.update({
          where: {
            idQuotation: idQuotation,
          },
          data: {
            clicks: {
              increment: 1,
            },
          },
        });

        const newQuotationUser = await prisma.userQuotation.create({
          data: {
            dateAccepted: new Date(),
            user: { connect: { id: user.id } }, // Connect to existing user
            quotation: { connect: { idQuotation: idQuotation } }, // Connect to existing quotation
          },
        });

        return NextResponse.json(newQuotationUser);
      }
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
