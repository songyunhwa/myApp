import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const TagsBlock = styled.div`
margin-top:0.5rem;
.tag{
    font-size:0.8rem;
    display:inline-block;
    color:green;
    text-decoration:none;
    margin-right:0.5rem;
}
`;

const Tags = ({tags})=>{
    return(
        <TagsBlock>
            {tags.map(tag=>(
                <Link className="tag" to={`/?tag=${tag}`} key={tag}>
                #{tag}</Link>))}
        </TagsBlock>
    );
};

export default Tags;