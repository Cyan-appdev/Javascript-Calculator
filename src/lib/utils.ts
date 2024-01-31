export const commaFormatter = (
  value: string,
  lastInputIsDecimal: boolean,
): string => {
  const parts = value.split(".");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;

  return (
    numberPart.replace(thousands, ",") +
    (lastInputIsDecimal ? "." : decimalPart ? "." + decimalPart : "")
  );
};
