import { config } from "./utils.js";
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";
import { modalImage } from "./utils.js";

const modalEditBtn = document.querySelector(".profile__button-edit");
const modalPlusBtn = document.querySelector(".profile__button-plus");
const modalAddBtn = document.querySelector(".popup__button_add");

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

const listCard = document.querySelector(".elements__groups");

const popupCloseButton = document.querySelector(".popup__close-picture");

const profileValidate = new FormValidator(config, formProfileElement);
const cardValidate = new FormValidator(config, formElementCard);

profileValidate.enableValidation();
cardValidate.enableValidation();

function addCardLoad() {
  initialCards.forEach((item) => {
    listCard.append(addCard(item.name, item.link));
  });
}

function addCard(name, link) {
  const card = new Card(name, link);
  return card.getCard();
}

window.onload = function () {
  addCardLoad();
};

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
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
function addFormCard(evt) {
  evt.preventDefault();
  listCard.prepend(addCard(nameNewInput.value, linkNewInput.value));
  evt.target.reset();
  closePopup(modalNewWindow);
};

formElementCard.addEventListener("submit", addFormCard);
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
  cardValidate.disableSubmitButton(modalAddBtn);
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