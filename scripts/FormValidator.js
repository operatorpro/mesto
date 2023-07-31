import {classValidation} from './index.js';
  class FormValidator {
    constructor(validationConfig, formElement){
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

    enableValidation = () =>{
      this._setEventListeners();
    }
      //Функция поиска инпутов 
      _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            this.toogleButton();
            inputElement.addEventListener('input', () => {
                this.toogleButton();
                this._checkInputValidity(inputElement);
            });
        });
     };

    //Функция добавления класса ошибки
    _showError = (inputElement) => {
        const errorElement = this._formElement.querySelector((`.${inputElement.id}-error`));
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
     toogleButton() {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", true);
      } else {
        this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        this._buttonElement.removeAttribute("disabled", true);
      }
    }
  

  }  
  export {FormValidator};