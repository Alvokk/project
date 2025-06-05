






/*

    ЗАДАНИЕ 3.1 - 1) ПРОВЕРЬТЕ ФАЙЛ README.MD, ТАМ ВСЯ ДИНАМИКА ОПИСАНА; 2) ФАЙЛЫ/СКРИПТЫ УСПЕШНО ПОДКЛЮЧАЮТСЯ - В КОНСОЛЬ СООБЩЕНИЕ ВЫВОДИТСЯ; 3) бАЗОВЫЙ СЦЕНАРИЙ ПРОПИСАН !!!
    ЗАДАНИЕ 3.2 - 1) СФОРМИРОВАНА ОДНА БЛОК-СХЕМА НА ВЫБОР ПО ДИНАМИЧЕСКОЙ СОСТАВЛЯЮЩЕЙ - ЛЕЖИТ В ПАПКЕ "images" с названием "Block-schema.png"; 2) ИМЕЮТСЯ СЛУШАТЕЛИ СОБЫТИЙ НА "click" и "input"; 3) кОММЕНТАРИИ ЕСТЬ, БЛОК СХЕМА ЕСТЬ, ПЕРЕМЕННЫЕ ЕСТЬ !!!
    ЗАДАНИЕ 3.3 - 1) СОЗДАНИЕ БЛОК СХЕМЫ ЗАВЕРШЕНО; 2) ВЕТВЛЕНИЯ ИМЕЮТСЯ, ЦИКЛЫ ИМЕЮТСЯ (".map()", ".filter()", ".forEach()") !!!
    ЗАДАНИЕ 3.4 - 1) ИМЕЕТСЯ СПИСОК РАБОТНИКОВ В ПАПКЕ "data" С НАЗВАНИЕМ "specialPeople.json", К НИМ Я ДЕЛАЮ ЗАПРОС ЧЕРЕЗ "fetch" И ВЫВОЖУ - ВЕСЬ СЦЕНАРИЙ ПРОПИСАН В ОТДЕЛЬНОМ СКРИПТЕ - "script-special-output-.js"; 2) ИМЕЮТСЯ ВСПЛЫВАЮЩИЕ ФОРМЫ - МОДАЛЬНЫЕ ОКНА (131 СТРОКА НАЧ.), ПЛАШКА ДЛЯ УВЕДОМЛЕНИЙ (71 СТРОКА НАЧ.), ПО КОТОРОЙ ОПИСАНА БЛОК СХЕМА !!!
    ЗАДАНИЕ 3.5 - !!! (HTML КОД 745 СТРОКА НАЧ.) !!! ПРОДОЛЖЕНИЕ 3.4 ПЕРВОЙ ЧАСТИ ЗАДАНИЯ С РАБОТНИКАМИ - ВСЁ СДЕЛАНО - HTML КОД С РАБОТНИКАМИ ЗАКОММЕНТИРОВАН, ВСЕХ РАБОТНИКОВ ПЕРЕНЁС В .JSON ФАЙЛ !!!
    ЗАДАНИЕ 3.6 - 1) ПРОДОЛЖЕНИЕ 3.4 И 3.5 - РАБОТА С "fetch" ИМЕЕТСЯ, ОТДЕЛЬНЫЙ JSON ФАЙЛ ИМЕЕТСЯ, ДАННЫЕ В СПИСКЕ ИМЕЮТСЯ, ДАННЫЕ ОТОБРАЖАЮТСЯ (ЕСТЕСТВЕННО НАДО ЗАПУСКАТЬ СЕРВЕР); 2) ПРЕДЗАГРУЗЧИК ИМЕЕТСЯ, НУ И ЧТО, ЧТО ФАЙЛ CSS НЕ КАК ВАС НАЗЫВАЕТСЯ, ИЛИ ЭТО СДЕЛАНО НЕ КАК У ВАС ТАМ ОПИСАНО, ПРЕДЗАГРУЗЧИК ЕСТЬ, СТИЛИ ЕСТЬ, БАЗОВЫЙ СЦЕНАРИЙ ЕСТЬ (ПРОПИСАН В ОТДЕЛЬНОМ ФАЙЛЕ - "script-loader.js"), ВСЁ РАБОТАЕТ, ИСПОЛЬЗОВАНИЕ ТАЙМЕРА ИМЕЕТСЯ, ИСПОЛЬЗОВАНИЕ ТАЙМЕРА ИМЕЕТСЯ ЕЩЁ В ДИНАМИЧЕСКОЙ СОСТАВЛЯЮЩЕЙ С УВЕДОМЛЕНИЯМИ (71 СТРОКА НАЧ.) !!!
    ЗАДАНИЕ 3.7 - 1) ИСПОЛЬЗОВАНИЕ СТОРОННЕЙ БИБЛИОТЕКИ ДЛЯ САЙДЕРА ИМЕЕТСЯ; 2) ИСПОЛЬЗОВАНИЕ ХРАНИЛИЩА ИМЕЕТСЯ - РЕГИСТРАЦИЯ И ВХОД В ПРИЛОЖЕНИЕ (ТОЛЬКО ИСПОЛЬЗУЕТСЯ СЕССИОННОЕ ХРАНИЛИЩЕ, А НЕ ЛОКАЛЬНОЕ, ЧТОБЫ ЗАХЛОМЛЯТЬ ДАННОЕ ХРАНИЛИЩЕ) !!!

*/

















// кнопка для записи, которая должна открыть модальное окно
const signBtns = document.querySelectorAll(".sign__btn");

// кнопки авторизации, регистрации
const signInBtn = document.querySelector(".sign-in__btn");
const signUpBtn = document.querySelector(".sign-up__btn");


// модальныее окна
const modalSignBtnWindow = document.querySelector(".modal-sign__btn-window");
const modalSignUpWindow = document.querySelector(".modal-sign__up-window");
const modalSignInWindow = document.querySelector(".modal-sign__in-window");

// кнопка для хакрытия модального окна
const modalCloseBtns = document.querySelectorAll(".modal__close");

// далее плашка, которое будет уведомлять об успешном и не успешном действиях
// вылезает с анимацией в верхнем правом углу
const notification = document.querySelector(".notification");
const notifContent = document.querySelector(".notif-content");
const notifText = document.querySelector(".notif-text");
// убрать плашку
const notifClose = document.querySelector(".notif-close");


// внутри лежат две кнопки - регистрации и входа
const headerButtons = document.querySelector(".header__buttons");
const headerName = document.querySelector(".header__name");





// Блок схема находится в папке "images" с названием - "Block-schema.png"
// событие на клик - закрыть плашку увед.
notifClose.addEventListener("click", () => {
    notification.classList.remove("active");
});


// будем ложить setTimeOut и очищать
let timeOut = 0;

const notifEvent = {
    success(str) {
        // контент
        notifText.innerText = str;
        // класс для анимации появления
        notification.classList.add("active");
        // далее убираем, добавляем успешное и не успешное отображение уведомления
        notifContent.classList.remove("notif-error");
        notifContent.classList.add("notif-success");

        // после 5 секунд убираем автоматически плашку с уведомлением
        timeOut = setTimeout(() => {
            notification.classList.remove("active");
            clearTimeout(timeOut);
        }, 5000);
    },
    error(str) {
        // контент
        notifText.innerText = str;
        // класс для анимации появления
        notification.classList.add("active");
        // далее убираем, добавляем успешное и не успешное отображение уведомления
        notifContent.classList.remove("notif-success");
        notifContent.classList.add("notif-error");

        // после 5 секунд убираем автоматически плашку с уведомлением
        timeOut = setTimeout(() => {
            notification.classList.remove("active");
            clearTimeout(timeOut);
        }, 5000);
    }
}



// хранилище данных
const storage = {
    save: function(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    load: function(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    clear: function(key) {
        localStorage.removeItem(key);
    }
};



// функция для закрытия модального окна
function actionModalClose() {
    modalSignBtnWindow.style.display = "none";
    modalSignInWindow.style.display = "none";
    modalSignUpWindow.style.display = "none";
}

// событие на клик - закрытие модального окна
modalCloseBtns.forEach(btn => btn.addEventListener("click", actionModalClose));



// хранилище конфиденциальных данных
const storageAuth = {
    save: function(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    },
    load: function(key) {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    clear: function(key) {
        sessionStorage.removeItem(key);
    }
};




// middleware, отвечающий за авторизацию
function handleAuthMiddleware() {
    const isAuth = storageAuth.load("isAuth");
    if (!isAuth) {
        return false;
    }

    const authSessionData = storageAuth.load("auth-session-data");
    if (!authSessionData) {
        storageAuth.save("isAuth", false);
        return false;
    }

    return true;
}

// действия на авторизированног пользователя
function handleAuthorizedUser() {
    headerButtons.style.display = "none";

    // const authSessionData = storageAuth.load("auth-session-data");
    headerName.style.display = "block";
}

// проверка, авторизован лии пользователь
if (handleAuthMiddleware()) {
    handleAuthorizedUser();
}

headerName.addEventListener("click", () => {
    window.location.replace("./profile.html");
})


// регистрация
function handleSubmitSignUp(e) {
    e.preventDefault();

    const form = e.target;

    const nameEl = form.elements.name;
    const emailEl = form.elements.email;
    const passwordEl = form.elements.password;
    const passwordRepeatEl = form.elements.passwordRepeat;

    const name = nameEl.value;
    const email = emailEl.value;
    const password = passwordEl.value;
    const passwordRepeat = passwordRepeatEl.value;

    if (!name ||
        !email ||
        !password ||
        !passwordRepeat
    ) {
        notifEvent.error("Не все поля заполнены!");
        return;
    }

    if (name.length < 3) {
        notifEvent.error("Длиная имени должна составлять минимум 3 символа!");
        return;
    }

    if (email.length < 6) {
        notifEvent.error("Длиная email должна составлять минимум 6 символов!");
        return;
    }

    if (password.length < 6) {
        notifEvent.error("Длиная пароля должна составлять минимум 6 символов!");
        return;
    }

    if (password != passwordRepeat) {
        notifEvent.error("Пароли не сопадают!");
        return;
    }


    const usersData = storageAuth.load("users") || [];
    
    const isUser = !!usersData.filter(user => user.email == email).length;
    if (isUser) {
        notifEvent.error("Данный E-mail уже зарегистрирован!");
        return;
    }
    
    // success register
    storageAuth.save("users", [...usersData, {
        name,
        email,
        password
    }]);
    notifEvent.success("Вы успешно зарегистрировались!");

    nameEl.value = "";
    emailEl.value = "";
    passwordEl.value = "";
    passwordRepeatEl.value = "";

    modalSignUpWindow.style.display = "none";
    modalSignInWindow.style.display = "block";
}


// вход
function handleSubmitSignIn(e) {
    e.preventDefault();

    const form = e.target;
    console.log(form);

    const emailEl = form.elements.email;
    const passwordEl = form.elements.password;

    const email = emailEl.value;
    const password = passwordEl.value;

    if (!email ||
        !password
    ) {
        notifEvent.error("Не все поля заполнены!");
        return;
    }

    const usersData = storageAuth.load("users") || [];
    const isUsers = usersData.filter(user => user.email == email && user.password == password);
    if (!isUsers.length) {
        notifEvent.error("Некорректно введённые данные!");
        return;
    }
    const authData = isUsers[0];

    notifEvent.success("Вы успешно Вошли!");
    storageAuth.save("isAuth", true);
    storageAuth.save("auth-session-data", {
        ...authData
    });
    handleAuthorizedUser();

    emailEl.value = "";
    passwordEl.value = "";

    modalSignInWindow.style.display = "none";
}


// метод для открытия модального окна регистрации
function actionOnSignUpBtn() {
    modalSignUpWindow.style.display = "block";
}

// метод для открытия модального окна входа
function actionOnSignInBtn() {
    modalSignInWindow.style.display = "block";
}



// событие на клик для регистрации в приложении
signUpBtn.addEventListener("click", actionOnSignUpBtn);



// событие на клик для входа в приложение
signInBtn.addEventListener("click", actionOnSignInBtn);
















// MODAL FOR SIGN__BTN



// длина поля номера телефона
let lastCountPhone = 0;
// последний введённый номер
let lastPhoneNumber = "";


// событие на ввод
phone.addEventListener("input", (e) => {

    const phoneEl = e.target;
    // поле введённое пользователем, начиная с 3-го индекса, потому что "+7 "
    const userVal = phoneEl.value.slice(3);
    // очищенное поле от пробелов введённое пользователем
    const cleanVal = userVal.split(" ").join("").trim();


    // начало строки - "+7 " - это константа - не удаляемая
    if (phoneEl.value.length <= 3) {
        phoneEl.value = "+7 ";
        return;
    }

    // проверка на ввод чисел
    if (isNaN(cleanVal)) {
        phoneEl.value = phoneEl.value.slice(0, phoneEl.value.length-1);
        return;
    }


    // максимальное число
    if (cleanVal.length > 10) {
        phoneEl.value = lastPhoneNumber;
        return;
    }


    // мы узнаём, что человек удаляет числа, за счёт длины символов
    if (lastCountPhone >= userVal.length) {
        lastCountPhone--;
        return;
    };

    lastCountPhone++;


    // здесь форматируем номер для красоты - :)
    const newVal = cleanVal.split("").map((__val, ind) => {
        if (ind == 2) {
            return __val+" ";
        }
        if (ind == 5) {
            return __val+" ";
        }
        if (ind == 7) {
            return __val+" ";
        }
        return __val;
    }).join("");


    // вставляем в поле отформатированный номер с константой
    phoneEl.value = "+7 "+newVal;

    // присваиваем текущий номер телефона переменной
    lastPhoneNumber = phoneEl.value;
})




// метод, который слушает событие формы для записи
function handleSubmitSignBtn(e) {
    // убираем стандартные действия брузера
    e.preventDefault();

    // поле номера телефона
    const phone = e.target.elements.phone;

    // проверка длины номера телефона
    if (phone.value.length < 16) {
        notifEvent.error("Заполните поле для номера телефона!");
        return;
    }

    // закрываем модальное окно
    actionModalClose();

    notifEvent.success("Вы успешно отправили заявку!");
}


// функция для открытия модального окна с формой для записи
function actionOnSignBtn() {

    modalSignBtnWindow.style.display = "block";
    phone.value = "+7 ";
}

// перебираем список кнопок для открытия формы для записи и вешаем слушатели (события) на клик
signBtns.forEach(btn => btn.addEventListener("click", actionOnSignBtn));





console.log('Скрипт: "script.js" отработал');