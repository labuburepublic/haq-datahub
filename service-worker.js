// service-worker.js

self.addEventListener("install", (event) => {
  console.log("HAQ DataHub service worker installed.");
});

self.addEventListener("activate", (event) => {
  console.log("HAQ DataHub now active.");
});

self.addEventListener("fetch", (event) => {
  // For offline cache, we'll do real logic later
});