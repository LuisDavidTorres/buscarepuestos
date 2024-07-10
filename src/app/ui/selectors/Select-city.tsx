import Select from "react-select";
import makeAnimated from "react-select/animated";
import dataCars from "@/app/data/dataCity";

function SelectCity() {
  const animatedComponents = makeAnimated();

  return (
    <div>
      <Select
        instanceId={"city"}
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        options={dataCars}
        placeholder="Filtrar por ciudad"
        required
      />
    </div>
  );
}

export default SelectCity;
