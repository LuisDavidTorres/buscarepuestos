import { QuotationFull } from "@/app/ui/cards/Quotation-full";
import { ImageContainer } from "@/app/ui/container/Image-container";

async function loadQuote(id: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/quotes/" + id,
    {
      cache: "no-cache",
      headers: {
        Pragma: "no-cache",
      },
    }
  );
  const { quote } = await res.json();
  return quote;
}

async function loadImages(id: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/quotes/" + id,
    {
      cache: "no-cache",
      headers: {
        Pragma: "no-cache",
      },
    }
  );
  const { images } = await res.json();
  return images;
}

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const quoteUser = await loadQuote(id);
  const images = await loadImages(id);

  if (!quoteUser) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-10">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <svg
            className="w-24 h-24 mb-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 2a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10zM16.707 15.293a1 1 0 10-1.414 1.414l4.3 4.3a1 1 0 001.414-1.414l-4.3-4.3z" />
          </svg>
          <h1 className="text-3xl font-bold mb-4">Cotización no encontrada</h1>
          <p className="text-lg">
            Lo sentimos, pero no pudimos encontrar la cotización que estás
            buscando.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="flex flex-col xl:flex-row xl:space-x-5">
        <div className="mx-4 sm:mx-6 md:mx-10 xl:mx-0 w-11/12 xl:max-w-5xl mt-4">
          <ImageContainer images={images} />
        </div>
        <div className="xl:w-4/12 mt-10 xl:mt-0">
          <QuotationFull quoteUser={quoteUser} />
        </div>
      </div>
    </div>
  );
}

export default Page;
