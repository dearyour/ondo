import SearchResult from 'components/search/resultCarousel';
import React from 'react';

const SearchPage = () => {

  return (
    <div>
      <SearchResult title='Challenge'></SearchResult>
      <SearchResult title='Feed'></SearchResult>
      <SearchResult title='User'></SearchResult>
    </div>
  )
};

export default SearchPage;