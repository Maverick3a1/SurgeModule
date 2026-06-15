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

/***********************************************
> 应用名称：墨鱼自用deleteHeader脚本
> 脚本作者：@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2024-10-11
> 通知频道：https://t.me/ddgksf2021
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/	

const version = 'V1.0.2';


function deleteHeader(e,d){for(var r in e)if(r.toLowerCase()===d.toLowerCase()){delete e[r];return}}var modifiedHeaders=$request.headers;deleteHeader(modifiedHeaders,"X-AEAPI"),$done({headers:modifiedHeaders});
