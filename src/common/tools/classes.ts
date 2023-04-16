export default function classes(...classnames: Array<string | undefined>) {
  return classnames.reduce((prev, cur) => cur ? `${prev} ${cur}` : prev, '');
}