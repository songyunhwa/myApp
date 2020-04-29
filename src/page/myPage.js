import React, {useState} from 'react';
import ChatListContainer from '../components/room/ChatListContainer';
import Responsive from '../components/common/Responsive';
import ChatContainer from '../components/room/ChatContainer';
import WatchListContainer from '../components/room/WatchListContainer';
import HeaderContainer from '../components/common/HeaderContainer';
import styled from 'styled-components';

const Button = styled.button`
cursor:pointer;
padding-right:1rem;
padding-left:1rem;
padding-top:0.5rem;
padding-bottom:0.5rem;
margin-right:1rem;
margin-top:1rem;
border:none;
background:green;
color:white;
font-weight:bold;
border-radius:4px;
`;

const MyPage = ()=>{
    const [modal, setModal] = useState(false); //false 일 때 받은 쪽지함.
    const [modal1, setModal1] = useState(true);

    const onReceive = ()=>{
        setModal(false);
        setModal1(false);
    };
    const onSend = ()=>{
        setModal(true);
        setModal1(false);
    };

    const onWatchList = ()=>{
        setModal1(true);
    };
    return(
        <div>
        <HeaderContainer/>
            <Responsive>
                <Button onClick ={()=>onWatchList()}>관심 품목 리스트</Button>
                <Button onClick = {()=>onSend()}>보낸 쪽지</Button>
                <Button onClick = {()=>onReceive()}>받은 쪽지</Button>
                {modal1? <WatchListContainer/>
                : <ChatListContainer modal={modal}/>}
            </Responsive>
            </div>
    );
};
export default MyPage;