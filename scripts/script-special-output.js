

const specialCards = document.querySelector(".special__cards");


fetch("./data/specialPeople.json")
.then(data => data.json())
.then(data => handleSpeacials(data))
.catch(err => {
    console.error(err)
    notifEvent.error("Ошибка загрузки работников");
})


function handleSpeacials(data) {
    // В ПЕРЕМЕННОЙ "data" ЛЕЖИТ СПИСОК РАБОТНИКОВ
    // ВЫВОЖУ Я ИХ С ПОМОЩЬЮ ВСТРОЕННОГО МЕТОДА ПО ПЕРЕБОРУ СПИСКОВ
    //   ˅˅˅˅˅˅˅
    data.forEach(user => {
        const articleEl = document.createElement("article");
    
        articleEl.className = "card special__card";
        articleEl.innerHTML = `
        <img src="${user.imgSrc}" alt="" width="500">
        <h4>${user.name}</h4>
        <hr>
        <button class="sign__btn">Записаться</button>
        <p>${user.description}</p>
    `

        specialCards.appendChild(articleEl);
    })
}


console.log('Скрипт: "script-special-output.js" отработал');