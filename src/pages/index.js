import {
  config,
  formProfileElement,
  formElementCard,
  listCard,
  modalWindow,
  modalCardWindow,
  modalEditBtn,
  modalPlusBtn,
  nameInput,
  jobInput,
  nameNewInput,
  linkNewInput
} from "../components/utils.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../components/cards.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import "../pages/index.css";

// Валидация
const profileValidate = new FormValidator(config, formProfileElement);
const cardValidate = new FormValidator(config, formElementCard);

profileValidate.enableValidation();
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
  }
});

// открытие попапа добавления карточки
const openPopupCard = new PopupWithForm(modalCardWindow, {
  addFormCard
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
  openPopupCard.close();
}

formProfileElement.addEventListener("submit", submitProfileForm);
formElementCard.addEventListener("submit", addFormCard);

// слушатель на открытие формы редакции
modalEditBtn.addEventListener("click", () => {
  openPopupRead.open();
  openPopupRead.setEventListeners();
});

// слушатель на открытие формы добавление карточки
modalPlusBtn.addEventListener("click", () => {
  openPopupCard.open();
  openPopupCard.setEventListeners();
});