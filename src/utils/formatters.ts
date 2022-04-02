export function formatNumberToHR(num: number): string {
  return new Intl.NumberFormat().format(num);
}
