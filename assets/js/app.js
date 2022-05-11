// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker
//       .register('./serviceWorker.js')
//       .then((registration) => registration.update())
//       .catch((err) => console.log('service worker not registered', err));
//   });
// }
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const { log } = console;
const info = log;

let timerInterval = null;
