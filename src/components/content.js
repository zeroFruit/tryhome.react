import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import ItemList from '../components/content__item-list';
import ItemDesc from '../components/content__item-desc';
import ItemOrderBtn from '../components/content__order-btn';

import RowStyles              from '../../assets/styles/modules/_row.css'
import WrapperStyles          from '../../assets/styles/modules/_wrapper.css'
import SectionStyles          from '../../assets/styles/modules/_page-section.css';


class Content extends Component {
  constructor(props) {
    super(props);

    this.state = { siteIndex: null, categoryIndex: null, selectedItem: null, resetOption: false };
  }

  componentWillMount() {
    this.setState({ siteIndex: this.props.params.site, categoryIndex: this.props.params.category });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.siteIndex !== nextProps.params.site || this.state.categoryIndex !== nextProps.category) {
      this.setState({ siteIndex: this.props.params.site, categoryIndex: this.props.params.category, resetOption: true });
    } else {
      this.setState({ siteIndex: this.props.params.site, categoryIndex: this.props.params.category, resetOption: false });
    }
  }

  setResetOption(option) {
    if (option) {
      this.setState({ resetOption: false });
    } else {
      this.setState({ resetOption: true });
    }
  }

  render() {
    return (
      <div>
        <div className={SectionStyles['page-section']}>
          <div
            className={classNames(
              WrapperStyles['wrapper'],
              WrapperStyles['wrapper--b-margin']
            )}>

            <div
              className={classNames(
                RowStyles['row'],
                RowStyles['row--gutters-large']
              )}>

              <div className={RowStyles['row__medium-6']}>
                <ItemList
                  items={this.props.filtered}
                  selectItem={selectedItem => this.setState({ selectedItem })}
                  resetOption={this.state.resetOption}
                  setResetOption={this.setResetOption.bind(this)}
                  />
              </div>

              <div className={RowStyles['row__medium-6']}>
                <ItemDesc item={this.state.selectedItem} resetOption={this.state.resetOption}/>
              </div>

            </div>
          </div>
        </div>

        <ItemOrderBtn />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { items: { filtered } } = state;

  return {
    filtered
  };
}

export default connect(mapStateToProps, null)(Content);
