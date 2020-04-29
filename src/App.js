import React from 'react';
import './App.css';
import loginPage from './page/loginPage';
import postListPage from './page/postListPage';
import postPage from './page/postPage';
import registerPage from './page/registerPage';
import writePage from './page/writePage';
import {Route} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import chatPage from './page/chatPage';
import myPage from './page/myPage';
function App() {
  return (
    <>
    <Helmet>
      <title>myOLD</title>
    </Helmet>
    <Route component={loginPage} path = "/login"/>
    <Route component={postListPage} path={['/@:username', '/']} exact />
    <Route component={registerPage} path="/register"/>
    <Route component={writePage} path = "/write"/>
    <Route component={postPage} path={['/@:username/:postId', 'mypage/@:username/:postId']}/>
    <Route component={chatPage} path="/chat/@:username"/>
    <Route component={myPage} path="/mypage/:username"/>

    </>
  
  );
};

export default App;
