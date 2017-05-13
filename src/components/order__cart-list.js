import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { numberWithCommas } from '../utils/helpers';

import WrapperStyles          from '../../assets/styles/modules/_wrapper.css';
import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import FeatureStyles          from '../../assets/styles/modules/_feature-item.css'
import RowStyles              from '../../assets/styles/modules/_row.css'
import CartListStyles         from '../../assets/styles/modules/_cart-list.css'

class OrderCartList extends Component {
  renderCartItems() {
    return this.props.items.map(item => {
      return (
        <div
          key={`${item.item.label}__${Date.now()}`}
          className={classNames(
            RowStyles['row'],
            RowStyles['row--gutters-large'])}>

          <div className={RowStyles['row__medium-6']}>
            <div className={CartListStyles['cart-list']}>
              {item.item.label}
            </div>
          </div>

          <div className={RowStyles['row__medium-3']}>
            <div className={CartListStyles['cart-list']}>
              <div className={CartListStyles['cart-list__option']}>{`사이즈: ${item.size}`}</div>
              <div className={CartListStyles['cart-list__option']}>{`색상: ${item.color}`}</div>
              <div className={CartListStyles['cart-list__option']}>{`수량: ${item.count}`}</div>
            </div>
          </div>

          <div className={RowStyles['row__medium-3']}>
            <div className={CartListStyles['cart-list']}>
              { numberWithCommas(parseInt(item.item.price) * parseInt(item.count)) } 원
            </div>
          </div>
        </div>
      );
    })
  }

  render() {
    return (
      <div className={classNames(
        SectionStyles['page-section'],
        SectionStyles['page-section--less-padding']
        )}>
        <div className={WrapperStyles['wrapper']}>
          <div className={classNames(
            FeatureStyles['feature-item__title'],
            FeatureStyles['feature-item__title--b-padding']
            )}>
            주문상품확인
          </div>
          <div>
            <div
              className={classNames(
                RowStyles['row'],
                RowStyles['row--gutters-large']
              )}>

              <div className={RowStyles['row__medium-6']}>
                <div className={classNames(
                  CartListStyles['cart-list'],
                  CartListStyles['cart-list--head']
                  )}>
                  구입상품명
                </div>
              </div>

              <div className={RowStyles['row__medium-3']}>
                <div className={classNames(
                  CartListStyles['cart-list'],
                  CartListStyles['cart-list--head']
                  )}>
                  옵션
                </div>
              </div>

              <div className={RowStyles['row__medium-3']}>
                <div className={classNames(
                  CartListStyles['cart-list'],
                  CartListStyles['cart-list--head']
                  )}>
                  구매시 가격
                </div>
              </div>
            </div>
            { this.renderCartItems() }
          </div>
        </div>
      </div>
    );
  }
}


export default OrderCartList;
