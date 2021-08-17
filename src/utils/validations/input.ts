export function validateInput(value: string): boolean {
  if (!value.trim().length) return false;
  return true;
}
