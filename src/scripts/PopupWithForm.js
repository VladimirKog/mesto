import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor (popupSelector, {handelFormSubmit}) {
    super(popupSelector);
    this._handelFormSubmit = handelFormSubmit;
    this._form = document.querySelector('.popup__form');
}

 _getInputValues() {
  this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  this._formValue = {};
  this._inputList.forEach(input => {
    this._formValue[input.name] = input.value
  });
   return this._formValue;
 }

 close() {
  super.close();
  this._form.reset();
}

 setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
   this._handelFormSubmit(evt, this._getInputValues());
  });
 // console.log(this._form);
  
}
}
