import React, { Component } from 'react';
import classNames from 'classnames';

import SectionStyles          from '../../assets/styles/modules/_page-section.css';
import SectionTitleStyles     from '../../assets/styles/modules/_section-title.css';
import WrapperStyles          from '../../assets/styles/modules/_wrapper.css'
import HeadlineStyles         from '../../assets/styles/modules/_headline.css'
import GenericContentStyles   from '../../assets/styles/modules/_generic-content-container.css'
import RowStyles              from '../../assets/styles/modules/_row.css'
import FeatureStyles          from '../../assets/styles/modules/_feature-item.css'

class Header extends Component {
  render() {
    return (
      <div>
        <div className={SectionStyles['page-section']}>
          <div
            className={classNames(
              WrapperStyles['wrapper'],
              WrapperStyles['wrapper--b-margin']
            )}>
            <h2
              className={classNames(
                HeadlineStyles['headline'],
                HeadlineStyles['headline--centered'],
                HeadlineStyles['headline--b-margin-small'],
                HeadlineStyles['headline--light']
              )}>
              “ 온라인쇼핑, 다 좋은데 직접 입어보고 살 수 없어서,
            </h2>
            <h2
              className={classNames(
                HeadlineStyles['headline'],
                HeadlineStyles['headline--centered'],
                HeadlineStyles['headline--b-margin-large'],
                HeadlineStyles['headline--no-t-margin'],
                HeadlineStyles['headline--light']
              )}>
              번거로운 반품절차 때문에 불편하셨죠? “
            </h2>
            <h3
              className={classNames(
                HeadlineStyles['headline'],
                HeadlineStyles['headline--centered'],
                HeadlineStyles['headline--small'],
                HeadlineStyles['headline--narrow'],
                HeadlineStyles['headline--b-margin-large']
              )}>
              그래서 준비했습니다, Try-Home 서비스!
            </h3>
          </div>
        </div>

        <div className={SectionStyles['page-section']}>
          <div className={WrapperStyles['wrapper']}>
            <div className={GenericContentStyles['generic-content-container']}>
              <p>
                <strong>Try-Home 서비스</strong>는 이러한 온라인 쇼핑의 불편함을 해결하기 위해 시작된 서비스로, 온라인 쇼핑 시
                <strong>한 번에 최대 5가지 제품을 주문</strong>하여 받아서 시착해본 후 <strong>원하는 제품만 선택하여 결제</strong>하고
                <strong>그 외의 제품은 집으로 방문한 픽업기사(홈런맨)에게 돌려보내는 방식</strong>의 서비스입니다.
              </p>
            </div>
          </div>
        </div>

        <div className={classNames(
          SectionStyles['page-section'],
          SectionStyles['page-section--brown']
          )}>
          <div className={WrapperStyles['wrapper']}>
            <h2 className={classNames(
              SectionTitleStyles['section-title'],
              SectionTitleStyles['section-title--b-padding'],
              SectionTitleStyles['section-title--white']
              )}>
              Try-Home 서비스를 이용하는 고객들은
            </h2>

            <div
              className={classNames(
                RowStyles['row'],
                RowStyles['row--gutters-large'],
                GenericContentStyles['generic-content-container']
              )}>

              <div className={RowStyles['row__medium-4']}>
                <div className={FeatureStyles['feature-item']}>
                  <p>가장 편안한 장소인 “집“에서 다른 옷들과 매칭시켜서 옷을 입어보고, 나에게 맞는 사이즈의 내 마음에 드는 제품만을 선택해서 구매하실 수 있습니다.</p>
                </div>
              </div>

              <div className={RowStyles['row__medium-4']}>
                <div className={FeatureStyles['feature-item']}>
                  <p>시착 후 마음에 드는 제품에 한해서만 구매할 수 있어 실물 제품 확인 전에 옷 가격을 결제하실 필요가 없습니다. </p>
                </div>
              </div>

              <div className={RowStyles['row__medium-4']}>
                <div className={FeatureStyles['feature-item']}>
                  <p>기존 반품과 비교해 번거로운 신청 절차가 없고 진행 상황 파악이 빨라서 입금 지연의 문제 또한 없습니다.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className={SectionStyles['page-section']}>
          <div className={WrapperStyles['wrapper']}>
            <h2 className={classNames(
              SectionTitleStyles['section-title'],
              SectionTitleStyles['section-title--b-padding']
              )}>
              Try-Home 이용 방법
            </h2>

            <div className={classNames(
              WrapperStyles['wrapper'],
              WrapperStyles['wrapper--b-margin'],
              GenericContentStyles['generic-content-container']
              )}>

              <div className={classNames(
                FeatureStyles['feature-item__title'],
                FeatureStyles['feature-item__title--b-padding']
                )}>
                Try-Home 서비스 신청
              </div>
              <p>1. 쇼핑몰 접속 후 배너를 통해 Try-Home 페이지로 이동해주세요.</p>
              <p>2. Try-Home 페이지 Try-Home가능 상품 리스트에서 Try-Home하고 싶은 제품을 <strong>최대 5개까지 신청해주세요.</strong></p>
              <p><span className={GenericContentStyles['generic-content-container--comment']}>서비스 지역 제한: <strong>현재는 강남구에 거주</strong>하시는 경우만 신청 가능합니다.</span></p>
              <p>3. Try-Home 서비스 이용료 5000원을 결제해주세요.</p>
              <p><span className={GenericContentStyles['generic-content-container--comment']}><strong>현재는 무통장 입금</strong>만 가능합니다.</span></p>
            </div>

            <div className={classNames(
              WrapperStyles['wrapper'],
              WrapperStyles['wrapper--b-margin'],
              GenericContentStyles['generic-content-container']
              )}>

              <div className={classNames(
                FeatureStyles['feature-item__title'],
                FeatureStyles['feature-item__title--b-padding']
                )}>
                배송 및 시착
              </div>
              <p>1. 쇼핑몰에서 댁으로 옷 5벌을 배송해드립니다.</p>
              <p>2. 수령하신 옷을 시착해보신 후 구매확정 품목을 결정합니다.</p>
            </div>

            <div className={classNames(
              WrapperStyles['wrapper'],
              WrapperStyles['wrapper--b-margin'],
              GenericContentStyles['generic-content-container']
              )}>

              <div className={classNames(
                FeatureStyles['feature-item__title'],
                FeatureStyles['feature-item__title--b-padding']
                )}>
                결제 및 회수
              </div>
              <p>1. <strong>다음 날 저녁</strong>, 픽업기사(홈런맨)가 댁으로 방문하여 선택품목에 대한 결제를 진행합니다.</p>
              <p><span className={GenericContentStyles['generic-content-container--comment']}>현장 결제는 홈런맨이 지참한 카드 단말기를 사용해서 이루어집니다.</span></p>
              <p><span className={GenericContentStyles['generic-content-container--comment']}><strong>대면 회수 및 결제가 원칙입니다.</strong> 제품 수령일 기준 다음날 저녁에 회수기사와 대면 가능한 상태로 회수지에 대기하셔야 합니다. </span></p>
              <p>2. 구매하시지 않는 나머지 물품은 간단한 검수를 거친 후 회수해갑니다.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
