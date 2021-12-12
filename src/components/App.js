import React from 'react';
import '../index.css';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
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

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData)
      setCards(cardsData)
    }).catch((err) => {
      console.log(`Ошибка при получении данных: ${err}`)
    })
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.setLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(`Ошибка при постановке лайка: ${err}`)
      })
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(`Ошибка при удалении лайка: ${err}`)
      })
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() =>
      setCards((list) => list.filter((c) => c._id !== card._id))
    ).catch((err) => {
      console.log(`Ошибка при удалении карточки: ${err}`)
    })
  }

  function handleUpdateUser(data) {
    Promise.resolve(api.setUserData(data)).then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    }).catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`)
    })
  }

  function handleUpdateAvatar(data) {
    Promise.resolve(api.setUserAvatar(data)).then((avatar) => {
      setCurrentUser(avatar)
      closeAllPopups()
    }).catch((err) => {
      console.log(`Ошибка при загрузке аватара: ${err}`)
    })
  }

  function handleAddPlaceSubmit(data) {
    Promise.resolve(api.addNewCard(data)).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    }).catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <div className="main">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={openEditAvatarPopup}
            onEditProfile={openEditProfilePopup}
            onAddPlace={openAddPlacePopup}
            onCardClick={handleCardClick}
            currentUser={currentUser}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
        </div>
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
