import axios from 'axios';
import SearchResult from 'components/search/resultCarousel';
import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router'

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

  return (
    <div>
      <SearchResult title='Challenge'></SearchResult>
      <SearchResult title='Feed'></SearchResult>
      <SearchResult title='User'></SearchResult>
    </div>
  )
};

export default SearchPage;