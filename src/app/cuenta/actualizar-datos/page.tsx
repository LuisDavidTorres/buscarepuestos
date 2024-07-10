import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-white p-6 w-4/4 md:w-3/4">
      <h1 className="font-bold text-3xl flex justify-center">
        Actualizar Datos
      </h1>
      <div className="rounded-md bg-white h-auto p-2 border-2 mt-10">
        <ul>
          <li className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300">
            <Link href="/cambiar-contrasena">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  role="img"
                  data-icon="LockStandard"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6V7H19C20.1046 7 21 7.89543 21 9V18.6529C21 19.6274 20.2885 20.4855 19.2814 20.6076C18.0287 20.7593 15.492 21 12 21C8.50801 21 5.97128 20.7593 4.71855 20.6076C3.71153 20.4855 3 19.6274 3 18.6529V9C3 7.89543 3.89543 7 5 7H7V6ZM15 6V7H9V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6ZM5 9V18.627C6.19927 18.7708 8.63769 19 12 19C15.3623 19 17.8007 18.7708 19 18.627V9H5ZM11 12V16H13V12H11Z"
                    fill="currentColor"
                  ></path>
                </svg>{" "}
                <p>Actualizar Contraseña</p>
              </div>
            </Link>
          </li>

          <li className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300">
            <Link href="/cambiar-correo">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  width="28"
                  height="28"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-mail"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>

                <p> Actualizar Correo</p>
              </div>
            </Link>
          </li>
          <li className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300">
            <Link href="/agregar-marcas">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  width="28"
                  height="28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-plus-circle flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <p>Agregar o Quitar Marcas de Vehículos</p>
              </div>
            </Link>
          </li>
          <li className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300">
            <Link href="/cambiar-representante">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  fill="none"
                  width="28"
                  height="28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M44 24c0-8-5.7-12-12-12s-12 4-12 12c0 0-1 7 0 11h24c1-4 0-11 0-11z"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M32 36c-6 0-12 3-12 9v6h24v-6c0-6-6-9-12-9z"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>

                <p>Actualizar Representante</p>
              </div>
            </Link>
          </li>
          <li className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300">
            <Link href="/cambiar-telefono">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  width="28"
                  height="28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="6" y="5" width="12" height="14" rx="0" ry="0" />
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <circle cx="12" cy="19" r="1" />
                </svg>

                <p>Actualizar Teléfono</p>
              </div>
            </Link>
          </li>
          <li className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300">
            <Link href="/cambiar-tipo-repuestos">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  width="28"
                  height="28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="8"></line>
                </svg>

                <p>Actualizar Tipo de Repuesto</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
