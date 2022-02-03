import React from 'react';


interface userChallenge {
  title: string,
  percent: any,
  participate: number,
  image: string,
}

const Challengebox: React.FC<userChallenge> = ({title, percent, participate, image}:userChallenge) => {
  return (
    <div>

    </div>
  )
}

export default Challengebox;