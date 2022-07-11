import React from 'react';

const Border = () => {
  return (
    <ul className='border'>
      <li className='border-item' style={{ background: 'var(--purple)' }} />
      <li className='border-item' style={{ background: 'var(--blue)' }} />
      <li className='border-item' style={{ background: 'var(--yellow)' }} />
      <li className='border-item' style={{ background: 'var(--pink)' }} />
      <li className='border-item' style={{ background: 'var(--gold)' }} />
      <li className='border-item' style={{ background: 'var(--aqua)' }} />
      <li className='border-item' style={{ background: 'var(--gray)' }} />
    </ul>
  );
};

export default Border;
