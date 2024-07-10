import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home/:path*",
    "/crear-cuenta-distribuidor/planes",
    "/crear-cuenta-distribuidor/seleccionar-tipo-pago",
    "/crear-cuenta-distribuidor/verificar-email",
    "/cuenta/:path*",
    "/cambiar-contrasena",
    "/cambiar-correo",
    "/cambiar-plan/:path*",
    "/cambiar-tipo-repuestos",
    "/agregar-marcas",
  ],
};

export async function middleware(req) {
  const token = await getToken({ req });

  if(!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  if (!token.emailVerified && !req.nextUrl.pathname.startsWith('/crear-cuenta-distribuidor/verificar-email')) {
    return NextResponse.redirect(new URL('/crear-cuenta-distribuidor/verificar-email', req.url));
  }

  return NextResponse.next();
}
