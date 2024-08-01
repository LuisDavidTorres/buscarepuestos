"use client";

import { CardQuotation } from "../cards/Quotation";
import { CardQuotationUser } from "../cards/QuotationUser";
import { PaginationQuotes } from "../pagination/Pagination-quotes";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function CardGridQuotation({ quotes }: { quotes: any }) {
  const [quotesPerPage, setQuotesPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const indexFin = currentPage * quotesPerPage;
  const indexIni = indexFin - quotesPerPage;

  const currentQuotes = quotes.slice(indexIni, indexFin);
  const nPages = Math.ceil(quotes.length / quotesPerPage);

  const pathname = usePathname();

  return (
    <>
      <div className="sm:mt-10 md:mt-0 sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-16">
        {currentQuotes.map((quotation: any) => {
          const key =
            pathname === "/home" ? quotation.idQuotation : quotation.id;
          return (
            <div key={key} className="flex justify-center">
              {pathname === "/home" ? (
                <CardQuotation key={key} quote={quotation} />
              ) : (
                <CardQuotationUser key={key} quote={quotation} />
              )}
            </div>
          );
        })}
      </div>
      {nPages !== 0 && (
        <div className="mt-10 items-center flex flex-col sm:flex-row"> 
          <div className="lg:mr-40 w-52"> 
            {" "}
            <p className="text-black">{indexIni + 1} - {indexFin > quotes.length ? quotes.length : indexFin} de {quotes.length} cotizaciones</p>
          </div>
          <div>
            {" "}
            <PaginationQuotes
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              nPages={nPages}
            />
          </div>
        </div>
      )}
    </>
  );
}
