import React from 'react';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillMail,
  AiFillPhone,
} from 'react-icons/ai';

import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer>
      <p>Brian, 2022. All rights reserved.</p>
      <div className='footer__social'>
        <a href='tel:+84706358446' target='_blank' rel='noreferrer'>
          <AiFillPhone size={20} />
        </a>
        <a
          href='mailto:minhquang.demon@gmail.com'
          target='_blank'
          rel='noreferrer'
        >
          <AiFillMail size={20} />
        </a>
        <a href='https://m.me/mon.doan.1911' target='_blank' rel='noreferrer'>
          <AiFillFacebook size={20} />
        </a>
        <a
          href='https://www.linkedin.com/in/briandoan1911/'
          target='_blank'
          rel='noreferrer'
        >
          <AiFillLinkedin size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
