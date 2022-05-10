// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function () {
//     navigator.serviceWorker
//       .register("/serviceWorker.js")
//       .then((res) => console.log("service worker registered"))
//       .catch((err) => console.log("service worker not registered", err));
//   });
// }
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function type(variable, type = "string") {
  if (type == typeof variable) {
    return true;
  }

  throw new Error("Type of variable doesn't match corresponding criteria!");
  return false;
}
function hidePage(target) {
  $(`#${target}`).classList.remove("active");
  return true;
}

function showPage(target) {}
function gotoPage(target) {
  type(target, "string");

  $("section.active");
}
