// components/ServiceWorker.js

import { useEffect } from 'react';

const ServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log('Service worker registered:', registration);
          })
          .catch(error => {
            console.error('Error registering service worker:', error);
          });
      });
    }
  }, []);

  return null;
};

export default ServiceWorker;
