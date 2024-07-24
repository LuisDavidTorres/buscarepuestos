import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { randomUUID } from "crypto";
import { Resend } from "resend";

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
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      },
    });

    const company = await prisma.company.findFirst({
      where: {
        user: user,
      },
    });

    const templeEmail = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      .token_code {
        font-weight: bold;
        font-size: 20px;
      }
      .contaier_code {
        text-align: center;
      }
      .header {
        text-align: center;
        padding-bottom: 1px;
        background-color: white;
        padding-top: 10px;
      }
      .desing_down_grey {
        background-color: #454444;
        height: 20px;
      }
      .desing_down_green {
        background-color: #4caf50;
        height: 10px;
      }
      .header img {
        max-width: 200px;
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
      .li{
       
        justify-items: center;
      }
      .li a {
        margin-right: 10px; 
      }
      .li a:last-child {
        margin-right: 0; 
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/busca-repuestos-cf287.appspot.com/o/header-logo-large.png?alt=media&token=187cea20-390e-465b-b032-92259ec3c0dd"
          alt="Busca Repuestos"
          width="300"
          height="auto"
        />
      </div>
      <div class="desing_down_grey"></div>
      <div class="desing_down_green"></div>
      <div class="content">
        <p>Hola ${company?.contactName},</p>
        <p>
          Recibimos una solicitud para restablecer la contraseña de tu cuenta de
          <a href="https://www.buscarepuestos.cl">www.buscarepuestos.cl</a>. Si
          tú fuiste quien solicitó este cambio, haz clic en el siguiente enlace
          para crear una nueva contraseña:
        </p>
        <p><a href="${process.env.NEXTAUTH_URL}/restablecer-contrasena/${token.token}">Restablecer Contraseña</a></p>
        <p>Este código caducará en 2 horas.</p>
        <p>
          Si no solicitaste este cambio de contraseña, ignora este correo
          electrónico. Tu contraseña actual seguirá siendo la misma.
        </p>
        <p>
          Si tienes algún problema para restablecer tu contraseña, por favor
          contacta con nuestro equipo de soporte a
          <a href="mailto:soporte@buscarepuestos.cl"
            >soporte@buscarepuestos.cl</a
          >
        </p>
      </div>
      <div class="footer">
        <p>Saludos,</p>
        <p>Equipo BuscaRepuestos</p>
        <p><a href="https://www.buscarepuestos.cl">www.buscarepuestos.cl</a></p>
        <section class="li">
          <a href="#">
            <img src="https://firebasestorage.googleapis.com/v0/b/busca-repuestos-cf287.appspot.com/o/whatsApp-icon.png?alt=media&token=0fbdbc81-2a5e-4b03-9bff-39830b937344" width="30" height="30" alt="whatsApp-icon" />
          </a>
          <a href="#">
            <img src="https://firebasestorage.googleapis.com/v0/b/busca-repuestos-cf287.appspot.com/o/instagram-icon.png?alt=media&token=7924ba5e-b308-47d9-8252-d58da8845f9d" width="30" height="30" alt="instagram-icon" />
          </a>
          <a href="#">
            <img src="https://firebasestorage.googleapis.com/v0/b/busca-repuestos-cf287.appspot.com/o/facebook-icon.png?alt=media&token=99297723-ba3c-47b1-bbd0-812c9657c39f" width="30" height="30" alt="facebook-icon" />
          </a>
        </section>
      </div>
    </div>
  </body>
</html>

  `;

    const { data, error } = await resend.emails.send({
      from: "Acme <soporte@buscarepuestos.cl>",
      to: email,
      subject: "Restablecer contraseña para tu cuenta de Busca Repuestos",
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
