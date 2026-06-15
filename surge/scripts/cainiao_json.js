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
> 应用名称：菜鸟净化[原菜鸟裹裹]
> 脚本作者：@ddgksf2013
> 微信账号：墨鱼手记
> 更新时间：2025-04-07
> 通知频道：https://t.me/ddgksf2021
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/	  





const version = 'V1.0.21';


var ddgksf2013=JSON.parse($response.body);if(-1!=$request.url.indexOf("mtop.cainiao.nbpresentation.protocol.homepage.get.cn"))ddgksf2013.data?.result?.dataList?.length>0&&(ddgksf2013.data.result.dataList=ddgksf2013.data.result.dataList.filter(a=>!("big_banner_area_v870"==a.type||"todo_list_v860"==a.type)));else if(-1!=$request.url.indexOf("mtop.cainiao.app.e2e.engine")){let a=["banner","activity","asset","vip","wallet"];for(let d of a)ddgksf2013.data?.data?.[d]&&delete ddgksf2013.data.data[d]}else if(-1!=$request.url.indexOf("mtop.cainiao.nbpresentation.homepage.merge.get.cn"))for(let i=0;i<4;i++){let t=`mtop.cainiao.nbpresentation.protocol.homepage.get.cn@${i}`;ddgksf2013.data?.[t]?.data?.result?.dataList?.length>0&&(ddgksf2013.data[t].data.result.dataList=ddgksf2013.data[t].data.result.dataList.filter(a=>!("big_banner_area_v870"==a.type||"todo_list_v860"==a.type)))}else -1!=$request.url.indexOf("mtop.cainiao.guoguo.nbnetflow.ads.mshow")?(ddgksf2013.data["1308"]&&delete ddgksf2013.data["1308"],ddgksf2013.data["1275"]&&delete ddgksf2013.data["1275"],ddgksf2013.data["205"]&&delete ddgksf2013.data["205"]):-1!=$request.url.indexOf("mtop.cainiao.guoguo.nbnetflow.ads.index.cn")?ddgksf2013.data?.result&&(ddgksf2013.data.result=[{}]):-1!=$request.url.indexOf("mtop.cainiao.adkeyword")&&ddgksf2013.data?.result?.adHotKeywords&&(ddgksf2013.data.result.adHotKeywords=[]);var body=JSON.stringify(ddgksf2013);$done({body});
