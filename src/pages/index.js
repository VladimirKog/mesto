import "../pages/index.css";

import { config } from "../utils/utils.js";
import {
  formProfileElement,
  formElementCard,
  listCard,
  modalWindow,
  modalCardWindow,
  modalEditBtn,
  modalPlusBtn,
  modalAddBtn,
  nameInput,
  jobInput,
  nameNewInput,
  linkNewInput,
} from "../utils/constants.js";
import { initialCards } from "../utils/cards.js";

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

// Валидация
const profileValidate = new FormValidator(config, formProfileElement);
profileValidate.enableValidation();

const cardValidate = new FormValidator(config, formElementCard);
cardValidate.enableValidation();

// отрисовка карточек
const cardListRend = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link);
      const cardElement = card.getCard();
      cardListRend.addItem(cardElement);
    },
  },
  listCard
);
cardListRend.renderItems(initialCards);

// заполнение формы
const userInfoRed = new UserInfo(nameInput, jobInput);
userInfoRed.getUserInfo();

// открытие попапа редакция формы
const openPopupRead = new PopupWithForm(modalWindow, {
  handelFormSubmit: (input) => {
    userInfoRed.setUserInfo(input);
  },
});

// открытие попапа добавления карточки
const openPopupCard = new PopupWithForm(modalCardWindow, {
  handelFormSubmit: () => {
    nameNewInput.textContent = nameNewInput.value;
    linkNewInput.textContent = linkNewInput.value;
  },
});

// редакция формы
function submitProfileForm() {
  userInfoRed.setUserInfo();
  openPopupRead.close();
}

// создание карточки
function addFormCard() {
  const card = new Card(nameNewInput.value, linkNewInput.value);
  const cardElement = card.getCard();
  cardListRend.addItem(cardElement);
}

formProfileElement.addEventListener("submit", submitProfileForm);

formElementCard.addEventListener("submit", () => {
  addFormCard();
  openPopupCard.close();
  nameNewInput.value = "";
  linkNewInput.value = "";
});

openPopupRead.setEventListeners();
openPopupCard.setEventListeners();

// слушатель на открытие формы редакции
modalEditBtn.addEventListener("click", () => {
  openPopupRead.open();
});

// слушатель на открытие формы добавление карточки
modalPlusBtn.addEventListener("click", () => {
  cardValidate.disableSubmitButton(modalAddBtn);
  openPopupCard.open();
});
