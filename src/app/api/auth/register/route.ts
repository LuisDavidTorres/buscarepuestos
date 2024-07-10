import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { JSDOM } from "jsdom";

export async function GET() {
  try {
    const users = await prisma.userAccount.findMany();
    return NextResponse.json(users);
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
      businessLine,
      contactName,
      email,
      password,
      phoneNumber,
      rubric,
      carBrands,
      idUserType,
    } = await request.json();

    const errors = [];

    const today = new Date().toISOString(); // Get current date in ISO 8601 format

    const userFound = await prisma.userAccount.findUnique({
      where: {
        email: email,
      },
    });

    if (userFound) {
      errors.push({ field: "email", message: "Email no disponible" });
    }

    const companyRutFound = await prisma.company.findUnique({
      where: {
        rut: rutCompany,
      },
    });

    if (companyRutFound) {
      errors.push({
        field: "rutCompany",
        message: "Rut de empresa ya registrado",
      });
    }

    try {
      const res = await fetch("https://zeus.sii.cl/cvc_cgi/nar/nar_ingrut");
      const html = await res.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;
      const companyrut = rutCompany.substring(0, 10).replace(/\./g, "");
      const comnapyRutDv = rutCompany.charAt(rutCompany.length - 1);

      const inputRut = document.querySelector(
        'input[name="RUT"]'
      ) as HTMLInputElement;
      if (inputRut) {
        inputRut.value = companyrut;
      } else {
        console.error(
          'No se encontró ningún input con el nombre "RUT" en el documento.'
        );
      }

      const inputDv = document.querySelector(
        'input[name="DV"]'
      ) as HTMLInputElement;
      if (inputDv) {
        inputDv.value = comnapyRutDv;
      } else {
        console.error(
          'No se encontró ningún input con el nombre "DV" en el documento.'
        );
      }

      const form = document.querySelector('form[name="form1"]') as HTMLFormElement;

      if (form) {
        const formData = new URLSearchParams();
        formData.append("RUT", companyrut);
        formData.append("DV", comnapyRutDv);

        // Añadir otros campos al formulario
        //const otherInputs = form.querySelectorAll("input");
        //otherInputs.forEach((input) => {
        //  if (input.name && input.value) {
        //    formData.append(input.name, input.value);
        //  }
        //});

        const baseUrl = "https://zeus.sii.cl/cvc_cgi/nar/nar_ingrut";
        const formAction = new URL(form.action, baseUrl).href;

        const formRes = await fetch(formAction, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });

        if (formRes.ok) {
          console.log("Formulario enviado exitosamente.");
          const responseText = await formRes.text();
          console.log(responseText);

          if (responseText.includes('<table  border ="1" align="center">')) {
            //return NextResponse.json({message: "Rut registrado en el SII",},{status: 201,});
            console.log("Rut registrado en el SII");
          } else {
            errors.push({
              field: "rutCompany",
              message: "Rut de empresa no valido",
            });
            console.error("Rut de empresa no valido");
          }
        } else {
          console.error(`Error al enviar el formulario: ${formRes.status}`);
        }
      } else {
        console.error(
          'No se encontró ningún formulario con el nombre "form1" en el documento.'
        );
      }
    } catch (error) {
      console.log("Error: " + error);
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.userAccount.create({
      data: {
        email,
        password: hashPassword,
        company: {
          create: {
            name: companyName,
            businessLine,
            phoneNumber: phoneNumber,
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
