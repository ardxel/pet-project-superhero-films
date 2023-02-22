const toHoursAndMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const min = Math.floor(minutes - hours * 60);
  return `${hours}h ${min > 0 ? min + 'm' : ''}`;
};

export default toHoursAndMinutes;
