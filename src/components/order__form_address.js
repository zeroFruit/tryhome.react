import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addressChanged } from '../actions/index';

import RowStyles              from '../../assets/styles/modules/_row.css'
import OrderFormStyles        from '../../assets/styles/modules/_order-form.css'

const DAUM_POST_CODE_API_URL = "http://dmaps.daum.net/map_js_init/postcode.v2.js"



class AddressOrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postcode: '',
      address: '',
      detail_address: ''
    };
  }

  onPostcodeSearchBtnClick() {
    window.daum.postcode.load(function(){
      new window.daum.Postcode({
          oncomplete: function(data) {
            let fullAddr = '';
            let extraAddr = '';

            if (data.userSelectedType === 'R') {
              fullAddr = data.roadAddress;

            } else {
              fullAddr = data.jibunAddress;
            }

            if(data.userSelectedType === 'R'){
              if(data.bname !== ''){
                extraAddr += data.bname;
              }
              if(data.buildingName !== ''){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }

            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value = fullAddr;
            document.getElementById('detail-address').focus();
          },
          onclose: function(state) {
            if (state === 'COMPLETE_CLOSE') {
              let event = new Event('input', {
                'view': window,
                'bubbles': true,
                'cancelable': false
              });
              document.getElementById('postcode').dispatchEvent(event);
              document.getElementById('address').dispatchEvent(event);
            }
          }
      }).open();
    });
  }
  onPostcodeChange(e) {
    this.props.onPostcodeChange(e.target.value);
  }
  onRegAddressChange(e) {
    this.props.onRegAddressChange(e.target.value);
  }
  render() {
    let { field, fieldConfig, key } = this.props;

    return (
      <div
        key={key}
        className={classNames(
          RowStyles['row'],
          RowStyles['row--gutters-large'])}>

        <div className={RowStyles['row__medium-4']}>
          <div className={OrderFormStyles['order-form']}>
            <div className={OrderFormStyles['order-form__label']}>
              {fieldConfig.label}
            </div>
          </div>
        </div>

        <div className={RowStyles['row__medium-8']}>
          <div className={OrderFormStyles['order-form']}>
            <div className={OrderFormStyles['order-form__wrapper']}>
              <input
                id="postcode"
                type="text"
                placeholder="우편번호"
                onChange={this.onPostcodeChange.bind(this)}
                className={classNames(
                  OrderFormStyles['order-form__input'],
                  OrderFormStyles['order-form__input--more-shorter']
                )}/>
              <span
                onClick={this.onPostcodeSearchBtnClick.bind(this)}
                className={classNames(
                  OrderFormStyles['order-form__btn'],
                  OrderFormStyles['order-form__btn--l-margin']
                )}>
                우편번호검색 바로가기
              </span>
            </div>
            <div className={OrderFormStyles['order-form__wrapper']}>
              <input
                id="address"
                type="text"
                onChange={this.onRegAddressChange.bind(this)}
                placeholder="주소"
                className={classNames(
                  OrderFormStyles['order-form__input'],
                  OrderFormStyles['order-form__input--longer']
                )}/>
            </div>
            <div className={OrderFormStyles['order-form__wrapper']}>
              <fieldConfig.tag
                id="detail-address"
                type={fieldConfig.type}
                placeholder="상세주소"
                onChange={e => this.props.onInputChange(field, e.target.value)}
                value={this.props.value}
                className={classNames(
                  OrderFormStyles['order-form__input'],
                  OrderFormStyles['order-form__input--longer']
                )}/>
            </div>
          </div>
          <div className={OrderFormStyles['order-form__error']}>
            {
              (this.props.address__err || this.props.postcode__err ) ? <p>주소를 입력해주세요.</p> : null
            }
            {
              this.props.reg_address__err ? <p>현재는 서울시 강남구만 배송가능합니다.</p> : null
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
}

export default AddressOrderForm;
