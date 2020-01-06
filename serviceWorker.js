const filesCache = 'fileCache',
    imagesCache = 'imagesCache',
    imageFiles = ['./images/Android-icon512.png', './images/catplainicon_97046_256.png', './images/catplainicon_97046(1)128.png',
        './images/catplainicon_97046(1)144.png', './images/catplainicon_97046(1)168.png', './images/catplainicon_97046(1)192.png',
        './images/catplainicon_97046(2)96.png', './images/catplainicon_97046(3)72.png', './images/catplainicon_97046(4)64.png',
        './images/catplainicon_97046(5)48.png', './images/daniel-mirlea-_7IUgAL60nc-unsplash.jpg',
        './images/eberhard-grossgasteiger-TMHL7wald8I-unsplash.jpg', './images/martin-schmidli-mGy1Jjr2e6M-unsplash.jpg',
        './images/raquel-garcia-BAiSZDx4LgE-unsplash.jpg', './images/willian-justen-de-vasconcellos-lzOzsGmAg3s-unsplash.jpg'],
    resources = ['./', './index.html', './scripts/main.js', './styles/style.css'],
    cacheList = [filesCache, imagesCache];

self.addEventListener('install', (e) => {
    e.waitUntil(
        /* Create separate caches for images and other files */
        caches.open(filesCache).then(cache => {
            Promise.all([(cache.addAll(resources)), (caches.open(imagesCache).then(images => images.addAll(imageFiles)))])
                .then(reso => reso);
        })
    )
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        /* Delete previous versions of caches */
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        /* Fetch data from cache or get them from network */
        caches.match(e.request).then(mat => {
            return mat || fetch(e.request); 
        })
    )
});
