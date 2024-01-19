import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './WrapComponent.jsx';
// 3. 임포트 리덕스 툴킷
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import address from './reducer/address.js';
import confirmModal  from './reducer/confirmModal.js';
import confirmService1Modal  from './reducer/confirmService1Modal.js';
import confirmService2Modal  from './reducer/confirmService2Modal.js';
import confirmService3Modal  from './reducer/confirmService3Modal.js';
import isAddress  from './reducer/isAddress.js';
import mainModal  from './reducer/mainModal.js';
import quickMenuViewProduct  from './reducer/quickMenuViewProduct.js';
import topModal  from './reducer/topModal.js';
import viewProduct  from './reducer/viewProduct.js';
import viewProductIsFlag  from './reducer/viewProductIsFlag';
import signIn from './reducer/signIn.js';
import cartReducer from './reducer/cartReducer.js';
import isDeliveryReducer from './reducer/isDeliveryReducer.js';

// 4. 스토어(store) 생성
let store = configureStore({
  reducer: {
      address,
      confirmModal,
      confirmService1Modal,
      confirmService2Modal,
      confirmService3Modal,
      isAddress,
      mainModal,
      quickMenuViewProduct,
      topModal,
      viewProduct,
      viewProductIsFlag,
      signIn,
      cartReducer,
      isDeliveryReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
      <Provider store={store} >  {/* // 5. 프로바이더 스토어를 내려보낸다. */}
        <WrapComponent />
      </Provider>
  </React.StrictMode> 
);