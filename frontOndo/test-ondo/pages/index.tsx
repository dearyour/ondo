import Fire from 'components/landing/Fire';
import TextContainer from 'components/landing/TextContainer';
import { motion } from 'framer-motion';
import { dogye, dogyeWrapper, firesContainer } from 'variants';
import styled from 'styled-components';
import Login from "../components/user/login";
import Head from 'next/head';

const Landing = () => {
  // const fireWrapper1 = {
  //   position: 'absolute',
  //   top: '13rem',
  //   left: '30%',
  // }

  // const fireWrapper2 = {
  //   position: 'absolute',
  //   right: '18rem',
  //   top: '50%',
  // }

  // const fireWrapper3 = {
  //   position: 'absolute',
  //   top: '2.5rem',
  //   right: '40%',
  // }

  // const fireWrapper4 = {
  //   position: 'absolute',
  //   top: '36%',
  //   right: '33.333%',
  // }

  // const fireWrapper5 = {
  //   position: 'absolute',
  //   top: '75%',
  //   left: '25%',
  // }

  return (
    <>
      <Head><title>3일간의 뜨거운 도전, 온도</title></Head>
      <Base>
        <TextContainer />
        <DogyeWrapper variants={dogyeWrapper} initial='initial' animate='animate'>
          <Dogye src='/images/dogye/happy.png' variants={dogye} />
        </DogyeWrapper>
        {/* <motion.div variants={firesContainer} initial='initial' animate='animate'>
        <Fire animationSpeed={1.8} imageUrl='./images/landing/fire01.png' styles={fireWrapper1} />
        <Fire animationSpeed={1.6} imageUrl='./images/landing/fire02.png' styles={fireWrapper2} />
        <Fire animationSpeed={1.5} imageUrl='./images/landing/fire03.png' styles={fireWrapper3} />
        <Fire animationSpeed={1.7} imageUrl='./images/landing/fire04.png' styles={fireWrapper4} />
        <Fire animationSpeed={1.8} imageUrl='./images/landing/fire05.png' styles={fireWrapper5} />
      </motion.div> */}
      </Base>
    </>
  );
}

const Base = styled.main`
  background-color: #fffafa;
  color: #111827;
  /* font-family: Georgia, Cambria, 'Times New Roman', Times, serif; */
  height: 100vh;

  position: relative;
`

const DogyeWrapper = styled(motion.div)`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  place-items: center;
  width: 100%;
`

const Dogye = styled(motion.img)`
  height: 25rem;
  width: 15.625rem;
  object-fit: contain;

  @media (min-width: 768px) {
    height: 34.375rem;
    width: 31.25rem;
  }
`

// const FireWrapper1 = styled(Fire)`
//   position: absolute;
//   top: 13rem;
//   left: 40%;
// `

// const FireWrapper2 = styled(Fire)`
//   position: absolute;
//   right: 18rem;
//   top: 50%;
// `

// const FireWrapper3 = styled(Fire)`
//   position: absolute;
//   top: 2.5rem;
//   right: 40%;
// `

// const FireWrapper4 = styled(Fire)`
//   position: absolute;
//   top: 36%;
//   right: 33.333%;
// `

// const FireWrapper5 = styled(Fire)`
//   position: absolute;
//   top: 75%;
//   left: 25%;
// `

export default Landing;