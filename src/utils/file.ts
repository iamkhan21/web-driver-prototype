export function getFileUrl(file: File): string {
  return URL.createObjectURL(file);
}
