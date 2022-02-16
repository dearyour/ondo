import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from 'variants';
import styled from 'styled-components';
import Image from 'next/image';
import imageLogo from 'public/images/imageLogo.png';
import Login from 'components/user/login';
import '@fontsource/caveat';


const TextContainer = () => {
  
  return (
    <TextContainerWrapper variants={staggerContainer} initial='initial' animate='animate'>

      <TextContainerTop>
        <motion.span variants={fadeIn()} style={{ color: 'palevioletred' }} >
          ; 오늘의 도전
        </motion.span>
        <FirstLetterText5XL variants={fadeIn()} >3 일간의 뜨거운 도전</FirstLetterText5XL> 
      </TextContainerTop>

      <TextContainerMiddle>
        <motion.span variants={fadeIn()} initial='initial' animate='animate' style={{fontFamily: 'Caveat', fontSize: '250px', fontWeight: 400}} >
          ondo
        </motion.span>
      </TextContainerMiddle>

      <TextContainerBottom>
        <motion.div variants={fadeIn()}><Login /></motion.div>
        <motion.p variants={fadeIn()}>
          몸과 마음 모두 건강해지는<br /> 그 날까지, <span style={{ color: 'palevioletred' }}>온도</span>하세요!
        </motion.p>
      </TextContainerBottom>
    </TextContainerWrapper>
  );
}

const TextContainerWrapper = styled(motion.div)`
  display: flex;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 7rem;
  padding-bottom: 7rem;
  flex-direction: column;
  height: 100%;

  @media (min-width: 768px) {
    padding-left: 13rem;
    padding-right: 13rem;
  }
`

const TextContainerTop = styled.div`
  display: flex;
  font-size: 1.125rem;
  line-height: 1.75rem;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`

const FirstLetterText5XL = styled(motion.span)`
  ::first-letter {
    font-size: 3rem;
    line-height: 1;
  }
`

const TextContainerMiddle = styled.div`
  display: grid;
  flex: 1 1 0%;
  place-items: center;
  /* z-index: 10; */

  span {
    font-size: 3rem;
    line-height: 1;
    font-weight: 900;
    letter-spacing: 0.05em;

    @media (min-width: 768px) {
      font-size: 8rem;
      line-height: 1;
    }
  }
`

const TextContainerBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 0.5rem;
    background-color: #edbaba;
    color: #ffffff;
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: 0.025em;
    text-transform: lowercase;
    border-radius: 0.5rem;

    @media (min-width: 768px) {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 600;

      @media (min-width: 768px) {
        font-size: 1.5rem;
        line-height: 2rem;
      }
    }
  }
`

export default TextContainer;