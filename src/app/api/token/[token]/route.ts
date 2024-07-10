import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";

interface Params {
  params: { token: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const tokenHash = params.token.toString();

    const token = await prisma.token.findUnique({
      where: {
        token: tokenHash,
        createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
        resetAt: null,
      },
    });

    if (!token) {
      console.log("Token invalido");
      return NextResponse.json({ error: "Token invalido" }, { status: 400 });
    }

    return NextResponse.json({ message: "Token valido" }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const tokenHash = params.token.toString();
    const { newPassword } = await request.json();

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const token = await prisma.token.findUnique({
      where: {
        token: tokenHash,
      },
    });

    const updateUser = await prisma.userAccount.update({
      where: {
        id: Number(token?.idUser),
      },
      data: {
        password: hashPassword,
      },
    });

    if (!updateUser) {
      return NextResponse.json(
        { messge: "Error al actualizar la contraseña" },
        { status: 400 }
      );
    }

    const updateToken = await prisma.token.update({
      where: {
        id: token?.id,
      },
      data: {
        resetAt: new Date(),
      },
    });

    if (!updateToken) {
      return NextResponse.json(
        { messge: "Error al actualizar el token" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Contraseña actualizada" },
      { status: 200 }
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
