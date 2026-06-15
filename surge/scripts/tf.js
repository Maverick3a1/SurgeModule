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

//下载启动
if (/^https?:\/\/testflight\.apple\.com\/v2\/accounts\/.*\/apps\/\d*\/builds\/\d*\/install/.test(url)) {
	var tmp= $request.url.match(/apps\/\d*\/builds\/\d*\/install/g);
	modifiedPath = '/v2/accounts/'+modifiedPath+'/'+tmp[0];
}
//点开新tf+接受tf
if (/^https?:\/\/testflight\.apple\.com\/v3\/accounts\/[a-z0-9_-]+\/ru\/[a-zA-Z0-9_-]+/.test(url)) {
	var tmp= $request.url.match(/ru\/.*/g);
	modifiedPath = '/v3/accounts/'+modifiedPath+'/'+tmp[0];
//console.log(modifiedPath);
	
}
//个人页面
if (/^https?:\/\/testflight\.apple\.com\/v3\/accounts\/[a-z0-9_-]+\/apps/.test(url)) {
	var tmp= $request.url.match(/apps.*/g);
modifiedPath = '/v3/accounts/'+modifiedPath+'/'+tmp[0];
	
}
//单个tf页面
if (/^https?:\/\/testflight\.apple\.com\/v2\/accounts\/.*\/apps\/\d*\/builds\/\d*$/.test(url)) {
	var tmp= $request.url.match(/apps\/\d*\/builds\/\d*$/g);
	modifiedPath = '/v2/accounts/'+modifiedPath+'/'+tmp[0];
	
}
//单个tf历史build页面
if (/^https?:\/\/testflight\.apple\.com\/v2\/accounts\/.*\/apps\/\d*\/platforms\/ios\/trains/.test(url)) {
	var tmp= $request.url.match(/apps\/\d*\/platforms\/ios\/trains.*/g);
	modifiedPath = '/v2/accounts/'+modifiedPath+'/'+tmp[0];

}

$done({path: modifiedPath, headers : modifiedHeaders});