
if (!handleAuthMiddleware()) {
    window.location.replace("./index.html");
}



const profileName = document.querySelector(".profile__name");
const profileEmail = document.querySelector(".profile__email");
const profilePassword = document.querySelector(".profile__password");
const logOutBtn = document.querySelector(".log-out__btn");


const authSessionData = storageAuth.load("auth-session-data");

profileName.innerText = "Имя: " + authSessionData.name;
profileEmail.innerText = "E-mail: " + authSessionData.email;
profilePassword.innerText = "Пароль: " + Array.from({length: authSessionData.password.length}).map(() => "*").join("");

logOutBtn.addEventListener("click", () => {
    storageAuth.clear("auth-session-data");
    storageAuth.clear("isAuth");
    window.location.reload();
})
