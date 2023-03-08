const timeFormatRules = [
  ['HH', 'getHours'],
  ['mm', 'getMinutes'],
  ['ss', 'getSeconds']
];
// 补0
const fillZero = <T>(e: T): string => {
  return String(e).padStart(2, '0');
}
// 获取时差 
export default function (
  t1: string | number | Date,
  t2: string | number | Date,
  format?: string
): string | string[] {

  console.time('qwer')
  const { trunc, abs, round } = Math;
  const day = 60 * 60 * 1000;
  const diff = abs(new Date(t1).getTime() - new Date(t2).getTime());
  const list = [diff / day];
  Array.of(60, 60).reduce((total, next) => {
    const rs = (total % 1) * next;
    list.push(rs);
    return rs;
  }, list[0]);
  const formatList = list.map((v, i, arr) => {
    return i === arr.length - 1 ? fillZero(round(v)) : fillZero(trunc(v))
  });
  let rs;
  if (format) {
    rs = timeFormatRules.reduce((total, next, index) => {
      // @ts-ignore
      return total?.replace(next[0], formatList[index]);
    }, format);
  }
  console.timeEnd('qwer')
  return rs ?? formatList;
}