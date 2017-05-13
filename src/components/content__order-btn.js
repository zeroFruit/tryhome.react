import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import OrderBtnStyles         from '../../assets/styles/modules/_order-btn.css';
import WrapperStyles          from '../../assets/styles/modules/_wrapper.css'
import SectionStyles          from '../../assets/styles/modules/_page-section.css';

class ItemOrderBtn extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { err: false };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ err: nextProps.err });
  }

  onOrderBtnClick() {
    if (this.props.totalCount === 0) {
      return alert('장바구니에 상품이 없습니다.');
    }

    if (!this.props.err) {
      this.context.router.push('/order');
    } else {
      alert('Try-Home 서비스는 한 번에 5개만 장바구니에 담을 수 있습니다. \r\n 사이트에 재접속 해주시기 바랍니다.');
    }
  }

  render() {
    return (
      <div
        className={classNames(
          WrapperStyles['wrapper'],
          SectionStyles['page-section'],
          SectionStyles['page-section--less-padding']
        )}>
        <div
          onClick={this.onOrderBtnClick.bind(this)}
          className={!this.state.err ? OrderBtnStyles['order-btn'] : classNames(OrderBtnStyles['order-btn'], OrderBtnStyles['order-btn--block'])}>
          주문하기 ({this.props.totalCount})
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  let { cart: { totalCount, items, err } } = state;
  console.log('totalCount', totalCount);
  console.log('items', items);
  console.log('err', err);
  totalCount = parseInt(totalCount);

  return { totalCount, err, items };
}

export default connect(mapStateToProps, null)(ItemOrderBtn);
