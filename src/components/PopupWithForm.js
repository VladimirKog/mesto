import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor (popupSelector, {handelFormSubmit}) {
    super(popupSelector);
    this._handelFormSubmit = handelFormSubmit;
    this._form = document.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
}

 _getInputValues() {
  this._formValue = {};
  this._inputList.forEach((input) => {
    this._formValue[input.name] = input.value
  });
   return this._formValue;
 }

 close() {
   this._form.reset();
   super.close();
}

 setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', (evt) => {
   evt.preventDefault(),
   this._handelFormSubmit(this._getInputValues())
  });
 }
}
