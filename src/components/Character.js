import React from 'react';

const Character = ({char, style}) => {
  return(
    <span className={`${style} py-1`}>
      {char}
    </span>
  )
};

export default Character;
