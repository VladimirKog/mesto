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

const modalCloseBtn = document.querySelector(".popup__close_read");
const modalCloseNewBtn = document.querySelector(".popup__close_new");

const formProfileElement = document.querySelector(".popup__form_read");
const formElementCard = document.querySelector(".popup__form_card");

const profileName = document.querySelector(".profile__title");
const profileStatus = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__text_type-name");
const jobInput = document.querySelector(".popup__text_type-job");
const modalWindow = document.querySelector(".popup_read");
const modalImage = document.querySelector(".popup_picture");

const modalNewWindow = document.querySelector(".popup_add");

const nameNewInput = document.querySelector(".popup__text_type_new-name");
const linkNewInput = document.querySelector(".popup__text_type_new-job");

const modalCloseBtnImage = document.querySelector(".popup__close-picture");

const popupText = document.querySelector(".popup__title-name");

function openPopup(popup) {
  popup.classList.add('popup_opened');
} 

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  const BigImage = element.querySelector(".elements__image");
  const popupBigImage = document.querySelector(".popup__image");
  const popupText = document.querySelector(".popup__title-name");
  popupBigImage.src = BigImage.src;
  popupBigImage.alt = BigImage.alt;
  popupText.textContent = BigImage.alt;
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
  
  nameNewInput.value ='';
  linkNewInput.value ='';
}

formElementCard.addEventListener("submit", addCard);

render();