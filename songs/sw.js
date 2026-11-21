const C='moelodie-3';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;const same=new URL(e.request.url).origin==location.origin;
 e.respondWith(caches.open(C).then(async c=>{const r=await c.match(e.request);
  if(!same&&r)return r;
  const f=fetch(e.request,same?{cache:'no-cache'}:undefined).then(n=>{if(n.ok||n.type=='opaque')c.put(e.request,n.clone());return n});
  if(!r)return f;
  return Promise.race([f.catch(()=>r),new Promise(res=>setTimeout(()=>res(r),3000))])}))});
