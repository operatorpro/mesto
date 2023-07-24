import {initialCards} from './initialCards.js';
import Card from './Card.js';
import {FormValidator} from './FormValidator.js';

const classValidation =  {
  formSelector: '.popups',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-bttn',
  inactiveButtonClass: 'popup__save-bttn_type_non-active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Редактирование профиля
const editPopup = document.querySelector('.popups_type_edit'); //Окно редактирования
const editForm = editPopup.querySelector('.popup__form');
const editClosePopup = editPopup.querySelector('.popup__close-bttn');
const editNameInput = editPopup.querySelector('.popup__input_type_name');
const editJobInput = editPopup.querySelector('.popup__input_type_job');

//Добавление карточки
const addPopup = document.querySelector('.popups_type_add'); //Окно добавления
const addForm = addPopup.querySelector('.popup__form');
const addClosePopup = addPopup.querySelector('.popup__close-bttn');
const addNameInput = addPopup.querySelector('.popup__input_type_name');
const addUrlInput = addPopup.querySelector('.popup__input_type_url');
const addNewCard = addPopup.querySelector('.popup__save-bttn_type_create');
//Кнопка добавления карточки
const addCardButton = document.querySelector('.profile__add-post-button');

//Постоянные данных профиля
const profile = document.querySelector('.profile__info');
const nameProfile = profile.querySelector('.profile__name');
const jobProfile = profile.querySelector('.profile__job');
//Поятоянная кнопки редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');

//Постоянные попап с картинкой
 const popupImage = document.querySelector('.popups_type_image');
 const closePopupImage = popupImage.querySelector('.popup__close-bttn');
 const imgPopupImage = popupImage.querySelector('.popup__image');
 const subtitlePopupImage = popupImage.querySelector('.popup__subtitle');

//Постоянные со всеми крестами закрытия попапа
const buttonCloseList = document.querySelectorAll('.popup__close-bttn'); 



//КАРТОЧКА
const cardList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards-template').content;

//Функция генерации разменки, которая возвращает карточку
function newCard(cardData) {
  const cardElement = new Card(cardData, '.cards-template').createCard();
  return cardElement;
}
//обход массива данных
initialCards.forEach((objectCard) => { 
  const cardElement = newCard(objectCard);
  cardList.append(cardElement); 
});

//Функция вызова формы добавления карточки
function handleFormAddCard(evt) {
  evt.preventDefault();
  const newObjectCard = {
    name: addNameInput.value,
    link: addUrlInput.value,
  };
  addNameInput.value = "";
  addUrlInput.value = "";
  cardList.prepend(newCard(newObjectCard));
  hidePopup(addPopup);
};

//Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = editNameInput.value;
  jobProfile.textContent = editJobInput.value;
  hidePopup(editPopup);
};

function addTextForm() {
  editNameInput.value = nameProfile.textContent;
  editJobInput.value = jobProfile.textContent;
}
//Функция показа pop-up
export default function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupButtonESC);
}; 
//Функция скрытия pop-up
function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupButtonESC);
};

//Функция закрытия попапа по кнопке ESC
function closePopupButtonESC(event){
  if (event.key === 'Escape') {
    hidePopup(document.querySelector('.popup_opened'));
  }
};
//Функция закрытия попапа по клику на фон
function closePopupClickBackground(event) {
  if (event.target.classList.contains('popups')) {
    hidePopup(event.target);
  }
}

// Cлушатели нажатия кнопок
editProfileButton.addEventListener('click', () => showPopup(editPopup),addTextForm());
addCardButton.addEventListener('click', () => showPopup(addPopup));
editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleFormAddCard);

//Перебираем попапы и задаем слушатели на закрытие по фону и крестику
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popups');
  popup.addEventListener('mousedown', closePopupClickBackground);
  btn.addEventListener('click', () => hidePopup(popup)); 
}); 

//Инициализация поиска форм для валидации
// const allPopupPage = () => {
//   const formList = Array.from(document.querySelectorAll(classValidation.formSelector));
//   formList.forEach((formElement) => {
//     const formValidator = new FormValidator(classValidation, formElement);
//     formValidator.enableValidation(formElement);
//   });
// };

// allPopupPage();
const allPopupPage = () => {
  const formList =  Array.from(document.querySelectorAll(classValidation.formSelector));
  formList.forEach((formElement)=> {
    function initializeProfileFormValidation() {
      const formValidator = new FormValidator(classValidation, editPopup);
      formValidator.enableValidation();
    }
    
    // Функция инициализации валидации для формы добавления карточки
    function initializeAddCardFormValidation() {
      const formValidator = new FormValidator(classValidation, addPopup);
      formValidator.enableValidation();
    }
    
    // Вызов функций для инициализации валидации форм
    initializeProfileFormValidation();
    initializeAddCardFormValidation();
  });
};
allPopupPage();

export {showPopup, imgPopupImage, subtitlePopupImage, popupImage, classValidation};