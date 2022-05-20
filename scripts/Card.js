import { modalImage, popupText, popupBigImage } from './index.js';

const initialCards = [
  {
    name: "Кошка",
    link: "https://images.unsplash.com/photo-1647693283271-7335ab67e792?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUxfEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Медведь",
    link: "https://images.unsplash.com/photo-1647717830879-a02636bd421f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Тигр",
    link: "https://images.unsplash.com/photo-1599312545543-e7bbc16baea1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Сурикат",
    link: "https://images.unsplash.com/photo-1599311979600-a629977414ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Собака",
    link: "https://images.unsplash.com/photo-1648307872501-9b4fdfc25034?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Лев",
    link: "https://images.unsplash.com/photo-1648807763220-703398bc459f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
];

export default class Card {
  constructor(name, link, templateElement) {
    this._name = name;
    this._link = link;
    this._template = templateElement;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".template")
      .content.querySelector(".elements__group")
      .cloneNode(true);

    return cardElement;
  }

  getCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    
    this._cardImage = this._card.querySelector(".elements__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._card.querySelector(".elements__text").textContent = this._name;
    this._cardLike = this._card.querySelector('.elements__vector');

    return this._card;
  }

  _handleCardDelete() {
     this._card.remove();
  }

  _handleOpenPopupImage() {
    popupBigImage.src = this._link;
    popupBigImage.alt = this._name;
    popupText.textContent = this._name;
    modalImage.classList.add("popup_opened");
  }

  _handleClickLike() {
    this._cardLike.classList.toggle("elements__vector_notice");
 }

  _setEventListeners() {
    this._card.querySelector('.elements__image').addEventListener("click", () => {
      this._handleOpenPopupImage(this._link, this._name);
    });
    this._card.addEventListener("click", () => {
      this._handleClickLike();
    });
    this._card.querySelector('.elements__delete').addEventListener("click", () => {
      this._handleCardDelete();
    });
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.getCard();
  document.querySelector(".elements__groups").append(cardElement);
});
