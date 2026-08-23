var CACHE = "castle:v19";
var ASSETS = ["./", "./index.html" , './audio/seg_0.js?v=4', './audio/seg_1.js?v=4', './audio/seg_2.js?v=4', './audio/seg_3.js?v=4', './audio/seg_4.js?v=4', './audio/seg_5.js?v=4', './audio/seg_6.js?v=4', './audio/seg_7.js?v=4', './audio/seg_8.js?v=4', './audio/seg_9.js?v=4', './audio/seg_10.js?v=4', './audio/seg_11.js?v=4', './audio/seg_12.js?v=4', './audio/seg_13.js?v=4', './audio/seg_14.js?v=4', './audio/seg_15.js?v=4', './audio/seg_16.js?v=4', './audio/seg_17.js?v=4', './audio/seg_18.js?v=4', './audio/seg_19.js?v=4', './audio/seg_20.js?v=4', './audio/seg_21.js?v=4', './audio/seg_22.js?v=4', './audio/seg_23.js?v=4', './audio/seg_24.js?v=4', './audio/seg_25.js?v=4', './audio/seg_26.js?v=4', './audio/seg_27.js?v=4', './audio/seg_28.js?v=4', './audio/seg_29.js?v=4', './audio/seg_30.js?v=4', './audio/seg_31.js?v=4', './audio/seg_32.js?v=4', './audio/seg_33.js?v=4', './audio/seg_34.js?v=4', './audio/seg_35.js?v=4', './audio/seg_36.js?v=4', './audio/seg_37.js?v=4', './audio/seg_38.js?v=4', './audio/seg_39.js?v=4', './audio/seg_40.js?v=4', './audio/seg_41.js?v=4', './audio/seg_42.js?v=4', './audio/seg_43.js?v=4'];
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    return Promise.all(ASSETS.map(function(a){
      return c.add(a).catch(function(_){ });
    }));
  }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== CACHE; })
      .map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if(url.origin !== self.location.origin) return;
  // 实时 API 走 network-only,不缓存
  if(url.pathname.indexOf("/api/") === 0){
    e.respondWith(fetch(e.request).catch(function(){ return new Response(JSON.stringify({ok:false,err:"offline"}), {headers:{"Content-Type":"application/json"}}); }));
    return;
  }
  var isAsset = url.pathname.indexOf("/audio/") === 0 || url.pathname.slice(-3) === ".js";
  if(isAsset){
    e.respondWith(caches.match(e.request).then(function(hit){
      return hit || fetch(e.request);
    }));
  } else {
    e.respondWith(fetch(e.request).then(function(r){
      var cp = r.clone(); caches.open(CACHE).then(function(c){ c.put(e.request, cp); });
      return r;
    }).catch(function(){
      return caches.match(e.request, {ignoreSearch: true}).then(function(hit){
        return hit || caches.match("./index.html");
      });
    }));
  }
});
