export default function classes(...className: string[]) {
  return Array.prototype.join.call(className, ' ')
}