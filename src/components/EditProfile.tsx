import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "materialize-css";
import { tokenus, userId } from "../redux/features/auth";
import {
  addImage,
  changePassNick,
  changeProfile,
  image,
  Status
} from "../redux/features/users";
import { useAppDispatch, useAppSelector } from "../redux/store";
import "./style.css";

const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersId = useAppSelector(userId);
  const token = useAppSelector(tokenus)
  const user = useAppSelector((state) => state?.user?.item);
  const [file, setFile] = useState();
  const [nickName, setNickname] = useState("");
  const [password_new, setPassword_New] = useState('')
  const [password_old, setPassword_Old] = useState('')
  const [_, forceUpdate] = useReducer(x => x + 1, 0)
  const navigate = useNavigate()
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword_Old(e.target.value)
  }
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword_New(e.target.value)
  }



  const handleImage = () => {
    dispatch(addImage({ usersId, file, token, navigate } as unknown as image));
    dispatch(changePassNick({ password_old, password_new, nickName, usersId, token, navigate } as changeProfile));

  };

  useEffect(() => {
    if (Status.SUCCES) {
      forceUpdate()
      toast({ html: 'Данные были успешно сохранены', classes: "succes" });
    }
  }, [dispatch])
  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div className="div__in__edit">
        {
          //@ts-ignore
          user?.map((item) => {
            return (
              <div key={item?._id} className="main__div__setting">
                <div className="setting__photo">
                  <div className="basic__info">
                    <h1 className="h2">Редактирование профиля</h1>
                    <div className="one__input">
                      <input
                        onChange={handleChangeNickname}
                        id="full__name"
                        type="text"
                        placeholder={item?.nickName}
                      />
                    </div>
                    <div>
                      <div className="password_old">
                        <input
                          id="full__name"
                          onChange={handleOldPassword}
                          value={password_old}
                          type="text"
                          placeholder="Введите старый пароль"
                        />
                      </div>
                      <div className="password_new">
                        <input
                          id="full__name"
                          onChange={handleNewPassword}
                          value={password_new}
                          type="text"
                          placeholder="Введите новый пароль"
                        />
                      </div>
                    </div>
                    <label htmlFor="upload_photo__edit">
                      <input
                        id="upload_photo__edit"
                        onChange={handleFile}
                        type="file"
                      />
                      <div>
                        {item?.img ? (
                          <img
                            className="img"
                            src={`http://localhost:5000/${item.img}`}
                            alt="logo"
                          />
                        ) : (
                          <img
                            className="img"
                            src={`https://upload.wikimedia.org/wikipedia/ru/thumb/c/ce/Aang.png/280px-Aang.png`}
                            alt="logo"
                          />
                        )}
                      </div>
                    </label>
                  </div>

                  <span className="about__info">
                    Изменение адреса электронной почты может привести к нарушению
                    входа в систему Auth, если ваши учетные записи в социальных
                    сетях не используют один и тот же адрес электронной почты.
                    Пожалуйста, используйте вход по волшебной ссылке, если вы
                    столкнулись с такой проблемой.
                  </span>
                  <input id="full__name" type="text" value={item?.email} />
                  <div className="buttons__div">
                    <button className="button__edit" onClick={handleImage}>
                      Обновить
                    </button>
                  </div>
                </div>
              </div>)
          })
        }
      </div>
    </>
  );
};

export default EditProfile;
