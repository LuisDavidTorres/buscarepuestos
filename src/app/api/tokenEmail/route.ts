import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Resend } from "resend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.userAccount.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const token = await prisma.token.create({
      data: {
        idUser: Number(user?.id),
        token: Math.floor(100000 + Math.random() * 900000).toString(),
      },
    });

    const templeEmail = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
          }
          .header img {
            max-width: 150px;
          }
          .content {
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            color: #888;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://firebasestorage.googleapis.com/v0/b/busca-repuestos-cf287.appspot.com/o/logo-center-header.png?alt=media&token=5dd32602-5908-48a1-b749-5bebefe22023" alt="Busca Repuestos">
          </div>
          <div class="content">
            <p>Hola querido usuario de busca repuestos,</p>
            <p>Tu codigo de verificacion es ${token.token}</p>
          </div>
          <div class="footer">
            <p>Atentamente,</p>
            <p>El equipo de Busca Repuestos</p>
            <p><a href="https://www.buscarepuestos.cl">www.buscarepuestos.cl</a></p>
            <p>Si necesitas ayuda, contáctanos en <a href="mailto:soporte@buscarepuestos.cl">soporte@buscarepuestos.cl</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Acme <soporte@buscarepuestos.cl>",
      to: email,
      subject: "Código para verificar tu cuenta de Busca Repuestos",
      html: templeEmail,
    });

    if (error) {
      return NextResponse.json(
        { message: "Error al enviar el correo" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Correo enviado" }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toString();
    const { token } = await request.json();

    const user = await prisma.userAccount.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const userToken = await prisma.userAccount.findFirst({
      where: {
        id: Number(user?.id),
        token: {
          every: {
            createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
            token: token,
            resetAt: null,
          },
        },
      },
    });

    if (!userToken) {
      return NextResponse.json({ message: "Token invalido" }, { status: 400 });
    }

    const userVerified = await prisma.userAccount.update({
      where: {
        id: Number(user?.id),
      },
      data: {
        emailVerified: true,
      },
    });

    const tokenUser = await prisma.token.findFirst({
      where: {
        idUser: Number(user?.id),
        createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
        token: token,
        resetAt: null,
      },
    });

    const updateToken = await prisma.token.update({
      where: {
        id: Number(tokenUser?.id),
      },
      data: {
        resetAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Usuario verificado" },
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
