const CACHE_NAME = 'bawsala-v1.1'; // <-- قم بتغيير هذا الرقم مع كل تحديث، مثلاً v1.2
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://i.ibb.co/0ps8mJYR/Explicit-teaching-logo5.webp',
  '/manifest.json' // تأكد من وجود هذا الملف
];

// حدث التثبيت: تخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// حدث الرسالة: الاستماع لأمر التحديث من التطبيق
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// حدث الجلب: تقديم الملفات من الكاش أولاً
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش، قم بإرجاعه
        if (response) {
          return response;
        }
        // وإلا، قم بجلبه من الشبكة
        return fetch(event.request);
      })
  );
});
