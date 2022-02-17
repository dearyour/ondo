
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router'
import AppLayout from 'components/layout/AppLayout';
import SearchResultChallenge from 'components/search/resultChallenge';
import SearchResultUser from 'components/search/resultUser';
import SearchResultFeed from 'components/search/resultFeed';
import styled from 'styled-components';
import useUser from 'store/hooks/userHooks';



const SearchPage = () => {
  const [data, setData] = useState({ challenges: [], feeds: [], users: [], });
  const { isLoading, loadingStart, loadingEnd } = useUser();
  const [layoutTitle, setLayoutTitle] = useState('');

  const router = useRouter()
  const { keyword } = router.query
  useEffect(useCallback(() => {
    // Router.reload()
    if (keyword) {
      const token = localStorage.getItem('Token');
      // console.log(keyword)
      const url = process.env.BACK_EC2 + '/search/' + keyword
      axios({
        method: 'get',
        url: url,
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => {
          // console.log(res.data)
          setData(res.data)
          setLayoutTitle(keyword + ' : 온도 통합검색')
        })
    }
    loadingEnd()
  }, [keyword]), [keyword])


  return (
    <AppLayout title={layoutTitle}>
      <Wrap>
        <SearchResultChallenge title='Challenge' keyword={String(keyword)} results={data.challenges}></SearchResultChallenge>
        <DivideLine />
        <SearchResultFeed title='Feed' keyword={String(keyword)} results={data.feeds}></SearchResultFeed>
        <DivideLine />
        <SearchResultUser title='User' keyword={String(keyword)} results={data.users}></SearchResultUser>
      </Wrap>
    </AppLayout>
  )
};

const DivideLine = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
`

const Wrap = styled.div`
  margin-top:20px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`

export default SearchPage;