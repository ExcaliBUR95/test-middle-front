import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import "./style.css";
const Profile: React.FC = () => {
    const [file, setFile] = useState();
    const user = useAppSelector((state) => state.user.item);




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
        setFile(e.target.file)
    }
    return (

        <div className="background__image">
            <div className="prosto__probel"></div>
            <div className="border__radius" >
             {
                //@ts-ignore
                user?.map((item) => {
                    return (
                        <div className="main_div">
                        <div className="photo_back">
                            <label htmlFor="upload_photo">
                                <input id="upload_photo" className="file" onChange={handleFile} type="file" />
                                <div>
    
                                    {item?.img ? (
                                        <img
                                            className="img"
                                            src={`http://localhost:5000/${item?.img}`}
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
                            <div className="button__edit__profile">
    
                                <button className="button">
                                    <NavLink className="navLink" to={`/EditProfile`}>
                                        Редактировать профиль
                                    </NavLink>
                                </button>
    
                            </div>
    
                            <div>
                                <h1 className="nick__name">
                                    {message} {item?.nickName}
                                </h1>
    
                                <p className="id_p">{item?._id}</p>
                                <p></p>
    
    
                            </div>
                        </div>
                    </div>
                    )
                })
             }
            </div>


        </div>

    );
};


export default Profile;