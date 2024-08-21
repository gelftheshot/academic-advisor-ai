export function boundedNumber(number: number, min: number = -Infinity, max: number = Infinity) {
  return Math.min(max, Math.max(min, number))
}
