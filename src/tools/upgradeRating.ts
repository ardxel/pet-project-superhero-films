const upgradeRating = (rating: number): [string, string] => {
  return [
    getColor(rating),
    String(rating).length === 1 ? (String(rating) + '.0') : String(rating)]
};

export default upgradeRating;

const getColor = (num: number): string => {
  if (num >= 7) return '#2CA900';
  else if (num >= 6 && num < 7) return '#CA740C';
  else if (num >= 5 && num < 6) return '#F82D2D';
  else return '#6B6B6B';
};