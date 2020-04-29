import React from 'react';
import styled, {css} from 'styled-components';
import {withRouter } from 'react-router-dom';

const StyledButton = styled.button`
border:none;
border-radius:4px;
font-size:1rem;
font-weight:bold;
padding:0.25rem 1rem;
color:gray;
outline:none;
cursor:pointer;
background-color:white;
}

${props=>
    props.fullWidth&&
    css`
    padding-top :0.75rem;
    padding-bottom:0.75rem;
    width:100%;
    font-size:1.125rem;
    `
}

&:disabled{
    color: red;
}
`;

const Button = ({to,history , ...rest})=>{
    const onClick = e =>{
        if(to){
            history.push(to)
        }
        if(rest.onClick){
            rest.onClick(e);
        }
    };
    return<StyledButton{...rest} onClick = {onClick} />;
};

export default withRouter(Button);
