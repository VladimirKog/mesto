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

const escClosed = "Escape";

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
  resetInput();
}

function resetInput() {
  const formResetInput = formElementCard.querySelectorAll(".popup__input");
  Array.from(formResetInput).forEach((formResetInput) => {
    formResetInput.removeAttribute("required");
  });
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

//закрытие окна через ESC
function handleEscClose(evt) {
  if (evt.key === escClosed) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//закрытие окна через Overlay
function handleOverlayClose(event) {
  if (event.target.classList.contains("popup_opened")) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(modalWindow);
}

// создание карточек
function renderCard() {
  const html = initialCards.map(createСard);
  listCard.append(...html);
}

function createСard(card) {
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
  const elementCard = createСard({
    name: nameNewInput.value,
    link: linkNewInput.value,
  });
  listCard.prepend(elementCard);
  formElementCard.reset();
  closePopup(modalNewWindow);
});

renderCard();

formProfileElement.addEventListener("submit", submitProfileForm);

modalEditBtn.addEventListener("click", () => {
  openPopup(modalWindow);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
});

modalWindow.addEventListener("click", (event) => {
  handleOverlayClose(event);
});

modalNewWindow.addEventListener("click", (event) => {
  handleOverlayClose(event);
});

modalImage.addEventListener("click", (event) => {
  handleOverlayClose(event);
});

modalPlusBtn.addEventListener("click", () => {
  openPopup(modalNewWindow);
});

modalCloseBtn.addEventListener("click", () => {
  closePopup(modalWindow);
});
modalCloseNewBtn.addEventListener("click", () => {
  closePopup(modalNewWindow);
});
modalCloseBtnImage.addEventListener("click", () => {
  closePopup(modalImage);
});