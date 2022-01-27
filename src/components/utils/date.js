export function formatDate (timestamp , formatter = 'YYYY-MM-DD hh:mm:ss') {
  let reg = /Y+|y+|M+|m+|D+|d+|H+|h+|S+|s+|[\u0391-\uFFE5]/g;
  let reg2 = /\/|\.|-|[\u0391-\uFFE5]/g;
  let reg3 = /[\u0391-\uFFE5]/;
  let joiner = reg2.exec(formatter);
  joiner = joiner && joiner[0];
  let date = new Date(timestamp),
  year = date.getFullYear(),
  month = date.getMonth() + 1,
  day = date.getDate(),
  hour = date.getHours(),
  minutes = date.getMinutes(),
  second = date.getSeconds();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  second = second < 10 ? '0' + second : second;
  let time1 = [];
  let time2 = [];
  formatter.replace(reg , match => {
    switch (match) {
      case "YYYY":
      case 'yyyy':
      case 'YY':
      case 'yy':
        time1.push(String(year).slice(-match.length));
        break;
      case 'MM':
        time1.push(month);
        break;
      case 'DD':
      case 'dd':
        time1.push(day);
        break;
      case "HH":
      case 'hh':
        time2.push(hour);
        break;
      case 'mm':
        time2.push(minutes);
        break;
      case 'ss':
        time2.push(second);
        break;
    }
  });
  let time = '';
  if (!reg3.test(joiner)) {
    if (joiner == '/' && formatter.indexOf(':') == -1) {
      time = time1.join(joiner);
      if (time2.length > 0) {
        time = time + joiner + time2.join(joiner);
      }
    } else {
      time = time1.join(joiner);
      if (time2.length > 0) {
        time = time + ' ' + time2.join(':');
      }
    }
  } else {
    time = `${year}年${month}月${day}日` + time2.join(':');
  };
  return time;
}