import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { email: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const email = params.email;

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
