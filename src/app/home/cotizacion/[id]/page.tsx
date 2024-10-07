import { ImageContainer } from "@/app/ui/container/Image-container";
import QuotationShare from "@/app/ui/cards/QuotationShare";
import { ModalGeneral } from "@/app/ui/modals/Modal-general";
import { ModalLoginSupplier } from "@/app/ui/home/ModalLoginSupplier";

async function LoadQuote({ id }: { id: string }) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/sharedQuote/" + id,
      {
        cache: "no-cache",
        headers: {
          Pragma: "no-cache",
        },
      }
    );
    const { sharedQuote } = await res.json();
    return { sharedQuote };
  } catch {
    console.log("Error al consultar la cotización");
  }
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const quoteInfo = await LoadQuote({ id });
  const quoteDatails = quoteInfo?.sharedQuote;
  const imagesQuote = quoteDatails?.images;

  if (!quoteDatails) {
    return (
      <>
        <div className="min-h-screen bg-white p-6 md:p-10 dark:text-black">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg
              className="w-24 h-24 mb-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 2a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10zM16.707 15.293a1 1 0 10-1.414 1.414l4.3 4.3a1 1 0 001.414-1.414l-4.3-4.3z" />
            </svg>
            <h1 className="text-3xl font-bold mb-4">
              Cotización no encontrada
            </h1>
            <p className="text-lg">
              Lo sentimos, pero no pudimos encontrar la cotización que estás
              buscando.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white p-6 xl:p-10">
        <div className="flex flex-col xl:flex-row xl:justify-between items-center">
          <section className="w-full md:w-10/12 xl:w-8/12 lg:max-w-5xl mt-4">
            <div className="mx-4 sm:mx-6 md:mx-10 xl:mx-0">
              <ImageContainer images={imagesQuote} />
            </div>
          </section>

          <section className="w-full md:w-4/5 xl:w-3/12 mt-6 xl:mt-0">
            <QuotationShare quote={quoteDatails} />
          </section>
        </div>
        <ModalGeneral />
        <div className="flex justify-center absolute my-2 md:my-8">
          <ModalLoginSupplier />
        </div>
      </div>
    </>
  );
}

export default Page;
