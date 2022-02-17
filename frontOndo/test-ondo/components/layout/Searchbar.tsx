import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import Router from 'next/router';
import useUser from 'store/hooks/userHooks';

const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    height: 48px;
    background: #f2f2f2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 5px;
    transition: all 0.3s ease;
`;

const SearchInput = styled.input`
    padding-left: 48px;
    padding-right:36px;
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
    /* transform: scale(1.05); */
    transition: all 1.3s ease-in-out;

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
    const { isLoading, loadingStart, loadingEnd } = useUser();
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const keywordChange: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    useEffect(() => {
        if (keyword) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [keyword])

    const Search = () => {
        Router.push('/search/' + keyword)
    }

    return (
        <SearchContainer>
            <IconButton onClick={Search}>
                <SearchOutlined size={22} />
            </IconButton>
            <SearchInput placeholder='검색' value={keyword} onKeyUp={(e) => { if (e.key === 'Enter') { loadingStart(); Search(); } }} onChange={keywordChange} />
            {isActive ? (
                <IconButton onClick={() => { setKeyword('') }}>
                    <CloseOutlined size={18} />
                </IconButton>
            ) : null
            }
        </SearchContainer>
    );
}

export default Searchbar;