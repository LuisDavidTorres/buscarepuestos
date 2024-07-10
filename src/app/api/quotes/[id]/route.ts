import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const idQuotation = params.id;

    const quote = await prisma.userQuotation.findFirst({
      where: {
        id: Number(idQuotation),
      },
      include: {
        quotation: {
          select: {
            city: {
              select: {
                name: true,
              },
            },
            idQuotation: true,
            idCar: true,
            carBrand: true,
            vehicleYear: true,
            spareName: true,
            details: true,
            dateQuotation: true,
            spareType: true,
            contactName: true,
            contactNumber: true,
          },
        },
      },
    });

    const images = await prisma.imagesQuotation.findMany({
      where: {
        idQuotation: Number(quote?.quotation.idQuotation),
      },
    });

    if (!images) {
      return NextResponse.json(
        {
          message: "No se encontraron imagenes",
        },
        {
          status: 404,
        }
      );
    }

    if (!quote) {
      return NextResponse.json(
        {
          message: "No se encontro la cotización",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ quote: quote, images: images });
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

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id, price, sellerPhone, sellerName, sellerLastName } = await request.json();

    const updatedQuote = await prisma.userQuotation.update({
      where: {
        id: Number(params.id),
      },
      data: {
        price,
        sellerPhone,
        sellerName,
        sellerLastName,
        sent: true,
      },
    });

    return NextResponse.json(
      {
        message: "Cotización actualizada",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "No se encontro la cotización",
          },
          {
            status: 404,
          }
        );
      }

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
