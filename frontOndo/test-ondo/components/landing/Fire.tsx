import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { fire, fireWrapper } from 'variants';
import styled from 'styled-components';

interface Props {
  animationSpeed: number;
  imageUrl: string;
  styles: any;
}

const Fire: FC<Props> = ({ animationSpeed, imageUrl, styles }) => {
  return (
    <motion.div variants={fireWrapper} style={styles}>
      <FireImg custom={animationSpeed} variants={fire} src={imageUrl} />
    </motion.div>
  );
}

const FireImg = styled(motion.img)`
  object-fit: contain;
  width: 5rem;
  height: 7rem;
`

export default Fire;