import { showPopup, imgPopupImage, subtitlePopupImage, popupImage } from './index.js';

class Card {
  constructor(data, templateSelector) {
    const { link, name } = data;
    this._data = { link, name };
    this._templateSelector = templateSelector;
    this._cardLikeButton = null;
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
    this._cardLikeButton = this._element.querySelector('.card__like');
    const cardTrashButton = this._element.querySelector('.card__trash');

    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    cardTitle.textContent = this._data.name;

    this._cardLikeButton.addEventListener('click', this._handleLikeClick);
    cardTrashButton.addEventListener('click', this._handleTrashClick);
    cardImage.addEventListener('click', this._handleImageClick);

    return this._element;
  }
}

export default Card;