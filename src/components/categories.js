import _indexOf from 'lodash.indexof';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import classNames from 'classnames';

import { filterItems } from '../actions/index';

import { MENU_INDEX } from '../utils/consts';

import NavStyles  from '../../assets/styles/modules/_primary-nav.css';
import RowStyles  from '../../assets/styles/modules/_row.css'
import WrapperStyles  from '../../assets/styles/modules/_wrapper.css'


class Categories extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onCategoryClick(siteIndex, categoryIndex) {
    let category = this.props.site.categories[categoryIndex];

    this.context.router.push(`/site/${siteIndex}/${categoryIndex}`);
    this.props.filterItems({ siteIndex, categoryIndex, category });
  }

  isCategoriesVisible() {
    return this.props.menuIndex === MENU_INDEX[0] || this.props.menuIndex === MENU_INDEX[3] ? false : true;
  }

  renderCategories() {
    return this.props.site.categories.map(category => {
      let key = _indexOf(this.props.site.categories, category);

      return (
        <div key={key} className={RowStyles['row__large-2']}>
          <div
            className={this.isCategoriesVisible() ? NavStyles['primary-nav'] : classNames(NavStyles['primary-nav'], NavStyles['primary-nav--invisible'])}
            onClick={() => this.onCategoryClick(this.props.siteIndex, key)}>
            <h2 className={
                this.isCategoriesVisible() ?
                classNames(NavStyles['primary-nav__text'], NavStyles['primary-nav__text--light'], NavStyles['primary-nav__text--visible']) :
                classNames(NavStyles['primary-nav__text'], NavStyles['primary-nav__text--light'], NavStyles['primary-nav__text--invisible'])
              }>
              {category}
            </h2>
          </div>
        </div>
      );
    })
  }

  render() {
    if (!this.props.wait) {
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
              {this.renderCategories()}
            </nav>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ filterItems }, dispatch);
}

export default connect(null, mapDispatchToProps)(Categories);
