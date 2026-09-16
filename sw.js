/* Service worker: deja la app disponible sin conexión.
   Sube el número de CACHE cada vez que publiques cambios. */
const CACHE='entreno-v1';
const ARCHIVOS=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
/* Responde desde caché al instante y actualiza en segundo plano: la versión nueva se ve al siguiente arranque.
   cache:'no-cache' obliga a revalidar con el servidor (si no, la caché HTTP del navegador devolvería la copia vieja). */
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    const cacheado=await c.match(e.request,{ignoreSearch:true});
    const red=fetch(e.request.url,{cache:'no-cache'}).then(r=>{if(r.ok)c.put(e.request,r.clone());return r;}).catch(()=>cacheado);
    return cacheado||red;
  }));
});
