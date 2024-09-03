import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toString();

    const user = await prisma.userAccount.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const company = await prisma.company.findUnique({
      where: {
        id: user?.idCompany,
      },
    });

    if (!company) {
      return NextResponse.json(
        { message: "Compañía no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Compañia encontrada",
        companyStatus: company.verified,
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

export async function POST(request: Request) {
  try {
    const { downloadUrlsDocuments } = await request.json();

    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.toString();

    const user = await prisma.userAccount.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const company = await prisma.company.findUnique({
      where: {
        id: user?.idCompany,
      },
    });

    if (!company) {
      return NextResponse.json(
        { message: "Compañía no encontrada" },
        { status: 404 }
      );
    }

    if (downloadUrlsDocuments) {
      for (const documentsURL of downloadUrlsDocuments) {
        try {
          const CompanyDocuments = await prisma.document.create({
            data: {
              url: documentsURL,
              companyID: Number(company.id),
            },
          });
        } catch {
          console.log("Error al subir los documentos");
        }
      }
    }

    const companyUpdateStatus = await prisma.company.update({
      where: {
        id: user?.idCompany,
      },
      data: {
        verified: 2,
      },
    });

    const File = downloadUrlsDocuments
      .map(
        (url: any, index: any) =>
          `<li><a href="${url}" target="_blank">Documento ${index + 1}</a></li>`
      )
      .join("");

    const { data, error } = await resend.emails.send({
      from: "Busca Repuestos <soporte@buscarepuestos.cl>",
      to: "luisdavid2016@live.com",
      subject: "Solicitud verificación de empresa",
      html: `<p><strong>Información de la empresa:</strong></p>
            <ul style="list-style-type: none; padding: 0;">
              <li><strong>Nombre:</strong> ${company.name}</li>
              <li><strong>Rut:</strong> ${company.rut}</li>
              <li><strong>Giro:</strong> ${company.businessLine}</li>
              <li><strong>Contacto:</strong> ${company.contactName}</li>
            </ul>
            <p><strong>Documentos:</strong></p>
            <ul style="list-style-type: none; padding: 0;">
              ${File}
            </ul>
      `,
    });

    if (error) {
      return NextResponse.json(
        {
          messge: "Erro al enviar el correo de solicitud de verificación",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Documentos enviados correctamente",
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
