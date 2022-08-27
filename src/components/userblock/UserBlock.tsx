import React from 'react';
import { Link } from 'react-router-dom';
type userProps = {
    email: string,
    _id: string,
    brithDay: string,
    img: string,
    male: boolean,
    name: string
}
const UserBlock: React.FC<userProps> = ({ email, _id, brithDay, img, male, name }) => {
    const age = brithDay.slice(6,10)
    const date = new Date()
    const today = date.toLocaleDateString().slice(6,10)
    
    
     
    return (
        <div className="user-block-wrapper">
            <div className="user-block">
                <Link key={_id} to={`user/${_id}`}>
                    {img ? (
            <img
              className="headersImg"
              src={`http://localhost:5000/${img}`}
              alt="logo"
            />
          ) : (
            <img
              className="headersImg"
              src={`https://upload.wikimedia.org/wikipedia/ru/thumb/c/ce/Aang.png/280px-Aang.png`}
              alt="logo"
            />
          )}
                    <h4 className="user-block__title">{name}</h4>
                </Link >
                <div className="user-block__bottom">
                    <div className="user-block__price">{ Number(today) - Number(age)} лет</div>
                </div>
            </div>
        </div>
    );
};

export default UserBlock;