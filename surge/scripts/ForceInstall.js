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


const url = $request.url
 const responseBody = $response.body
 
     ; (async () => {
         const regeList = /.*?\/v3\/accounts\/.+?\/apps$/
         const regeMainPage = /.*?\/v2\/accounts\/.+?\/apps\/.+?\/builds\/.+/
         const regBiulds = /.*?\/v2\/accounts\/.+?\/apps\/.+?\/platforms\/ios\/trains\/.+?\/builds/
         if (regeList.test(url)) {
             $done({ body: list(responseBody) })
             return
         }
 
         if (regeMainPage.test(url)) {
             if (url.endsWith("install")) {
                 console.log("is install")
                 $done({ body: responseBody })
                 return
             }
 
             $done({ body: info(responseBody) })
             return
         }
 
         if (regBiulds.test(url)) {
             $done({ body: builds(responseBody) })
             return
         }
     })()
         .catch(error => {
             console.log(error)
         }).finally(() => $done())
 
 function info(responseBody) {
     let body = JSON.parse(responseBody)
     let family = {
         "name": "Mac",
         "unsupportedDevices": [
         ],
         "minimumSupportedDevice": null
     }
 
     for (const build of body.data.builds) {
         build.platformCompatible = true
         build.hardwareCompatible = true
         build.compatible = true
         build.permission = "install"
 
 
         build.compatibilityData.compatibleDeviceFamilies.push(family)
     }
 
     let build = body.data.currentBuild
     build.platformCompatible = true
     build.hardwareCompatible = true
     build.compatible = true
     build.permission = "install"
 
 
     build.compatibilityData.compatibleDeviceFamilies.push(family)
     return JSON.stringify(body)
 }
 
 function list(responseBody) {
     if (responseBody === "") {
         $done({ body: responseBody })
     }
 
     let body = JSON.parse(responseBody)
 
     for (const app of body.data) {
         for (const p of app.platforms) {
             if (p.name === "ios") {
                 console.log(p.build.name)
                 p.build.hardwareCompatible = true
                 p.build.compatible = true
             }
         }
     }
 
     return JSON.stringify(body)
 }
 
 function builds(responseBody) {
     let body = JSON.parse(responseBody)
     if (body.error === null) {
         for (const build of body.data) {
             if (build.platform === "ios") {
                 build.compatible = true
             }
         }
     }
 
     return JSON.stringify(body)
 }
