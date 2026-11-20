const C='schalmei-1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;
 e.respondWith(caches.open(C).then(async c=>{const r=await c.match(e.request);
  const f=fetch(e.request).then(n=>{if(n.ok||n.type=='opaque')c.put(e.request,n.clone());return n}).catch(()=>r);return r||f}))});
