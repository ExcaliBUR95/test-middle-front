import React, {  useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { authSelector, authSingUp } from '../redux/features/auth';
import { useAppDispatch, useAppSelector } from '../redux/store';
import style from './Auth.module.scss'
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickName, setNickName] = useState('')
    const [male, setMale] = useState<any>(Boolean)
    const [feMale, setFeMale] = useState<any>(Boolean)
    const [brithDay, setBrithDay] = useState('')
    const error = useSelector(authSelector)

    // const [file, setFile] = useState();
    const dipsatch = useAppDispatch()
    const tokenId = useAppSelector(state => state.auth.token)
    const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(e.target.value)
    }

    const handleMale = () => {
        setMale(!male)
        setFeMale('')
    }
    const handleFeMale = () => {
        setMale('')
        setFeMale(!feMale)

    }
    const handleBrihDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrithDay(e.target.value)
    }
    // const handleFile = (e:any) => {
    //     setFile(e.target.files[0])
    const notify = () => toast(error);
    // }
    const handleSignUp = (e: any) => {
        e.preventDefault()
        //@ts-ignore
        dipsatch(authSingUp({
            email,
            password,
            nickName,
            male,
            brithDay,
        }))
    }
    const [reg, setState] = useState("Зарегистрироваться")

    const ref = useRef(true)
    const handleAuth = () => {
        if (ref.current) {
            if (error) {
                notify()
            } else {
          <NavLink to={'/signIn'} />
            }
        }
        ref.current = false
    }
    return (
        <form className={style.wrapper} onSubmit={handleSignUp}>
            <input className={style.input} type='text'
                value={email}
                placeholder='email'
                onChange={handleSetEmail}
            />
            <br />
            <input className={style.input} type='password'
                value={password}
                placeholder='password'
                onChange={handleSetPassword}
            />
            <br />
            <input className={style.input} type='text'
                value={nickName}
                placeholder='Ваш ник'
                onChange={handleNickName}
            />
            <br />
            <div >
                <label className={style.radio} htmlFor='male'>
                    <input type='radio'
                        checked={male}
                        placeholder='Ваш пол'
                        onChange={handleMale}
                        id='male'
                    />
                    <span> Мужской</span>
                </label>
                <label className={style.radio} htmlFor="FeMale">
                    <input type='radio'
                        checked={feMale}
                        placeholder='Ваш пол'
                        onChange={handleFeMale}
                        id='FeMale'
                    />
                    <span> Женский</span>
                </label>

            </div>
            <br />
            <input className={style.input} type='date'
                min="1970-04-20"
                max="2018-04-24"
                value={brithDay}
                placeholder='День рождения'
                onChange={handleBrihDay}
            />
            <br />
          {error ? <button className={style.button} onClick={handleAuth} type='submit' >{reg}</button> : <Link to={'/signIn'}><button className={style.button} onClick={handleAuth} type='submit' >{reg}</button></Link> }  
            <ToastContainer />
        </form>
    );
};

export default SignUp;