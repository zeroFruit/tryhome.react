import React, { Component } from 'react';

import Header from './header';
import Menu from './menu';
import Footer from './footer';

import styles from '../../assets/styles/style.css';

export default class App extends Component {
  render() {
    return (
      <div className={styles}>
        <Header />
        <Menu />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}
