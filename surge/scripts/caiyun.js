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

/*
彩云天气@wf021325[灰灰佬]
真实VIP客户提取Token，仅用作备份，请引用原作者重写，如下链接
https://raw.githubusercontent.com/wf021325/qx/master/js/caiyun.js

https://biz.cyapi.cn/v2/user?app_name=weather
https://biz.cyapi.cn/v1/visitors
https://biz.cyapi.cn/v3/login_by_code 登录

====================================
[rewrite_local]
^https:\/\/biz\.cyapi\.cn\/v\d\/(user\?app_name=weather|visitors|login_by_code)$ url script-response-body https://raw.githubusercontent.com/wf021325/qx/master/js/caiyun.js

[mitm]
hostname = biz.cyapi.cn
====================================

 */
var url   = $request.url;
var obj   = JSON.parse($response.body);
let Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJ1c2VyX2lkIjoiNWY1YmZjNTdkMmM2ODkwMDE0ZTI2YmI4Iiwic3ZpcF9leHBpcmVkX2F0IjoxNzA1MzMxMTY2LjQxNjc3MSwidmlwX2V4cGlyZWRfYXQiOjB9.h_Cem89QarTXxVX9Z_Wt-Mak6ZHAjAJqgv3hEY6wpps";

if (url.indexOf('/user') != -1 || url.indexOf('/visitors') != -1) {
		obj.result.token = Token;
	  body = JSON.stringify(obj);
}

if (url.indexOf('/login_by_code') != -1) {
	let obj = {"status":"ok","result":{"is_phone_verified":true,"token":Token},"rc":0}
	body = JSON.stringify(obj);
}
$done({body});
