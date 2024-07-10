import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { email: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const email = params.email;

    const user = await prisma.userAccount.findUnique({
      where: {
        email: email,
      },
      include: {
        company: true,
        subscription: {
          include: {
            subscription: true,
          },
        },
      },
    });

    const includeCarsIds: number[] = [];

    const userAcceptedCarBrand = await prisma.userQuotation.findMany({
      where: {
        idUser: user?.id,
      },
      include: {
        quotation: {
          select: {
            carBrand: true,
          },
        },
      },
    });

    userAcceptedCarBrand.map((quote) => {
      includeCarsIds.push(quote.quotation.carBrand);
    });

    const userCarBrandAccepted = await prisma.carBrand.findMany({
      where: {
        idCardBrand: {
          in: includeCarsIds,
        },
      },
    });

    const CompanyCardBrands = await prisma.companyCarBrand.findMany({
      where: {
        idCompany: user?.company.id,
      },
      include: {
        car: {
          select: {
            idCardBrand: true,
            nameCarBrand: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ user, CompanyCardBrands, userCarBrandAccepted });
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
