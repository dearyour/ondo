
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router'
import AppLayout from 'components/layout/AppLayout';
import SearchResultChallenge from 'components/search/resultChallenge';
import SearchResultUser from 'components/search/resultUser';
import SearchResultFeed from 'components/search/resultFeed';
import styled from 'styled-components';



const SearchPage = () => {
  const router = useRouter()
  const { keyword } = router.query
  useEffect(useCallback(() => {
    if (keyword) {
      const token = localStorage.getItem('Token');
      console.log(keyword)
      const url = process.env.NEXT_PUBLIC_BACK_LOCAL + '/search/' + keyword
      axios({
        method: 'get',
        url: url,
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          console.log(res)
        })
    }
  }, []), [keyword])

  const router = useRouter()
  const { keyword } = router.query

  const temptemp = { image: 'https://picsum.photos/1000', id: 1, nickname: 'asd' }
  const temp2 = { image: 'https://picsum.photos/1200', id: 2, nickname: 'asdf' }
  const temp = {
    challenge: [temptemp, temptemp, temp2, temptemp, temptemp, temptemp, temp2],
    feed: [temptemp, temptemp, temptemp, temptemp, temptemp],
    user: [temptemp, temptemp, temptemp, temptemp, temptemp, temp2],
  }

  return (
    <AppLayout>
      <SearchResultChallenge title='Challenge' keyword={String(keyword)} results={temp.challenge}></SearchResultChallenge>
      <DivideLine />
      <SearchResultFeed title='Feed' keyword={String(keyword)} results={temp.feed}></SearchResultFeed>
      <DivideLine />
      <SearchResultUser title='User' keyword={String(keyword)} results={temp.user}></SearchResultUser>
    </AppLayout>
  )
};

const DivideLine = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
`

export default SearchPage;