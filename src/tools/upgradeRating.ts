export const upgradeRating = (rating: number): [string, string] => {
  return [getColor(rating), getRating(rating)];
};

export const getRating = (num: number): string => {
  return String(num).length === 1 ? num + '.0': String(num);
}
export const getColor = (num: number): string => {
  if (num >= 7) return '#2CA900';
  else if (num >= 6 && num < 7) return '#CA740C';
  else if (num >= 5 && num < 6) return '#F82D2D';
  else return '#6B6B6B';
};
