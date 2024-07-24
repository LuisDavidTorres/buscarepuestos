export function formatNameIdCar(length: number) {
  if (length === 0) {
    return "Patente / VIN";
  } else if (length < 17) {
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
    return "Original / Alternativo";
  }
}
