import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import OrderCartList from './order__cart-list';
import OrderForm from './order__form';

import WrapperStyles          from '../../assets/styles/modules/_wrapper.css';
import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import HeadlineStyles         from '../../assets/styles/modules/_headline.css'


class Order extends Component {
  render() {
    return (
      <div>
        <div className={classNames(
          SectionStyles['page-section'],
          SectionStyles['page-section--less-padding']  
          )}>
          <div className={WrapperStyles['wrapper']}>
            <h2
              className={classNames(
                HeadlineStyles['headline'],
                HeadlineStyles['headline--centered'],
                HeadlineStyles['headline--b-margin-small'],
                HeadlineStyles['headline--light']
              )}>
              Order / Payment
            </h2>
          </div>
        </div>
        <OrderCartList items={this.props.items}/>
        <OrderForm items={this.props.items}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { cart: { items } } = state;

  return {
    items
  }
}


export default connect(mapStateToProps, null)(Order);
