import React from 'react';
import EditorContainer from '../components/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import TagBoxContainer from '../components/write/TagBoxContainer';
import WriteActionButtonsContainer from '../components/write/WriteActionButtonsContainer';
import {Helmet} from 'react-helmet-async';

     //    <ImageContainer/>
const writePage = ()=>{
    return(
        <Responsive>
            <Helmet>
            <title>글 작성하기 - myOLD</title>
            </Helmet>
            <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionButtonsContainer/>
        </Responsive>
    );
}
export default writePage;