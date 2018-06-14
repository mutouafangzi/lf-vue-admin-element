var chartDataJS = {
  "thead": [{
      "label": "时间",
      "key": "time"
    },
    {
      "label": "一级分类",
      "key": "event_cat1"
    },
    {
      "label": "二级分类",
      "key": "event_cat2"
    },
    {
      "label": "事件严重程度",
      "key": "event_severity"
    }
  ],
  "tbody": [{
      "time": "2005-11-14 14:52:19",
      "src_ip_areacode": "828",
      "event_cat1": "269",
      "src_ip_city": "790",
      "src_ip_latitude": "639",
      "event_cat2": "660",
      "event_severity": "342"
    },
    {
      "time": "2016-02-21 18:38:46",
      "src_ip_areacode": "132",
      "event_cat1": "554",
      "src_ip_city": "399",
      "src_ip_latitude": "891",
      "event_cat2": "462",
      "event_severity": "586"
    },
    {
      "time": "1990-05-06 04:17:26",
      "src_ip_areacode": "67",
      "event_cat1": "862",
      "src_ip_city": "386",
      "src_ip_latitude": "576",
      "event_cat2": "912",
      "event_severity": "80"
    },
    {
      "time": "1996-11-22 07:49:00",
      "src_ip_areacode": "746",
      "event_cat1": "760",
      "src_ip_city": "710",
      "src_ip_latitude": "787",
      "event_cat2": "390",
      "event_severity": "958"
    }
  ]
};

var layoutJS = [{
    "title": "柱状图",
    "x": 0,
    "y": 0,
    "w": 12,
    "h": 10,
    "i": "0",
    "component": "aBar",
    "configObj": {
      title: '', // 图表名称
      isShowValue: "1", //0 隐藏 1 显示
      legendLocation: "top", // '' left right top bottom 图例位置
      chartStyle: "0", // 柱状图类型 0 普通 1：堆叠
      xAxisTitle: "X", // xAxisTitle
      xAxisRotate: "0", // xAxisRotate 旋转角度 0  -45 45 -90
      yAxisTitle: "Y", // yAxisTitle
      yAxisRotate: "0" // yAxisTitle 旋转角度 0  -45 45 -90
    }
  },
  {
    "title": "饼状图",
    "x": 12,
    "y": 0,
    "w": 12,
    "h": 10,
    "i": "1",
    "component": "aBar",
    "configObj": {
      title: '', // 图表名称
      isShowValue: "1", //0 隐藏 1 显示
      legendLocation: "left", // '' left right top bottom 图例位置
      chartStyle: "0", // 柱状图类型 0 普通 1：堆叠
      xAxisTitle: "X", // xAxisTitle
      xAxisRotate: "0", // xAxisRotate 旋转角度 0  -45 45 -90
      yAxisTitle: "Y", // yAxisTitle
      yAxisRotate: "0" // yAxisTitle 旋转角度 0  -45 45 -90
    }
  },
  {
    "title": "折线图",
    "x": 0,
    "y": 10,
    "w": 24,
    "h": 10,
    "i": "2",
    "component": "aBar",
    "configObj": {
      title: '', // 图表名称
      isShowValue: "1", //0 隐藏 1 显示
      legendLocation: "top", // '' left right top bottom 图例位置
      chartStyle: "1", // 柱状图类型 0 普通 1：堆叠
      xAxisTitle: "X", // xAxisTitle
      xAxisRotate: "0", // xAxisRotate 旋转角度 0  -45 45 -90
      yAxisTitle: "Y", // yAxisTitle
      yAxisRotate: "0" // yAxisTitle 旋转角度 0  -45 45 -90
    }
  }
]
