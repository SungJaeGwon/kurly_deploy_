import React from 'react';
import './scss/Cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { cartMethod } from '../reducer/cartReducer';
import { viewProduct } from '../reducer/viewProduct';
import { useNavigate } from 'react-router-dom';
import { isDeliveryMethod } from '../reducer/isDeliveryReducer';
import axios from 'axios';

export default function CartComponent() {

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        냉장상품: [],
        냉동상품: [],
        상온상품: [],
        상품금액: 0,
        상품할인금액: 0,
        배송비: 0,    
        결제예정금액: 0,
        cnt: 0 
    })
    const [chk, setChk] = React.useState([]);

    const [isListUl1, setIsListUl1] = React.useState(false);
    const [isListUl2, setIsListUl2] = React.useState(false);
    const [isListUl3, setIsListUl3] = React.useState(false);

    const onClickDeliveryUpdate=(e)=>{
        e.preventDefault();
        dispatch(isDeliveryMethod(true));
    }
    const onClickListUl1=(e)=>{
        e.preventDefault();        
        setIsListUl1(!isListUl1);
    }
    const onClickListUl2=(e)=>{
        e.preventDefault();        
        setIsListUl2(!isListUl2);
    }
    const onClickListUl3=(e)=>{
        e.preventDefault();        
        setIsListUl3(!isListUl3);
    }


    // 로딩시 체크항목 모두 체크
    React.useEffect(()=>{
        let imsi = [];
        imsi = selector.cartReducer.장바구니.map((item)=>item.제품코드);    
        setChk(imsi);
        return;
    },[]);


    // 보관방법 별 그룹 배열
    React.useEffect(()=>{

        let 냉장상품 = [];
        let 냉동상품 = [];
        let 상온상품 = [];
        let 상품금액 = 0;
        let 상품할인금액 = 0;
        let 상품계산금액 = 0;
        let 배송비 = 0;
        let 결제예정금액 = 0;

        if(selector.cartReducer.장바구니.length > 0) {                    
            냉장상품 = selector.cartReducer.장바구니.filter((item)=>item.보관방법==='냉장');
            냉동상품 = selector.cartReducer.장바구니.filter((item)=>item.보관방법==='냉동');
            상온상품 = selector.cartReducer.장바구니.filter((item)=>item.보관방법==='상온');

            selector.cartReducer.장바구니.map((item)=>{
                chk.map((code)=>{
                    if(code===item.제품코드){
                        상품금액 += (Number(item.수량) * Number(item.정가));   
                        상품할인금액 += (Math.round((Number(item.수량) * Number(item.정가)) * Number(item.할인율))); 
                    }
                });
            });
            if(chk.length > 0){
                상품계산금액 = 상품금액 - 상품할인금액;
                배송비 = (상품계산금액 <= 43000) ? 3000 : 0;
                결제예정금액 = 상품계산금액 - 배송비;
            }
        }

        setState({
            ...state,
            냉장상품: 냉장상품,
            냉동상품: 냉동상품,
            상온상품: 상온상품,
            상품금액: 상품금액,
            상품할인금액: 상품할인금액,
            배송비: 배송비,    
            결제예정금액: 결제예정금액,
        })
        return;         

    },[selector.cartReducer.장바구니, chk]);

    // DB 장바구니 가져오기
    const cartDBUpdateListSelect=(사용자아이디)=>{
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        axios({
            url: 'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_cart_table_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if( res.status===200 ){
                if(res.data!==null){
                    dispatch(cartMethod(res.data));
                    localStorage.setItem('CART_PRODUCT', JSON.stringify(res.data));
                }
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    }    
    
    // 장바구니 수량변경
    const cartDBUdate=(사용자아이디, 제품코드, 결과)=>{
        console.log( 사용자아이디 )
        console.log( 제품코드 )
        console.log( 결과 )
        let 수량 = 0;
        결과.map((item)=>
            item.제품코드===제품코드 ? 수량 = item.수량 : 수량            
        );
        
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        formData.append('제품코드', 제품코드);
        formData.append('수량', 수량);

        axios({
            url: 'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_cart_table_update.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if( res.status===200 ){
                if(res.data===1){
                    cartDBUpdateListSelect(사용자아이디);
                }
                else{
                    console.log('제품 수량 수정 실패!');
                }
            }
        })
        .catch();
    }


    // 리덕스 장바구니 상태관리
    const onClickPlusBtn=(e, 제품코드)=>{
        e.preventDefault(); 
        const 결과 = selector.cartReducer.장바구니.map((item)=>{
            return 제품코드===item.제품코드 ? {...item, 수량: Number(item.수량)+1} : {...item}
        });
        dispatch(cartMethod(결과));
        localStorage.setItem('CART_PRODUCT', JSON.stringify(결과));
        if(selector.signIn.로그인정보!==null){
            cartDBUdate(selector.signIn.로그인정보.아이디, 제품코드, 결과);
        }
    }

    // 리덕스 장바구니 상태관리
    const onClickMinusBtn=(e, 제품코드)=>{
        e.preventDefault();

        const 결과 = selector.cartReducer.장바구니.map((item)=>{
            return 제품코드===item.제품코드 ? {...item, 수량: ((Number(item.수량) <= 1) ? (1) : (Number(item.수량)-1))} : {...item}
        });
        dispatch(cartMethod(결과));
        localStorage.setItem('CART_PRODUCT', JSON.stringify(결과));
        if(selector.signIn.로그인정보!==null){
            cartDBUdate(selector.signIn.로그인정보.아이디, 제품코드, 결과);
        }
    }

    // 개별체크
    const onChangeCheck=(e)=>{
        if(e.target.checked){
            setChk([...chk, e.target.value]);
        }
        else{
            let imsi = chk.filter((item)=>item!==e.target.value);
            setChk(imsi);
        }
    }   

    // 전체체크
    const onChangeAllCheck=(e)=>{
        let imsi = [];
        if(e.target.checked){
            imsi = selector.cartReducer.장바구니.map((item)=>item.제품코드);
            setChk(imsi);
        }
        else{            
            setChk([]);
        }
    }   
    
    // 데이터베이스 장바구니 삭제
    const cartDBDeleteOne=(사용자아이디, 제품코드)=>{
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        formData.append('제품코드', 제품코드);

        axios({
            url: 'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_cart_table_delete.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if( res.status===200 ){
                if(res.data===1){
                    cartDBUpdateListSelect(사용자아이디);
                }
            }
        })
        .catch((err)=>{
            console.log( err );
        });

    }

    // X 버튼 
    const onClickOneDelete=(e, 제품코드)=>{
        e.preventDefault();
        let 장바구니 = selector.cartReducer.장바구니;
        let 결과 = 장바구니.filter((item)=>item.제품코드!==제품코드);

        dispatch(cartMethod(결과));
        localStorage.setItem('CART_PRODUCT', JSON.stringify(결과));
        결과 = chk.filter((item)=>item!==제품코드);
        setChk(결과);
        cartDBDeleteOne(selector.signIn.로그인정보.아이디, 제품코드);
    }


    // 체크박스 삭제 
    const onClickSelectDelete=(e)=>{
        e.preventDefault(); 
        let 장바구니 = selector.cartReducer.장바구니;
        let 결과 = 장바구니.filter((item)=>!chk.includes(item.제품코드) );

        dispatch(cartMethod(결과));
        localStorage.setItem('CART_PRODUCT', JSON.stringify(결과));
        결과 = 장바구니.filter((item)=>!chk.includes(item.제품코드) );
        setChk(결과);

        chk.map((item)=>
            cartDBDeleteOne(selector.signIn.로그인정보.아이디, item)
        )
        
    }
    // 상세페이지로 이동하기
    const onClickViewProductPage=(e, item)=>{
        e.preventDefault();
        let obj2 = item;
        obj2 = {
            ...obj2,
            할인율: Number(item.할인율),
            판매가: Number(item.판매가),            
            옵션상품목록: JSON.parse(item.옵션상품목록),
            정가: Number(item.정가),
            수량: Number(item.수량)
        };
        dispatch(viewProduct(obj2));   
        localStorage.setItem('viewProduct', JSON.stringify(obj2));
        navigate('/productView');
    }


    return (
        <main id='cart'>
            <section id="section1">
                <div className="container">
                    <div className="tittle">
                        <h2>장바구니</h2>
                    </div>
                    <div className="content">
                        <div className="left">
                            <div className="cart-btn cart-header">
                                <div className="button-box">
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            name='allCheck' 
                                            id='allCheck' 
                                            value='allCheck'
                                            checked={ selector.cartReducer.장바구니.length > 0 && chk.length===selector.cartReducer.장바구니.length }
                                            onChange={onChangeAllCheck} 
                                        />
                                        
                                        <span>전체선택 ({chk.length}/{selector.cartReducer.장바구니.length})</span>    
                                    </label>    
                                    <button onClick={onClickSelectDelete}>선택삭제</button>
                                </div>
                            </div>
                            
                            <div className="cart-list">
                                <div className="cart-list-wrap">

                                    {
                                        (state.냉장상품.length===0 && state.냉동상품.length===0 && state.상온상품.length===0) && <p className='cart-caption'>장바구니에 담긴 상품이 없습니다</p> 
                                    }

                                    {
                                        state.냉장상품.length > 0 && (
                                            <div className="list-1 list">
                                                <div className="title">
                                                    <h2><img src="./images/cart/icon_title1.svg" alt="" /><span>냉장상품</span></h2>
                                                    <button onClick={onClickListUl1}><img src="./images/cart/icon_arrow_up.svg" alt="" className={isListUl1?'on':''} /></button>
                                                </div>
                                                <ul className={`list-ul${isListUl1?' on':''}`}>
                                                {
                                                    state.냉장상품.map((item, idx)=>{
                                                        return(
                                                            <li key={item.제품코드}>
                                                                <div className="left-box">
                                                                    <span>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            name='cartChk' 
                                                                            id={item.제품코드} 
                                                                            value={item.제품코드} 
                                                                            checked={chk.includes(item.제품코드)}
                                                                            onChange={onChangeCheck}
                                                                        />
                                                                    </span>
                                                                    <span onClick={(e)=>onClickViewProductPage(e, item)}><img src={item.이미지} alt="" /></span>
                                                                    <span onClick={(e)=>onClickViewProductPage(e, item)}>{item.장바구니상품명}</span>                                                                
                                                                </div>
                                                                <div className="right-box">
                                                                    <ul>
                                                                        <li>
                                                                            <button onClick={(e)=>onClickMinusBtn(e, item.제품코드)} className='minus-btn'><img src="./images/product_view/icon_minus.svg" alt="" /></button></li>
                                                                        <li><span>{Number(item.수량)}</span></li>
                                                                        <li><button onClick={(e)=>onClickPlusBtn(e, item.제품코드)}  className='plus-btn'><img src="./images/product_view/icon_plus.svg" alt="" /></button></li>
                                                                    </ul> 
                                                                    <span>
                                                                        <em>{Math.round(Number(item.정가) * (1-Number(item.할인율)) * Number(item.수량)).toLocaleString('ko-KR')}원</em>
                                                                        <em>{(Number(item.정가) * Number(item.수량)).toLocaleString('ko-KR')}원</em>
                                                                    </span>
                                                                    <button onClick={(e)=>onClickOneDelete(e, item.제품코드)} className='cart-delete-btn'><img src="./images/product_view/icon_option_delete.svg" alt="" /></button>
                                                                </div>                                                            
                                                            </li>
                                                        )
                                                    })
                                                }
                                                </ul>
                                            </div>  
                                        )
                                    }   


                                    {
                                        state.냉동상품.length > 0 && (
                                            <div className="list-1 list">
                                                <div className="title">
                                                    <h2><img src="./images/cart/icon_title2.svg" alt="" /><span>냉동상품</span></h2>
                                                    <button onClick={onClickListUl2}><img src="./images/cart/icon_arrow_up.svg" alt=""  className={isListUl2?'on':''}  /></button>
                                                </div>
                                                <ul className={`list-ul${isListUl2?' on':''}`}>
                                                {
                                                    state.냉동상품.map((item, idx)=>{
                                                        return(
                                                            <li key={item.제품코드}>
                                                                <div className="left-box">
                                                                    <span>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            name='cartChk' 
                                                                            id={item.제품코드} 
                                                                            value={item.제품코드} 
                                                                            checked={chk.includes(item.제품코드)}
                                                                            onChange={onChangeCheck}
                                                                        />
                                                                    </span>
                                                                    <span onClick={(e)=>onClickViewProductPage(e, item)}><img src={item.이미지} alt="" /></span>
                                                                    <span onClick={(e)=>onClickViewProductPage(e, item)}>{item.장바구니상품명}</span>                                                                
                                                                </div>
                                                                <div className="right-box">
                                                                    <ul>
                                                                        <li><button onClick={(e)=>onClickMinusBtn(e, item.제품코드)} className='minus-btn'><img src="./images/product_view/icon_minus.svg" alt="" /></button></li>
                                                                        <li><span>{Number(item.수량)}</span></li>
                                                                        <li><button onClick={(e)=>onClickPlusBtn(e, item.제품코드)} className='plus-btn'><img src="./images/product_view/icon_plus.svg" alt="" /></button></li>
                                                                    </ul> 
                                                                    <span>
                                                                        <em>{Math.round(Number(item.정가) * (1-Number(item.할인율)) * Number(item.수량)).toLocaleString('ko-KR')}원</em>
                                                                        <em>{(Number(item.정가) * Number(item.수량)).toLocaleString('ko-KR')}원</em>
                                                                    </span>
                                                                    <button onClick={(e)=>onClickOneDelete(e, item.제품코드)}  className='cart-delete-btn'><img src="./images/product_view/icon_option_delete.svg" alt="" /></button>
                                                                </div>                                                            
                                                            </li>
                                                        )
                                                    })
                                                }
                                                </ul>
                                            </div>  
                                        )
                                    }   

                               
                                    {
                                        state.상온상품.length > 0 && (
                                            <div className="list-1 list">
                                                <div className="title">
                                                    <h2><img src="./images/cart/icon_title3.svg" alt="" /><span>상온상품</span></h2>
                                                    <button onClick={onClickListUl3} ><img src="./images/cart/icon_arrow_up.svg" alt=""   className={isListUl3?'on':''} /></button>
                                                </div>
                                                <ul className={`list-ul${isListUl3?' on':''}`}>
                                                {
                                                    state.상온상품.map((item, idx)=>{
                                                        return(
                                                            <li key={item.제품코드}>
                                                                <div className="left-box">
                                                                    <span>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            name='cartChk' 
                                                                            id={item.제품코드} 
                                                                            value={item.제품코드} 
                                                                            checked={chk.includes(item.제품코드)}
                                                                            onChange={onChangeCheck}
                                                                        />
                                                                    </span>
                                                                    <span onClick={(e)=>onClickViewProductPage(e, item)}><img src={item.이미지} alt="" /></span>
                                                                    <span onClick={(e)=>onClickViewProductPage(e, item)}>{item.장바구니상품명}</span>                                                                
                                                                </div>
                                                                <div className="right-box">
                                                                    <ul>
                                                                        <li><button onClick={(e)=>onClickMinusBtn(e, item.제품코드)} className='minus-btn'><img src="./images/product_view/icon_minus.svg" alt="" /></button></li>
                                                                        <li><span>{Number(item.수량)}</span></li>
                                                                        <li><button onClick={(e)=>onClickPlusBtn(e, item.제품코드)} className='plus-btn'><img src="./images/product_view/icon_plus.svg" alt="" /></button></li>
                                                                    </ul> 
                                                                    <span>
                                                                        <em>{Math.round(Number(item.정가) * (1-Number(item.할인율)) * Number(item.수량)).toLocaleString('ko-KR')}원</em>
                                                                        <em>{(Number(item.정가) * Number(item.수량)).toLocaleString('ko-KR')}원</em>
                                                                    </span>
                                                                    <button onClick={(e)=>onClickOneDelete(e, item.제품코드)} className='cart-delete-btn'><img src="./images/product_view/icon_option_delete.svg" alt="" /></button>
                                                                </div>                                                            
                                                            </li>
                                                        )
                                                    })
                                                }
                                                </ul>
                                            </div>  
                                        )
                                    }   

                               

                                </div>
                            </div>

                            <div className="cart-btn cart-footer">
                                <div className="button-box">
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            name='allCheck' 
                                            id='allCheck' 
                                            value='allCheck'
                                            checked={ selector.cartReducer.장바구니.length > 0 && chk.length===selector.cartReducer.장바구니.length }
                                            onChange={onChangeAllCheck} 
                                        />
                                        <span>전체선택 (0/0)</span>    
                                    </label>    
                                    <button onClick={onClickSelectDelete}>선택삭제</button>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="payment-box">
                        {
                            selector.signIn.로그인정보!==null && (
                                <div className="delivery-box">
                                    <ul>
                                        <li>
                                            <h2 className='delivery-title'>
                                                <img src="./images/cart/ico_location.svg" alt="" />
                                                <span>배송지</span>
                                            </h2>
                                        </li>
                                        <li>
                                            <p  className='delivery-address'>
                                                {selector.address.주소.주소1}
                                                {selector.address.주소.주소2}
                                            </p>
                                        </li>
                                        <li>
                                            <p className='delivery-star'>샛별배송</p>
                                        </li>
                                        <li>
                                            <p className="delivery-button">
                                                <button onClick={onClickDeliveryUpdate}>배송지 변경</button>
                                            </p>
                                        </li>
                                    </ul>    
                                </div>    
                            )
                        }
                                <ul>
                                    <li><strong>상품금액</strong><span>{Number(state.상품금액).toLocaleString('ko-KR')}원</span></li>
                                    <li><strong>상품할인금액</strong><span>{Number(state.상품할인금액).toLocaleString('ko-KR')}원</span></li>
                                    <li><strong>배송비</strong><span>{Number(state.배송비).toLocaleString('ko-KR')}원</span></li>
                                    <li><hr /></li>
                                    <li><strong>결제예정금액</strong><span>{Number(state.결제예정금액).toLocaleString('ko-KR')}원</span></li>
                                </ul>
                            </div>
                            
                            <div className="button-box">
                                {
                                   selector.signIn.로그인정보===null && <button>로그인</button>
                                }
                                {
                                   selector.signIn.로그인정보!==null && <button>주문하기</button>
                                }
                            </div>

                            <div className="info-box">
                                <p>
                                    [주문완료] 상태일 경우에만 주문 취소 가능합니다.<br/>
                                    [마이컬리  &gt; 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
