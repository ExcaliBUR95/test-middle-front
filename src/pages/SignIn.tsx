import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector, authSingIn } from '../redux/features/auth';
import { useAppDispatch } from '../redux/store';
import style from './Auth.module.scss'

const SignIn = () => {
    const [email, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const error = useSelector(authSelector)
    const dipsatch = useAppDispatch()

    const handleSetLogin = (e: any) => {
        setLogin(e.target.value)
    }

    const handleSetPassword = (e: any) => {
        setPassword(e.target.value)
    }
    const handleSignUp = (e: any) => {
        e.preventDefault()
         //@ts-ignore
        dipsatch(authSingIn({email, password}))
    }
    if(error){
        return <div>{error}</div>
    }
    return (
        <form className={style.wrapper} onSubmit={handleSignUp}>
            <input  className={style.input} type='text'
                value={email}
                placeholder='login'
                onChange={handleSetLogin}
            />
            <br />
            <input  className={style.input} type='password'
                value={password}
                placeholder='login'
                onChange={handleSetPassword}
            />
            <br />
            <button className={style.button} type='submit'>Вход</button>
        </form>
    );
};

export default SignIn;