// Surge compatibility shim for scripts originally written for Quantumult X.
if (typeof $task === "undefined" && typeof $httpClient !== "undefined") {
  var $task = {
    fetch(options) {
      return new Promise((resolve, reject) => {
        if (typeof options === "string") options = { url: options };
        const method = String(options.method || "GET").toLowerCase();
        const runner = $httpClient[method] || $httpClient.get;
        runner(options, (error, response, body) => {
          if (error) {
            reject({ error });
          } else {
            response = response || {};
            resolve({
              statusCode: response.status || response.statusCode,
              status: response.status || response.statusCode,
              headers: response.headers || {},
              body,
            });
          }
        });
      });
    },
  };
}
if (typeof $prefs === "undefined" && typeof $persistentStore !== "undefined") {
  var $prefs = {
    valueForKey: (key) => $persistentStore.read(key),
    setValueForKey: (value, key) => $persistentStore.write(value, key),
  };
}
if (typeof $notify === "undefined" && typeof $notification !== "undefined") {
  var $notify = (title, subtitle, body, options) =>
    $notification.post(title, subtitle, body, options);
}

// 创建 Date 对象实例，表示当前时间
var now = new Date();

// 获取年份
var year = now.getFullYear();

// 获取月份（0 到 11，0 表示一月）
var month = now.getMonth() + 1;  // 需要加 1，因为月份从 0 开始

// 获取日期（1 到 31）
var day = now.getDate();

// 获取小时（0 到 23）
var hours = now.getHours();

// 获取分钟（0 到 59）
var minutes = now.getMinutes();

// 获取秒数（0 到 59）
var seconds = now.getSeconds();

// 格式化年、月、日、小时、分钟和秒数
var formattedDateTime = year + "-" + padNumber(month) + "-" + padNumber(day) + " " + padNumber(hours) + ":" + padNumber(minutes) + ":" + padNumber(seconds);

// 打印结果
console.log("当前时间：" + formattedDateTime);

// 在数字前面补零，保证两位数的格式
function padNumber(number) {
  return ("0" + number).slice(-2);
}
