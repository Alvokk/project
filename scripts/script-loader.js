
const loader = document.querySelector(".loader");
const rootEl = document.querySelector("#root");

setTimeout(() => {
    loader.style.display = "none";
    rootEl.style.display = "block";
}, 2000)




console.log('Скрипт: "script-loader.js" отработал');