// service-worker.js
importScripts('/IndexDb/db.js');

const CACHE_NAME = 'v1'; // Change this value to invalidate the cache when needed
const DB_NAME = 'db-name';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'store';

// Firestore database data array
const firestoreDataArray = [
  { category: 'mountain', title: 'mountain1', url: 'https://firebasestorage.googleapis.com/v0/b/firegram-93fd0.appspot.com/o/snapshot%2Fmountain1.jpg?alt=media&token=d5aca630-a71b-424c-9986-1754223d24a4', timeStamp: Date.now(), id: 'mWm43e0oBfCjxUz6c7Pr' },
  { title: 'bird2', timeStamp: Date.now(), url: 'https://firebasestorage.googleapis.com/v0/b/firegram-93fd0.appspot.com/o/snapshot%2Fbird2.jpg?alt=media&token=778af372-8b2c-41b8-93bd-59292a7aaf82', category: 'bird', id: 'OQ4vFFxLQzJKHg6gNgQX' },
  { title: 'bird1', category: 'bird', timeStamp: Date.now(), url: 'https://firebasestorage.googleapis.com/v0/b/firegram-93fd0.appspot.com/o/snapshot%2Fbird1.jpg?alt=media&token=cffa6106-2fa3-4cb8-857f-9dde987ca45d', id: 'aPu6165nouzYzRex3jo6' }
];

// Install event: Cache the assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(['/index.html', '/offline.html'])) // Add other important assets here
      .then(() => self.skipWaiting())
  );
});

// Create IndexedDB and object store
function createIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'timeStamp' });
      }
    };

    request.onsuccess = event => {
      resolve(event.target.result);
    };

    request.onerror = event => {
      reject(event.error);
    };
  });
}

// Store Firestore data in IndexedDB
function storeInIndexedDB(dataArray) {
  return new Promise((resolve, reject) => {
    createIndexedDB().then(db => {
      const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      transaction.oncomplete = event => {
        resolve();
      };

      transaction.onerror = event => {
        reject(event.error);
      };

      dataArray.forEach(data => {
        objectStore.put(data);
      });
    });
  });
}


// Fetch event: Intercept network requests
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Handle Firestore data here
  if (firestoreDataArray.some(data => data.url === requestUrl.href)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the response dynamically only if the fetch is successful (status code 200)
          if (response.ok) {
            const clonedResponse = response.clone();
            clonedResponse.json().then(jsonData => {
              // Store data in IndexedDB
              if ('indexedDB' in self) {
                //storeInIndexedDB([jsonData]);
                storeDataInIndexDB([jsonData]) // Implement this function to store data in IndexedDB
              }
            });
          }

          return response; // Return the original response with JSON data
        })
        .catch(() => {
          // If fetch fails, try to serve from IndexedDB
          return readFromIndexedDB(event.request); // Implement this function to read data from IndexedDB
        })
    );
  } else {
    // For other requests, use the default fetch behavior
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});

// Read data from IndexedDB
function readFromIndexedDB(request) {
  return new Promise((resolve, reject) => {
    createIndexedDB().then(db => {
      const transaction = db.transaction(OBJECT_STORE_NAME, 'readonly');
      const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

      const imageUrl = request.url;
      const getRequest = objectStore.get(imageUrl);

      getRequest.onsuccess = event => {
        const data = event.target.result;
        if (data) {
          const response = new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
          resolve(response);
        } else {
          resolve(caches.match('/offline.html')); // Return offline page if data not found in IndexedDB
        }
      };

      getRequest.onerror = event => {
        reject(event.error);
      };
    });
  });
}

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});
