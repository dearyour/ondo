import { useEffect, useState } from 'react';
import { BiArrowFromBottom } from 'react-icons/bi';
import { Button } from 'antd';
import Icon, { ToTopOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if(window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  return (
    <ButtonWrapper>
      <ToTopButton type='button' onClick={scrollToTop} style={isVisible ? {opacity: '1'} : {opacity: '0'}}>
        <ToTopIcon aria-hidden='true' />
      </ToTopButton>
    </ButtonWrapper>

    // <StyledButton type='primary' shape='circle' onClick={scrollToTop} style={isVisible ? {opacity: '1'} : {opacity: '0'}}>
    //   <Icon style={{ fontSize: '1.25rem' }}/>
    // </StyledButton>
  )
}

// const StyledButton = styled(Button)`
//   width: 40px;
//   height: 40px;
//   position: fixed;
//   bottom: 16px;
//   right: 16px;
//   transition: all 0.25s ease-in;
//   transform: translateY(10px);
//   /* opacity: 0;

//   &.isVisible {
//     opacity: 1;
//     transform: translateY(0);
//   } */
// `

const ButtonWrapper = styled.div`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
`

const ToTopButton = styled.button`
  display: inline-flex;
  padding: 0.5rem;
  align-items: center;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0, 0.05);
  color: #ffffff;
  background-color: #ffeeee;
  transition-property: opacity;

  font-size: 1.25rem;

  &:hover {
    background-color: #EDBABA;
  }

  &:focus {
    outline: 0;
    --ring-color: #EC4899;
    --ring-offset-width: 2px;
    box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: 0 0 0 var(--ring-offset-width) var(--ring-offset-color), var(--ring-shadow);
  }
  

//   /* z-index: 2;
//   position: fixed;
//   bottom: '2vh';
//   background-color: #DCDCDC;
//   color: black;
//   right: 5%;

//   &:hover, &:focus {
//     transition: 0.3s;
//     color: #397BA6;
//     background-color: #DCDCDC;
//   } */
`

const ToTopIcon = styled(BiArrowFromBottom)`
  height: 1.5rem;
  width: 1.5rem;
`

export default ScrollToTop;