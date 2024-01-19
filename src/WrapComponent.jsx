import React from "react";
import {HashRouter, Routes, Route} from 'react-router-dom';
import TopModalComponent from './wrap/TopModalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import Sub1Component from "./wrap/sub/Sub1Component";
import Sub2Component from "./wrap/sub/Sub2Component";
import Sub3Component from "./wrap/sub/Sub3Component";
import Sub4Component from "./wrap/sub/Sub4Component";
import Sub5SignUpComponent from "./wrap/sub/Sub5SignUpComponent";
import Sub6SignInComponent from "./wrap/sub/Sub6SignInComponent";
import Sub6SignInIdSearchComponent from "./wrap/sub/Sub6SignInIdSearchComponent";
import Sub6SignInPwSearchComponent from "./wrap/sub/Sub6SignInPwSearchComponent";
import Sub7NoticeComponent from "./wrap/sub/Sub7NoticeComponent";
import FooterComponent from './wrap/FooterComponent';
import MainModalComponent from './wrap/MainModalComponent';
import QuickMenuComponent from './wrap/QuickMenuComponent';
import GoTopComponent from './wrap/GoTopComponent';
import ConfirmModalComponent from "./wrap/ConfirmModalComponent";
import PostcodeComponent from "./wrap/PostcodeComponent";
import PostcodeDeliveryComponent from "./wrap/PostcodeDeliveryComponent";
import ConfirmService1ModalComponent from './wrap/ConfirmService1ModalComponent';
import ConfirmService2ModalComponent from './wrap/ConfirmService2ModalComponent';
import ConfirmService3ModalComponent from './wrap/ConfirmService3ModalComponent';
import Sub6SignInIdPwSearchResultComponent from './wrap/sub/Sub6SignInIdPwSearchResultComponent';
import Sub6SignInPwResetComponent from "./wrap/sub/Sub6SignInPwResetComponent";
import Sub7NoticeInsertFormComponent from "./wrap/sub/Sub7NoticeInsertFormComponent";
import Sub7NoticeViewComponent from "./wrap/sub/Sub7NoticeViewComponent";
import Sub7NoticeUpdateComponent from "./wrap/sub/Sub7NoticeUpdateComponent";
import Sub7AdminSigninComponent from './wrap/sub/Sub7AdminSigninComponent';
import Sub7AdminSignupComponent from './wrap/sub/Sub7AdminSignupComponent';
import Sub7AdminIdSearchComponent from './wrap/sub/Sub7AdminIdSearchComponent';
import Sub7AdminPwSearchComponent from './wrap/sub/Sub7AdminPwSearchComponent';
import Sub7AdminIdSearchResultComponent from './wrap/sub/Sub7AdminIdSearchResultComponent';
import Sub7AdminPwResetComponent from './wrap/sub/Sub7AdminPwResetComponent';
import ProductViewComponent from './wrap/ProductViewComponent';
import CartComponent from "./wrap/CartComponent";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux"; 
import { mainModal } from "./reducer/mainModal";
import { topModal } from "./reducer/topModal";
import { address } from "./reducer/address";
import { signIn } from "./reducer/signIn";
import { viewProduct } from "./reducer/viewProduct";
import { cartMethod } from "./reducer/cartReducer";
import { deliveryMethod } from "./reducer/address"; 

export default function WrapComponent(){

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();

    const [cart, setCart] = React.useState([]);
    const [ok, setOk] = React.useState(false);

    
    // 배송지 DB 목록
    React.useEffect(()=>{
        if(selector.signIn.로그인정보!==null){        
            const formData = new FormData();
            formData.append('userId', selector.signIn.로그인정보.아이디)

            axios({
                url:'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_delivery_table_select.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){
                    if(res.data===null){
                        dispatch(deliveryMethod([])); 
                    }
                    else{
                        dispatch(deliveryMethod(res.data));
                    }                  
                }
            })
            .catch();
        }
    },[selector.signIn]);

    React.useEffect(()=>{
        if(selector.signIn.로그인정보!==null){        
            cartDBSelect(selector.signIn.로그인정보.아이디);        
        }
    },[ok, selector.signIn]);

    // [1] 로그인 상태 조건에서 장바구니 록록 임시 상태변수 cart에 저장
    React.useEffect(()=>{
        if(selector.signIn.로그인정보!==null ){
            setCart(selector.cartReducer.장바구니); 

            if(localStorage.getItem('SET_DB_CAT')!==null){
                setCart([]); 
                setOk(true);                
            }
            else{
                setCart(selector.cartReducer.장바구니); 
                
            }            
        }
    }, [selector.signIn]);

    const cartDBSelect=(아이디)=>{

      let formData = new FormData();
      formData.append('userId', 아이디);
      axios({
            url: 'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_cart_table_select.php',
            method: 'POST',
            data: formData
      })
      .then((res)=>{
            if(res.status===200){
                if(res.data!==null){
                    
                    localStorage.setItem('CART_PRODUCT', JSON.stringify(res.data));
                    dispatch(cartMethod(res.data));
                }
                else{ 
                    localStorage.setItem('CART_PRODUCT', JSON.stringify([]));
                    dispatch(cartMethod([]));
                }
            }
      })
      .catch((err)=>{
            console.log('AXIOS 실패!');
      });  
    }

    // [2] cart에 장바구니 목록 저장
    const cartDBSave=(item, idx)=>{
       let formData = new FormData();
       formData.append('userId', selector.signIn.로그인정보.아이디);
       formData.append('번호',item.번호);
       formData.append('이미지',item.이미지);
       formData.append('제품명',item.제품명);
       formData.append('할인율',item.할인율);
       formData.append('판매가',item.판매가);
       formData.append('제품특징',item.제품특징);
       formData.append('제조사',item.제조사);
       formData.append('제조일시',item.제조일시);
       formData.append('판매처',item.판매처);
       formData.append('보관방법',item.보관방법);
       formData.append('배송',item.배송);
       formData.append('옵션',item.옵션);
       formData.append('옵션상품목록',JSON.stringify(item.옵션상품목록)); 
       formData.append('정가',item.정가);
       formData.append('일시',item.일시);
       formData.append('제품코드',item.제품코드);
       formData.append('장바구니상품명',item.장바구니상품명);
       formData.append('수량',item.수량);

       axios({
            url: 'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_cart_table_insert.php',
            method: 'POST',
            data: formData
       })
       .then((res)=>{        
            if(res.status===200){
                if( res.data === 1){
                    console.log( res.data );
                    console.log( '데이터베이스 장바구니 저장 성공!!!' );                    
                }
            }
       }) 
       .then(()=>{ 
            cartDBSelect(selector.signIn.로그인정보.아이디);
       }) 
       .catch((err)=>{ 
            console.log( 'AXIOS 실패!' );
            console.log( err );
       });

    }

    React.useEffect(()=>{
        if(selector.signIn.로그인정보!==null){
            if(localStorage.getItem('SET_DB_CAT')===null){
                if(cart.length>0){
                    localStorage.setItem('SET_DB_CAT','ok'); 
                    cart.map((item, idx)=>{
                        cartDBSave(item, idx);
                    });
                }    
            }

        }        
    },[cart]);

    // 현재 클릭해서 본상품 정보 가져오기 => 리덕스에 저장하기
    React.useEffect(()=>{
        if(localStorage.getItem('viewProduct')!==null){
            const obj = JSON.parse(localStorage.getItem('viewProduct'));
            dispatch(viewProduct(obj)); 
        }
        if(localStorage.getItem('CART_PRODUCT')!==null){
            const obj = JSON.parse(localStorage.getItem('CART_PRODUCT'));
            dispatch(cartMethod(obj)); 
        }

    },[]);

    // 새로고침해도 로그인정보를 유지
    React.useEffect(()=>{
        if(localStorage.getItem('KURLY_SIGNIN_INFORMATION')!==null) {                        
            const result = JSON.parse(localStorage.getItem('KURLY_SIGNIN_INFORMATION'));
            dispatch(signIn(result));
        }
    },[]);

    // 로딩시 또는 새로고침하면 주소를 계속 유지
    React.useEffect(()=>{
        if(selector.signIn.로그인정보===null &&  sessionStorage.getItem('KURLY_ADDRESS_KEY')!==null){
            const result = JSON.parse(sessionStorage.getItem('KURLY_ADDRESS_KEY'));            
            const 주소 = {
                주소1: result.주소1,
                주소2: result.주소2
            }
            dispatch(address(주소));
        }
        else  if(selector.signIn.로그인정보!==null){
            try{
                const 주소 = {
                    주소1: selector.signIn.로그인정보.주소.split(',')[0]===undefined?'':selector.signIn.로그인정보.주소.split(',')[0],
                    주소2: selector.signIn.로그인정보.주소.split(',')[1]===undefined?'':selector.signIn.로그인정보.주소.split(',')[1]
                }
                dispatch(address(주소));
            }
            catch(e){
                return;
            }
        }
    },[selector.signIn.로그인정보]);

    // 탑모달 유효기간 확인 유지
    React.useEffect(()=>{
        let toDay = new Date();
        if(localStorage.getItem('KURLY_TOP_MODAL_KEY')!==null){
            const result = JSON.parse(localStorage.getItem('KURLY_TOP_MODAL_KEY'));

            if( toDay <= result.expires ){
                dispatch(topModal(false));              
            }
            else{
                dispatch(topModal(true));
            }           
        }
        return;
        
    },[]);

    // 메인모달 유효기간 확인 유지
    React.useEffect(()=>{
        let toDay = new Date();
        if(localStorage.getItem('KURLY_MAIN_MODAL_KEY')!==null){
            const result = JSON.parse(localStorage.getItem('KURLY_MAIN_MODAL_KEY'));
            if( toDay <= result.expires ){
                dispatch(mainModal(false));
            }
            else{
                dispatch(mainModal(true));
            }           
        }
        return;

    },[]);

    return (
        <div id="wrap">                
            <HashRouter>
                { selector.topModal.isTopModal && <TopModalComponent />}
                <Routes>
                    <Route path="/" element={<HeaderComponent />}>
                        <Route index element={ <MainComponent /> } />                        
                        <Route path="/index" element={ <MainComponent /> } />                        
                        <Route path="/sub1" element={ <Sub1Component /> }/>
                        <Route path="/sub2" element={ <Sub2Component /> }/>
                        <Route path="/sub3" element={ <Sub3Component /> }/>
                        <Route path="/sub4" element={ <Sub4Component /> }/>
                        <Route path="/sub5" element={ <Sub5SignUpComponent /> }/>

                        <Route path="/sub6" element={ <Sub6SignInComponent /> }/>
                        <Route path="/sub6IdSearch" element={ <Sub6SignInIdSearchComponent /> }/>
                        <Route path="/sub6PwSearch" element={ <Sub6SignInPwSearchComponent /> }/>
                        <Route path="/sub6IdPwSearchResult" element={ <Sub6SignInIdPwSearchResultComponent /> }/>
                        <Route path="/sub6PwReset" element={ <Sub6SignInPwResetComponent /> }/>

                        <Route path="/sub7" element={ <Sub7NoticeComponent /> }/>
                        <Route path="/sub7Insert" element={ <Sub7NoticeInsertFormComponent /> }/>
                        <Route path="/sub7View" element={ <Sub7NoticeViewComponent /> }/>
                        <Route path="/sub7Update" element={ <Sub7NoticeUpdateComponent /> }/>
                        <Route path="/sub7AdminSign" element={ <Sub7AdminSigninComponent /> }/>
                        <Route path="/sub7AdminSignup" element={ <Sub7AdminSignupComponent /> }/>
                        <Route path="/sub7AdminIdSearch" element={ <Sub7AdminIdSearchComponent /> }/>
                        <Route path="/sub7AdminIdSearchResult" element={ <Sub7AdminIdSearchResultComponent /> }/>
                        <Route path="/sub7AdminPwSearch" element={ <Sub7AdminPwSearchComponent /> }/>
                        <Route path="/sub7AdminPwReset" element={ <Sub7AdminPwResetComponent /> }/>                        
                        <Route path="/productView" element={ <ProductViewComponent /> }/>
                        <Route path="/cart" element={ <CartComponent /> }/>
                        
                    </Route>
                </Routes>

                <QuickMenuComponent /> 
                <FooterComponent />
                { selector.mainModal.isMainModal && <MainModalComponent /> }
                <GoTopComponent />
                { selector.confirmModal.isConfirmModal && <ConfirmModalComponent /> }
                { selector.confirmService1Modal.isConfirmService1Modal && <ConfirmService1ModalComponent /> }
                { selector.confirmService2Modal.isConfirmService2Modal && <ConfirmService2ModalComponent /> }
                { selector.confirmService3Modal.isConfirmService3Modal && <ConfirmService3ModalComponent /> }
                { selector.isAddress.isAddress && <PostcodeComponent /> } 
                { selector.isDeliveryReducer.isDelivery && <PostcodeDeliveryComponent /> } 
            </HashRouter>               
        </div>
    )
}
