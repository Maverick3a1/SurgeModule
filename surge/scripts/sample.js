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

// ==UserScript==
// @Name              网球规则[翻译]成Surge、QuantumultX、Loon脚本
// @Author            Cuttlefish
// @Tg group          https://t.me/ddgksf2013
// @WechatID          公众号墨鱼手记
// @UpdateTime        2022-05-03
// @ScriptURL         https://raw.githubusercontent.com/ddgksf2013/Cuttlefish/master/Crack/sample.js
// ==/UserScript==

// ==KeyExplain==
// @Function          text.replace(regexp/substr,replacement)
// @key1              待替换的关键字段1
// @key2              待替换的关键字段2
// @originalValue     字段key对应的原始value
// @replaceValue      字段key替换之后的value
// @/g                正则匹配时匹配多个key键值
// ==/KeyExplain==


var body = $response.body.replace(/"key1":originalValue/g, '"key1":replaceValue').replace(/"key2":originalValue/g, '"key2":replaceValue')
$done({ body });
