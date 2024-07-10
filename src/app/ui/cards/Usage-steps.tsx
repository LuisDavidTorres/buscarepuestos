export function UsageSteps({
  numberStep,
  name,
  descrition,
}: {
  numberStep: string;
  name: string;
  descrition: string;
}) {
  return (
    <div className="border-2 p-4 flex flex-col w-4/5 sm:2/5 md:4/5 lg:w-2/5 xl:w-1/5 2xl:w-1/6 h-96 shadow-lg rounded-md">
      <h1 className="text-center font-bold text-7xl items-center">
        {numberStep}
      </h1>
      <div className="space-y-10 justify-center mt-14">
        <div className="text-center text-white bg-custom-green p-4 rounded-md">
          <p className="font-bold text-xl">{name}</p>
        </div>
        <div className="text-center text-white bg-zinc-700 p-2 rounded-sm h-28">
          <p>{descrition}</p>
        </div>
      </div>
    </div>
  );
}
