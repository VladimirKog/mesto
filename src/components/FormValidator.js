export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
  }

  _handleFormInput = (input) => {
    const errorNode = this._formSelector.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      errorNode.textContent = input.validationMessage;
    } else {
      errorNode.textContent = "";
    }
  };

  _hasValid(inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._config.inputErrorClass);
    } else {
      inputElement.classList.remove(this._config.inputErrorClass);
    }
  }

  _hasInvalidInput = (inputs) => {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButton = (inputs) => {
    const buttonElement = this._formSelector.querySelector(
      this._config.submitButtonSelector
    );
    if (this._hasInvalidInput(inputs)) {
      this.disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }
  };

  disableSubmitButton = (buttonElement) => {
    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  };

  _enableSubmitButton = (buttonElement) => {
    buttonElement.classList.remove(this._config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", true);
  };

  _setEventListeners = () => {
    const inputs = Array.from(
      this._formSelector.querySelectorAll(this._config.inputSelector)
    );
    this._toggleButton(inputs);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._toggleButton(inputs);
        this._handleFormInput(input);
        this._hasValid(input);
      });
    });
  };

  enableValidation = () => {
    this._formSelector.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  };
}
