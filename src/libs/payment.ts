export function format_payment_type_code(payment_type_code: string): string {
  switch (payment_type_code) {
    case "VD":
      return "Débito";
    case "VN":
      return "Crédito";
    case "VC":
      return "En cuotas";
    case "SI":
      return "3 cuotas sin interés";
    case "S2":
      return "2 cuotas sin interés";
    case "NC":
      return "N cuotas sin interés";
    case "VP":
      return "Prepago";
    default:
      return "Tipo de pago desconocido";
  }
}
