"use client";

import { useRouter } from "next/navigation";

export default function PageRedirect({
  text,
  url,
}: {
  text: string;
  url: string;
}) {
  const router = useRouter();

  return (
    <button
      className="bg-custom-green hover:bg-green-600 p-2 text-white dark:text-white rounded-md"
      onClick={() => router.push(url)}
    >
      {text}
    </button>
  );
}
