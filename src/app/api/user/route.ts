import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    //const users = await prisma.userAccount.findMany();
    //return NextResponse.json(users);
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
      companyName,
      rutCompany,
      contactName,
      email,
      password,
      areaCode,
      phoneNumber,
      rubric,
      carBrands,
      idUserType,
    } = await request.json();

    const fullContactNumber = `${areaCode}${phoneNumber}`;

    const today = new Date().toISOString();

    const userFound = await prisma.userAccount.findUnique({
      where: {
        email: email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email no disponible",
        },
        {
          status: 400,
        }
      );
    }

    const companyRutFound = await prisma.company.findUnique({
      where: {
        rut: rutCompany,
      },
    });

    if (companyRutFound) {
      return NextResponse.json(
        {
          message: "Rut de empresa ya registrado",
        },
        {
          status: 400,
        }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.userAccount.create({
      data: {
        email,
        password: hashPassword,
        company: {
          create: {
            name: companyName,
            phoneNumber: fullContactNumber,
            contactName,
            rut: rutCompany,
            rubric,
            carsBrand: {
              create: carBrands.map((brandId: number) => ({
                assignment: today,
                car: {
                  connect: {
                    idCardBrand: brandId,
                  },
                },
              })),
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Usuario creado exitosamente",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Error al crear usuario",
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toString();
  const { password, newPassword, newEmail } = await request.json();

  try {
    const user = await prisma.userAccount.findUnique({
      where: {
        email: email,
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

    if (matchPassword && newPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 10);

      await prisma.userAccount.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashPassword,
        },
      });

      return NextResponse.json(
        {
          message: "Contraseña actualizada correctamente",
        },
        {
          status: 200,
        }
      );
    }

    if (matchPassword && newEmail) {
      const UserEmailExist = await prisma.userAccount.findUnique({
        where: {
          email: newEmail,
        },
      });

      if (UserEmailExist) {
        return NextResponse.json(
          {
            message: "Email ya registrado",
          },
          {
            status: 409,
          }
        );
      }

      if (!UserEmailExist) {
        await prisma.userAccount.update({
          where: {
            id: user.id,
          },
          data: {
            email: newEmail,
          },
        });

        return NextResponse.json(
          {
            message: "Correo actualizado correctamente",
          },
          {
            status: 200,
          }
        );
      }
    }

    return NextResponse.json({
      message: "Datos actualizados correctamente",
    });
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
