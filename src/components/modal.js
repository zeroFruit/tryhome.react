import React, { Component } from 'react';
import Modal from 'simple-react-modal';

import WrapperStyles          from '../../assets/styles/modules/_wrapper.css';
import SpinnerStyles          from '../../assets/styles/modules/_spinner.css';
import ModalStyles          from '../../assets/styles/modules/_modal.css';

class WaitModal extends Component {
  render() {
    return (
      <div className={ModalStyles['modal']}>
        <Modal
          className={ModalStyles['modal__inner']}
          closeOnOuterClick={false}
          show={this.props.show}>

          <div className={SpinnerStyles['spinner']}></div>
          <p className={ModalStyles['modal__message']}>잠시만 기다려주세요...</p>

        </Modal>
     </div>
    )
  }
}

export default WaitModal;
