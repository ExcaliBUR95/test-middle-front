import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h2 className="content__title">Навигация</h2>

      <div className="content__top">

        <div className='buttons'>
          <Link to={'/signUp'}>
            <button className='buttons__button'>Зарегестрироваться</button>
          </Link>
          <Link to={'/signIn'}>
            <button className='buttons__button'>Залогиниться</button>
          </Link>
          <Link to={'/people'}><button className='buttons__button'>Карточки</button></Link>
          <Link to={'/account'}>
            <button className='buttons__button'>Профиль</button>
          </Link>




        </div>
      </div>


    </div>
  );
};

export default Home;