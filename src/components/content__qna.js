import React, { Component } from 'react';
import classNames from 'classnames';

import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import SectionTitleStyles     from '../../assets/styles/modules/_section-title.css';
import WrapperStyles          from '../../assets/styles/modules/_wrapper.css'
import GenericContentStyles   from '../../assets/styles/modules/_generic-content-container.css'
import FeatureStyles          from '../../assets/styles/modules/_feature-item.css'
import HeadlineStyles         from '../../assets/styles/modules/_headline.css'
import RowStyles              from '../../assets/styles/modules/_row.css'
import HeroStyles from '../../assets/styles/modules/_large-hero.css';
import InfoImg        from '../../assets/images/info.jpg';

const SERVICE_QNA = {
  title: '서비스 이용',
  Qna: [
    {
      q: 'Q. 서비스 가능한 지역이 어디인가요?',
      a: '현재 Try-home 서비스 지역은 <strong>서울특별시 강남구</strong>입니다. 빠른 시일 내에 더 넓은 지역에 서비스할 수 있도록 노력하겠습니다.'
    }, {
      q: 'Q. 몇 벌까지 신청해서 입어볼 수 있나요?',
      a: '한 번에 <strong>최대 5벌의 상품까지만 신청</strong>하실 수 있습니다.'
    }, {
      q: 'Q. 미구매제품에 대한 회수는 언제 이뤄지나요?',
      a: '회수 예정일은 제품 수령일 기준 <strong>다음날 저녁</strong>입니다. 회수기사 방문 전에 사전알림톡을 보내드리니 확인하시고 회수기사와 <strong>대면 가능한 상태로 회수지에 대기해주시면 됩니다.'
    }, {
      q: 'Q. 제품 수령 후 다음날 저녁에 대면이 불가능합니다.',
      a: '제품 수령일 기준 다음날 저녁 방문이 원칙이나, 대면이 불가능하실 경우 <strong>사전에 회수기사에게 고지</strong>해주셔야 하며 그 다음날 <strong>추가 수수료 없이 기사가 회수지에 재방문하게 됩니다.</strong> 그러나 사전 고지 없이 대면이 불발되는 경우 <strong>연체수수료를 부담</strong>하시게 됩니다. 또한 <strong>2회 이상의 기사 재방문</strong>부터 최종 방문일을 기준으로 3 영업일 내에서 회수일을 지정하실 수 있으나 이에 대한 <strong>연체수수료를 부담</strong>하셔야 합니다.'
    }
  ]
};

const PRODUCT_QNA = {
  title: '상품',
  Qna: [
    {
      q: 'Q. 하자가 있는 상품이 왔어요.',
      a: `Try-home 제품을 <strong>시착하시기 전, 제품 결함 여부를 확인하시고 결함을 발견한 경우에는 꼭 사진을 찍어두시고 회수 기사의 방문 이전에 쇼핑몰에 고지</strong>해주셔야 합니다. 검수 당시 <strong>사전에 고지되지 않은 하자가 발견되는 경우, 해당 하자는 고객 귀책으로 인한 하자로 간주됩니다.</strong>`
    }, {
      q: 'Q. 시착 과정에서 옷이 손상되었습니다.',
      a: '고객 귀책으로 인해 Try-home 제품에 하자가 발생한 경우, <strong>해당 상품의 판매가를 변상</strong>해주셔야 하며 해당 상품의 소유권은 고객에게 이전됩니다. '
    }, {
      q: 'Q. 회수 기사님 방문 이후에 상품 하자를 발견했습니다.',
      a: '운송장에 날인한 이후에는 구매 제품에 하자가 있음을 이유로 변상을 해드리기 어렵습니다.'
    }, {
      q: 'Q. 상품을 재포장해서 회수기사님께 드려야 하나요?',
      a: '상품에 대한 간단한 검수가 이뤄지기 때문에, 상품을 시착해보신 후 별도로 재포장하실 필요 없이 배송 받았던 상자에만 넣어서 회수기사님께 전달하시면 됩니다.'
    }
  ]
};

const PAY_QNA = {
  title: '결제',
  Qna: [
    {
      q: 'Q. 결제 후, 결제금액에 대한 적립금을 지급받을 수 있나요?',
      a: '결제 이후 적립금을 지급해드리는 방식이 아니라, <strong>현장 결제 시 적립금액만큼 즉시 차감 후</strong> 나머지 금액에 대해서만 결제가 이뤄지게 됩니다. '
    }, {
      q: 'Q. 결제 방법은 어떻게 되나요?',
      a: '처음 서비스 신청 시 결제하시는 서비스 이용료 5000원은 무통장입금만 가능하며, 회수 기사 방문시 이뤄지는 옷가격에 대한 결제는 기사님이 지참한 단말기를 통한 카드 결제만 가능합니다.'
    }, {
      q: 'Q. 5000원은 단순 서비스 이용료인가요? 택배비/반품비인가요?',
      a: '서비스 신청 시 결제해주시는 5000원은 서비스 이용료와 택배비가 포함된 가격으로 신청 시 꼭 지불해주셔야합니다.<br><br>단, 무료배송 조건을 충족하신 경우 방문 결제시 택배비 2500원을 차감해드리며, 5벌 모두 구매하시는 경우에도 추가적으로 2500원을 차감한 후 결제해드립니다. 또한 모든 제품을 구매하시지 않으셔도 추가 비용 부담은 없습니다.'
    }, {
      q: 'Q. 현장에서 결제금액을 할인받을 수 있는 방법이 있나요?',
      a: '네, 있습니다! 무료배송 조건 충족 시 이용료 2500원 차감, 5벌 모두 구매 시 이용료 2500원 차감, 리뷰 작성시 해당 리뷰에 대한 지급예정 적립금만큼 즉시 차감 후 나머지 금액에 대해서만 결제해주시면 됩니다.'
    }
  ]
}

class QnA extends Component {
  renderQnA({ Qna }) {
    return Qna.map(qna => {
      return (
        <div
          key={qna.q}
          className={classNames(
            WrapperStyles['wrapper'],
            WrapperStyles['wrapper--b-margin'],
            GenericContentStyles['generic-content-container']
          )}>

          <div className={classNames(
            FeatureStyles['feature-item__title'],
            FeatureStyles['feature-item__title--b-padding']
            )}>
            {qna.q}
          </div>
          <p><span
            className={GenericContentStyles['generic-content-container--comment']}
            dangerouslySetInnerHTML={{ __html: qna.a }}>
          </span></p>
        </div>
      );
    })
  }

  renderQnATitle({ title }) {
    return (
      <h2 className={classNames(
        SectionTitleStyles['section-title']
        )}>
        {title}
      </h2>
    )
  }
  render() {
    return (
      <div>
        <div className={SectionStyles['page-section']}>
          <div className={WrapperStyles['wrapper']}>
            {this.renderQnATitle(SERVICE_QNA)}
            {this.renderQnA(SERVICE_QNA)}

            {this.renderQnATitle(PRODUCT_QNA)}
            {this.renderQnA(PRODUCT_QNA)}

            {this.renderQnATitle(PAY_QNA)}
            {this.renderQnA(PAY_QNA)}

            <div className={SectionStyles['page-section']}>
              <div className={WrapperStyles['wrapper']}>
                <h2 className={classNames(
                  SectionTitleStyles['section-title'],
                  SectionTitleStyles['section-title--b-padding']
                  )}>
                  고객센터
                </h2>

                <div
                  className={classNames(
                    RowStyles['row'],
                    RowStyles['row--gutters-large'],
                    GenericContentStyles['generic-content-container']
                  )}>

                  <div className={RowStyles['row__medium-6']}>
                    <div className={FeatureStyles['feature-item']}>
                      <img srcSet={`${InfoImg} 1920w`} className={HeroStyles['large-hero__image']} />
                    </div>
                  </div>

                  <div className={RowStyles['row__medium-6']}>
                    <div className={FeatureStyles['feature-item']}>
                      <p>기타 문의사항은 카카오톡 옐로아이디(@ TryHome)로 문의주시면 빠르게 답변해드리겠습니다!</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default QnA;
