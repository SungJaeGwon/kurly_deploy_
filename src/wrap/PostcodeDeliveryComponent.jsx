import React from 'react';
import PostCode from 'react-daum-postcode';
import './scss/PostcodeDeliveryComponent.scss';
import { useDispatch, useSelector } from 'react-redux';
import { address } from '../reducer/address';
import { isAddress } from '../reducer/isAddress';
import axios from 'axios';
import { deliveryMethod } from '../reducer/address';
import { isDeliveryMethod } from '../reducer/isDeliveryReducer';

export default function PostcodeDeliveryComponent () {
 
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const [state, setState] = React.useState({
        idx: '',
        우편번호:'',
        주소1: '',
        주소2: '',
        기본배송지여부: 'NO',
        받는분이름: '',
        받는분휴대폰: '',
        isAddrAPIShow: false,              
        isDeliveryListShow: true,         
        isDeliveryUpdateDeleteShow: false,
        isMoreview: false,
        chk: [0] 
    });
    
    const onClickSelectedDelivery=(e, item)=>{
        setState({
            ...state,
            idx: item.idx,
            우편번호: item.우편번호,
            주소1: item.주소1,
            주소2: item.주소2,
            기본배송지여부: item.기본배송지여부,
            받는분이름: item.받는분이름,
            받는분휴대폰: item.받는분휴대폰,
            isAddrAPIShow: false,
            isDeliveryListShow: false,
            isDeliveryUpdateDeleteShow: true, 
        });
    }

    // 주소2 
    const onChangeAddr2=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        })
    }

    // 받는분이름
    const onChangeDeliveryName=(e)=>{
        setState({
            ...state,
            받는분이름: e.target.value
        })
    }

    // 받는분휴대폰
    const onChangeDeliverHp=(e)=>{
        setState({
            ...state,
            받는분휴대폰: e.target.value
        })
    }

    // 기본배송지여부 체크박스 이벤트
    const onChangeDeliverDefault=(e)=>{
        let 기본배송지여부 = state.기본배송지여부;
        if(e.target.checked){
            기본배송지여부 = 'YES';
        }
        else{
            기본배송지여부 = 'NO';
        }
        setState({
            ...state,
            기본배송지여부: 기본배송지여부
        })
    }

    // 수정된 목록 
    const deliveryUpdateList=()=>{
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
    }

    // 수정저장버튼
    const onClickDeliveryUpdateSave=(e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('idx', state.idx);
        formData.append('userId', selector.signIn.로그인정보.아이디);
        formData.append('주소2', state.주소2);
        formData.append('기본배송지여부', state.기본배송지여부);
        formData.append('받는분이름', state.받는분이름);
        formData.append('받는분휴대폰', state.받는분휴대폰);

        axios({
            url: 'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_delivery_table_update.php',
            method:'POST',
            data: formData
        })
        .then((res)=>{
            console.log( res.data )
            if(res.status===200){
                if(res.data===1){
                    alert('배송지 정보가 업데이트 되었습니다.');
                    deliveryUpdateList();
                    setState({
                        ...state,
                        isDeliveryListShow: true,           
                        isDeliveryUpdateDeleteShow: false
                    })
                }
                else{
                    alert('배송지 정보 업데이트가 실패 되었습니다.');
                }
            }
        })
        .catch(()=>{});
    }

    // 삭제버튼 클릭 
    const onClickDeliveryDelete=(e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('idx', state.idx);
        formData.append('userId', selector.signIn.로그인정보.아이디);

        axios({
            url: 'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_delivery_table_delete.php',
            method:'POST',
            data: formData
        })
        .then((res)=>{
            console.log( res.data )
            if(res.status===200){
                if(res.data===1){
                    alert('배송지 정보가 삭제 되었습니다.');
                    deliveryUpdateList();
                    setState({
                        ...state,
                        isDeliveryListShow: true,           
                        isDeliveryUpdateDeleteShow: false
                    })
                }
                else{
                    alert('배송지 정보 삭제 실패 되었습니다.');
                }
            }
        })
        .catch(()=>{});       
    }

    // 배송지 DB에 추가
    const onClickDeliveryAdd=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isAddrAPIShow: true, 
            isDeliveryAddrAPIShow: false,
        })
    }

    // 기본배송지로 저장 체크 박스
    const onChangeDefaultCheck=(e)=>{
        let 기본배송지여부 = state.기본배송지여부;
        if(e.target.checked===true){
            기본배송지여부 = 'YES';
        }
        else{
            기본배송지여부 = 'NO';
        }        
        setState({
            ...state,
            기본배송지여부: 기본배송지여부
        })
    }

    // 배송지 체크박스
    const onChangeDeliveryCheck=(e)=>{
        let chk = state.chk;

        if(e.target.checked){
            chk = [...chk, Number(e.target.value)];
        }
        else{
            chk = chk.filter((item)=>item!==Number(e.target.value))
        }
        setState({
            ...state,
            chk: chk
        })
    }

    // 나머지 주소 입력
    const onChangeAddress=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        })
    }

    const onCompletePostCode=(data)=>{
        let 우편번호 = '';
        let 주소1 = '';
        let 엑스트라주소 ='';
        let extraAddr = '';
      

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            엑스트라주소 = extraAddr;

        } else {
            엑스트라주소 = '';
        }


        if(data.userSelectedType==='R'){
            우편번호 = data.zonecode;
            주소1 = `${data.roadAddress}  ${엑스트라주소}`;
        }
        else{
            우편번호 = data.zonecode;
            주소1 = data.jibunAddress;
        }


        setState({
            ...state,
            우편번호: 우편번호,
            주소1: 주소1
        });
        
    }

    // 재검색
    const onClickReSearch=(e)=>{
        e.preventDefault();
        dispatch(isDeliveryMethod(false));
            setTimeout(()=>{
                dispatch(isDeliveryMethod(true));
            },100);      
    }

    // 닫기
    const onClickClose=(e)=>{
        e.preventDefault();
        dispatch(isDeliveryMethod(false));
    }


    // 배송지 DB 가져오기
    const deliveryDBList=()=>{
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

    // 3. 배송지 DB에 저장하기
    const onClickSave=(e)=>{
        e.preventDefault();

        let formData = new FormData();
        formData.append('userId', selector.signIn.로그인정보.아이디);
        formData.append('우편번호', state.우편번호);
        formData.append('주소1', state.주소1);
        formData.append('주소2', state.주소2);
        formData.append('기본배송지여부', state.기본배송지여부);
        
        axios({
            url:'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_delivery_table_insert.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status===200){
                if(res.data===1){
                    deliveryDBList();
                    dispatch(isDeliveryMethod(false));
                }
                else {
                    console.log('저장 실패');
                }                  
            }
        })
        .catch();
    }
    
    const postCodeStyle={
        zIndex: 2,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: "#fff"
    }
    return (
        <div id='postCode'>
            <div className="container">
                <div className="window-title">
                    <h1>
                        <img src="./images/intro/favicon-192x192.png" alt="" />
                        <em>컬리 - 마켓컬리/뷰티컬리-Chrome</em>
                    </h1>
                    <button onClick={onClickClose} title='닫기'>
                        <i className="material-icons">close</i>
                    </button>
                </div>
                <div className="content">

                    {
                        state.isDeliveryUpdateDeleteShow &&(
                            <div className="delivery-update_delete-box">
                                <div className="header-box">
                                    <h2>배송지 수정</h2>
                                </div>
                                <div className="main-box">
                                    <ul>
                                        <li>
                                            <p><label htmlFor="addr2">{state.주소1}</label></p>
                                            <p>
                                                <input 
                                                    type="text" 
                                                    name='addr2' 
                                                    id='addr2' 
                                                    value={state.주소2} 
                                                    onChange={onChangeAddr2} 
                                                />
                                            </p>
                                        </li>
                                        <li>
                                            <p><label htmlFor="addr2">받는분 이름</label></p>
                                            <p>
                                                <input 
                                                    type="text" 
                                                    name='deliveryName' 
                                                    id='deliveryName' 
                                                    value={state.받는분이름} 
                                                    onChange={onChangeDeliveryName} 
                                                />
                                            </p>
                                        </li>
                                        <li>
                                            <p><label htmlFor="addr2">받는분 휴대폰</label></p>
                                            <p>
                                                <input 
                                                    type="text" 
                                                    name='deliveryHp' 
                                                    id='deliveryHp' 
                                                    value={state.받는분휴대폰} 
                                                    onChange={onChangeDeliverHp} 
                                                />
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="footer-box">
                                    <ul>

                                        {
                                            state.기본배송지여부!=='YES' && (
                                                <li className='delivery-default'>
                                                    <input 
                                                        type="checkbox" 
                                                        name='deliveryDefault' 
                                                        id='deliveryDefault' 
                                                        value={state.기본배송지여부} 
                                                        onChange={onChangeDeliverDefault} 
                                                    />
                                                    <label htmlFor="deliveryDefault">기본 배송지로 저장</label>
                                                </li>
                                            )
                                        }
                                        <li>
                                            <button className='update-btn' onClick={onClickDeliveryUpdateSave}>저장</button>
                                        </li>
                                        <li>
                                            <button className='delete-btn' onClick={onClickDeliveryDelete}>삭제</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }

                    {
                        state.isDeliveryListShow && (
                            <div className="delivery-select-add-box">
                                <div className="header-box">
                                    <div className="title">
                                        <h2>
                                            <strong>배송지</strong>
                                            <span>배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.</span>
                                        </h2>                                        
                                    </div>
                                    <div className="delivery-list-subject">
                                        <span>선택</span>
                                        <span>배송 정보</span>
                                        <span>수정</span>
                                    </div>
                                </div>
                                <div className="main-box">
                                    <ul className="delivery-list-box">
                                    { 
                                        selector.address.배송지.map((item, idx)=>{
                                            return(
                                                <li className="delivery-list">
                                                    <div className="delivery-list-left">
                                                        <input 
                                                            type="checkbox" 
                                                            name='deliveryCheck' 
                                                            id={`deliveryCheck${idx}`} 
                                                            value={idx} // 0 1 2 3 4 5 ..
                                                            checked={state.chk.includes(idx)}
                                                            onChange={(e)=>onChangeDeliveryCheck(e, idx)}
                                                        />
                                                    </div>
                                                    <div className="delivery-list-center">
                                                    
                                                    {
                                                        item.기본배송지여부==='YES' && (
                                                            <p className='p1'>기본배송지</p>
                                                        )
                                                    }
                                                        <p className='p2'>{`${item.주소1}  ${item.주소2}`}</p>
                                                        <p className='p3'>{item.받는분이름}  {item.받는분휴대폰}</p>
                                                        <p className='p4'>샛별배송</p>
                                                    </div>
                                                    <div className="delivery-list-right">
                                                        <button onClick={(e)=>onClickSelectedDelivery(e, item)}><img src="./images/delivery/edit_24_24_ccc.svg" alt="" /></button>
                                                    </div>
                                                </li>
                                            )
                                        })  
                                        
                                    }
                                        
                                        
                                    </ul>
                                </div>
                                <div className="footer-box">
                                    <button onClick={onClickDeliveryAdd}><img src="./images/delivery/ico_add_16x16.svg" alt="" /><span>배송지 추가</span></button>
                                </div>
                            </div>
                        )
                    }
                    {
                        state.isAddrAPIShow && (
                            <PostCode 
                                style={postCodeStyle} 
                                onComplete={onCompletePostCode}
                            />
                        )

                    }

                    {
                    }
                    <div className="address-box">
                        <div className="title">
                            <h1><strong>샛별배송</strong><span> 지역입니다.</span></h1>
                            <h2>매일 새벽, 문 앞까지 신선함을 전해드려요.</h2>
                        </div>
                        <ul className='list-box'>                            
                            <li>
                                <div className="gap row1">
                                    <input 
                                        type="text" 
                                        name='address1' 
                                        id='address1'  
                                        value={state.주소1}
                                        disabled={true}
                                    />
                                    <button  onClick={onClickReSearch}>
                                        <img src="./images/sub/sub5/ico_search.svg" alt="" />
                                        <span>재검색</span>
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div className="gap row2">
                                    <input 
                                        type="text" 
                                        name='address2' 
                                        id='address2'  
                                        onChange={onChangeAddress}
                                        value={state.주소2}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="gap row3">
                                   <p>
                                        <input 
                                            type="checkbox" 
                                            name='defaultCheck' 
                                            id='defaultCheck' 
                                            value='YES'
                                            checked={state.기본배송지여부==='YES'}
                                            onChange={onChangeDefaultCheck}
                                        />
                                        <label htmlFor="">기본 배송지로 저장</label>
                                   </p>
                                </div>
                            </li>
                            <li>
                                <div className="gap row4">
                                    <button onClick={onClickSave}>저장</button>
                                </div>
                            </li>
                            <li>
                                <div className="gap row5">
                                    <img src="./images/sub/sub5/icon_info.svg" alt="" />
                                    <span>샛별배송 지역 중 배송불가 장소 안내</span>
                                </div>
                            </li>
                            <li>
                                <div className="gap row6">                                    
                                    <span>관공서 / 학교 / 병원 / 시장 / 공단지역 / 산간지역 / 백화점 등</span>
                                    <button>
                                        <em>자세히 보기</em>
                                        <img src="./images/sub/sub5/icon_arrow_down_11x10.svg" alt="" />
                                    </button>
                                    {
                                        state.isMoreview && (
                                            <div className="more-view">
                                                <ul class="css-lu7l5g ep04gzj0">
                                                    <li>가락동농수산물도매시장</li>
                                                    <li>가락동농수산물시장</li>
                                                    <li>가천대학교</li>
                                                    <li>고려대학교안암캠퍼스</li>
                                                    <li>고매동 일부(일부지역만 배송가능)</li>
                                                    <li>국립중앙박물관</li>
                                                    <li>국민대학교</li>
                                                    <li>덕성여자대학교</li>
                                                    <li>덕양구 신원동 일부(일부지역만 배송가능)</li>
                                                    <li>도내동 일부(원흥지구만 배송가능)</li>
                                                    <li>동덕여자대학교</li>
                                                    <li>반월특수지구</li>
                                                    <li>서경대학교</li>
                                                    <li>서울사이버대학교</li>
                                                    <li>서울시립대학교</li>
                                                    <li>서울여자대학교</li>
                                                    <li>성균관대학교</li>
                                                    <li>성신여자대학교</li>
                                                    <li>세종대학교</li>
                                                    <li>연세대학교</li>
                                                    <li>이화여자대학교</li>
                                                    <li>한국외국어대학교</li>
                                                    <li>홍익대학교</li>
                                                </ul>                                    
                                            </div>
                                        )
                                    }
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
