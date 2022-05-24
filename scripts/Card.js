import { modalImage, popupText, popupBigImage } from "./utils.js";
import { openPopup } from "./index.js";

export class Card {
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
    this._cardLike = this._card.querySelector(".elements__vector");

    return this._card;
  }

  _handleCardDelete() {
    this._card.remove();
  }

  _handleOpenPopupImage() {
    popupBigImage.src = this._link;
    popupBigImage.alt = this._name;
    popupText.textContent = this._name;
    openPopup(modalImage);
 }

  _handleClickLike() {
    this._cardLike.classList.toggle("elements__vector_notice");
  }

  _setEventListeners() {
    this._card
      .querySelector(".elements__image").addEventListener("click", () => {
        this._handleOpenPopupImage(this._link, this._name);
      });
    this._card.addEventListener("click", () => {
      this._handleClickLike();
    });
    this._card.querySelector(".elements__delete").addEventListener("click", () => {
        this._handleCardDelete();
      });
  }
}
