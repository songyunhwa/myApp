import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeField, initializeForm, login} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {withRouter} from 'react-router-dom';
import {check} from '../../modules/user';

const LoginForm = ({history})=>{
    const [error, setError] = useState('로그인하세요!');
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth, user}) => ({
        form:auth.login,
        auth: auth.auth,
        authError:auth.authError,
        user: user.user,
    }));

    const onChange = e=>{
        const {value, name} = e.target;
        dispatch(
            changeField({
                form :'login',
                key:name,
                value
            })
        );
    };

    const onSubmit = e=>{
        e.preventDefault(); //a와 submit의 동작 중단.
        const {username, password} = form;
       
        dispatch(login({username, password}));
    };
         
    useEffect(()=>{
        dispatch(initializeForm('login'))
    },[dispatch]);

    useEffect(()=>{
        if(authError){
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if(auth){
            console.log('로그인 성공');
            setError('로그인 성공');
            dispatch(check());
        }
    }, {auth, authError, dispatch});
    
    useEffect(()=>{
        if(user){
            history.push('/');
            try{
                localStorage.setItem('user', JSON.stringify(user)); //로그인 유지하기
            }catch(e){
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);
    

    return(
        <AuthForm
        type="login"
        form ={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
        />
    );
};

export default withRouter(LoginForm);