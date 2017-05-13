import React, { Component } from 'react';

import Menu     from '../components/menu';

import HeroStyles from '../../assets/styles/modules/_large-hero.css';
import WrapperStyles from '../../assets/styles/modules/_wrapper.css';
import headerImg from '../../assets/images/header.jpg';

class Header extends Component {
  render() {
    return (
      <div>
        <div className={HeroStyles['large-hero']}>
          <img srcSet={`${headerImg} 1920w`} className={HeroStyles['large-hero__image']} />
        </div>
      </div>
    );
  }
}

export default Header;
