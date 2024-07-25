import { InformationUser } from "../ui/cards/Information-user";

export const revalidate: number = 0;

export default function Page() {
  return (
    <div className="min-h-screen bg-white p-6 rounded-md dark:text-black">
      <h1 className="font-bold text-3xl flex justify-center">Mi Cuenta</h1>
      <div className="mt-4">
        <InformationUser />
      </div>
    </div>
  );
}
