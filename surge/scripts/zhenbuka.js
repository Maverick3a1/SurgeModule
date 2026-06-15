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

/* 公众号墨鱼手记 crated by ddgksf2013 on 2023-062-17 */

var body = $response.body.replace(/<head>/, '<head><style>img#hth,img#hth616,div[style*="line-height: 21px"],div#layui-layer1,div#layui-layer-shade1,div.marquee_outer,img#ad_img,img#buka888,iframe[id^=buffer],span.more.text-muted.pull-right,ul.more-btn,a[target^="_blank"],div.jq-toast-wrap,img#tj,img[src*=".gif"]{display:none!important} </style>')
                         .replace(/'159140'/g, "'259140'")
                         .replace(/\<div  class=\"item stui-banner__item[\s\S]*html[\s\S]*?\<\/div\>/g, "")
                         .replace(/img id="ik\d+"/g, 'img id="ddgksf2013"');
$done({ body });
