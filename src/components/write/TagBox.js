import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';

const TagBoxBlock = styled.div`
width:100%;
border-top:1px solid gray;
padding-top:2rem;
`;

const TagForm = styled.form`
border-radius:4px;
overflow:hidden;
display:flex;
width:256px;
//border:1px solid gray;
h4{
    color:gray;
    margin-top:0;
    margin-bottom: 0.5rem;
}

input,
button{
    outline:none;
    border:none;
    font-size:1rem;
}

input{
    padding:0.5rem;
    flex:1;
    min-width:0;
}
button{
    cursor:pointer;
    padding-right:1rem;
    padding-left:1rem;
    border:none;
    background:gray;
    color:white;
    font-weight:bold;
    &:hover{
        background:gray;
    }
}
`;

const Tag = styled.div`
margin-right:0.5rem;
color:gray;
cursor:pointer;
&:hover{
    opacity:0.5;
}
`;

const TagListBlock = styled.div`
display:flex;
margin-top:0.5rem;
`;

const TagItem = React.memo(({tag, onRemove})=><Tag onClick ={()=>onRemove(tag)}>#{tag}</Tag>);
const TagList =React.memo(({tags, onRemove})=>(
    <TagListBlock>
        {tags && tags.map(tag =>(
            <TagItem key={tag} tag={tag} onRemove = {onRemove}/>
        ))}
    </TagListBlock>
));

const TagBox = ({onChangeTags , tags })=>{
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState([]);

    const insertTag = useCallback(
        tag => {
          if (!tag) return; // 공백이라면 추가하지 않음
          if (localTags.includes(tag)) return; // 이미 존재한다면 추가하지 않음
          const nextTags = [...localTags, tag];
          setLocalTags(nextTags);
          onChangeTags(nextTags);
        },
        [localTags, onChangeTags],
      );
    
    const onRemove = useCallback(
       tag=>{
        const nextTags =localTags.filter(t=>t !== tag);
           setLocalTags(nextTags);
           onChangeTags(nextTags);
       },
       [localTags, onChangeTags], 
    );

    const onChange = useCallback(e =>{
        setInput(e.target.value);
    },[]);
    /*tags 값이 바뀔 때
    useEffect(()=>{
        setLocalTags(tags);
    }, [tags]);
    */
   
    const onSubmit=  useCallback(e=>{
        e.preventDefault();
        insertTag(input.trim()); //앞 뒤 공백 없앤 후 등록
        setInput('');}
        ,[input, insertTag],
        );

    return(
        <TagBoxBlock>
            <TagForm onSubmit = {onSubmit}>
                <h4>태그</h4>
                <input placeholder="태그를 입력하세요"
                onChange = {onChange} value={input}/>
                <button type="submit">추가</button>
            </TagForm>
            <TagList tags = {localTags} onRemove={onRemove}/>
        </TagBoxBlock>
    );
};

export default TagBox;