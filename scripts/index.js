let backgroundPopup = document.querySelector('.popups');
let editProfileButton = document.querySelector('.profile__edit-button');
let profile = document.querySelector('.profile__info')
let form = document.querySelector('.popup__form');
let closePopup = document.querySelector('.popup__close-bttn');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_type_job'); // Воспользуйтесь инструментом .querySelector()
let nameProfile = profile.querySelector('.profile__name');
let jobProfile = profile.querySelector('.profile__job');

function closeEdit() {
    backgroundPopup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
let namePop = nameInput.value;
let jobPop = jobInput.value; 
    // Выберите элементы, куда должны быть вставлены значения полей
nameProfile = profile.querySelector('.profile__name');
jobProfile = profile.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
nameProfile.textContent = namePop;
jobProfile.textContent = jobPop;
closeEdit();
}

function openEdit() {
    backgroundPopup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent; 
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', handleFormSubmit);
editProfileButton.addEventListener('click', openEdit);
closePopup.addEventListener('click', closeEdit);