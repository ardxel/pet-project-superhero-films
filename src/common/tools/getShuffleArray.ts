export default function getShuffleArray<T extends Array<any>>(arr: T): T {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffleArray(arr.filter((_, i) => i != rand))] as T;
}
