export function formatPhoneNumber(
  unformattedNumber: string,
  {
    conceal,
  }: {
    conceal?: boolean;
  } = {},
) {
  const formattedString = unformattedNumber.replace(
    /(\d{3})(\d{3})(\d+)/g,
    "$1- $2-$3",
  );
  if (conceal && formattedString.length > 8) {
    return formattedString.slice(0, 8) + "xxxx";
  }
  return formattedString;
}
