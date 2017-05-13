import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import _concat from 'lodash.concat';

import { cartItems } from '../actions/index';

import ItemOptionStyles   from '../../assets/styles/modules/_item-option.css';
import SelectorStyles     from '../../assets/styles/modules/_selector.css';

const ITEM_MAX_COUNT = 5;
const ITEM_COUNTER_OPTION = [];
const PLACEHOLDER = {
  label: '선택하세요.',
  value: '',
  key: 'placeholder'
};


class ItemOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      item: null,
      size: null,
      color: null,
      count: null,
      size__selected: null,
      color__selected: null,
      count__selected: null
    };
  }

  componentWillMount() {
    let { color, size } = this.props.item;

    if (ITEM_COUNTER_OPTION.length !== ITEM_MAX_COUNT) {
      for (var i = 0; i < ITEM_MAX_COUNT; i++) {
        ITEM_COUNTER_OPTION.push({ label: i+1, value: i+1, key: i+i });
      }
    }
    this.setState({ item: this.props.item, count: _concat(PLACEHOLDER, ITEM_COUNTER_OPTION) });
    this.setOptions(this.props.item);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active, item: nextProps.item });
    this.setOptions(nextProps.item);

    if (!nextProps.active) {
      this.setState({ size__selected: null, color__selected: null, count__selected: null});
    }
  }

  setOptions(item) {
    this.setState({
      color: _concat(PLACEHOLDER, item.color.map(c => {
        return { label: c, value: c, key: c}
      })),
      size: _concat(PLACEHOLDER, item.size.map(s => {
        return { label: s, value: s, key: s }
      }))
    });


  }

  onItemSelect() {
    if ( !this.state.color__selected || !this.state.size__selected || !this.state.count__selected ) {
      return alert('선택하지 않은 옵션이 있습니다.');
    }

    let confirmMsg = `상품: ${this.state.item.label} \r\n색상: ${this.state.color__selected} \r\n사이즈: ${this.state.size__selected} \r\n수량: ${this.state.count__selected}`;

    if( confirm(confirmMsg) ) {
      this.props.cartItems({
        item: this.state.item,
        size__selected: this.state.size__selected,
        color__selected: this.state.color__selected,
        count__selected: this.state.count__selected
      });

      alert('장바구니에 담았습니다.');

      this.setState({ size__selected: null, color__selected: null, count__selected: null });
    }
  }

  onColorSelectChange(e) {
    this.setState({ color__selected: e.target.value });
  }

  onSizeSelectChange(e) {
    this.setState({ size__selected: e.target.value });
  }

  onCountSelectChange(e) {
    this.setState({ count__selected: e.target.value });
  }

  renderOptions(options) {
    return options.map(option => {
      return (
        <option
          key={option.key}
          value={option.value}>
          {option.label}
        </option>
      );
    });
  }

  renderSelector({key, value, placeholder, onChangeHandler, options}) {
    return (
      <select
        key={key}
        onChange={onChangeHandler.bind(this)}
        value={value ? value : ''}
        className={classNames(
          SelectorStyles['selector__options'],
          SelectorStyles['selector--option-text']
        )}>
        { this.renderOptions(options) }
      </select>
    )
  }

  render() {
    let sizeSelector = {
      key: 'size',
      value: this.state.size__selected,
      onChangeHandler: this.onSizeSelectChange,
      options: this.state.size
    };

    let colorSelector = {
      key: 'color',
      value: this.state.color__selected,
      onChangeHandler: this.onColorSelectChange,
      options: this.state.color
    };

    let countSelector = {
      key: 'count',
      value: this.state.count__selected,
      placeholder: 'Select count...',
      onChangeHandler: this.onCountSelectChange,
      options: this.state.count
    };

    return (
      <div className={this.state.active ? classNames(ItemOptionStyles['item-option'], ItemOptionStyles['item-option--is-visible']) : ItemOptionStyles['item-option']}>
        <div>
          <div className={SelectorStyles['selector']}>
            <span className={SelectorStyles['selector__label']}>옵션1 (사이즈)</span>
            { this.renderSelector(sizeSelector) }
          </div>
          <div className={SelectorStyles['selector']}>
            <span className={SelectorStyles['selector__label']}>옵션2 (컬러)</span>
            { this.renderSelector(colorSelector) }
          </div>
          <div className={SelectorStyles['selector']}>
            <span className={SelectorStyles['selector__label']}>수량</span>
            { this.renderSelector(countSelector) }
          </div>
        </div>
        <div
          onClick={this.onItemSelect.bind(this)}
          className={SelectorStyles['selector__submit']}>
          Try-Home 장바구니 담기
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ cartItems }, dispatch);
}

export default connect(null, mapDispatchToProps)(ItemOptions);
