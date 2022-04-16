const initialCards = [
  {
    name: "Кошка",
    link: "https://images.unsplash.com/photo-1647693283271-7335ab67e792?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUxfEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Медведь",
    link: "https://images.unsplash.com/photo-1647717830879-a02636bd421f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Тигр",
    link: "https://images.unsplash.com/photo-1599312545543-e7bbc16baea1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Сурикат",
    link: "https://images.unsplash.com/photo-1599311979600-a629977414ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fEpwZzZLaWRsLUhrfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Собака",
    link: "https://images.unsplash.com/photo-1648307872501-9b4fdfc25034?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Лев",
    link: "https://images.unsplash.com/photo-1648807763220-703398bc459f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
];

const modalEditBtn = document.querySelector(".profile__button-edit");
const modalPlusBtn = document.querySelector(".profile__button-plus");
const modalAddBtn = document.querySelector(".popup__save");

const modalCloseBtn = document.querySelector(".popup__close_read");
const modalCloseNewBtn = document.querySelector(".popup__close_new");

const formElement = document.querySelector(".popup__form");
const formElementCard = document.querySelector(".popup__form_card");

const profileName = document.querySelector(".profile__title");
const profileStatus = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__text_type_name");
const jobInput = document.querySelector(".popup__text_type_job");
const modalWindow = document.querySelector(".popup__read");
const modalImage = document.querySelector(".popup__picture-big");

const modalNewWindow = document.querySelector(".popup__add");

const nameNewInput = document.querySelector(".popup__new_type_name");
const LinkNewInput = document.querySelector(".popup__new_type_job");

const bigCartImage = document.querySelector(".picture-big__content");

const modalCloseBtnImage = document.querySelector(".picture-big__close");

// вызов попапа для изменение шапки
function openWindow() {
  modalWindow.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}
modalEditBtn.addEventListener("click", openWindow);

// закрытие попапа для изменение шапки
function closeWindow() {
  modalWindow.classList.remove("popup_opened");
}

// открытие попата картинки
function openPopup() {
  modalImage.classList.add("popup_opened");
}

// закрытие попата картинки
function closePopup() {
  modalImage.classList.remove("popup_opened");
}

// вызов попапа для добавлении карточки
function PlusWindow() {
  modalNewWindow.classList.add("popup_opened");
}
modalPlusBtn.addEventListener("click", PlusWindow);

// закрытие попада после добавлении карточки
function closeNewWindow() {
  modalNewWindow.classList.remove("popup_opened");
}
modalCloseNewBtn.addEventListener("click", closeNewWindow);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closeWindow();
}

formElement.addEventListener("submit", formSubmitHandler);

modalCloseBtn.addEventListener("click", closeWindow);

const listCard = document.querySelector(".elements__groups");
const templateCard = document.querySelector(".template");

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

  removeButton.addEventListener("click", elementRemoveButton);
  noticeVector.addEventListener("click", elementsNoticeHeart);
  link.addEventListener("click", elementBigImage);

  return newCard;
}

// выделение сердечка
function elementsNoticeHeart(evt) {
  const element = evt.target.closest(".elements__group");
  const noticeVector = element.querySelector(".elements__vector");
  noticeVector.classList.toggle("elements__vector_notice");
}

function elementRemoveButton(evt) {
  const element = evt.target.closest(".elements__group");
  element.remove();
}

function elementBigImage(evt) {
  openPopup(bigCartImage);
  const element = evt.target.closest(".elements__group");
  const bigImage = element.querySelector(".elements__image");
  const bigTitle = element.querySelector(".elements__text");
  const popupBigImage = bigCartImage.querySelector(".picture-big__image");
  const popupText = bigCartImage.querySelector(".picture-big__text");

  popupBigImage.src = bigImage.src;
  popupBigImage.alt = bigImage.alt;
  popupText.textContent = bigTitle.textContent;
}

modalCloseBtnImage.addEventListener("click", closePopup);

function CardAdd(evt) {
  evt.preventDefault();
  const elementCard = getElement({
    name: nameNewInput.value,
    link: LinkNewInput.value,
  });
  listCard.prepend(elementCard);
  closeNewWindow();
}

formElementCard.addEventListener("submit", CardAdd);

render();
