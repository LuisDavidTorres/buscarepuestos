"use client";

import { useRouter } from "next/navigation";

export function ReturnToTrade({
  buttonText,
  route,
}: {
  buttonText: string;
  route: string;
}) {
  const router = useRouter();

  return (
    <button
      className="text-white bg-custom-green hover:bg-green-500 p-2 rounded-md"
      type="button"
      onClick={() => router.push(route)}
    >
      {buttonText}
    </button>
  );
}
