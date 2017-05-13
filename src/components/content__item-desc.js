import React, { Component } from 'react';
import classNames from 'classnames';

import ItemListStyles         from '../../assets/styles/modules/_item-list.css';
import DescStyles             from '../../assets/styles/modules/_description.css';

class ItemDesc extends Component {
  constructor(props) {
    super(props);

    this.state = { item: null };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ item: nextProps.item });

    if (this.props.resetOption) {
      this.setState({ item: null });
    }
  }

  renderImage() {
    const imgSrc = this.state.item.imgLink;
    return (
      <img srcSet={`${imgSrc} 1920w`} className={DescStyles['description']} />
    )
  }

  render() {
    return (
      <div className={ItemListStyles['item-list']}>
        <div>
          { this.state.item ? this.renderImage() : null }
        </div>
      </div>
    );
  }
}

export default ItemDesc;
