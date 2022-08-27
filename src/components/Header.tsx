import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/img/card-svgrepo-com.svg";
import { getUserById } from '../redux/features/users';
import { tokenus, userId } from '../redux/features/auth';
import { useAppDispatch, useAppSelector } from '../redux/store';
const Header: React.FC = () => {
  const user = useAppSelector(userId)
  const token = useAppSelector(tokenus)
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.user.item)



  useEffect(() => {
    //@ts-ignore
  dispatch(getUserById({ user, token }))

  }, [dispatch, token, user])

  return (
    <div className="container">
      <Link to="/">
        <div className="header__logo">
          <img width="38" src={logo} alt="logo" />
          <div>
            <h1>Users card</h1>
          </div>
        </div>
      </Link>

      <div className="header__cart">

        <div>
          <div>  <Link to="/account"> {users?.img ? (
            <img
              className="headersImg"
              src={`http://localhost:5000/${users.img}`}
              alt="logo"
            />
          ) : (
            <img
              className="headersImg"
              src={`https://upload.wikimedia.org/wikipedia/ru/thumb/c/ce/Aang.png/280px-Aang.png`}
              alt="logo"
            />
          )}
          </Link>
            <p>{users?.email}</p></div>


        </div>


      </div>
    </div>
  );
};

export default Header;