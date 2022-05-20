export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
}

_setEventListeners = () => {
  const inputs = Array.from(this._formSelector.querySelectorAll(this._config.inputSelector));
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    this._handleFormInput(inputElement);
//      this._toggleButton();
    });
  });
}

_handleFormInput = (inputElement) => {
  const errorNode = this._formSelector.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    errorNode.textContent = '';
  } else {
    errorNode.textContent = inputElement.validationMessage;
  }
 }
 
_toggleButton = () => {
  this._buttonSelector.disabled = !form.checkValidity();
  this._buttonSelector.classList.toggle(this._inactiveButton, !this._form.checkValidity());
  };

enableValidation = () => {
    this._setEventListeners();
}
}