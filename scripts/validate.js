//Функция добавления класса ошибки
const showError = (popupElement, inputElement, errorMessage) => {
  const errorElement = popupElement.querySelector((`.${inputElement.id}-error`));
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  
};

//Функция удаления класса ошибки
const hideError = (popupElement, inputElement, errorMessage) => {
  const errorElement = popupElement.querySelector((`.${inputElement.id}-error`));
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
};

//Функция проверки валидности Input
const checkInputValidity = (popupElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(popupElement, inputElement, inputElement.validationMessage);    
  } else {
    hideError(popupElement, inputElement);
  }
};

//Функция проверки валидности всех элементов и возврат true или false 
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция включения/отключения кнопки
const toogleButton = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-bttn_type_non-active');
  } else {
    buttonElement.classList.remove('popup__save-bttn_type_non-active');
  }
};

//Функция поиска инпутов 
const setEventListeners = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
  const buttonElement = popupElement.querySelector('.popup__save-bttn');
  inputList.forEach((inputElement) => {
    toogleButton(inputList, buttonElement);
    inputElement.addEventListener('input', function () {
      toogleButton(inputList, buttonElement);
      checkInputValidity(popupElement, inputElement);
    });
  });
};

//Функция поиска всех массивов с попапами
const enableValidation = () => {
    const popupList = Array.from(document.querySelectorAll('.popups'));
    popupList.forEach((popupElement) => {
        popupElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(popupElement);
    });
  };
  enableValidation();

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 
  
  console.log(enableValidation.errorClass);