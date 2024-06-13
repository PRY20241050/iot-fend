export default function getShortUsername(username: string): string {
  return `${username.charAt(0)}${username.slice(-1)}`
}
