import { Decimal } from "@prisma/client/runtime/library";

//convertir Decimal a precio chileno con formato de miles sin decimales
export function formatMoney(price: Decimal): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatMoneyInt(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatMoneyString(price: String | undefined): string {
  if (price) {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else return "";
}

export function restarDecimales(num1: number, num2: number): number {
  // Convertir los números a strings para obtener la longitud decimal
  const strNum1 = num1.toString();
  const strNum2 = num2.toString();

  // Encontrar la longitud decimal más larga
  const maxLength = Math.max(
    strNum1.split(".").length,
    strNum2.split(".").length
  );

  // Multiplicar los números por 10^longitudDecimalMásLarga para eliminar decimales
  const num1Ajustado =
    num1 * Math.pow(10, maxLength - strNum1.split(".").length + 1);
  const num2Ajustado =
    num2 * Math.pow(10, maxLength - strNum2.split(".").length + 1);

  // Restar los números ajustados
  const resultado = num1Ajustado - num2Ajustado;

  // Dividir el resultado por 10^longitudDecimalMásLarga para obtener el número con decimales
  return resultado / Math.pow(10, maxLength);
}

export async function getDolarPrice(priceCLP: number) {
  const url = "https://mindicador.cl/api";
  const response = await fetch(url);
  const data = await response.json();

  const dolarObservado = data["dolar"]["valor"];
  console.log(`Dólar observado: CLP $${dolarObservado}`);

  // Calculamos cuántos dólares equivalen a 1 CLP
  const usdPerCLP = 1 / dolarObservado;

  // Calculamos el precio en dólares basado en el precio en CLP
  const priceUSD = priceCLP * usdPerCLP;
  console.log(`El valor de CLP $${priceCLP} en USD es: $${priceUSD.toFixed(2)}`);

  return priceUSD.toFixed(2);
}


