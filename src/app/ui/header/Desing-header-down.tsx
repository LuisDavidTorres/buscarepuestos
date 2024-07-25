export function DesingHeaderDown({ titulo }: { titulo: string }) {
  return (
    <>
      <div className="bg-custom-gray p-2">
        <p className="text-center text-white select-none">{titulo}</p>
      </div>
      <div className="bg-custom-green w-full h-5 rounded-b-md"></div>
    </>
  );
}
