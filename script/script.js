let modalEditBtn = document.querySelector('.profile__button-edit');
let modalWindow = document.querySelector('.popup');
let modalCloseBtn = modalWindow.querySelector('.popup__close');


function toggleModalWindow() {
  modalWindow.classList.toggle('popup__activ');

  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;

}

modalEditBtn.addEventListener('click', toggleModalWindow);
modalCloseBtn.addEventListener('click', toggleModalWindow);


let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let profileName = document.querySelector('.profile__title');
let profileStatus = document.querySelector('.profile__subtitle');
let modalSaveBtn = document.querySelector('.popup__save');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;

  toggleModalWindow();

}

formElement.addEventListener('submit', formSubmitHandler);

modalSaveBtn.addEventListener('click', formSubmitHandler);
