export default function distance(metres: number): string {
  if (metres < 500) return `${metres.toFixed()}m`;

  return `${(metres / 1000).toFixed(2)}km`;
}
