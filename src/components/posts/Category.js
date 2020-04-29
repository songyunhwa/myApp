import React,{ useCallback} from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const HeaderBlock = styled.div`

    flexDirection: column;
    height:100%;
    width:5rem;
    background:white;
    align-items: center;
    margin-top:1rem;
    margin-left:2rem;
    box-shadow:0px 2px 4px rgba(0,0,0,0.08);

    @media(max-height:1024px){
        height: 768px;
    }
    @media(max-height: 768px){
        height:100%;
    }
    
`;


const buildLink = ({username, tag, page,category})=>{
    const query = qs.stringify({tag, page, category});
    return username ?  `/@${username}?${query}`:`?${query}`;
};



const Category =  ({page, tag, username, onChangeField, category})=>{

    //usecallback 같은 함수를 재사용하기 위함.
    //현재 disable이 작동을 안함.

    const onTop= useCallback(e=>{
        onChangeField('top');
    },[]);

    const onBottom= useCallback(e=>{
        onChangeField('bottom');
    },[]);

    const onAcc= useCallback(e=>{
        onChangeField('acc');
    },[]);

    const onAll = useCallback(e=>{
        onChangeField('');
    },[]);
    
    return(
        <>
        <HeaderBlock>
        <Button
            disabled = {category === ''}
            to={buildLink({username, tag, page, category:'all'})}
            onClick = {onAll}
            >All
        </Button>
        <Button
            disabled={category === 'top'}
            onClick = {onTop}
            to={buildLink({username, tag, page, category:'top'})
            }
            >top
        </Button>
        <Button
            disabled={category === 'bottom'}
            to={buildLink({username, tag, page, category:'bottom'})}
            onClick = {onBottom}
            >bottom</Button>
        <Button
            disabled={category === 'acc'}
            to={buildLink({username, tag, page, category:'acc'})}
            onClick = {onAcc}
            >accessory
        </Button>
        
        </HeaderBlock>
        </>
    );
};

export default Category;