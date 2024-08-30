import {initialCards} from './initialCards.js';
import Card from './Card.js';
import {FormValidator} from './FormValidator.js';
import { showPopup, hidePopup, closePopupClickBackground} from './modal.js'

const classValidation =  {
  formSelector: '.popups',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-bttn',
  inactiveButtonClass: 'popup__save-bttn_type_non-active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Редактирование профиля
const popupEditProfile = document.querySelector('.popups_type_edit'); //Окно редактирования
const popupEditProfileEditForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileEditNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const popupEditProfileEditJobInput = popupEditProfile.querySelector('.popup__input_type_job');

//Добавление карточки
const popupAddCard = document.querySelector('.popups_type_add'); //Окно добавления
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupAddCardAddNameInput = popupAddCard.querySelector('.popup__input_type_name');
const popupAddCardAddUrlInput = popupAddCard.querySelector('.popup__input_type_url');
//const addNewCard = addPopup.querySelector('.popup__save-bttn_type_create');
//Кнопка добавления карточки
const popupAddCardSubmitCardButton = document.querySelector('.profile__add-post-button');

//Постоянные данных профиля
const profile = document.querySelector('.profile__info');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');
//Поятоянная кнопки редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');

//Постоянные попап с картинкой
 const popupImage = document.querySelector('.popups_type_image');
 const popupImagePic = popupImage.querySelector('.popup__image');
 const popupImageSubtitle = popupImage.querySelector('.popup__subtitle');

//Постоянные со всеми крестами закрытия попапа
const buttonCloseList = document.querySelectorAll('.popup__close-bttn'); 

//КАРТОЧКА
const cardList = document.querySelector('.cards');

//Функция генерации разменки, которая возвращает карточку
function createNewCard(cardData) {
  const cardElement = new Card(cardData, '.cards-template').createCard();
  return cardElement;
}
//обход массива данных
initialCards.forEach((objectCard) => { 
  const cardElement = createNewCard(objectCard);
  cardList.append(cardElement); 
});

//Функция вызова формы добавления карточки
function handleFormAddCard(evt) {
  evt.preventDefault();
  const newObjectCard = {
    name: popupAddCardAddNameInput.value,
    link: popupAddCardAddUrlInput.value,
  };
  popupAddCardAddNameInput.value = "";
  popupAddCardAddUrlInput.value = "";
  cardList.prepend(createNewCard(newObjectCard));
  newCardValidation.toogleButton();
  hidePopup(popupAddCard);
};

//Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = popupEditProfileEditNameInput.value;
  jobProfile.textContent = popupEditProfileEditJobInput.value;
  hidePopup(popupEditProfile);
};

function addTextForm() {
  popupEditProfileEditNameInput.value = nameProfile.textContent;
  popupEditProfileEditJobInput.value = jobProfile.textContent;
}
//Чистим поля ввода названия и ссылки
function clearTextAddPopup() {
  popupAddCardAddNameInput.value = "";
  popupAddCardAddUrlInput.value = "";
}

// Cлушатели нажатия кнопок
editProfileButton.addEventListener('click', () => showPopup(popupEditProfile), addTextForm());
popupAddCardSubmitCardButton.addEventListener('click', () => { showPopup(popupAddCard); clearTextAddPopup()});
popupEditProfileEditForm.addEventListener('submit', handleProfileFormSubmit);
popupAddCardForm.addEventListener('submit', handleFormAddCard);

//Перебираем попапы и задаем слушатели на закрытие по фону и крестику
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popups');
  popup.addEventListener('mousedown', closePopupClickBackground);
  btn.addEventListener('click', () => hidePopup(popup)); 
}); 

  const profileValidation = new FormValidator(classValidation, popupEditProfile);
  const newCardValidation = new FormValidator(classValidation, popupAddCard);
  profileValidation.enableValidation();
  newCardValidation.enableValidation();  
  
export { popupImagePic, popupImageSubtitle, popupImage, classValidation};