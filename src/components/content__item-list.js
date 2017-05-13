import _indexOf from 'lodash.indexof';
import React, { Component } from 'react';
import classNames from 'classnames';

import ItemOptions from './content__item-options';

import ItemListStyles  from '../../assets/styles/modules/_item-list.css';

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = { active: -1 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetOption) {
      this.setState({ active: -1 });
      this.props.setResetOption(nextProps.resetOption);
    }
  }

  onSelectItem(item) {
    this.props.selectItem(item);
  }

  toggleActiveItem(active) {
    this.setState({ active });
  }

  renderItemList() {
    return this.props.items.map(item => {
      let key = _indexOf(this.props.items, item);
      let active = false;

      if (this.state.active === key) {
        active = true;
      }

      return (
        <div key={key}>
          <div
            onClick={() => {
              this.toggleActiveItem(key);
              this.onSelectItem(item);
            }}
            className={
              this.state.active === key ?
              classNames(ItemListStyles['item-list__label'], ItemListStyles['item-list__label--active']) :
              ItemListStyles['item-list__label']
            }>
            {item.label}
          </div>
          <ItemOptions
            active={active}
            index={key}
            item={item}/>
        </div>
      );
    })
  }
  render() {
    return (
      <div className={ItemListStyles['item-list']}>
        <div>
          {this.renderItemList()}
        </div>
      </div>
    );
  }
}

export default ItemList;
