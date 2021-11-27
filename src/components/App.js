import React from 'react';
import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function openEditProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }

  function openAddPlacePopup() {
    setIsAddPlacePopupOpen(true)
  }

  function openEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  return (
    <div className="App">
      <div className="main">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={openEditAvatarPopup}
            onEditProfile={openEditProfilePopup}
            onAddPlace={openAddPlacePopup}
            onCardClick={handleCardClick} />
          <Footer />

          <PopupWithForm
            name={'edit-profile'}
            title={'Редактировать профиль'}
            buttonTitle={'Сохранить'}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups} >
              <label htmlFor="user-name"/><input type="text" id="user-name" name="username" placeholder="Имя" className="popup__text popup__text_type_name" minLength="2" maxLength="40" required />
              <span id="user-name-error" className="popup__error"></span>
              <label htmlFor="user-job"/><input type="text" id="user-job" name="userjob" placeholder="О себе" className="popup__text popup__text_type_job" minLength="2" maxLength="200" required />
              <span id="user-job-error" className="popup__error"></span>
          </PopupWithForm>

          <PopupWithForm
            name={'add-card'}
            title={'Новое место'}
            buttonTitle={'Сохранить'}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups} >
              <label htmlFor="title"/><input type="text" id="title" name="title" placeholder="Название" className="popup__text popup__text_type_title" minLength="1" maxLength="30" required />
              <span id="title-error" className="popup__error"></span>
              <label htmlFor="image-link"/><input type="url" id="image-link" name="image_link" placeholder="Ссылка на картинку" className="popup__text popup__text_type_image-link" required />
              <span id="image-link-error" className="popup__error"></span>
          </PopupWithForm>

          <PopupWithForm
            name={'update-avatar'}
            title={'Обновить аватар'}
            buttonTitle={'Сохранить'}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups} >
              <label htmlFor="avatar-link"/><input type="url" id="avatar-link" name="avatar_link" placeholder="Ссылка на аватар" className="popup__text popup__text_type_avatar-link" required />
              <span id="avatar-link-error" className="popup__error"></span>
          </PopupWithForm>

          <PopupWithForm
            name={'approve-delete-card'}
            title={'Вы уверены?'}
            buttonTitle={'Да'}
            onClose={closeAllPopups} >
          </PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
        </div>
      </div>
    </div>
  );
}

export default App;
