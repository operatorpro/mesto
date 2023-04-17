// Редактирование профиля
const editPopup = document.querySelector(".popups_type_edit"); //Окно редактирования
const editForm = editPopup.querySelector(".popup__form");
const editClosePopup = editPopup.querySelector(".popup__close-bttn");
const editNameInput = editPopup.querySelector(".popup__input_type_name");
const editJobInput = editPopup.querySelector(".popup__input_type_job");

//Добавление карточки
const addPopup = document.querySelector(".popups_type_add"); //Окно добавления
const addForm = addPopup.querySelector(".popup__form");
const addClosePopup = addPopup.querySelector(".popup__close-bttn");
const addNameInput = addPopup.querySelector(".popup__input_type_name");
const addUrlInput = addPopup.querySelector(".popup__input_type_url");
//Кнопка добавления карточки
const addCardButton = document.querySelector(".profile__add-post-button");

//Постоянные данных профиля
const profile = document.querySelector(".profile__info");
const nameProfile = profile.querySelector(".profile__name");
const jobProfile = profile.querySelector(".profile__job");
//Поятоянная кнопки редактирования профиля
const editProfileButton = document.querySelector(".profile__edit-button");

//Постоянные попап с картинкой
const popupImage = document.querySelector(".popups_type_image");
const closePopupImage = popupImage.querySelector(".popup__close-bttn");
const imgPopupImage = popupImage.querySelector(".popup__image");
const subtitlePopupImage = popupImage.querySelector(".popup__subtitle");

//Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = editNameInput.value;
  jobProfile.textContent = editJobInput.value;
  hidePopup(editPopup);
}

const cardList = document.querySelector(".cards");
const cardTemplate = document.querySelector(".cards-template").content;
//Создание карты карточки
function createCard(element) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;
  cardElement
    .querySelector(".card__like")
    .addEventListener("click", (event) => {
      event.target.classList.toggle("card__like_active");
    });
  //Обработчик на удаление
  cardElement
    .querySelector(".card__trash")
    .addEventListener("click", (cadrdDelite) => {
      cardElement.remove();
    });
  //Обработчик на попап с картинкой (закрытие и открытие)
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", (pushPopupImage) => {
      showPopup(popupImage);
      imgPopupImage.src = cardElement.querySelector(".card__image").src;
      imgPopupImage.alt = cardElement.querySelector(".card__image").alt;
      subtitlePopupImage.textContent =
        cardElement.querySelector(".card__title").textContent;
    });
  return cardElement;
}

//Добавление карточки
initialCards.forEach((objectCard) => {
  const newCard = createCard(objectCard);
  cardList.append(newCard);
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
  cardList.prepend(createCard(newObjectCard));
  hidePopup(addPopup);
}

function showPopup(popup) {
  popup.classList.add("popup_opened");
}

function hidePopup(popup) {
  popup.classList.remove("popup_opened");
}

editProfileButton.addEventListener("click", () => showPopup(editPopup));

editClosePopup.addEventListener("click", () => hidePopup(editPopup));
closePopupImage.addEventListener("click", () => {
  hidePopup(popupImage);
});

addCardButton.addEventListener("click", () => showPopup(addPopup));
addClosePopup.addEventListener("click", () => hidePopup(addPopup));

// Cлушатели нажатия кнопок
editForm.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleFormAddCard);
