import React from "react";
import './scss/Header.scss';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { isAddress } from "../reducer/isAddress";
import { signIn } from "../reducer/signIn";
import { address } from "../reducer/address";
import { cartMethod } from "../reducer/cartReducer";
import { isDeliveryMethod } from "../reducer/isDeliveryReducer";


export default  function HeaderComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const location = useLocation();
    const navigate = useNavigate();
    const row3 = React.useRef(); 

    const [state, setState] = React.useState({
        isBar: false,
        is고객센터: false,
        isFixed: false,
        is배송지등록: false, 
        signInTooltip: false
    });
    const [cartCnt, setCartCnt] = React.useState(selector.cartReducer.장바구니.length);
    const [isCartAlert, setIsCarAlert] = React.useState(false);

    React.useEffect(()=>{
        if( selector.cartReducer.장바구니.length > cartCnt ){
            setIsCarAlert(true);
            setTimeout(()=>{
                setIsCarAlert(false);
            },4000);
        }
        else{
            setIsCarAlert(false);
        }

    },[selector.cartReducer.장바구니])

    const onMouseEnterSignIn=()=>{
        setState({
            ...state,
            signInTooltip: true
        });
    }

    const onMouseLeaveSignIn=()=>{
        setState({
            ...state,
            signInTooltip: false
        });
    }

    // 로그아웃
    const onClickLogOut=(e)=>{
        e.preventDefault();
        dispatch(signIn(null)); 
        dispatch(address('')); 
        localStorage.removeItem('KURLY_SIGNIN_INFORMATION');
        sessionStorage.removeItem('KURLY_ADDRESS_KEY');
        navigate('/index'); 
        localStorage.removeItem('SET_DB_CAT');
        localStorage.removeItem('CART_PRODUCT');
        dispatch(cartMethod([]));
    }

    React.useEffect(()=>{
        let row3Top = row3.current.offsetTop+42;
        window.addEventListener('scroll', function(){
            if(window.scrollY>=row3Top){
                setState({
                    ...state,
                    isFixed: true
                });
            }
            else {
                setState({
                    ...state,
                    isFixed: false
                });
            }
        });
    },[]);

    const onMouseEnterCustomer=()=>{
        setState({
            is고객센터: true
        })
    }
    const onMouseLeaveCustomer=()=>{
        setState({
            is고객센터: false
        })
    }

    const onMouseEnterIsBar=()=>{
        setState({
            isBar: true
        });
    }

    const onMouseLeaveIsBar=()=>{
        setState({
            isBar: false
        });
    }

    const onMouseEnterMap=()=>{
        setState({
            ...state,
            is배송지등록: true
        })
    }

    const onMouseLeaveMap=()=>{
        setState({
            ...state,
            is배송지등록: false
        })
    }

    const onClickAddressSearch=(e)=>{
        e.preventDefault();        
        
        dispatch(isAddress(true));
    }

     const onClickDeliveryUpdate=(e)=>{
        e.preventDefault();
        dispatch(isDeliveryMethod(true));
    }
    return(
        <>
            <header id="header">
                <div className="row1 row">
                    <div className="container">
                        <div className="content">
                            <aside id="aside">
                                {
                                    selector.signIn.로그인정보!==null && (
                                    <div className="signin-box" onMouseLeave={onMouseLeaveSignIn}>
                                        <Link to="/sub6" className="sign on" onMouseEnter={onMouseEnterSignIn}>
                                            <span>{selector.signIn.로그인정보.회원등급}</span>                                                            
                                            <span>{selector.signIn.로그인정보.이름}님</span>
                                            <span><img src="./images/header/icon_sign_ok.svg" alt="" /></span>                                            
                                            <span><img src="./images/intro/ico_down_16x10.png" alt="" /></span>                                            
                                        </Link>
                                        {
                                            state.signInTooltip && (
                                            <div className="sign-tooltip">
                                                <ul>                                                
                                                    <li><Link to="!#">주문 내역</Link></li>
                                                    <li><Link to="!#">선물 내역</Link></li>
                                                    <li><Link to="!#">찜한 상품</Link></li>
                                                    <li><Link to="!#">배송지 관리</Link></li>
                                                    <li><Link to="!#">상품 후기</Link></li>
                                                    <li><Link to="!#">결제수단·컬리페이</Link></li>
                                                    <li><Link to="!#">상품 문의</Link></li>
                                                    <li><Link to="!#">적립금·컬리캐시</Link></li>
                                                    <li><Link to="!#">쿠폰</Link></li>
                                                    <li><Link to="!#">개인 정보 수정</Link></li>
                                                    <li><Link to="!#"><span>나의 컬리 스타일</span> <img src="./images/header/icon_sign_ok.svg" alt="" /></Link></li>
                                                    <li><Link to="!#">컬리멤버스</Link></li>
                                                    <li><a onClick={onClickLogOut} href="!#">로그아웃</a></li>
                                                </ul>
                                            </div>)
                                        }
                                    </div>
                                    )
                                }
                                {
                                    selector.signIn.로그인정보===null && (   
                                    <>
                                        <Link to="/sub5" className="on">회원가입</Link>
                                        <i>|</i>                            
                                        <Link to="/sub6">로그인</Link>
                                    </>
                                    )
                                }
                                <i>|</i>
                                <Link 
                                    to="/sub7" 
                                    onMouseEnter={onMouseEnterCustomer}
                                    
                                >고객센터 <img src="./images/intro/ico_down_16x10.png" alt="" /></Link>
                            {  

                                    state.is고객센터 && (
                                        <div 
                                            className="customer-center" 
                                            onMouseLeave={onMouseLeaveCustomer}
                                        >
                                            <ul>
                                                <li><Link to="/sub7">공지사항</Link></li>
                                                <li><a href="!#">자주하는 질문</a></li>
                                                <li><a href="!#">1:1 문의</a></li>
                                                <li><a href="!#">대량주문 문의</a></li>
                                            </ul>
                                        </div>
                                    )
                            }
                                <i>|</i>
                            {
                                selector.signIn.로그인정보===null && (
                                <Link to="/sub7AdminSign">
                                    MyAmin
                                </Link>
                                )
                            }
                            </aside>
                        </div>
                    </div>
                </div>
                <div className="row2 row">
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <Link to="/index">
                                    <img src="./images/intro/icon_logo.svg" alt="" />
                                    <span>마켓컬리</span>
                                </Link>
                                <i>|</i>
                                <a href="!#">뷰티컬리<img src="./images/intro/icon_logo_n.svg" alt="" /></a>
                            </div>
                            <div className={`center${state.isFixed?' on':''}`}>
                                <input className={state.isFixed?'on':''} type="text" name="search" id="search" placeholder="검색어를 입력해주세요" />
                                <button className={state.isFixed?'on':''}>
                                    <img className={state.isFixed?'on':''}  src="./images/intro/icon_zoom_purple.svg" alt="" />
                                </button>
                            </div>
                            <div className={`right${state.isFixed?' on':''}`}>
                                <span>
                                    <a 
                                        href="!#" 
                                        onMouseEnter={onMouseEnterMap}
                                    ><img src="./images/intro/icon_marp.svg" alt="" /></a>
                                    <a href="!#"><img src="./images/intro/icon_heart.svg" alt="" /></a>
                                    <Link to="/cart" className="cart-link">
                                        <img src="./images/intro/icon_cart.svg" alt="cart" />
                                        {
                                            selector.cartReducer.장바구니.length >=1 && <span><i>{selector.cartReducer.장바구니.length}</i></span>
                                        }                                       
                                    </Link>
                                    
                                    {
                                        isCartAlert && (
                                            <div className="cart-alert">
                                                <div className="cart-gap">
                                                    <div className="left">
                                                        <img src="./images/intro/section2/1647483683658l0.jpg" alt="" />
                                                    </div>
                                                    <div className="right">
                                                        <ul>
                                                            <li><h2>유명산지 설향딸기 500g</h2></li>
                                                            <li><p>장바구니에 상품을 담았습니다.</p></li>
                                                            <li><p>이미 담은 상품의 수량을 추가 했습니다.</p></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                </span>
                                {

                                state.is배송지등록 && (
                                    <div 
                                        className="map-address" 
                                        onMouseLeave={onMouseLeaveMap}
                                    >
                                       { 
                                            selector.address.주소==='' && (
                                                <ul>
                                                    <li><strong>배송지를 등록</strong>하고</li>
                                                    <li>구매 가능한 상품을 확인하세요!</li>
                                                    <li>
                                                        <Link to="/sub6">로그인</Link>
                                                        <button onClick={onClickAddressSearch}>
                                                            <img src="./images/header/icon_zoom_button.png" alt="" />
                                                            <span>주소검색</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            )                                          
                                        }

                                        {
                                             selector.address.주소!=='' && (
                                                selector.address.주소.주소1!=='' && (
                                                    <ul>
                                                        <li>{`${selector.address.주소.주소1}  ${selector.address.주소.주소2}`}</li>
                                                        <li>{'샛별배송'}</li>
                                                        <li>
                                                            <button className="address-update" onClick={onClickDeliveryUpdate}>
                                                                <span>배송지변경</span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                )
                                             )
                                           
                                        }
                                    </div>
                                )

                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={row3}  className={`row3 row${state.isFixed?' fixed':''}`}>
                    <div className="container">
                        <div className="content">
                            <div className={`left${state.isFixed?' on':''}`}>
                                <a href="!#" 
                                    className={state.isBar ? "on" : ""}
                                >
                                    <img 
                                        src={state.isBar ? "./images/intro/icon_3bar_on.svg" : "./images/intro/icon_3bar.svg" } 
                                    alt="" />
                                    <span>카테고리</span>
                                </a>
                            </div>
                            <div className={`center${state.isFixed?' on':''}`}>
                                <nav> 
                                    <Link to={{pathname:"/sub1"}} className={location.pathname==='/sub1'?"on":''}>신상품</Link>
                                    <Link to={{pathname:"/sub2", state:{name:"이순신", age: 29}}} className={location.pathname==='/sub2'?"on":''}>베스트</Link>
                                    <Link to={{pathname:"/sub3"}} className={location.pathname==='/sub3'?"on":''}>알뜰상품</Link>
                                    <Link to={{pathname:"/sub4"}} className={location.pathname==='/sub4'?"on":''}>특가/혜택</Link>
                                </nav>
                            </div>
                            <div className={`right${state.isFixed?' on':''}`}>
                                <a href="!#">
                                    <em>샛별・택배</em><span>배송안내</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}