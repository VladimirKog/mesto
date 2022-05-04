const modalEditBtn = document.querySelector(".profile__button-edit");
const modalPlusBtn = document.querySelector(".profile__button-plus");

const modalCloseBtn = document.querySelector(".popup__close_read");
const modalCloseNewBtn = document.querySelector(".popup__close_new");

const formProfileElement = document.querySelector(".popup__form_read");
const formElementCard = document.querySelector(".popup__form_card");

const profileName = document.querySelector(".profile__title");
const profileStatus = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__input_type-name");
const jobInput = document.querySelector(".popup__input_type-job");

const modalWindow = document.querySelector(".popup_read");
const modalNewWindow = document.querySelector(".popup_add");
const modalImage = document.querySelector(".popup_picture");

const nameNewInput = document.querySelector(".popup__input_type_new-name");
const linkNewInput = document.querySelector(".popup__input_type_new-job");

const modalCloseBtnImage = document.querySelector(".popup__close-picture");

const listCard = document.querySelector(".elements__groups");
const templateCard = document.querySelector(".template");

modalEditBtn.addEventListener("click", () => openPopup(modalWindow));
modalPlusBtn.addEventListener("click", () => openPopup(modalNewWindow));

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", doSomething);
  resetButton();
  resetInput();
}

function resetButton() {
  const formResetButton = formElementCard.querySelector(".popup__button_valid-card");
  formResetButton.classList.add("button_disabled");
}

function resetInput() {
  const formResetInput = formElementCard.querySelectorAll(".popup__input");
  console.log(formResetInput);
  Array.from(formResetInput).forEach((formResetInput) => {
  formResetInput.removeAttribute('required');
});
}


function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", doSomething);
}

modalCloseBtn.addEventListener("click", function () {
  closePopup(modalWindow);
});
modalCloseNewBtn.addEventListener("click", function () {
  closePopup(modalNewWindow);
});
modalCloseBtnImage.addEventListener("click", function () {
  closePopup(modalImage);
});

//закрытие окна через ESC
function doSomething(evt) {
  const escClosed = "Escape";
  const popupActive = document.querySelector(".popup_opened");
  if (evt.key === escClosed) {
    closePopup(popupActive);
  }
}

//закрытие окна через overlay
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup_opened")) {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
});

// редактирование профайла
nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  const popupActive = document.querySelector(".popup_opened");
  closePopup(popupActive);
}

formProfileElement.addEventListener("submit", submitProfileForm);

// создание карточек
function renderCard() {
  const html = initialCards.map(СreateСard);
  listCard.append(...html);
}

function СreateСard(card) {
  const newCard = templateCard.content.cloneNode(true);
  const link = newCard.querySelector(".elements__image");
  const name = newCard.querySelector(".elements__text");
  const noticeVector = newCard.querySelector(".elements__vector");
  const removeButton = newCard.querySelector(".elements__delete");

  name.textContent = card.name;
  link.src = card.link;
  link.alt = card.name;

  removeButton.addEventListener("click", removeElementButton);
  noticeVector.addEventListener("click", likeCardElements);
  link.addEventListener("click", addElementImage);

  return newCard;
}

// выделение сердечка
function likeCardElements(evt) {
  const element = evt.target.closest(".elements__group");
  const noticeVector = element.querySelector(".elements__vector");
  noticeVector.classList.toggle("elements__vector_notice");
}

//удаление карточки
function removeElementButton(evt) {
  const element = evt.target.closest(".elements__group");
  element.remove();
}

// преобразование картинки в большую
function addElementImage(evt) {
  const element = evt.target.closest(".elements__group");
  const bigImage = element.querySelector(".elements__image");
  const popupBigImage = document.querySelector(".popup__image");
  const popupText = document.querySelector(".popup__title-name");
  popupBigImage.src = bigImage.src;
  popupBigImage.alt = bigImage.alt;
  popupText.textContent = bigImage.alt;
  openPopup(modalImage);
}

// Ввод текста в карточке
formElementCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const elementCard = СreateСard({
    name: nameNewInput.value,
    link: linkNewInput.value,
  });
  listCard.prepend(elementCard);
  formElementCard.reset();
  const popupActive = document.querySelector(".popup_opened");
  closePopup(popupActive);
});

renderCard();