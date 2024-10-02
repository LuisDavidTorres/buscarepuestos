import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const idQuotation = params.id;

    const shareQuote = await prisma.quotation.findUnique({
      where: {
        idQuotation: Number(idQuotation),
      },
      include: {
        images: true,
        city: true
      }
    });

    if (!shareQuote) {
      return NextResponse.json(
        {
          messge: "Quotización no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    if (shareQuote) {
      return NextResponse.json(
        {
          message: "Cotizacion encontrada",
          sharedQuote: shareQuote,
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        messge: "Cotización encontrada",
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
