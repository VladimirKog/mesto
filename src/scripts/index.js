import {
  config,
  formProfileElement,
  formElementCard,
  listCard,
  modalWindow,
  modalCardWindow,
  modalEditBtn,
  modalPlusBtn,
  modalAddBtn,
  modalSaveBtn,
  modalCloseBtn,
  nameInput,
  jobInput,
  nameNewInput,
  linkNewInput,
  modalCloseImage,
} from "./utils.js";
import { Section } from "./Section.js";
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithForm } from "./PopupWithForm.js";

// Валидация
const profileValidate = new FormValidator(config, formProfileElement);
const cardValidate = new FormValidator(config, formElementCard);

profileValidate.enableValidation();
cardValidate.enableValidation();

// отрисовка карточек
const cardListRend = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link);
    const cardElement = card.getCard();
    cardListRend.addItem(cardElement);
  },
}, listCard);
cardListRend.renderItems(initialCards);

// заполнение формы
const userInfoRed = new UserInfo(nameInput, jobInput);
userInfoRed.getUserInfo();

// открытие попапа редакции формы
const openPopupRead = new PopupWithForm(
  modalWindow, {
    handleSubmitForm: () => {
     userInfoRed.setUserInfo();
    }
}
);

// слушатель на открытие формы редакции
modalEditBtn.addEventListener("click", () => {
  openPopupRead.open();
  openPopupRead.setEventListeners();
});
//

// открытие попапа добавления карточки
const openPopupCard = new PopupWithForm(
  modalCardWindow, {
    handleSubmitForm: (item) => {
      const cardSubmit = new Card(item.name, item.link);
      const cardElementSubmit = cardSubmit.getCard(item);
      cardListRend.addItem(cardElementSubmit);
  }
});

// слушатель на открытие формы добавление карточки
modalPlusBtn.addEventListener("click", () => {
  openPopupCard.open();
  openPopupCard.setEventListeners();
});




