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

let url = $request.url
let regex = /mid=(\d*)/
let mid= regex.exec(url)
let api = `https://api.bilibili.com/x/space/arc/search?${mid[0]}&ps=10&tid=0&pn=1&keyword=&order=click&jsonp=jsonp`
var Url = {
    url: api,
    method: "GET"
};

$task.fetch(Url).then(response => {
  body=JSON.parse(response.body)
  let info=""
  body['data']['list']['vlist'].forEach((element, index)=> {
      index++
      let scheme=`bilibili://av/${element['aid']}`
      let play=element['play']
      info+=index+": "+element['title']+"\n"+scheme+"\n"
  })
  $notify('播放排行前10','长按进入', info);
  $done({});
}, reason => {
  $notify("播放排行获取失败", "", reason.error);
  $done({});
});