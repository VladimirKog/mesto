let modalEditBtn = document.querySelector(".profile__button-edit");
let modalWindow = document.querySelector(".popup");
let modalCloseBtn = document.querySelector(".popup__close");

let profileName = document.querySelector(".profile__title");
let profileStatus = document.querySelector(".profile__subtitle");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__text_type_name");
let jobInput = document.querySelector(".popup__text_type_job");

function openWindow() {
  modalWindow.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function closeWindow() {
  modalWindow.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closeWindow();
}

modalEditBtn.addEventListener("click", openWindow);
modalCloseBtn.addEventListener("click", closeWindow);
formElement.addEventListener("submit", formSubmitHandler);