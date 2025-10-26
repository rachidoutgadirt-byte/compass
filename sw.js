// sw.js

const CACHE_NAME = 'Compass';
// قائمة الملفات الأساسية التي يحتاجها التطبيق ليعمل دون اتصال
const URLS_TO_CACHE = [
  './', // يمثل ملف index.html في الجذر
  './manifest.json',
  'https://i.ibb.co/0ps8mJYR/Explicit-teaching-logo5.webp', // أيقونة التطبيق
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap' // خطوط جوجل
];

// 1. حدث التثبيت: يتم تشغيله عند تثبيت عامل الخدمة لأول مرة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// 2. حدث الجلب: يتم تشغيله في كل مرة يطلب فيها التطبيق ملفًا (صفحة، صورة، إلخ)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجدنا الملف في ذاكرة التخزين المؤقت، نعيده مباشرة
        if (response) {
          return response;
        }
        // إذا لم نجده، نطلبه من الشبكة
        return fetch(event.request);
      })
  );
});