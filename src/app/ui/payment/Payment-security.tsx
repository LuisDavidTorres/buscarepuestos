import { RiSecurePaymentFill } from "react-icons/ri";

export function PaymentSecurity() {
  return (
    <>
      <RiSecurePaymentFill className="text-3xl" />
      <p>Pago Seguro</p>
      <svg
        width="80"
        height="40"
        viewBox="0 0 200 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="15"
          y="50"
          fontFamily="Arial, sans-serif"
          fontSize="45"
          fill="black"
        >
          webpay.
        </text>
        <text
          x="15"
          y="80"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fill="black"
        >
          transbank.
        </text>
        <circle cx="5" cy="30" r="4" fill="black" />
      </svg>
    </>
  );
}
