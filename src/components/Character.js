import React from 'react';

const Character = ({char, classStyle}) => {
  return(
    <span className={`${classStyle} py-1`}>
      {char}
    </span>
  )
};

export default Character;
