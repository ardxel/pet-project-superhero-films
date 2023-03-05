export default function formatDateInArray(date: string): [string, string] {
  const dateObj = new Date(date);
  const globalDate = dateObj.toDateString().split(' ').slice(1).join(', ');
  const localDate = dateObj.toLocaleTimeString();
  return [globalDate, localDate];
}
