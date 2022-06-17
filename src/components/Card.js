import { PopupWithImage } from "./PopupWithImage.js";

export class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
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
    this._cardLike = this._card.querySelector(".elements__vector");

    return this._card;
  }

  _handleCardDelete() {
    this._card.remove();
  }

  _handleClickLike() {
    this._cardLike.classList.toggle("elements__vector_notice");
  }

  _handleOpenPopupImage() {
    const cardClick = new PopupWithImage(
      document.querySelector(".popup_picture")
    );
    cardClick.open(this._name, this._link);
    cardClick.setEventListeners();
  }

  _setEventListeners() {
    this._card
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleOpenPopupImage();
      });
    this._card.addEventListener("click", () => {
      this._handleClickLike();
    });
    this._card
      .querySelector(".elements__delete")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });
  }
}
