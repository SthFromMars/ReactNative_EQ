import React from 'react';
import EqMain from './src/EqMain/EqMain';
import {Provider} from 'react-redux';
import store from './state/store';

export default () => {
  return (
    <Provider store={store}>
      <EqMain />
    </Provider>
  );
};
