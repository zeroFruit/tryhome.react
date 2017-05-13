import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';

import NavStyles  from '../../assets/styles/modules/_primary-nav.css';
import RowStyles  from '../../assets/styles/modules/_row.css'
import WrapperStyles  from '../../assets/styles/modules/_wrapper.css'

import {
  A_SITE_INDEX,
  B_SITE_INDEX,
  checkSiteExist,
  fetchSite,
  fetchItems
} from '../actions/index';

import { MENU_INDEX } from '../utils/consts';

import Categories from './categories';



class Menu extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { siteIndex: null, menuIndex: MENU_INDEX[0] };
  }

  onSiteMenuClick(siteIndex, menuIndex) {
    this.props.checkSiteExist().then(res => {
      if (!res) {
        alert('페이지가 존재하지 않습니다!');
        this.context.router.push('/');
      } else {
        this.setState({ siteIndex, menuIndex });
        this.props.fetchSite({ siteIndex });
        this.props.fetchItems({ siteIndex });
      }
    });
  }

  onHomeMenuClick() {
    this.setState({ menuIndex: MENU_INDEX[0] });
    this.context.router.push('/');
  }

  onQnAMenuClick() {
    this.setState({ menuIndex: MENU_INDEX[3] });
    this.context.router.push('/qna');
  }

  render() {
    return (
      <div>
        <div
          className={
            classNames(
              WrapperStyles['wrapper'],
              WrapperStyles['wrapper--no-padding-until-large'])}>
          <nav
            className={
              classNames(
                RowStyles['row'],
                RowStyles['row--gutters'],
                RowStyles['row--equal-height-at-large'],
                RowStyles['row--gutters-small'],
                RowStyles['row--t-padding']
              )}>
            <div className={RowStyles['row__large-4']}>
              <div className={NavStyles['primary-nav']} onClick={this.onHomeMenuClick.bind(this)}>
                <h2 className={NavStyles['primary-nav__text']}>
                  서비스 소개 및 이용안내
                </h2>
              </div>
            </div>

            <div className={RowStyles['row__large-4']}>
              <div className={NavStyles['primary-nav']} onClick={() => this.onSiteMenuClick(A_SITE_INDEX, MENU_INDEX[1])}>
                <h2 className={NavStyles['primary-nav__text']}>
                  쇼핑몰 A
                </h2>
              </div>
            </div>

            <div className={RowStyles['row__large-4']}>
              <div className={NavStyles['primary-nav']} onClick={() => this.onSiteMenuClick(B_SITE_INDEX, MENU_INDEX[2])}>
                <h2 className={NavStyles['primary-nav__text']}>
                  쇼핑몰 B
                </h2>
              </div>
            </div>

            <div className={RowStyles['row__large-4']}>
              <div className={NavStyles['primary-nav']} onClick={this.onQnAMenuClick.bind(this)}>
                <h2 className={NavStyles['primary-nav__text']}>
                  FAQ
                </h2>
              </div>
            </div>
          </nav>

          <Categories
            menuIndex={this.state.menuIndex}
            siteIndex={this.state.siteIndex}
            wait={this.props.wait}
            site={this.props.site}
            items={this.props.items}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  let { items, site: { site } } = state;

  if (!site || items.length === 0) {
    return {
      wait: true,
      items: null,
      site: null
    };
  } else {
    return {
      wait: false,
      items,
      site
    };
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkSiteExist, fetchSite, fetchItems }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
