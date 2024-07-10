export function NoResultsQuotation({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center h-full w-full xl:mx-32">
      <div className="text-center max-w-lg items-center flex flex-col">
        <div className="mb-3">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="70"
            height="70"
            className="text-red-500"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M12 8v4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          {" "}
          <p className="text-black">{message}</p>
        </div>
      </div>
    </div>
  );
}
