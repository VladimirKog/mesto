function enableValidation(config) {
  const form = document.querySelector(config.formSelector);
  const inputs = form.querySelectorAll(config.inputSelector);

  inputs.forEach((element) => {
    element.addEventListener("input", (evt) =>
      handleFormInput(evt, form, config)
    );
  });
  form.addEventListener("submit", function (evt, form) {
    evt.preventDefault();
  });
  toggleButton(form, config);
}

function toggleButton(form, config) {
  const buttonElement = document.querySelector(config.buttonSelector);
  buttonElement.disabled = !form.checkValidity();
  buttonElement.classList.toggle("button_disabled", !form.checkValidity());
}

function toggleInputAdd(form, config) {
  const inputErrorElement = document.querySelector(config.inputSelector);
  inputErrorElement.classList.add("input_disabled", !form.checkValidity());
}

function toggleInputRemove(form, config) {
  const inputErrorElement = document.querySelector(config.inputSelector);
  inputErrorElement.classList.remove("input_disabled", !form.checkValidity());
}

function handleFormInput(evt, form, config) {
  const input = evt.target;
  const errorNode = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorNode.textContent = "";
    toggleInputRemove(form, config);
  } else {
    errorNode.textContent = input.validationMessage;
    toggleInputAdd(form, config);
  }
  toggleButton(form, config);
}

enableValidation({
  formSelector: ".popup__form_read",
  inputSelector: ".popup__input_text",
  buttonSelector: ".popup__button_valid-read",
});

enableValidation({
  formSelector: ".popup__form_card",
  inputSelector: ".popup__input_card",
  buttonSelector: ".popup__button_valid-add",
});
