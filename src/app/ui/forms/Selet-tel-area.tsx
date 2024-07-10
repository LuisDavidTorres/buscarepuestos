import dataAreaCode from "@/app/data/dataAreaCode";

function SelecTelArea({
  clases,
  setCode,
}: {
  clases: string;
  setCode: (code: string) => void;
}) {
  return (
    <div>
      <select
        onChange={(e) => setCode(e.target.value)}
        id="cod-area"
        name="cod-area"
        className={clases}
      >
        {dataAreaCode.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelecTelArea;
