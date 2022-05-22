export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
  }

  _setEventListeners = () => {
    const inputs = Array.from(
      this._formSelector.querySelectorAll(this._config.inputSelector)
    );
    inputs.forEach((input) => {
      this._toggleButton(inputs);
      input.addEventListener("input", () => {
        this._handleFormInput(input);
        this._toggleButton(inputs);
      });
    });
  };

  _handleFormInput = (input) => {
    const errorNode = this._formSelector.querySelector(`#${input.id}-error`);
    console.log(errorNode);
    if (!input.validity.valid) {
      errorNode.textContent = input.validationMessage;
    } else {
      errorNode.textContent = "";
    }
  };

  _toggleButton = (inputs) => {
    const buttonElement = this._formSelector.querySelector(
      this._config.submitButtonSelector
    );
    if (this._hasInvalidInput(inputs)) {
      buttonElement.disabled = !this._formSelector.checkValidity();
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _hasInvalidInput = (inputs) => {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
