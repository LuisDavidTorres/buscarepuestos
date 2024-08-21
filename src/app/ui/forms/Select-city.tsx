import dataCity from "@/app/data/dataCity";
import makeAnimated from "react-select/animated";
import Select from "react-select";

function SelectCity({ setCity }: { setCity: (code: number) => void }) {
  const animatedComponents = makeAnimated();

  return (
    <div>
      <Select
        instanceId={"Region"}
        className="rounded-md h-9 w-full"
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={[]}
        options={dataCity}
        placeholder="Región"
        required
        noOptionsMessage={() => "Región no encontrada"} 
        onChange={(e) => setCity((e as { value: number }).value)}
      />

      {/*<select
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
      </select>*/}
    </div>
  );
}

export default SelectCity;
