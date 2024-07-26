export function formatNameIdCar(length: number) {
  if (length === 0 || length === null || length === 17 || length === 0) {
    return "VIN";
  } else {
    return "Patente";
  }
}

export function formatNameSpareType(SpareType: string) {
  if (SpareType === "alternative") {
    return "Alternativo";
  } else if (SpareType === "original") {
    return "Original";
  } else {
    return "Original / Alternativo";
  }
}
