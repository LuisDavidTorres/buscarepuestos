import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    revalidatePath("/cuenta");
    const { carBrands } = await request.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toString();

    const user = await prisma.userAccount.findUnique({
      where: {
        email,
      },
    });

    // Eliminar las asociaciones actuales de la empresa con las marcas de autos
    const deleteCarBrand = await prisma.companyCarBrand.deleteMany({
      where: {
        idCompany: user?.idCompany,
      },
    });

    // Crear las nuevas asociaciones de la empresa con las marcas de autos
    const newAssociations = carBrands.map((carBrandId: number) => ({
      idCompany: user?.idCompany,
      idCar: carBrandId,
      assignment: new Date(),
    }));

    const addCarBrand = await prisma.companyCarBrand.createMany({
      data: newAssociations,
    });

    return NextResponse.json(
      {
        message: "Marcas actualizadas correctamente",
      },
      {
        status: 200,
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

export async function PATCH(request: Request) {
  try {
    const { password, newRepresentative, newPhoneNumber, newSpareType } =
      await request.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toString();

    const user = await prisma.userAccount.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error("usuario no encontrado");

    const matchPassword = await bcrypt.compare(password, user?.password);

    if (!matchPassword) {
      return NextResponse.json(
        {
          message: "Contraseña incorrecta",
        },
        {
          status: 400,
        }
      );
    }

    if (matchPassword && newRepresentative) {
      await prisma.company.update({
        where: {
          id: user?.idCompany,
        },
        data: {
          contactName: newRepresentative,
        },
      });
    }

    if (matchPassword && newPhoneNumber) {
      await prisma.company.update({
        where: {
          id: user?.idCompany,
        },
        data: {
          phoneNumber: newPhoneNumber,
        },
      });
    }

    if (matchPassword && newSpareType) {
      await prisma.company.update({
        where: {
          id: user?.idCompany,
        },
        data: {
          rubric: newSpareType,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Representante actualizado correctamente",
      },
      {
        status: 200,
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
