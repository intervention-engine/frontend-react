import React from 'react';

import Logo from '../Header/Logo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-contents">
        <Logo />

        <div className="mitre">
          <span className="mitre-developed">Developed by</span>
          <span className="mitre-name">
            <a href="https://www.mitre.org/" target="_blank"> The MITRE Corporation</a>
          </span>
        </div>

        <div className="version">v{VERSION}</div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
