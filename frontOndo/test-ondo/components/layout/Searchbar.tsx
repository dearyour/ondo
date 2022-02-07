import { useState } from 'react';
import styled from 'styled-components';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import useInput from 'store/hooks/useInput';
import axios from 'axios';
import Router from 'next/router';

const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    height: 48px;
    background: #f2f2f2;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 5px;
    transition: all 0.3s ease;
`;

const SearchInput = styled.input`
    padding-left: 48px;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
    outline: none;
    font-size: 16px;
    border: 1px solid transparent;

    &:focus {
        /* border-color: rgba(0, 0, 0, 0.3); */
    }
`;

const IconButton = styled.button`
    position: relative;
    height: 36px;
    width: 36px;
    border: none;
    z-index: 1;
    cursor: pointer;
    background: none;

    &:hover {
        color: white;
        &::after {
            opacity: 1;
            transform: scale(1);
        }
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 50%;
        z-index: -1;
        background: #000;
        transition: 0.2s ease;
        transform: scale(0.6);
        opacity: 0;
    }
`;

function Searchbar(): JSX.Element {
    const [keyword, setKeyword] = useInput('');
    const [isActive, setIsActive] = useState(false);
    const keywordChange:React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e)
    }

    const toggleSearch = () => {
        setIsActive(!isActive);
    }
    const url = 'http://localhost:8080/search/'
    const Search = () => {
        const token= localStorage.getItem('Token');
        axios({
            method:'get',
            url: url + keyword,
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            console.log(res)
        })
    }

    return (
       <SearchContainer>
           <IconButton onClick={Search}>
               {isActive ? (
                   <CloseOutlined size={18} />
                    ) : (
                   <SearchOutlined size={22}/>
                    )
                }
           </IconButton>
           <SearchInput placeholder='검색' value={keyword} onChange={keywordChange} />
       </SearchContainer>
    );
}

export default Searchbar;