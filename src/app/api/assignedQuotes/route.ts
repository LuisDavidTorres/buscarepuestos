import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toString();

  try {
    const user = await prisma.userAccount.findFirst({
      where: {
        email: email,
      },
    });

    const quotes = await prisma.userQuotation.findMany({
      where: {
        idUser: user?.id,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        quotation: {
          select: {
            idQuotation: true,
            idCar: true,
            spareName: true,
            spareType: true,
            contactName: true,
            contactNumber: true,
            carBrand: true,
            vehicleYear: true,
            details: true,
            dateQuotation: true,
            images: true,
            city: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!quotes) {
      return NextResponse.json(
        {
          message: "Aun no tienes cotizaciones aceptadas",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(quotes);
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
