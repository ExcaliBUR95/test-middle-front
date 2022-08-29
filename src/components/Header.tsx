import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/img/card-svgrepo-com.svg";
import { getUserById } from '../redux/features/users';
import { tokenus, userId } from '../redux/features/auth';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useSelector } from 'react-redux';
const Header: React.FC = () => {
  const user = useSelector(userId)
  const token = useSelector(tokenus)
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.user.item)
 


  const token2 = localStorage.getItem('token')

  useEffect(() => {
    setTimeout(() => {
      //@ts-ignore
      dispatch(getUserById({ user, token }))
    }, 1000)
  }, [dispatch, token, user, token2])

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
          {//@ts-ignore
            users?.map((item) => {
              return (
                <div key={item._id}>  <Link to="/account"> {item?.img ? (
                  <img
                    className="headersImg"
                    src={`http://localhost:5000/${item.img}`}
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
                  <p>{item?.email}</p></div>
              )
            })}


        </div>


      </div>
    </div>
  );
};

export default Header;