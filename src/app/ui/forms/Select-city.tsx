import dataCity from "@/app/data/dataCity";

function SelectCity({ setCity }: { setCity: (code: number) => void }) {
  return (
    <div>
      <select
        onChange={(e) => setCity(parseInt(e.target.value))}
        id="city"
        name="city"
        className="border-2 rounded-md h-9 w-full"
      >
        {dataCity.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCity;
