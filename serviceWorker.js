let cacheName = 'sample',
    resources = ['./','./manifest.json', './scripts/main.js', './styles/style.css', './images/Android-icon512.png',
        './images/catplainicon_97046_256.png', './images/catplainicon_97046(1)128.png', './images/catplainicon_97046(1)144.png',
        './images/catplainicon_97046(1)168.png', './images/catplainicon_97046(1)192.png', './images/catplainicon_97046(2)96.png',
        './images/catplainicon_97046(3)72.png', './images/catplainicon_97046(4)64.png', './images/catplainicon_97046(5)48.png',
        './images/daniel-mirlea-_7IUgAL60nc-unsplash.jpg', './images/eberhard-grossgasteiger-TMHL7wald8I-unsplash.jpg',
        './images/martin-schmidli-mGy1Jjr2e6M-unsplash.jpg', './images/raquel-garcia-BAiSZDx4LgE-unsplash.jpg',
        './images/willian-justen-de-vasconcellos-lzOzsGmAg3s-unsplash.jpg'];

self.addEventListener('install', function (e) {
        e.waitUntil(
            caches.open(cacheName).then((cache) => {
                return cache.addAll(resources);
            })
        );
    console.log('Service worker installed')
    });

self.addEventListener('activate', function () {
    clients.claim();
    console.log('Service worker activated');
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(mat => {
            return mat || fetch(e.request);
        })
    )

    e.waitUntil(
        async function() {
            const cache = await caches.open(cacheName);
            const networkRes = await fetch(e.request);
            await cache.put(e.request, networkRes.clone())
        }
        // caches.open(cacheName).then(fetch(e.request))
        // .then(cache => cache.put(e.request, response.clone()))
    )

    console.log('Assets retrieved')
    // console.log(update)
});