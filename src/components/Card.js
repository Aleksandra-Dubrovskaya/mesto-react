import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element">
      <button aria-label="Удалить" type="button" className="element__remove-button"></button>
      <img src={props.link} alt={props.name} className="element__image" onClick={handleClick} />
      <div className="element__description">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__likes-group">
          <button aria-label="Нравится" type="button" className="element__like-button"></button>
          <p className="element__likes-counter">{props.likes}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
