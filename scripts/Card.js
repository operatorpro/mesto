import { showPopup, imgPopupImage, subtitlePopupImage, popupImage } from './index.js';

class Card {
  constructor(data, templateSelector) {
    const { link, name } = data;
    this._data = { link, name };
    this._templateSelector = templateSelector;
  }
//Поиск template-элемента
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardTemplate;
  }
//Обработчик like
  _handleLikeClick = (event) => {
    event.target.classList.toggle('card__like_active');
  };
//Обработчик закрытия
  _handleTrashClick = () => {
    this._element.remove();
  };
//Обработчик на открытие попап-а с картинкой
  _handleImageClick = () => {
    showPopup(popupImage);
    imgPopupImage.src = this._data.link;
    imgPopupImage.alt = this._data.name;
    subtitlePopupImage.textContent = this._data.name;
  };

  createCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');
    const cardLikeButton = this._element.querySelector('.card__like');
    const cardTrashButton = this._element.querySelector('.card__trash');

    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    cardTitle.textContent = this._data.name;

    cardLikeButton.addEventListener('click', this._handleLikeClick);
    cardTrashButton.addEventListener('click', this._handleTrashClick);
    cardImage.addEventListener('click', this._handleImageClick);

    return this._element;
  }
}

export default Card;

// import {
//     showPopup, 
//     imgPopupImage, 
//     subtitlePopupImage, 
//     popupImage,
// } from './index.js';
// class Card {
//       constructor(data, templateSelector) { //Конструктор, принимающий данные и селектор template
//       this._data = data;
//       this._templateSelector = templateSelector;
//     }

//     _getTemplate() { //приватная функция поиска template-элемента
//         const cardElement = document
//             .querySelector(this._templateSelector)
//             .content
//             .querySelector('.card')
//             .cloneNode(true);

//         return cardElement;
//     }
//     createCard() { //Создание карточки
//         this._element = this._getTemplate();
//         this._element.querySelector('.card__image').src = this._data.link;
//         this._element.querySelector('.card__image').alt = this._data.name;
//         this._element.querySelector('.card__title').textContent = this._data.name;
//         this._element.querySelector('.card__like')
//             .addEventListener('click', (event) => {
//             event.target.classList.toggle('card__like_active');
//             });
//         this._element.querySelector('.card__trash').addEventListener('click', (cadrdDelite) => {
//             this._element.remove();
//           });
//         this._element.querySelector('.card__image').addEventListener('click', (pushPopupImage) => {
//             showPopup(popupImage);
//             imgPopupImage.src =  this._element.querySelector('.card__image').src;
//             imgPopupImage.alt =  this._element.querySelector('.card__image').alt;
//             subtitlePopupImage.textContent =  this._element.querySelector('.card__title').textContent;
//         });
//         return this._element;
//     }   
// }
//   export default Card;