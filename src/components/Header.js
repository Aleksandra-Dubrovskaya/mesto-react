import React from 'react';
import mestoLogo from '../images/mesto_logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={mestoLogo} alt="логотип Место" className="header__logo" />
    </header>
  )
}

export default Header;
