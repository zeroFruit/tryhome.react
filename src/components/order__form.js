import _keys from 'lodash.keys';
import _map from 'lodash.map';
import _concat from 'lodash.concat';
import _ from 'lodash';
import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WaitModal from './modal';
import AddressOrderForm from './order__form_address';
import { orderItems, setOrderEmpty, resetCartItems } from '../actions/index';
import {
  emailValidation,
  phonenumValidation,
  regAddressValidation
} from '../utils/validation';
import {
  buildCustomerInfo
} from '../utils/helpers';

import WrapperStyles          from '../../assets/styles/modules/_wrapper.css';
import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import FeatureStyles          from '../../assets/styles/modules/_feature-item.css'
import OrderFormStyles        from '../../assets/styles/modules/_order-form.css'
import RowStyles              from '../../assets/styles/modules/_row.css'
import SelectEditable         from '../../assets/styles/modules/_select-editable.css'
import OrderBtnStyles         from '../../assets/styles/modules/_order-btn.css';

const FieldFactory = (tag, label, type) => {
  return { tag, label, type };
}
const CUSTOMER_INFO_FIELDS = {
  name:         FieldFactory('input', '이름', 'text'),
  email:        FieldFactory('input', '이메일', 'text'),
  phonenumber:  FieldFactory('input', '전화번호', 'text')
};

const SHIPPING_INFO_FIELDS = {
  address:      FieldFactory('input', '주소', 'text')
};

const EMAIL_OPTIONS = [
  {
    key: 'naver',
    label: 'naver.com',
    value: 'naver.com'
  }, {
    key: 'gmail',
    label: 'gmail.com',
    value: 'gmail.com'
  }, {
    key: 'hanmail',
    label: 'hanmail.net',
    value: 'hanmail.net'
  }, {
    key: 'custom',
    label: '직접 입력하기',
    value: '직접 입력하기'
  }
]

class OrderForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      name:         { value: '', err: true },
      email:        { value: '', err: true },
      phonenumber:  { value: '', err: true },
      address:      { value: '', err: true },
      emailaddress: { value: '', err: true },
      postcode:     { value: '', err: true },
      reg_address:  { value: '', err: true },
      waitSMTP: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ waitSMTP: nextProps.waitSMTP });

    if (nextProps.received) {
      alert('성공적으로 주문되었습니다.');
      this.props.setOrderEmpty();
      this.props.resetCartItems();
      this.context.router.push('/');
    }
  }

  onInputChange(key, value) {
    let err = value === '' ? true : false;

    this.setState({ [key]: { value, err } });
  }

  onEmailaddressChange(value) {
    let err = value === '' ? true : false;

    this.setState({ emailaddress: { value, err } });

    return err;
  }

  onPostcodeChange(value) {
    let err = value === '' ? true : false;

    this.setState({ postcode: { value, err } });

    return err;
  }

  onRegAddressChange(value) {
    let err = !regAddressValidation(value);

    this.setState({ reg_address: { value, err } });

    return err;
  }

  onSelectChangeHandler(e) {
    let emailInput = document.getElementById("email");

    this.setState({ emailaddress: { value: e.target.value } });

    if (e.target.value === '직접 입력하기') {
      emailInput.disabled = false;
    } else {
      emailInput.disabled = true;
    }
  }

  onFocusHandler(field) {
    this.setState({ [field]: { dirty: true } });
  }

  onSubmit() {
    if (
      !this.formFieldErr(this.state, _concat(_keys(CUSTOMER_INFO_FIELDS), _keys(SHIPPING_INFO_FIELDS))) &&
      !this.state.postcode.err &&
      !this.state.reg_address.err &&
      (!this.state.emailaddress.err && this.state.emailaddress.value !== '')
    ) {
      this.props.orderItems(this.props.items, buildCustomerInfo(this.state));
    } else {
      alert('빠지거나 잘못된 정보가 있습니다.');
    }
  }
  renderSelectOptions() {
    return EMAIL_OPTIONS.map(options => {
      return (
        <option
          key={options.key}
          value={options.value}>
          {options.label}
        </option>
      );
    })
  }

  renderEmailField(fieldConfig, field) {
    return (
      <div
        key={field}
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
            <fieldConfig.tag
              type={fieldConfig.type}
              onChange={(e) => this.onInputChange(field, e.target.value)}
              value={this.state[field].value}
              className={classNames(
                OrderFormStyles['order-form__input'],
                OrderFormStyles['order-form__input--shorter'],
                OrderFormStyles['order-form__input--r-margin']
              )}/>
            @
            <select
              onChange={this.onSelectChangeHandler.bind(this)}
              className={classNames(
                OrderFormStyles['order-form__select'],
                OrderFormStyles['order-form__select--l-margin']
              )}>
              { this.renderSelectOptions() }
            </select>
            <input
              autoComplete={false}
              type='text'
              id='email'
              value={this.state.emailaddress.value}
              placeholder='선택하세요.'
              onChange={(e) => this.onEmailaddressChange(e.target.value)}
              className={classNames(
                OrderFormStyles['order-form__select'],
                OrderFormStyles['order-form__select--l-margin'],
                OrderFormStyles['order-form__select--input']
              )}/>
          </div>
          <div className={OrderFormStyles['order-form__error']}>
            {
              this.state.email.err || this.state.emailaddress.err ? '이메일을 입력해주세요.' : null
            }
          </div>
        </div>
      </div>
    );
  }

  renderAddressField(fieldConfig, field) {
    return (
      <AddressOrderForm
        key={field}
        field={field}
        fieldConfig={fieldConfig}
        onInputChange={this.onInputChange.bind(this)}
        onPostcodeChange={this.onPostcodeChange.bind(this)}
        onRegAddressChange={this.onRegAddressChange.bind(this)}
        address__err={this.state.address.err}
        reg_address__err={this.state.reg_address.err}
        postcode__err={this.state.postcode.err}
        value={this.state[field].value}/>
    );
  }
  renderField(fieldConfig, field) {
    if (field === 'email') {
      return this.renderEmailField(fieldConfig, field);
    } else if (field === 'address') {
      return this.renderAddressField(fieldConfig, field);
    } else {
      return (
        <div
          key={field}
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
              <fieldConfig.tag
                type={fieldConfig.type}
                onChange={(e) => this.onInputChange(field, e.target.value)}
                value={this.state[field].value}
                className={OrderFormStyles['order-form__input']}/>
            </div>
            <div className={OrderFormStyles['order-form__error']}>
              {
                field === 'name' && this.state.name.err && this.state.name.value === '' ? '이름을 입력해주세요.' : null
              }
              {
                field === 'phonenumber' && this.state.phonenumber.err && this.state.phonenumber.value === '' ? '휴대전화번호를 입력해주세요.' : null
              }
            </div>
          </div>
        </div>
      );
    }
  }

  renderSectionTitle(title) {
    return (
      <div className={classNames(
        FeatureStyles['feature-item__title'],
        FeatureStyles['feature-item__title--b-padding']
        )}>
        {title}
      </div>
    );
  }

  renderCautionField(cautionText) {
    return (
      <div className={OrderFormStyles['order-form']}>
        <div className={OrderFormStyles['order-form__caution-field']}>
          { cautionText }
        </div>
      </div>
    )
  }

  formFieldErr(state, keys) {
    let fields = _.pick(state, keys);
    let isErr = false;

    Object.keys(fields).forEach(key => {
      let err = (fields[key].value === '' ? true : false);

      isErr = isErr || err;

      this.setState({ [key]: { err } });
    });

    return isErr;
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      this.state.waitSMTP ?

      <WaitModal show={this.state.waitSMTP}/> :

      <div className={classNames(
        SectionStyles['page-section'],
        SectionStyles['page-section--less-padding']
        )}>
        <div className={WrapperStyles['wrapper']}>
          { this.renderSectionTitle('주문자 정보 입력') }

          <div>
            <div>
              { _map(CUSTOMER_INFO_FIELDS, this.renderField.bind(this)) }
            </div>
          </div>

          { this.renderSectionTitle('배송지 정보 입력') }

          <div>
            <div>
              { _map(SHIPPING_INFO_FIELDS, this.renderField.bind(this)) }
            </div>

            <div>
              {
                this.renderCautionField(
                  '※ 현재 서울특별시 강남구에서만 이용 가능합니다! 다른 지역도 하루 빨리 서비스 할 수 있도록 노력하겠습니다.'
                )
              }
            </div>
          </div>

          { this.renderSectionTitle('결제') }


          <div className={classNames(
            OrderFormStyles['order-form'],
            OrderFormStyles['order-form--center']
            )}>
            <span className={classNames(
                OrderFormStyles['order-form__payment'],
                OrderFormStyles['order-form__payment--l-minus-margin']
              )}>
              무통장입금
            </span>

            <span className={classNames(
                OrderFormStyles['order-form__payment'],
                OrderFormStyles['order-form__payment--l-margin']
              )}>
              농협 899-02-263001 권용우
            </span>
          </div>

          <div>
            {
              this.renderCautionField(
                '※ 현재 무통장입금으로만 이용료 결제가 가능합니다.(실제 상품 결제시 카드 이용이 가능합니다.) 다른 결제 수단도 하루 빨리 이용 하실 수 있도록 노력 하겠습니다.'
              )
            }
          </div>

          <div
            className={classNames(
              WrapperStyles['wrapper'],
              SectionStyles['page-section'])}>
              <div
                onClick={this.onSubmit.bind(this)}
                className={OrderBtnStyles['order-btn']}>
                주문하기
              </div>
          </div>
        </div>
      </div>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ orderItems, setOrderEmpty, resetCartItems }, dispatch);
}

function mapStateToProps(state) {
  let { orders: { received }, current: { waitSMTP } } = state;

  return { received, waitSMTP };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
