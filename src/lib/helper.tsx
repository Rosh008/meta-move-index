export function formatDecimalWithSubscript(num: String) {
  if (num === "0") return num.toString();

  const parts = num.toString().split(".");
  if (parts.length < 2) return num.toString();

  const integerPart = parts[0];
  const decimalPart = parts[1];

  const match = decimalPart.match(/^0+/);
  const leadingZeros = match ? match[0].length : 0;

  return (
    <>
      {integerPart}.<sub>{leadingZeros}</sub>
      {decimalPart.slice(leadingZeros)}
    </>
  );
}

export function formatPrice(num: number) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.00$/, "") + "K";
  }
  return num.toString(); // Return as is for numbers < 1K
}

export function parsePrice(str: string): number {
  if (str.endsWith("B")) {
    return parseFloat(str.replace("B", "")) * 1_000_000_000;
  } else if (str.endsWith("M")) {
    return parseFloat(str.replace("M", "")) * 1_000_000;
  } else if (str.endsWith("K")) {
    return parseFloat(str.replace("K", "")) * 1_000;
  }
  return parseFloat(str);
}

export function sentimentInputFormatter(value: String): number {
  if (value === "positive") return 100;
  if (value === "neutral") return 50;
  return 0;
}
