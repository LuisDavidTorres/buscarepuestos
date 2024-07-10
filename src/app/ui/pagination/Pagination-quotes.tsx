"use client";

import { Pagination } from "flowbite-react";

interface PaginationQuotesProps {
    setCurrentPage: (page: number) => void;
    nPages: number;
    currentPage: number;
}

export function PaginationQuotes({ setCurrentPage, currentPage, nPages} : {setCurrentPage: any, currentPage: any, nPages: any}) {
    const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
    <Pagination
      layout="pagination"
      currentPage={currentPage}
      totalPages={nPages}
      onPageChange={onPageChange}
      previousLabel="Anterior"
      nextLabel="Sigueinte"
      showIcons
    />
  </div>
     
   
  );
}