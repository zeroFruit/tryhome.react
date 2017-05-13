import React, { Component } from 'react';

import WrapperStyles  from '../../assets/styles/modules/_wrapper.css';
import FooterStyles   from '../../assets/styles/modules/_site-footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className={FooterStyles['site-footer']}>
        <div className={WrapperStyles['wrapper']}>
          <p><span className={FooterStyles['site-footer__text']}>Try-Home</span></p>
        </div>
      </footer>
    )
  }
}

export default Footer;
