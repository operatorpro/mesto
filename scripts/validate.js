const classValidation =  {
  formSelector: '.popups',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-bttn',
  inactiveButtonClass: 'popup__save-bttn_type_non-active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//Функция добавления класса ошибки
const showError = (popupElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = popupElement.querySelector((`.${inputElement.id}-error`));
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  
};

//Функция удаления класса ошибки
const hideError = (popupElement, inputElement, { inputErrorClass, errorClass} ) => {
  const errorElement = popupElement.querySelector((`.${inputElement.id}-error`));
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

//Функция проверки валидности Input
const checkInputValidity = (popupElement, inputElement, inputError) => {
  if (!inputElement.validity.valid) {
    showError(popupElement, inputElement, inputElement.validationMessage, inputError);    
  } else {
    hideError(popupElement, inputElement, inputError);
  }
};

//Функция проверки валидности всех элементов и возврат true или false 
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция включения/отключения кнопки
const toogleButton = (inputList, buttonElement, {inactiveButtonClass} ) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", true);
  }
};

//Функция поиска инпутов 
const setEventListeners = (popupElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(popupElement.querySelectorAll(inputSelector));
  const buttonElement = popupElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    toogleButton(inputList, buttonElement, rest);
    inputElement.addEventListener('input', function () {
      toogleButton(inputList, buttonElement, rest);
      checkInputValidity(popupElement, inputElement, rest);
    });
  });
};

//Функция поиска всех массивов форм
const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((popupElement) => {
    //    popupElement.addEventListener('submit', (evt) => {
    //    evt.preventDefault();
    //  });
      setEventListeners(popupElement, rest);
    })
  };

enableValidation(classValidation);