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

/**********************************************

> 应用名称：ahhhhfs网站净化
> 脚本作者：@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2024-01-28
> 通知频道：https://t.me/ddgksf2021
> 特别提醒：如需转载请注明出处，谢谢合作！
> 网站地址：https://www.ahhhhfs.com
> 脚本说明：去除网页推广、网页广告


[rewrite_local]

^https?:\/\/.*(xbwpys|ahhhhfs)\.com\/($|[0-9a-zA-Z_/]+\/$) url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/ahfs.js

[mitm]

hostname = *.xbwpys.com, *.ahhhhfs.com

**********************************************/





























var body = $response.body.replace(/<head>/, '<head><style>.top, .bottum, .sidebar-column, .m-menubar, .google-auto-placed, #rizhuti_v2_module_division-2, #related_posts, .post-note, .entry-share, .related-posts, #comments, #ad_position_box, .entry-copyright, .sidebar-wrapper, .home-division, #ri_home_division_widget-2, #ri_home_cmspost_widget-2, #ri_home_slider_widget-2, #ri_home_background_widget-2{display:none!important} </style>');
$done({ body });
