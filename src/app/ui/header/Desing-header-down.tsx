export function DesingHeaderDown({ titulo }: { titulo: string }) {
  return (
    <>
      <div className="bg-gradient-to-br from-custom-gray via-custom-gray to-slate-800 p-2">
        <p className="text-center text-white select-none">{titulo}</p>
      </div>
      <div className="bg-custom-green w-full h-5"></div>
    </>
  );
}
