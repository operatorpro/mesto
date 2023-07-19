import {
    showPopup, 
    imgPopupImage, 
    subtitlePopupImage, 
    popupImage,
} from './index.js';
class Card {
      constructor(data, templateSelector) { //Конструктор, принимающий данные и селектор template
      this._data = data;
      this._templateSelector = templateSelector;
    }

    _getTemplate() { //приватная функция поиска template-элемента
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }
    createCard() { //Создание карточки
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').src = this._data.link;
        this._element.querySelector('.card__image').alt = this._data.name;
        this._element.querySelector('.card__title').textContent = this._data.name;
        this._element.querySelector('.card__like')
            .addEventListener('click', (event) => {
            event.target.classList.toggle('card__like_active');
            });
        this._element.querySelector('.card__trash').addEventListener('click', (cadrdDelite) => {
            this._element.remove();
          });
        this._element.querySelector('.card__image').addEventListener('click', (pushPopupImage) => {
            showPopup(popupImage);
            imgPopupImage.src =  this._element.querySelector('.card__image').src;
            imgPopupImage.alt =  this._element.querySelector('.card__image').alt;
            subtitlePopupImage.textContent =  this._element.querySelector('.card__title').textContent;
        });
        return this._element;
    }   
}
  export default Card;




















//     _getTemplate() {
//       const cardTemplate = document.querySelector(this._templateSelector).content;
//       return cardTemplate.querySelector('.card').cloneNode(true);
//     }
  
//     _setEventListeners(cardElement) {
//       cardElement.querySelector('.card__like').addEventListener('click', (event) => {
//         event.target.classList.toggle('card__like_active');
//       });
  
//       cardElement.querySelector('.card__trash').addEventListener('click', () => {
//         cardElement.remove();
//       });
  
//       cardElement.querySelector('.card__image').addEventListener('click', () => {
//         popup.classList.add('popup_opened');
//         document.addEventListener('keydown', closePopupButtonESC);
//       });
//     }
  
//     generateCard() {
//       const cardElement = this._getTemplate();
//       cardElement.querySelector('.card__image').src = this._data.link;
//       cardElement.querySelector('.card__image').alt = this._data.name;
//       cardElement.querySelector('.card__title').textContent = this._data.name;
  
//       this._setEventListeners(cardElement);
  
//       return cardElement;
//     }
//   }
  
//   export default Card;
  