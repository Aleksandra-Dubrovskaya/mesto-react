import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

  const [userInfo, setUserInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setUserInfo(userData)
      setCards(cardsData)
    }).catch((err) => {
      console.log(`Ошибка при получении данных: ${err}`)
    })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__header">
          <div className="profile__avatar-img" onClick={props.onEditAvatar}>
            <img src={userInfo.avatar} alt={userInfo.name} className="profile__avatar" />
          </div>
            <div className="profile__info">
              <h1 className="profile__name">{userInfo.name}</h1>
              <button aria-label="Редактировать" type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
              <p className="profile__job">{userInfo.about}</p>
            </div>
        </div>
        <button aria-label="Добавить" type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card
            key={item._id}
            link={item.link}
            name={item.name}
            likes={item.likes.length}
            card={item}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;
