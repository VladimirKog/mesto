function enableValidation(config) {
  const form = document.querySelectorAll(config.formSelector);
  Array.from(form).forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
}

function setEventListeners(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const buttonElement = form.querySelector(config.submitButtonSelector);
  toggleButton(form, config, buttonElement);
  inputs.forEach((element) => {
    element.addEventListener("input", (evt) => {
      handleFormInput(evt, form, config);
      toggleButton(form, config);
    });
  });
}

function handleFormInput(evt, form, config) {
  const input = evt.target;
  const errorNode = form.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorNode.textContent = "";
  } else {
    errorNode.textContent = input.validationMessage;
  }
  toggleButton(form, config);
}

function toggleButton(form, config) {
  const buttonElement = document.querySelectorAll(config.submitButtonSelector);
  Array.from(buttonElement).forEach((buttonElement) => {
    buttonElement.disabled = !form.checkValidity();
    buttonElement.classList.toggle(
      config.inactiveButtonClass,
      !form.checkValidity()
    );
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "input_disabled",
  errorClass: "popup__error_visible",
});
