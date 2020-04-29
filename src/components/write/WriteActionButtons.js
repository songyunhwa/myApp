import React, { useState, useCallback }  from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import axios from 'axios';

//이미지와 함께 db에 글을 등록한다.
const WriteActionButtonsBlock = styled.div`
text-align:right;
margin-top:1rem;
margin-bottom:3rem;
button+button{
    margin-left:0.5rem;
}
`;

const StyledButton = styled(Button)`
height:2.125rem;
&+&{
    margin-left:0.5rem;
}
`;

const WriteActionButtons = ({onCancel, onPublish, isEdit,imagepath, onChangePath})=>{
    const [img, setImage] = useState('');
    const [path , setPath] = useState('');
    
    const onChangeImagePath = useCallback(()=>
      {  
        onChangePath(path);
      },
      [path, onChangePath], 
   );
  
  
    const onChange = (e) => {
      setImage(e.target.files[0]);
     }
     
    const onClick = async () => {
        const formData = new FormData();
        formData.append('userfile', img);
    
        // 서버의 upload API 호출
       // onUpload(formData);
       const res = await axios.post("http://localhost:5000/upload", formData,{
         headers:{
           'Content-Type':'multipart/form-data'
         }
       }).then(res=>{
         console.log(res.data.url);
         setPath(res.data.url);
         onChangeImagePath();
       });
      
     }

    
    return(
        <div>
        <input type="file" name = "userfile" id="userfile"
        onChange={ onChange } />
        <WriteActionButtonsBlock>
            <StyledButton cyan onClick = {img !== '' ? onClick : onPublish}>
              {isEdit? '수정' : '등록'}
            </StyledButton>
            <StyledButton onClick = {onCancel}>취소</StyledButton>
        </WriteActionButtonsBlock>
        </div>
    );
};

export default WriteActionButtons;