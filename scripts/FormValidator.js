const classValidation =  {
    formSelector: '.popups',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-bttn',
    inactiveButtonClass: 'popup__save-bttn_type_non-active',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };
  class FormValidator {
    constructor(validationConfig, formElement){
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

      //Функция поиска инпутов 
      setEventListeners = (popupElement) => {
        console.log(this._buttonElement);
        this._inputList.forEach((inputElement) => {
            this._toogleButton(this._inputList, this._buttonElement);
            inputElement.addEventListener('input', () => {
                this._toogleButton(this._inputList, this._buttonElement);
                this._checkInputValidity(inputElement);
            });
        });
     };

    //Функция добавления класса ошибки
    _showError = (inputElement) => {
        const errorElement = this._formElement.querySelector((`.${inputElement.id}-error`));
        //console.log(errorMessage);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    
     };
  
  //Функция удаления класса ошибки
    _hideError = (inputElement) => {
        const errorElement = this._formElement.querySelector((`.${inputElement.id}-error`));
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._validationConfig.errorClass);
     };
  
  //Функция проверки валидности Input
    _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showError(inputElement);    
      } else {
        this._hideError(inputElement);
      }
     };
  
  //Функция проверки валидности всех элементов и возврат true или false 
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
             });
        };
  
  // Функция включения/отключения кнопки
    _toogleButton = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
            buttonElement.removeAttribute("disabled", true);
        }
     };

  }  
  export {FormValidator, classValidation};