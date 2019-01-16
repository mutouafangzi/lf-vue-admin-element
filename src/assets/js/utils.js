import moment from 'moment'

// 时间戳转时间
export function formatDate (item) {
  let str = ''
  if (item) {
    item = parseInt(item)
    str = moment(item).format('YYYY-MM-DD HH:mm:ss')
  }
  return str
}

/**
 * 得到今天
 * dates为数字类型，0代表今日,-1代表昨日，1代表明日，返回yyyy-mm-dd格式字符串，dates不传默认代表今日。
 * @param {*} dates
 */
export function getDate (dates) {
  var dd = new Date()
  var n = dates || 0
  dd.setDate(dd.getDate() + n)
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1
  var d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  var day = y + '/' + m + '/' + d
  return day
};

/**
 * 得到本周、上周、下周的起始、结束日期
 * type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，dates为数字类型，不传或0代表本周，-1代表上周，1代表下周
 * @param {*} type
 * @param {*} dates
 */
export function getMonday (type, dates) {
  var now = new Date()
  var nowTime = now.getTime()
  var day = now.getDay()
  var longTime = 24 * 60 * 60 * 1000
  var n = longTime * 7 * (dates || 0)
  if (type == 's') {
    var dd = nowTime - (day - 1) * longTime + n
  };
  if (type == 'e') {
    var dd = nowTime + (7 - day) * longTime + n
  };
  dd = new Date(dd)
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1
  var d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  var day = y + '/' + m + '/' + d
  return day
};

/**
 * 得到本月、上月、下月的起始、结束日期
 * type为字符串类型，有两种选择，"s"代表开始,"e"代表结束，months为数字类型，不传或0代表本月，-1代表上月，1代表下月
 * @param {*} type
 * @param {*} months
 */
export function getMonth (type, months) {
  var d = new Date()
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  if (Math.abs(months) > 12) {
    months = months % 12
  };
  if (months != 0) {
    if (month + months > 12) {
      year++
      month = (month + months) % 12
    } else if (month + months < 1) {
      year--
      month = 12 + month + months
    } else {
      month = month + months
    };
  };
  month = month < 10 ? '0' + month : month
  var date = d.getDate()
  var firstday = year + '/' + month + '/' + '01'
  var lastday = ''
  if (month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12') {
    lastday = year + '/' + month + '/' + 31
  } else if (month == '02') {
    if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
      lastday = year + '/' + month + '/' + 29
    } else {
      lastday = year + '/' + month + '/' + 28
    };
  } else {
    lastday = year + '/' + month + '/' + 30
  };
  var day = ''
  if (type == 's') {
    day = firstday
  } else {
    day = lastday
  };
  return day
};

/**
 * 时间转换 absolute:1528128000000-1531756800000 , relative:1d => [startTime,endTime]
 * @param {*} str
 */
export function conversionPicker (str) {
  if (str.indexOf('absolute') > -1) {
    return str.split(':')[1].split('-')
  } else if (str.indexOf('relative') > -1) {
    let item = str.split(':')[1]
    let endTime = new Date().getTime()
    let startTime = 0
    switch (item) {
      case '15m':
      {
        startTime = endTime - 15 * 60 * 1000
        break
      }
      case '30m':
      {
        startTime = endTime - 30 * 60 * 1000
        break
      }
      case '1h':
      {
        startTime = endTime - 1 * 60 * 60 * 1000
        break
      }
      case '12h':
      {
        startTime = endTime - 12 * 60 * 60 * 1000
        break
      }
      case '1d':
      {
        startTime = endTime - 24 * 60 * 60 * 1000
        break
      }
      case '7d':
      {
        startTime = endTime - 7 * 24 * 60 * 60 * 1000
        break
      }
      case '30d':
      {
        startTime = endTime - 30 * 24 * 60 * 60 * 1000
        break
      }
      case 'today':
      {
        startTime = new Date(getDate(0)).getTime()
        endTime = new Date(getDate(0)).getTime() + 24 * 60 * 60 * 1000
        break
      }
      case 'week':
      {
        startTime = new Date(getMonday('s', 0)).getTime()
        endTime = new Date(getMonday('e', 0)).getTime() + 24 * 60 * 60 * 1000
        break
      }
      case 'month':
      {
        startTime = new Date(getMonth('s', 0)).getTime()
        endTime = new Date(getMonth('e', 0)).getTime() + 24 * 60 * 60 * 1000
        break
      }
    }
    return [startTime + '', endTime + '']
  } else {
    return ['', '']
  }
}

/**
 * chart icon 及对应说明
 */
export function chartIcon (type) {
  let icon = {
    className: '',
    text: ''
  }
  if (type) {
    switch (type) {
      case 'aBar':
      {
        icon.className = 'icon-Bar'
        icon.text = '柱状图'
        break
      }
      case 'aStripe':
      {
        icon.className = 'icon-bar-chart-h'
        icon.text = '条形图'
        break
      }
      case 'aLine':
      {
        icon.className = 'icon-Trend'
        icon.text = '折线图'
        break
      }
      case 'aArea':
      {
        icon.className = 'icon-Area'
        icon.text = '面积图'
        break
      }
      case 'aPie':
      {
        icon.className = 'icon-Pie'
        icon.text = '饼图'
        break
      }
      case 'aGauge':
      {
        icon.className = 'icon-yibiaoban'
        icon.text = '仪表盘'
        break
      }
      case 'aScatter':
      {
        icon.className = 'icon-sandiantu'
        icon.text = '散点图'
        break
      }
      case 'aBubble':
      {
        icon.className = 'icon-qipaotu'
        icon.text = '气泡图'
        break
      }
      case 'aNumber':
      {
        icon.className = 'icon-bi40qietushuzi'
        icon.text = '数字图'
        break
      }
      case 'aTable':
      {
        icon.className = 'icon-biaoge'
        icon.text = '表格'
        break
      }
      case 'aCloud':
      {
        icon.className = 'icon-Cloud'
        icon.text = '词云'
        break
      }
      case 'aEditor':
      {
        icon.className = 'icon-fuwenben'
        icon.text = '富文本'
        break
      }
    }
  }
  return icon
}

/**
 * 计算间隔
 */
export function getTimeTicks (timeStep) {
  let ticks = 'timeHour'
  // 计算出相差天数
  var days = Math.floor(timeStep / (24 * 3600 * 1000))
  // 计算出小时数
  var leave1 = timeStep % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
  // 计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))
  // 计算相差秒数
  var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  let interval = ''
  let time = 1
  if (days) {
    ticks = 'timeDay'
    interval = days + 'd'
    time = days * 24 * 3600 * 1000
  } else if (hours) {
    ticks = 'timeHour'
    interval = hours + 'h'
    time = hours * 3600 * 1000
  } else if (minutes) {
    ticks = 'timeMinute'
    interval = minutes + 'm'
    time = minutes * 60 * 1000
  } else if (seconds) {
    ticks = 'timeSecond'
    interval = seconds + 's'
    time = seconds * 1000
  }
  return {
    ticks: ticks,
    interval: interval,
    time: time
  }
}

