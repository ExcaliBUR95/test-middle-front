import { toast, ToastContainer }  from 'react-toastify';
import  React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector, authSingIn } from '../redux/features/auth';
import { useAppDispatch } from '../redux/store';
import style from './Auth.module.scss'

const SignIn = () => {
    const [email, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const error = useSelector(authSelector)
    const dipsatch = useAppDispatch()

    const handleSetLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
    }

    const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
         //@ts-ignore
        dipsatch(authSingIn({email, password}))
    }
    const notify = () => toast(error);

    if(error){
        notify()
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
            <ToastContainer />
        </form>
    );
};

export default SignIn;