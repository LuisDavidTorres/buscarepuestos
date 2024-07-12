import { FaArrowLeft } from "react-icons/fa6";
import Header from "../ui/header/Header";
import { DesingHeaderDown } from "../ui/header/Desing-header-down";
import Link from "next/link";

export default function PrivacyPolicies() {
  return (
    <>
      <Header />
      <DesingHeaderDown titulo="TÉRMINOS Y CONDICIONES - POLÍTICAS DE PRIVACIDAD" />
      <div className="bg-white min-h-screen">
        <div className="flex flex-row items-center mb-5 space-x-2 px-5 py-5 md:px-36 md:py-10">
          <FaArrowLeft />
          <Link href="/" className="no-underline hover:underline">
            Volver a la pagina de inicio
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-10/12 shadow-xl p-10 rounded-md mb-5">
            <h1 className="text-2xl sm:text-3xl mb-4 font-bold">
              Términos y Condiciones de Uso y Política de Privacidad
              BuscaRepuestos.cl
            </h1>
            <p className="text-base leading-normal mt-10">
              Bienvenidos a BuscaRepuestos.cl, una plataforma de intermediación
              en línea que conecta a Distribuidores y Clientes Buscadores de
              repuestos automotrices. Al acceder y utilizar nuestros servicios,
              usted acepta cumplir con los siguientes términos y condiciones que
              rigen el uso de nuestro sitio web.
            </p>
            <p className="mt-2">
              Si no está de acuerdo con alguno de los términos aquí expuestos,
              le sugerimos reconsiderar el uso de la plataforma
              BuscaRepuestos.cl.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              1. Definición del Servicio
            </h1>
            <p className="mb-4">
              Nuestra plataforma está diseñada para conectar a Distribuidores de
              repuestos automotrices. BuscaRepuestos.cl es una plataforma web
              que conecta eficientemente a Distribuidores de repuestos
              automotrices con Clientes Buscadores, facilitando la búsqueda y
              adquisición de repuestos de manera eficiente y segura. A través
              del sitio web, se ofrecen las siguientes funcionalidades:
            </p>
            <div className="space-y-4 pl-5">
              <p>
                <strong>
                  1. Conexión entre Distribuidores y Clientes Buscadores:
                </strong>{" "}
                Los Clientes Buscadores llenan solicitudes de cotización en la
                plataforma, las cuales se almacenan para que los Distribuidores
                puedan acceder al universo de cotizaciones generadas para las
                marcas de vehículos que comercializan. Los Distribuidores pueden
                entonces responder con sus ofertas y concretar la venta
                directamente con el Cliente Buscador.
              </p>
              <p>
                <strong>2. Búsqueda y Generación de Cotizaciones:</strong> Los
                Clientes Buscadores ingresan los datos de su vehículo y el tipo
                de repuesto que requieren (Original, Alternativo o Ambos) en un
                formulario. La plataforma genera y almacena cotizaciones para
                los Distribuidores que ofrecen ese tipo de repuesto, permitiendo
                a los Distribuidores acceder al universo de cotizaciones
                generadas para las marcas que ellos comercializan.
              </p>
              <p>
                <strong>3. Notificaciones:</strong> Cuando se genera una
                cotización, la plataforma envía un mensaje al Cliente Buscador
                notificando que su solicitud ha sido recibida.
              </p>
              <p>
                <strong>
                  4. Acceso a Cotizaciones para Distribuidores Registrados:
                </strong>{" "}
                Los Distribuidores registrados en la plataforma, que hayan
                ingresado sus datos y el tipo de repuestos que comercializan
                (Original, Alternativo o Ambos), tendrán acceso a las
                cotizaciones generadas por Cliente Buscador. Al comprar
                &quot;bolsas virtuales&quot;, los Distribuidores obtendrán
                acceso a este conjunto de cotizaciones.
              </p>
              <p>
                <strong>5. Descuento de Cotizaciones:</strong> Cuando un
                Distribuidor hace &quot;match&quot; con una cotización, se le
                descuenta automáticamente una cotización de la bolsa virtual
                comprada.
              </p>
              <p>
                <strong>6. Coincidencia de Cotizaciones:</strong> La plataforma
                detecta automáticamente cuando un Distribuidor hace
                &quot;match&quot; con una cotización. En ese momento, la
                cotización se elimina del sistema y el Cliente Buscador recibe
                hasta 3 cotizaciones de diferentes Distribuidores.
              </p>
              <p>
                <strong>7. Posicionamiento en Buscadores:</strong>{" "}
                BuscaRepuestos.cl está diseñada para estar bien posicionada en
                los motores de búsqueda, brindando una solución efectiva para
                que los Clientes Buscadores encuentren los repuestos que
                necesitan. El objetivo es facilitar el proceso de búsqueda y
                adquisición de repuestos automotrices, conectando eficientemente
                a Clientes Buscadores y Distribuidores a través de nuestra
                innovadora plataforma.
              </p>
            </div>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              2. Registro y Verificación de Usuarios
            </h1>
            <p className="mb-4">
              Los usuarios Distribuidores deben registrarse y crear una cuenta
              en la plataforma BuscaRepuestos.cl, proporcionando la siguiente
              información:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Rut de la Empresa</li>
              <li>Nombre completo del Representante Legal o Responsable</li>
              <li>
                Número de teléfono celular del Representante Legal o Responsable
              </li>
              <li>Correo electrónico del Representante Legal o Responsable</li>
              <li>Contraseña</li>
              <li>Información sobre los repuestos que ofrecen</li>
            </ul>
            <p className="mb-4">
              <strong>Registro de Usuarios Buscadores</strong>
            </p>
            <p className="mb-4">
              Los usuarios buscadores deben llenar un formulario proporcionado y
              creado por la plataforma BuscaRepuestos.cl, incluyendo los
              siguientes datos relevantes:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Nombre completo</li>
              <li>Información del vehículo</li>
              <li>Tipo de repuesto solicitado</li>
            </ul>
            <p className="mb-4">
              <strong>
                Verificación de Identidad para Usuarios Distribuidores
              </strong>
            </p>
            <p className="mb-4">
              Luego del registro, los datos proporcionados por los usuarios
              Distribuidores deben ser verificados para garantizar la seguridad
              y confiabilidad de la plataforma. Este proceso de verificación
              puede incluir:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-5">
              <li>Confirmación de correo electrónico</li>
              <li>Código Verificador</li>
              <li>Validación de número de teléfono celular</li>
              <li>Envío de documentos si fuese necesario</li>
            </ul>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              3. Responsabilidades del Usuario
            </h1>
            <p className="mb-4">
              Al utilizar la plataforma BuscaRepuestos.cl, todos los usuarios
              (Distribuidores y Clientes Buscadores) se comprometen a:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Proporcionar información precisa y actualizada.</li>
              <li>
                Utilizar la plataforma de manera responsable, ética y
                respetuosa.
              </li>
              <li>
                Respetar los derechos de propiedad intelectual de terceros.
              </li>
              <li>No realizar actividades ilegales o fraudulentas.</li>
              <li>
                Proteger la confidencialidad de su información personal y la de
                otros usuarios.
              </li>
              <li>Cumplir con todas las leyes y regulaciones aplicables.</li>
            </ul>
            <p className="mb-4">
              <strong>
                Adicionalmente, los Distribuidores tienen responsabilidades
                específicas:
              </strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Proporcionar información precisa sobre los repuestos que
                ofrecen.
              </li>
              <li>
                Atender las solicitudes de los clientes de manera oportuna y
                eficiente.
              </li>
              <li>
                Cumplir con los plazos de entrega y las condiciones de venta.
              </li>
              <li>Garantizar la calidad de los repuestos que comercializan.</li>
              <li>Realizar los pagos de manera oportuna y segura.</li>
            </ul>
            <p className="mb-4">
              <strong>
                Por su parte, los Clientes Buscadores tienen la responsabilidad
                de:
              </strong>
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Utilizar la plataforma para fines lícitos y legítimos.</li>
              <li>
                Brindar información precisa sobre sus necesidades de repuestos..
              </li>
              <li>Comunicarse de manera respetuosa con el Distribuidor.</li>
            </ul>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4">4. Modelo Económico</h1>
            <p className="mb-4">
              <strong>Venta de Bolsas Virtuales de Cotizaciones</strong>
            </p>
            <p className="mb-4">
              El modelo económico de BuscaRepuestos.cl se basa en la venta de
              bolsas virtuales de cotizaciones a los Distribuidores. Estas
              bolsas virtuales se ofrecen en diferentes opciones:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Bolsa Virtual 1</li>
              <li>Bolsa Virtual 2</li>
              <li>Bolsa Virtual 3</li>
            </ul>
            <p className="mb-4">
              <strong>Asociación de Pagos a Compra de Bolsas Virtuales</strong>
            </p>
            <p>
              Los pagos realizados por los distribuidores estarán asociados a la
              compra de estas Bolsas Virtuales de Cotizaciones.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">5. Pagos</h1>
            <p className="mb-4">
              <strong>Plataforma de Pagos Segura Webpay</strong>
            </p>
            <p className="mb-4">
              BuscaRepuestos.cl ofrece a los distribuidores la plataforma de
              pagos segura Webpay, la cual permite diversos métodos de pago en
              línea, como:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Tarjetas de crédito</li>
              <li>Tarjetas de débito</li>
              <li>Tarjetas prepago</li>
            </ul>
            <p className="mb-4">
              <strong>
                Asociación de Pagos a Compra de Bolsas de Cotizaciones
              </strong>
            </p>
            <p className="mb-4">
              Los pagos realizados a través de Webpay estarán asociados a la
              compra de bolsas virtuales de cotizaciones por parte de los
              Distribuidores. El Distribuidor deberá efectuar el pago en el
              momento de la compra de la bolsa de cotizaciones seleccionada.
            </p>
            <p className="mb-4">
              <strong>
                Elección del Método de Pago por Parte del Distribuidor
              </strong>
            </p>
            <p className="mb-4">
              No obstante, la decisión final sobre el método de pago a utilizar
              será del propio Distribuidor. BuscaRepuestos.cl pone a disposición
              la plataforma Webpay, pero no impone un método de pago específico.
              Esto se debe a que los términos y condiciones de estos pagos están
              definidos en la propia plataforma de pago Webpay, y no por
              BuscaRepuestos.cl.
            </p>
            <p className="mb-4">
              <strong>
                Responsabilidad del Distribuidor en el Proceso de Pago
              </strong>
            </p>
            <p>
              Si bien BuscaRepuestos.cl facilita Webpay como solución de pago,
              la elección del método de pago queda a criterio exclusivo del
              Distribuidor, de acuerdo a los términos y condiciones establecidos
              por la plataforma de pagos Webpay. El Distribuidor deberá realizar
              el pago al momento de adquirir una bolsa virtual de cotizaciones,
              según los acuerdos establecidos en la plataforma de pagos Webpay.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              6. Privacidad y Confidencialidad
            </h1>
            <p className="mb-4">
              En BuscaRepuestos.cl, nos comprometemos a proteger la privacidad y
              confidencialidad de la información personal de nuestros usuarios.
              Únicamente divulgaremos información cuando:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Sea requerido por ley o por orden judicial competente.</li>
              <li>
                Sea necesario para proteger los derechos, la propiedad y la
                seguridad de nuestra plataforma y nuestros usuarios.
              </li>
            </ul>
            <p className="mb-4">
              <strong>Medidas de Seguridad</strong>
            </p>
            <p className="mb-4">
              Implementamos sólidas medidas de seguridad para salvaguardar la
              información personal contra pérdida, robo o acceso no autorizado,
              incluyendo:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Cifrado de datos</li>
              <li>Controles de acceso estrictos</li>
              <li>Monitoreo y detección de actividades sospechosas</li>
            </ul>
            <p className="mb-4">
              Nuestro personal autorizado está sujeto a obligaciones de
              confidencialidad y nuestras medidas de seguridad se revisan y
              actualizan periódicamente.
            </p>
            <p className="mb-4">
              En caso de que ocurra una brecha de seguridad que pueda
              comprometer los datos personales de nuestros usuarios,
              BuscaRepuestos.cl notificará de manera oportuna.
            </p>
            <p>
              Si tienes alguna pregunta o inquietud sobre nuestra política de
              privacidad y seguridad, no dudes en contactarnos a través de{" "}
              <a
                href="mailto:contacto@buscarepuestos.cl"
                className="text-blue-500 hover:underline"
              >
                contacto@buscarepuestos.cl
              </a>
              .
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              7. Duración del Servicio
            </h1>
            <p className="mb-4">
              BuscaRepuestos.cl conecta a distribuidores de repuestos
              automotrices con los usuarios buscadores de manera indefinida.
            </p>
            <p className="mb-4">
              El uso de la plataforma web de BuscaRepuestos.cl por parte de los
              distribuidores tiene una duración indefinida. Sin embargo,
              cualquiera de los Distribuidores puede terminar el servicio con un
              aviso previo de 30 días. La terminación del servicio implica la
              cancelación de la cuenta del distribuidor y la eliminación de su
              información personal.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4">
              8. Modificaciones del Acuerdo
            </h1>
            <p className="mb-4">
              BuscaRepuestos.cl se reserva el derecho de modificar estos
              términos y condiciones en cualquier momento.
            </p>
            <p className="mb-4">
              Las modificaciones tendrán efecto inmediatamente después de su
              publicación en el sitio web.
            </p>
            <p className="mb-4">
              BuscaRepuestos.cl notificará a los usuarios distribuidores sobre
              cualquier cambio en los términos y condiciones a través de correo
              electrónico o mediante un aviso en el sitio web. Por lo tanto, los
              usuarios distribuidores deben revisar periódicamente el sitio web
              y estar atentos a las comunicaciones de BuscaRepuestos.cl para
              mantenerse informados sobre cualquier actualización o modificación
              de estos términos.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4">9. Ley Aplicable</h1>
            <p className="mb-4">
              Este acuerdo entre BuscaRepuestos.cl y los usuarios distribuidores
              se regirá exclusivamente por las leyes de la República de Chile.
            </p>
            <p>
              Cualquier disputa, conflicto o controversia que surja en relación
              con este acuerdo será resuelta de conformidad con la legislación
              chilena.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              10. Resolución de Disputas
            </h1>
            <p className="mb-4">
              En caso de que surjan disputas entre BuscaRepuestos.cl y los
              usuarios Distribuidores, las partes acuerdan intentar resolverlas
              de manera colaborativa a través de la mediación.
            </p>
            <p>
              Si la mediación no tiene éxito, las disputas se resolverán
              mediante un proceso de arbitraje de conformidad con las reglas
              establecidas por el Centro de Arbitraje y Mediación de la Cámara
              de Comercio de Santiago. La decisión arbitral será definitiva y de
              obligatorio cumplimiento para ambas partes.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              11. Uso del Sitio Web
            </h1>
            <p className="mb-4">
              Los usuarios deben abstenerse de realizar actividades que puedan
              dañar la integridad del sitio web o la plataforma
              BuscaRepuestos.cl. Estas actividades prohibidas incluyen:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Enviar spam o contenido malicioso</li>
              <li>Realizar ataques cibernéticos</li>
              <li>Utilizar software malicioso</li>
              <li>Infringir derechos de propiedad intelectual</li>
            </ul>
            <p>
              BuscaRepuestos.cl se reserva el derecho de suspender o cancelar la
              cuenta de cualquier usuario que incumpla estos términos y
              condiciones. Además, la plataforma podrá iniciar acciones legales
              si fuera necesario.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              12. Propiedad Intelectual
            </h1>
            <p className="mb-4">
              BuscaRepuestos.cl se reserva todos los derechos de propiedad
              intelectual sobre la plataforma y su contenido.
            </p>
            <p className="mb-4">
              Debido a esta protección, los usuarios no pueden utilizar el
              contenido de la plataforma sin contar con el consentimiento previo
              y por escrito de BuscaRepuestos.cl.
            </p>
            <p>
              Los usuarios deben obtener la autorización expresa de
              BuscaRepuestos.cl antes de hacer cualquier uso del contenido, ya
              que éste se encuentra protegido por propiedad intelectual.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">13. Fuerza Mayor</h1>
            <p className="mb-4">
              BuscaRepuestos.cl no será responsable por incumplimientos causados
              por eventos de fuerza mayor fuera de su control, como desastres
              naturales, conflictos bélicos u otros acontecimientos
              extraordinarios.
            </p>
            <p className="mb-4">
              Estos eventos de fuerza mayor podrían interrumpir temporalmente la
              prestación de los servicios de la plataforma.
            </p>
            <p>
              En caso de consultas, los usuarios pueden contactar al soporte de
              BuscaRepuestos.cl a la dirección{" "}
              <a
                href="mailto:soporte@buscarepuestos.cl"
                className="text-blue-500 hover:underline"
              >
                soporte@buscarepuestos.cl
              </a>
              .
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              14. Limitación de Responsabilidad
            </h1>
            <p className="mb-4">
              BuscaRepuestos.cl actúa como un intermediario que facilita el
              contacto entre Clientes Buscadores de repuestos y Distribuidores,
              pero no es parte de las transacciones comerciales que puedan
              realizarse entre ellos.
            </p>
            <p className="mb-4 font-bold">
              En ese sentido, BuscaRepuestos.cl no se responsabiliza por:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Errores u omisiones en las cotizaciones proporcionadas por los
                Distribuidores. Los Clientes Buscadores deben verificar la
                información y negociar directamente con el Distribuidor de su
                elección.
              </li>
              <li>
                Incumplimientos, demoras o problemas que puedan surgir en la
                coordinación y ejecución de las compraventas acordadas entre
                Clientes Buscadores y Distribuidores.
              </li>
              <li>
                La calidad, estado, funcionalidad o idoneidad de los repuestos
                ofrecidos por los Distribuidores. Esto es responsabilidad
                exclusiva de cada Distribuidor.
              </li>
            </ul>
            <p className="mb-4">
              BuscaRepuestos.cl cuenta con sistemas de seguridad y validación
              para mitigar la posibilidad de información falsa, engañosa o
              ilegal proporcionada por los usuarios en sus perfiles o
              cotizaciones. Sin embargo, no puede garantizar al 100% la
              exactitud y veracidad de toda la información ingresada.
            </p>
            <p className="mb-4">
              Adicionalmente, en caso de problemas técnicos o fallas en la
              plataforma que impidan el acceso de los Distribuidores a las
              &quot;bolsas virtuales&quot; de cotizaciones que hayan adquirido,
              la responsabilidad de BuscaRepuestos.cl se limitará únicamente a
              reembolsar los montos pagados por los Distribuidores en la fecha
              específica en que ocurrió el incidente, sin extenderse a pagos
              realizados en otros días.
            </p>
            <p>
              BuscaRepuestos.cl proporciona una plataforma y herramientas para
              facilitar el contacto entre las partes, pero no interviene ni
              controla las negociaciones y acuerdos comerciales que puedan
              establecerse entre ellas. Cada usuario es responsable de sus
              propias decisiones y actuaciones.
            </p>
            <p className="mt-4">
              Para más información, contáctanos a{" "}
              <a
                href="mailto:contacto@buscarepuestos.cl"
                className="text-blue-500 hover:underline"
              >
                contacto@buscarepuestos.cl
              </a>
              .
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">15. Notificaciones</h1>
            <p className="mb-4">
              Todas las notificaciones y comunicaciones entre BuscaRepuestos.cl
              y los usuarios Distribuidores se realizarán por correo electrónico
              o mediante un aviso publicado en el sitio web.
            </p>
            <p className="mb-4">
              BuscaRepuestos.cl utilizará el correo electrónico o publicaciones
              en su sitio web para enviar todas las notificaciones y
              comunicaciones dirigidas a los Distribuidores que utilicen las
              &quot;bolsas virtuales&quot; bolsas virtuales.
            </p>
            <p>
              No se realizarán notificaciones por otros medios, por lo que los
              Distribuidores deberán estar atentos a su correo electrónico y al
              sitio web de BuscaRepuestos.cl para estar informados de cualquier
              notificación o comunicación relevante.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              16. Cesión de Acceso a Bolsas Virtuales
            </h1>
            <p className="mb-4">
              El acceso a las &quot;bolsas virtuales&quot; de cotizaciones es
              intransferible. La cesión del acceso a terceros es responsabilidad
              exclusiva del Distribuidor. BuscaRepuestos.cl no interviene ni se
              responsabiliza por estas acciones.
            </p>
            <p className="mb-4 font-bold">
              Para que BuscaRepuestos.cl acepte y reconozca una cesión, se
              requiere:
            </p>
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-5">
              <li>
                Autorización previa y por escrito del Distribuidor que
                originalmente adquirió el acceso.
              </li>
              <li>
                Aprobación expresa de BuscaRepuestos.cl antes de efectuar la
                cesión.
              </li>
            </ol>
            <p className="mb-4">
              Cualquier intento de cesión sin estas autorizaciones será nulo y
              carecerá de validez. El Distribuidor será el único responsable por
              las consecuencias de ceder su acceso, incluso si cuenta con la
              autorización de BuscaRepuestos.cl.
            </p>
            <p className="mb-4">
              BuscaRepuestos.cl se reserva el derecho de suspender o cancelar el
              acceso de distribuidores que incumplan esta política.
            </p>
            <p>
              Los resultados de búsqueda confirman que la cesión del acceso a
              las &quot;bolsas virtuales&quot; es una responsabilidad exclusiva
              del Distribuidor, y que BuscaRepuestos.cl requiere autorización
              previa y por escrito para aceptar y reconocer dicha cesión.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              17. Resolución del Acuerdo por BuscaRepuestos.cl
            </h1>
            <p className="mb-4">
              BuscaRepuestos.cl se reserva el derecho de resolver
              unilateralmente este Acuerdo de Términos y Condiciones en caso de
              que el Distribuidor incumpla con sus obligaciones esenciales
              establecidas en el presente documento.
            </p>
            <p>
              La resolución del Acuerdo por incumplimiento del Distribuidor
              conllevará la cancelación inmediata de su cuenta en la plataforma
              y la eliminación de su información personal de nuestros registros.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              18. Ley Aplicable y Jurisdicción
            </h1>
            <h2 className="font-bold mb-2 pl-5">
              1. Jurisdicción y Competencia
            </h2>
            <p className="mb-4 pl-5">
              Cualquier disputa, controversia o reclamación que surja de o en
              relación con este Acuerdo de Términos y Condiciones, incluyendo su
              incumplimiento, resolución o nulidad, será resuelta exclusivamente
              por los tribunales competentes de Chile.
            </p>
            <p className="mb-4 pl-5">
              Las partes, BuscaRepuestos.cl y el Distribuidor, se someten
              voluntariamente a la jurisdicción de dichos tribunales para
              dirimir cualquier conflicto que pudiera derivarse de la
              aplicación, interpretación, cumplimiento o ejecución del presente
              Acuerdo.
            </p>
            <h2 className="font-bold mb-2 pl-5">2. Ley Aplicable</h2>
            <p className="pl-5">
              Este Acuerdo se rige e interpreta de conformidad con las leyes
              vigentes de la República de Chile.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              19. Preguntas y Contacto
            </h1>
            <p className="mb-4">
              Si tiene alguna pregunta o inquietud sobre los &quot;Términos y
              Condiciones de Uso&quot; y &quot;Política de Privacidad&quot; aquí
              expuestos, puede contactarnos por correo electrónico a{" "}
              <a
                href="mailto:contacto@buscarepuestos.cl"
                className="text-blue-500 underline"
              >
                contacto@buscarepuestos.cl
              </a>
              .
            </p>
            <p>
              Al utilizar nuestra plataforma BuscaRepuestos.cl, usted acepta
              cumplir con estos términos y políticas.
            </p>

            {/*Policitcas*/}

            <h2 className="text-lg mt-12 font-semibold">
              Política de Privacidad
            </h2>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              1. Información Recopilada
            </h1>
            <p className="mb-4">
              BuscaRepuestos.cl recopila la siguiente información personal
              durante el proceso de registro de Clientes Buscadores y
              Distribuidores:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Nombre completo</li>
              <li>Número de teléfono celular</li>
              <li>Correo electrónico</li>
              <li>Contraseña</li>
            </ul>
            <p className="mb-4">
              Adicionalmente, la plataforma recopila información no personal
              sobre el uso, como:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-5">
              <li>Dirección IP</li>
              <li>Páginas visitadas en el sitio web</li>
              <li>Tiempo de permanencia en el sitio</li>
            </ul>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              2. Uso de la Información
            </h1>
            <p className="mb-4">
              BuscaRepuestos.cl utiliza la información personal recopilada para
              los siguientes propósitos:
            </p>
            <h2 className="font-bold mb-2">Comunicación entre Usuarios</h2>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Facilitar la comunicación entre Distribuidores y Clientes
                Buscadores dentro de la plataforma.
              </li>
              <li>Procesamiento de Transacciones</li>
              <li>
                Procesar transacciones y pagos relacionados con el servicio.
              </li>
            </ul>
            <h2 className="font-bold mb-2">Mejora Continua del Servicio</h2>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Realizar análisis internos para mejorar continuamente nuestros
                servicios.
              </li>
            </ul>
            <h2 className="font-bold mb-2">Comunicaciones de Marketing</h2>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Enviar comunicaciones de marketing a los usuarios, pero
                únicamente con su consentimiento previo.
              </li>
            </ul>
            <h2 className="font-bold mb-2">Prevención de Fraudes</h2>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Prevenir y detectar posibles fraudes o actividades sospechosas.
              </li>
            </ul>
            <h2 className="font-bold mb-2">Excepciones en el Uso de Datos</h2>
            <p className="mb-4">
              BuscaRepuestos.cl no compartirá la información personal de los
              usuarios con terceros, salvo en los siguientes casos
              excepcionales:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-5">
              <li>
                Cuando el usuario haya otorgado su consentimiento expreso para
                compartir sus datos.
              </li>
              <li>
                Cuando sea requerido por ley o por orden judicial competente.
              </li>
              <li>
                Para proteger los derechos legítimos, la seguridad y el correcto
                funcionamiento de la plataforma y sus usuarios.
              </li>
            </ul>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              3. Compartir Información
            </h1>
            <h2 className="font-bold mb-2">
              Compartición de Datos entre Usuarios
            </h2>
            <p className="mb-4">
              BuscaRepuestos.cl comparte información personal limitada entre
              Distribuidores y Clientes Buscadores involucrados en una
              transacción. La información compartida se limita a lo necesario
              para completar la transacción, como:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Nombre</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
            </ul>
            <h2 className="font-bold mb-2">
              Compartición con Proveedores de Servicios
            </h2>
            <p className="mb-4">
              La plataforma también puede compartir información personal con
              terceros proveedores de servicios que ayudan a BuscaRepuestos.cl a
              operar, tales como:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Proveedores de servicios de pago</li>
              <li>Proveedores de alojamiento web</li>
              <li>Proveedores de análisis de datos</li>
            </ul>
            <p className="mb-4">
              Estos proveedores de servicios tienen acceso a la información
              personal solo en la medida necesaria para realizar sus funciones,
              y están obligados contractualmente a proteger dicha información de
              acuerdo a la política de privacidad de BuscaRepuestos.cl.
            </p>
            <h2 className="font-bold mb-2">
              Excepciones a la Compartición de Datos
            </h2>
            <p className="mb-4">
              En ningún caso BuscaRepuestos.cl compartirá información personal
              de los usuarios con terceros ajenos a la operación de la
              plataforma, salvo en los casos excepcionales mencionados en la
              sección anterior, es decir:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-5">
              <li>Cuando el usuario haya otorgado su consentimiento expreso</li>
              <li>Cuando sea requerido por ley o autoridad competente</li>
              <li>
                Para proteger los derechos y seguridad de la plataforma y
                usuarios
              </li>
            </ul>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              4. Seguridad de la Información
            </h1>
            <h2 className="font-bold mb-2">
              Medidas de Seguridad Implementadas
            </h2>
            <p className="mb-4">
              BuscaRepuestos.cl implementa diversas medidas de seguridad para
              proteger la información personal de los usuarios contra pérdida,
              robo o acceso no autorizado, tales como:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Cifrado de datos</li>
              <li>Controles de acceso estrictos</li>
              <li>Monitoreo constante de seguridad</li>
            </ul>
            <h2 className="font-bold mb-2">Responsabilidad de los Usuarios</h2>
            <p className="mb-4">
              Adicionalmente, la plataforma requiere que sus usuarios elijan
              contraseñas seguras al momento del registro y se comprometen a
              mantenerlas en secreto, sin compartirlas con terceros.
            </p>
            <h2 className="font-bold mb-2">Limitaciones de Seguridad</h2>
            <p className="mb-4">
              Pese a estas medidas, los usuarios deben tener en cuenta que
              ningún método de transmisión por Internet o método de
              almacenamiento electrónico es 100% seguro. Por lo tanto,
              BuscaRepuestos.cl no puede garantizar una seguridad absoluta de la
              información.
            </p>
            <h2 className="font-bold mb-2">
              Notificación de Brechas de Seguridad
            </h2>
            <p>
              En caso de que se produzca una brecha de seguridad que comprometa
              la información personal de los usuarios, BuscaRepuestos.cl
              notificará a las autoridades pertinentes y a los usuarios
              afectados, de acuerdo a la legislación vigente sobre protección de
              datos personales.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              5. Cookies y Tecnologías Similares
            </h1>
            <h2 className="font-bold mb-2">
              Uso de Cookies por BuscaRepuestos.cl
            </h2>
            <p className="mb-4">
              BuscaRepuestos.cl utiliza cookies y tecnologías similares para los
              siguientes propósitos:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Mejorar la experiencia del usuario en el sitio web.</li>
              <li>
                Recopilar información sobre el uso y navegación en el sitio.
              </li>
            </ul>
            <p className="mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en el
              navegador del usuario cuando este visita el sitio web. Permiten
              recordar las acciones y preferencias del usuario, como nombre de
              usuario, idioma y configuración de visualización.
            </p>
            <p className="mb-4">
              Esto evita que el usuario tenga que volver a introducir esta
              información cada vez que vuelve al sitio web o navega de una
              página a otra.
            </p>
            <h2 className="font-bold mb-2">
              Gestión de Preferencias de Cookies por Usuarios
            </h2>
            <p className="mb-4">
              Los usuarios pueden gestionar sus preferencias de cookies a través
              de la configuración de su navegador. La mayoría de los navegadores
              permiten bloquear o eliminar las cookies.
            </p>
            <p>
              Sin embargo, es importante tener en cuenta que bloquear o eliminar
              las cookies puede afectar negativamente la funcionalidad y la
              experiencia del usuario en el sitio web de BuscaRepuestos.cl.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              6. Acceso y Corrección de Información Personal
            </h1>
            <h2 className="font-bold mb-2">Derechos de los Usuarios</h2>
            <p className="mb-4">
              Los usuarios registrados en BuscaRepuestos.cl tienen los
              siguientes derechos:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Acceder a su información personal almacenada en la plataforma.
              </li>
              <li>
                Solicitar la corrección de cualquier inexactitud o error en
                dichos datos.
              </li>
            </ul>
            <h2 className="font-bold mb-2">
              Procedimiento para Ejercer estos Derechos
            </h2>
            <p className="mb-4">
              Para ejercer estos derechos, el usuario deberá enviar una
              solicitud por escrito a{" "}
              <a
                href="mailto:contacto@buscarepuestos.cl"
                className="text-blue-600"
              >
                contacto@buscarepuestos.cl
              </a>
              , indicando claramente los datos que desea acceder o corregir.
            </p>
            <p className="mb-4">
              BuscaRepuestos.cl responderá a la solicitud en un plazo máximo de
              10 días hábiles, confirmando la recepción y dando trámite a la
              petición del usuario.
            </p>
            <p className="mb-4">
              En caso de que la información personal sea incorrecta, incompleta
              o inexacta, BuscaRepuestos.cl procederá a realizar las
              modificaciones pertinentes en un plazo razonable.
            </p>
            <h2 className="font-bold mb-2">
              Limitaciones al Derecho de Acceso
            </h2>
            <p className="mb-4">
              No obstante, este derecho de acceso y corrección no es absoluto.
              BuscaRepuestos.cl podrá denegar o limitar el acceso a cierta
              información personal cuando:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>Pueda afectar los derechos de terceros.</li>
              <li>
                Implique revelar información confidencial o de propiedad
                exclusiva de la plataforma.
              </li>
              <li>
                Sea requerido por una orden judicial o autoridad competente.
              </li>
            </ul>

            {/*Policitcas*/}
            <h1 className="text-2xl font-bold mb-4 mt-5">
              7. Duración del Almacenamiento de Datos
            </h1>
            <h2 className="font-bold mb-2">
              Período de Retención de Datos Personales
            </h2>
            <p className="mb-4">
              BuscaRepuestos.cl retendrá la información personal de los usuarios
              únicamente durante el tiempo necesario para cumplir con los fines
              para los cuales fue recopilada originalmente.
            </p>
            <p className="mb-4">
              Una vez que la información personal ya no sea necesaria para
              dichos fines, BuscaRepuestos.cl procederá a eliminarla de forma
              segura de sus sistemas y registros.
            </p>
            <h2 className="font-bold mb-2">
              Excepciones al Período de Retención
            </h2>
            <p className="mb-4">
              No obstante, BuscaRepuestos.cl podrá conservar cierta información
              personal por un período más prolongado en los siguientes casos
              excepcionales:
            </p>
            <h3 className="font-semibold mb-1">Cumplimiento Legal</h3>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Cuando sea necesario para cumplir con obligaciones legales o
                requerimientos de autoridades competentes.
              </li>
            </ul>
            <h3 className="font-semibold mb-1">Resolución de Disputas</h3>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Cuando sea necesario para la resolución de disputas o la defensa
                de derechos legales de la plataforma.
              </li>
            </ul>
            <h3 className="font-semibold mb-1">
              Seguridad y Prevención de Fraudes
            </h3>
            <ul className="list-disc list-inside mb-4 space-y-1 pl-5">
              <li>
                Cuando sea necesario para fines de seguridad, prevención de
                fraudes o investigaciones internas.
              </li>
            </ul>
            <p className="mb-4">
              En cualquier caso, BuscaRepuestos.cl se asegurará de que la
              información personal se mantenga debidamente protegida y se
              utilice únicamente para los fines permitidos durante el tiempo que
              sea estrictamente necesario.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              8. Enlaces a Otros Sitios Web
            </h1>
            <h2 className="font-bold mb-2">Enlaces a Sitios Web Externos</h2>
            <p className="mb-4">
              El sitio web de BuscaRepuestos.cl puede contener enlaces que
              redirigen a los usuarios a otros sitios web de terceros. Estos
              enlaces se proporcionan únicamente para conveniencia y facilidad
              de acceso a información relacionada.
            </p>
            <h2 className="font-bold mb-2">
              Limitación de Responsabilidad de BuscaRepuestos.cl
            </h2>
            <p className="mb-4">
              Es importante tener en cuenta que esta Política de Privacidad de
              BuscaRepuestos.cl no se aplica ni tiene injerencia sobre esos
              sitios web de terceros vinculados. Cada uno de esos sitios
              externos tiene su propia política de privacidad independiente.
            </p>
            <h2 className="font-bold mb-2">Recomendación a Usuarios</h2>
            <p className="mb-4">
              Por lo tanto, se recomienda encarecidamente a los usuarios que
              revisen detenidamente las políticas de privacidad individuales de
              cada uno de los sitios web a los que accedan a través de los
              enlaces proporcionados en BuscaRepuestos.cl.
            </p>
            <p className="mb-4">
              BuscaRepuestos.cl no se hace responsable del contenido, prácticas
              de privacidad, disponibilidad o seguridad de esos sitios web
              externos, ni garantiza que estén libres de virus u otros elementos
              dañinos.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">9. Menores de Edad</h1>
            <h2 className="font-bold mb-2">
              Restricción de Edad para Usar la Plataforma
            </h2>
            <p className="mb-4">
              BuscaRepuestos.cl no está destinada al uso por parte de menores de
              18 años. Por lo tanto, la plataforma no recopila intencionalmente
              información personal de personas menores de edad.
            </p>
            <h2 className="font-bold mb-2">
              Responsabilidad de Padres y Tutores
            </h2>
            <p className="mb-4">
              Los padres o tutores legales son los responsables de supervisar y
              regular el uso de internet y servicios en línea por parte de los
              menores bajo su cuidado.
            </p>
            <p className="mb-4">
              Se recomienda a los padres y tutores que eduquen a los niños sobre
              el uso seguro y responsable de internet, y que los monitoreen
              cuando utilicen servicios en línea.
            </p>
            <h2 className="font-bold mb-2">
              Acción ante Posible Recopilación de Datos de Menores
            </h2>
            <p className="mb-4">
              En caso de que BuscaRepuestos.cl tome conocimiento de que ha
              recopilado información personal de un menor de edad sin el
              consentimiento de los padres, la plataforma tomará las medidas
              necesarias para eliminar dicha información de manera segura.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              10. Cambios en la Política de Privacidad
            </h1>
            <h2 className="font-bold mb-2">
              Derecho de BuscaRepuestos.cl a Modificar la Política
            </h2>
            <p className="mb-4">
              BuscaRepuestos.cl se reserva el derecho de modificar esta Política
              de Privacidad en cualquier momento según lo considere necesario.
            </p>
            <h2 className="font-bold mb-2">Entrada en Vigor de los Cambios</h2>
            <p className="mb-4">
              Las modificaciones realizadas a esta política serán efectivas
              inmediatamente después de su publicación en el sitio web de
              BuscaRepuestos.cl.
            </p>
            <h2 className="font-bold mb-2">Notificación a los Usuarios</h2>
            <p className="mb-4">
              BuscaRepuestos.cl notificará a los usuarios sobre cualquier cambio
              en la Política de Privacidad a través de los siguientes medios:
            </p>
            <ul className="list-disc list-inside mb-4 pl-5">
              <li>
                Envío de un correo electrónico a la dirección de correo
                registrada.
              </li>
              <li>Publicación de un aviso destacado en el sitio web.</li>
            </ul>
            <h2 className="font-bold mb-2">Responsabilidad de los Usuarios</h2>
            <p className="mb-4">
              Es responsabilidad de los usuarios revisar periódicamente esta
              Política de Privacidad para estar informados sobre cualquier
              actualización o modificación.
            </p>
            <p>
              Al continuar utilizando los servicios de BuscaRepuestos.cl después
              de la publicación de cambios en esta política, los usuarios
              aceptan y consienten dichas modificaciones.
            </p>

            {/*Policitcas*/}

            <h1 className="text-2xl font-bold mb-4 mt-5">
              11. Preguntas y Contacto
            </h1>
            <h2 className="font-bold mb-2">
              Consultas sobre la Política de Privacidad
            </h2>
            <p className="mb-4">
              Si tiene alguna pregunta o inquietud sobre esta Política de
              Privacidad, puede contactarnos por correo electrónico a la
              siguiente dirección:
              <a
                href="mailto:contacto@buscarepuestos.cl"
                className="text-blue-500"
              >
                {" "}
                contacto@buscarepuestos.cl
              </a>
            </p>

            {/*Policitcas*/}

            <h2 className="font-bold mb-2 mt-16">
              Aceptación de Términos y Política al Usar la Plataforma
            </h2>
            <p className="mb-4">
              Al utilizar la plataforma de BuscaRepuestos.cl, usted acepta
              cumplir con los siguientes términos y políticas:
            </p>
            <ul className="list-disc list-inside mb-4 pl-5">
              <li>Términos y Condiciones de Uso</li>
              <li>Política de Privacidad expuesta en este documento</li>
            </ul>
            <p>
              Esta aceptación se entiende al momento de acceder y usar los
              servicios ofrecidos por BuscaRepuestos.cl.
            </p>

            {/*Policitcas*/}

            <div className="mt-16 mb-8 flex max-[400px]:text-sm flex-row space-x-1">
              <p className="font-semibold">Última Actualización:</p>
              <p>08/07/2024</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
