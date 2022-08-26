import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUserById} from '../redux/features/users';
import { tokenus, userId } from '../redux/features/auth';
import { useAppDispatch, useAppSelector } from "../redux/store";
import "./style.css";
const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const [file, setFile] = useState();
    const usersId = useAppSelector(userId);
    const token = useAppSelector(tokenus)
    const user = useAppSelector((state) => state.user.item);
    console.log(user?.img);
console.log(usersId,token);

    useEffect(() => {
        //@ts-ignore
        dispatch(getUserById({ usersId, token }))
    }, [dispatch]);


    let now = new Date()
    let hour = now.getHours()
    let message = '';


    if (hour <= 6) {
        message = 'Доброе время суток';
    } else if (hour <= 12) {
        message = 'Доброе утро';
    } else if (hour <= 18) {
        message = 'Добрый день';
    } else {
        message = 'Добрый вечер';
    }
    const handleFile = (e: any) => {
        setFile(e.target.files[0])
    }
    return (

        <div className="background__image">
            <div className="prosto__probel"></div>
            <div className="border__radius" >
                <div className="main_div">
                    <div className="photo_back">
                        <label htmlFor="upload_photo">
                            <input id="upload_photo" className="file" onChange={handleFile} type="file" />
                            <div>

                                {user?.img ? (
                                    <img
                                        className="img"
                                        src={`http://localhost:5000/${user?.img}`}
                                    />
                                ) : (
                                    <img
                                        className="img"
                                        src={`https://upload.wikimedia.org/wikipedia/ru/thumb/c/ce/Aang.png/280px-Aang.png`}
                                    />
                                )}

                            </div>

                        </label>
                        <div className="button__edit__profile">

                            <button className="button">
                                <NavLink className="navLink" to={`/EditProfile`}>
                                    Редактировать профиль
                                </NavLink>
                            </button>

                        </div>

                        <div>
                            <h1 className="nick__name">
                                {message} {user?.nickName}
                            </h1>

                            <p className="id_p">{user?._id}</p>
                            <p></p>


                        </div>
                    </div>


                </div>
            </div>


        </div>

    );
};


export default Profile;