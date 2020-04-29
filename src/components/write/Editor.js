import React, {useState, useRef, useEffect} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
padding-top:5rem;
padding-bottom:5rem;
`;

const TitleInput = styled.input`
font-size:3rem;
outline:none;
padding-bottom:0.5rem;
border:none;
border-bottom:1px solid gray;
margin-bottom:2rem;
width:100%;
`;

const QuillWrapper = styled.div`
.ql-editor{
    padding:0;
    min-height:320px;
    font-size:1.125rem;
    line-height:1.5;
}
.ql-editor.ql-blank::before{
    left:0px;
}
`;

const Editor = ({title,body, price, category, onChangeField})=>{
    const quillElement =useRef(null);
    const quillInstance = useRef(null);

    useEffect(()=>{
        quillInstance.current = new Quill(quillElement.current,{
            theme:'bubble',
            placeholder:'내용을 작성하세요',
            modules:{
                toolbar:[
                [{header:'1'},{header:'2'}],
                ['bold', 'italic', 'underline', 'strike'],
                [{list:'ordered'}, {list:'bullet'}],
                ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });
    const quill = quillInstance.current;
    quill.on('text-change',(delta, oldDelta, source)=>{
        if(source ==='user'){
            onChangeField({key:'body', value:quill.root.innerHTML});
        }
    });
    }, [onChangeField]);
    
    //포스트에서 수정 버튼눌렀을 때 body 내용 보여줌. 
    const mounted = useRef(false);
    useEffect(()=>{
        if(mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
    }, [body]);

    const onChangeTitle = e=>{
        onChangeField({key:'title', value:e.target.value});
    };

    const onChangePrice = e=>{
        onChangeField({key:'price', value:e.target.value});
    }
    
    const onChangeCategory = e=>{
        onChangeField({key:'category', value:e.target.value});
    }


//
    return(
        <EditorBlock>
            <TitleInput placeholder="제목을 입력하세요"
            onChange = {onChangeTitle}
            value = {title}/>
            <div> 가격
            <input
                placeholder="가격을 입력해주세요"
                value={price}
                onChange={onChangePrice}/></div>
            <div>카테고리
            <select
                placeholder="카테고리를 설정해주세요"
                value={category}
                onChange={onChangeCategory}>
                        <option value="top">상의</option>
                        <option value="bottom">하의</option>
                        <option value="acc">악세서리</option>
                </select>
            </div>
            <QuillWrapper>
                <div ref={quillElement}/>
            </QuillWrapper>
        </EditorBlock>
    );
};

export default Editor;