import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popupSelector.querySelector(".popup__image");
    this._name = this._popupSelector.querySelector(".popup__title-name");
  }

  open(name, link) {
    super.open();
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;
  }
}
