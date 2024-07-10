export function formatNameIdCar(length: number) {
  if (length < 17) {
    return "Patente";
  } else {
    return "VIN";
  }
}

export function formatNameSpareType(SpareType: string) {
  if (SpareType === "alternative") {
    return "Alternativo";
  } else if (SpareType === "original") {
    return "Original";
  } else {
    return "Orig. o alterna.";
  }
}
