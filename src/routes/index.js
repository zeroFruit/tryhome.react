import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App      from '../components/app';
import Intro    from '../components/content__intro';
import QnA      from '../components/content__qna';
import Content  from '../components/content';
import OrderForm    from '../components/order';

export default (
  <Route path='/' component={App} >
    <IndexRoute component={Intro} />
    <Route path="qna"                   component={QnA} />
    <Route path="site/:site/:category"  component={Content} />
    <Route path="order"                 component={OrderForm} />
  </Route>
)
