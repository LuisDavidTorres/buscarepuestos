import Select from "react-select";
import makeAnimated from "react-select/animated";
import dataCars from "@/app/data/dataCars";

function SelectCars() {
  const animatedComponents = makeAnimated();

  return (
    <div>
      <Select
        instanceId={"carBrands"}
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        isMulti
        options={dataCars}
        placeholder="Filtrar por marca"
        required
      />
    </div>
  );
}

export default SelectCars