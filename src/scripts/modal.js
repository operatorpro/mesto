//Функция показа pop-up
function showPopup(popup) {
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
  export {showPopup, hidePopup, closePopupButtonESC, closePopupClickBackground};