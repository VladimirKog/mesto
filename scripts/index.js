import { config } from "./utils.js";
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

const modalEditBtn = document.querySelector(".profile__button-edit");
const modalPlusBtn = document.querySelector(".profile__button-plus");

const modalCloseBtn = document.querySelector(".popup__close_read");
const modalCloseNewBtn = document.querySelector(".popup__close_new");

const formProfileElement = document.querySelector(".popup__form_read");
const formElementCard = document.querySelector(".popup__form_card");

const profileName = document.querySelector(".profile__title");
const profileStatus = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__input_type-name");
const jobInput = document.querySelector(".popup__input_type-job");
const nameNewInput = document.querySelector(".popup__input_type_new-name");
const linkNewInput = document.querySelector(".popup__input_type_new-job");

const modalWindow = document.querySelector(".popup_read");
const modalNewWindow = document.querySelector(".popup_add");
const modalImage = document.querySelector(".popup_picture");

const listCard = document.querySelector(".elements__groups");
const popupText = document.querySelector(".popup__title-name");

const popupBigImage = document.querySelector(".popup__image");
const popupCloseButton = document.querySelector(".popup__close-picture");

const profileValidate = new FormValidator(config, formProfileElement);
const cardValidate = new FormValidator(config, formElementCard);

profileValidate.enableValidation();
cardValidate.enableValidation();

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.getCard();
  document.querySelector(".elements__groups").append(cardElement);
});


function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
  resetInput();
}

function resetInput() {
  const formResetInput = formElementCard.querySelectorAll(".popup__input");
  Array.from(formResetInput).forEach((formResetInput) => {
    formResetInput.removeAttribute("required");
  });
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

//закрытие окна через ESC
function handleEscClose(evt) {
  const escClosed = "Escape";
  if (evt.key === escClosed) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//закрытие окна через Overlay
function handleOverlayClose(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// редактирование профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(modalWindow);
}

// создание карточки
function formCardAdd(evt) {
  evt.preventDefault();
  const card = new Card (nameNewInput.value, linkNewInput.value);
  const cardElement = card.getCard();
  listCard.prepend(cardElement);
  evt.target.reset();
  closePopup(modalNewWindow);
};

formElementCard.addEventListener("submit", formCardAdd);
formProfileElement.addEventListener("submit", submitProfileForm);

modalEditBtn.addEventListener("click", () => {
  openPopup(modalWindow);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
});

modalWindow.addEventListener("click", (event) => {
  handleOverlayClose(event);
});

modalNewWindow.addEventListener("click", (event) => {
  handleOverlayClose(event);
});

modalImage.addEventListener("click", (event) => {
  handleOverlayClose(event);
});

modalPlusBtn.addEventListener("click", () => {
  openPopup(modalNewWindow);
});

modalCloseBtn.addEventListener("click", () => {
  closePopup(modalWindow);
});

modalCloseNewBtn.addEventListener("click", () => {
  closePopup(modalNewWindow);
});

popupCloseButton.addEventListener("click", () => {
  closePopup(modalImage);
});

export { modalImage, popupText, popupBigImage };