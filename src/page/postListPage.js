import React from 'react';
import HeaderContainer from '../components/common/HeaderContainer';
import PostListContainer from '../components/posts/PostListContainer';
import PaginationContainer from '../components/posts/PaginationContainer';
import CategoryContainer from '../components/posts/CategoryContainer';
import SearchFormContainer from '../components/posts/SearchFormContainer';
import styled from 'styled-components';
const Block = styled.div`
 display:flex;
 flexDirection:row;
`;
const postListPage = ()=>{
    return(
        <div>
         <HeaderContainer/>
         <Block>
          <CategoryContainer/>
          <SearchFormContainer/>
          </Block>
          <PostListContainer/>
          <PaginationContainer/>
        </div>
    );
}
export default postListPage;