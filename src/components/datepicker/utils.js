/**
 * 获取当前日期月份对应的天数
 * @param {Date} date 日期
 */
export function getDaysForMonth (date) {
  date = new Date(date);
  const month = date.getMonth();
  date.setMonth(month + 1);
  date.setDate(0);
  return date.getDate();
}
/**
 * 获取当前日期月份的第一天是星期几
 * @param {Date} date 日期
 * @returns 
 */
export function getFirstDayForWeek (date) {
  date = new Date(date);
  date.setDate(1);
  return date.getDay();
}
