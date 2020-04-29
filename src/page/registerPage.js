import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../components/auth/RegisterForm';
const registerPage = ()=>{
    return(
            <AuthTemplate>
                <RegisterForm/>
            </AuthTemplate>
    );
}
export default registerPage;