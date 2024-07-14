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
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/busca-repuestos-cf287.appspot.com/o/header-logo-large.png?alt=media&token=187cea20-390e-465b-b032-92259ec3c0dd"
          alt="Busca Repuestos"
        />
      </div>
      <div class="desing_down_grey"></div>
      <div class="desing_down_green"></div>
      <div class="content">
        <p>Hola [Nombre del usuario],</p>
        <p>
          Gracias por registrarte en
          <a href="https://www.buscarepuestos.cl">www.buscarepuestos.cl</a>.
          Para completar tu registro y verificar que eres el dueño de la
          dirección de correo electrónico [Dirección de correo electrónico],
        </p>
        <p>Copia el siguiente código en el campo de verificación:</p>
        <p>Tu codigo de verificacion es:</p>
        <div class="contaier_code"><p class="token_code">${token.token}</p></div>
        <p>Este código caducará en 4 horas.</p>
        <p>
          Importante: No compartas este código con nadie más. Este código es
          personal e intransferible.
        </p>
        <p>
          Si tienes algún problema para verificar tu correo electrónico, por
          favor contacta con nuestro equipo de soporte a
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
          <a><?xml version="1.0" encoding="utf-8"?>
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#888"/>
              </svg></a>
          <a href="">
              <?xml version="1.0" encoding="utf-8"?>
              <svg width="20px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#888"/>
              <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#888"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#888"/>
              </svg>
          </a>
          <a href="">
              <?xml version="1.0" encoding="utf-8"?>
              <svg width="24px" height="30px" viewBox="-5 -3 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#888"/>
              </svg>
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
