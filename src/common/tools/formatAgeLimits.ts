export default function formatAgeLimits(age: string): string {
  return `${age.replace(/\D+/, '')}+`;
}
