import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from './Header';
import {logout, check} from '../../modules/user';

const HeaderContainer = ()=>{
    const {user, auth} = useSelector(({user, auth})=>({
        user:user.user,
        auth: auth.auth,
    }));
    const dispatch = useDispatch();

    useEffect(()=>{

        if(auth){
            dispatch(check());
        }
    }, {auth,  dispatch});

    const onLogout = ()=>{
        dispatch(logout());
    };

    return <Header user={user} onLogout = {onLogout}/>;
};

export default HeaderContainer;