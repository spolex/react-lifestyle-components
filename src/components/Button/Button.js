import React from 'react';

export const Button = ({ onClick, children, color, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className={'btn btn-'.concat(color)}>
      {children}
    </button>
  );
};
