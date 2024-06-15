export function getShortUsername(username: string): string {
  return `${username.charAt(0)}${username.slice(-1)}`;
}

export function indexToLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

export function booleanToYesNo(value: boolean): string {
  return value ? "Sí" : "No";
}
