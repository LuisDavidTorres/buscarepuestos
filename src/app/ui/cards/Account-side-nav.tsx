import Link from "next/link";

export function AccountSideNav() {
  return (
    <div className="rounded-md bg-white h-full p-4">
      <ul>
        <Link href={"/cuenta"}>
          <li className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300">
            {" "}
            Descripción General
          </li>
        </Link>
        <Link href={"/cuenta/actualizar-datos"}>
          <li className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300">
            Actualizar Datos
          </li>
        </Link>
        <Link href={"/cuenta/historial-de-pagos"}>
          <li className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300">
            Historial de Pagos
          </li>
        </Link>
      </ul>
    </div>
  );
}
