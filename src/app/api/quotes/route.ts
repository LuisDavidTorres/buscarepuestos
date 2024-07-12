import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  let email: string = ""; // Asignamos un valor predeterminado

  if (session) {
    email = session.user?.email?.toString() ?? ""; // Si es undefined, asignamos un string vacío
    console.log("La sesion esta definida: " + email + " || " + "Verificado: "+session.user?.emailVerified?.toString());
  } else {
    console.log("La sesión no está definida");
  }

  const excludedQuotesId: number[] = [];
  const includeCardBrands: number[] = [];

  try {
    const user = await prisma.userAccount.findFirst({
      where: {
        email: email,
      },
    });

    const CompanyCardBrands = await prisma.companyCarBrand.findMany({
      where: {
        idCompany: user?.idCompany,
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

    const quotesUser = await prisma.userQuotation.findMany({
      where: {
        idUser: user?.id,
      },
    });

    quotesUser.map((quote) => {
      excludedQuotesId.push(quote.idQuotation);
    });

    CompanyCardBrands.map((brand) => {
      includeCardBrands.push(brand.car.idCardBrand);
    });

    const quotes = await prisma.quotation.findMany({
      where: {
        clicks: {
          lt: 3,
        },
        carBrand: {
          in: includeCardBrands,
        },
        NOT: {
          idQuotation: {
            in: excludedQuotesId,
          },
        },
      },
      include: {
        city: true,
        images: true,
      },
      orderBy: {
        idQuotation: "desc",
      },
    });
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

export async function POST(request: Request) {
  try {
    const {
      idCar,
      spareName,
      spareType,
      contactName,
      contactNumber,
      carBrand,
      vehicleYear,
      idCity,
      details,
      available,
      clicks,
      URLs,
    } = await request.json();

    const dateQuotation = new Date().toISOString();

    const newQotation = await prisma.quotation.create({
      data: {
        idCar,
        spareName,
        spareType,
        contactName,
        contactNumber,
        carBrand,
        vehicleYear,
        idCity,
        details,
        dateQuotation,
        available,
        clicks,
      },
    });

    if (URLs) {
      for (const url of URLs) {
        try {
          const newImage = await prisma.imagesQuotation.create({
            data: {
              url,
              idQuotation: newQotation.idQuotation,
            },
          });
          console.log(`Imagen creada satisfactoriamente`);
        } catch (error) {
          console.error(`Error al crear la imagen`);
        }
      }
    }

    return NextResponse.json({ message: "creando" });
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
