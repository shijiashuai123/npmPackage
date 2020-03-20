var pydic = require('./pinyin.js')
// 获取随机数
// 生成3-32位随机串：randomWord(true, 3, 32)
// 生成43位随机串：randomWord(false, 43)
const randomWord = (randomFlag, min, max) => {
  var str = "",
    range = min,
    // arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
// 时间戳转时间格式
const formatTime = date => {
  var date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// Date.parse(new Date(timestamp)) 获取时间戳指定时间
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 截取url里面的任意参数值，两个参数（第一个url，第二个参数名字）
function sliceUrl(url, par) {
  var par1 = par + '='
  var len = par.length + 1
  // var str = 'woolni'
  if (url.indexOf(par1) !== -1) {
    var obj2 = url.substring(url.indexOf(par1), url.length)
    // console.log(obj2)
    if (obj2.indexOf('&') !== -1) {
      return obj2.slice(obj2.indexOf(par1) + len, obj2.indexOf('&'))
    } else {
      if (obj2.indexOf('#') !== -1) {
        return obj2.slice(obj2.indexOf(par1) + len, obj2.indexOf('#'))
      } else {
        return obj2.slice(obj2.indexOf(par1) + len, obj2.length)
      }
    }
  } else {
    return ''
  }
}
// 截取url2
function getUrlParam(e, n) {
    if (!e) throw new Error("parameter url is required.");
    if (!n) throw new Error("parameter key is required.");
    return decodeURIComponent(e).replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(n).replace(
        /[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1").split("#")[0]
}
//　阿拉伯数字转文字 价格（一千五百三十二） 1532
function numTurnWord(section) {
  var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  // var chnUnitSection = ["","万","亿","万亿","亿亿"];
  var chnUnitChar = ["", "十", "百", "千"];
  var strIns = '',
    chnStr = '';
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}
// 文字数字转为阿拉伯数字 价格（1654） 一千六百五十四
function wordTurnNum(chnStr) {
  var chnNumChar = {
    零: 0,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9
  };
  var chnNameValue = {
    十: {
      value: 10,
      secUnit: false
    },
    百: {
      value: 100,
      secUnit: false
    },
    千: {
      value: 1000,
      secUnit: false
    },
    万: {
      value: 10000,
      secUnit: true
    },
    亿: {
      value: 100000000,
      secUnit: true
    }
  }
  var rtn = 0;
  var section = 0;
  var number = 0;
  var secUnit = false;
  var str = chnStr.split('');
  for (var i = 0; i < str.length; i++) {
    var num = chnNumChar[str[i]];
    if (typeof num !== 'undefined') {
      number = num;
      if (i === str.length - 1) {
        section += number;
      }
    } else {
      var unit = chnNameValue[str[i]].value;
      secUnit = chnNameValue[str[i]].secUnit;
      if (secUnit) {
        section = (section + number) * unit;
        rtn += section;
        section = 0;
      } else {
        section += (number * unit);
      }
      number = 0;
    }
  }
  return rtn + section;
}
// 文件生成拼音
function createPinyin(con) {
  var str = ''
  var s
  for (var i = 0; i < con.length; i++) {
    if (pydic.indexOf(con.charAt(i)) !== -1 && con.charCodeAt(i) > 200) {
      s = 1
      while (pydic.charAt(pydic.indexOf(con.charAt(i)) + s) !== ',') { // 获取首字母
        str += pydic.charAt(pydic.indexOf(con.charAt(i)) + s)
        s++
      }
      str += ' '
    } else {
      str += con.charAt(i)
    }
  }
  str = str.replace(/[，。？、：；‘’！“”]/g, ' ')
  // console.log(str)
  return str
}

function generateUUID() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

console.log = function () {} // 关闭所有打印
module.exports = {
  //模块的代码逻辑
  randomWord: randomWord, // 获取随机数 // 生成3-32位随机串：randomWord(true, 3, 32)// 生成43位随机串：randomWord(false, 43)
  formatTime: formatTime, // 时间戳转时间格式
  sliceUrl: sliceUrl, // 截取url里面的任意参数值，两个参数（第一个url，第二个参数名字）
  numTurnWord: numTurnWord, //　阿拉伯数字转文字
  wordTurnNum: wordTurnNum, // 文字数字转为阿拉伯数字
  createPinyin: createPinyin, // 文字转拼音
  generateUUID: generateUUID // uuid
}
//npm --force unpublish 你的模块名，来删除发布的模块（超过24小时就不能删除了）
// npm publish 模块名发布
//  npm login 登录npm  u:uijwuynpm p:123
// npm view 你的模块名，来查看模块是否发布成功
// npm update <name> -g 全局   npm update <name> --save 生产环境   npm update <name> --save-dev 开发环境

// npm config get registry 查看当前镜像
// npm config set registry=http://registry.npmjs.org // 改为npm镜像 发布 
// npm config set registry=https://registry.npm.taobao.org/  // 发布成功之后改回淘宝镜像
