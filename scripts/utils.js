export { config, modalImage, popupText, popupBigImage };

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'input_disabled',
  errorClass: 'popup__error'
};

const modalImage = document.querySelector(".popup_picture");
const popupText = document.querySelector(".popup__title-name");
const popupBigImage = document.querySelector(".popup__image");