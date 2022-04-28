
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
const modalImage = document.querySelector(".popup_picture");

const modalNewWindow = document.querySelector(".popup_add");

const nameNewInput = document.querySelector(".popup__input_type_new-name"); 
const linkNewInput = document.querySelector(".popup__input_type_new-job");

const modalCloseBtnImage = document.querySelector(".popup__close-picture");

const popupText = document.querySelector(".popup__title-name");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

modalEditBtn.addEventListener("click", () => openPopup(modalWindow));
modalCloseBtn.addEventListener("click", () => closePopup(modalWindow));
modalPlusBtn.addEventListener("click", () => openPopup(modalNewWindow));

nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(modalWindow);
}

formProfileElement.addEventListener("submit", submitProfileForm);

const listCard = document.querySelector(".elements__groups");
const templateCard = document.querySelector(".template");

//закрытие окна через ESC
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(modalWindow);
    closePopup(modalNewWindow);
    closePopup(modalImage);
  }
});

//закрытие окна через overlay
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup_opened")) {
    closePopup(modalWindow);
    closePopup(modalNewWindow);
    closePopup(modalImage);
  }
});

// создание карточек
function render() {
  const html = initialCards.map(getElement);
  listCard.append(...html);
}

function getElement(card) {
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

//удаление краточки
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

modalCloseBtnImage.addEventListener("click", () => closePopup(modalImage));

modalCloseNewBtn.addEventListener("click", () => closePopup(modalNewWindow));

// добавление карточки
function addCard(evt) {
  evt.preventDefault();
  const elementCard = getElement({
    name: nameNewInput.value,
    link: linkNewInput.value,
  });
  listCard.prepend(elementCard);
  closePopup(modalNewWindow);

  nameNewInput.value = "";
  linkNewInput.value = "";
}

formElementCard.addEventListener("submit", addCard);

render();