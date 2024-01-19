import React from 'react';
import './scss/ProductView.scss';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModal } from '../reducer/confirmModal';
import { cartMethod } from '../reducer/cartReducer';
import axios from 'axios';


export default function ProductViewComponent () {

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();

    const [list, setList] = React.useState([]); 
    const [count, setCount] = React.useState([]);  

    const [price, setPrice] = React.useState(0);
    const [cnt, setCnt] = React.useState(1);
    const [isSelect, setIsSelect] = React.useState(false);
    const [isCount, setIsCount] = React.useState(false);
   
    const [state, setState] = React.useState({
        isSelect: false,
        isMinus: false, 
        장바구니: []
    });

    // 총상품금액 
    const [$state, $setState] = React.useState({
        totPay: 0
    });
   
    // 1. 셀렉트 박스 클릭 이벤트 
    const onClickList=(e, item, idx)=>{
        const res = list.map((z)=>z.상품명===item.상품명);
        if(!res.includes(true)){
            const obj = {
                idx: idx,
                상품명: item.상품명,
                정가: Number(item.정가),
                판매가: Math.round(Number(item.정가) * (1-Number(selector.viewProduct.current.할인율)))
            }
            setList([obj, ...list]); 
            setCount([1, ...count]); 
        }
        else{ 
            const obj = {
                isConfirmModal: true,
                confirmMsg: '이미 추가된 옵션 입니다.',
                회원가입완료: false
            }
            dispatch(confirmModal(obj));
        }
        setState({
            ...state,
            isSelect: false
        })
    }

    // 2. 삭제 
    const optionListCountArray=(idx)=>{
        let result = null;
        result = list.filter((item, id)=> id !== idx);
        setList(result);
        result = count.filter((item, id)=> id !== idx);
        setCount(result);
    }

    // 3. 마이너스
    const onClickCountMinusOption=(e, idx)=>{
        e.preventDefault();

        count[idx] = count[idx] - 1;
        setCount([...count]);

        let totPay = $state.totPay;
        let cuttentPay = 0;
            cuttentPay = totPay - Number(list[idx].판매가); 

            $setState({
                totPay: cuttentPay
            })
        if(count[idx] < 1){
            optionListCountArray(idx);
        }
    } 
    
    // 4. X 삭제 
    const onClickOptionDeleteBtn=(e, idx)=>{
        e.preventDefault();
        optionListCountArray(idx);
    }

    // 5. 플러스
    const onClickCountPlusOption=(e, idx)=>{
        e.preventDefault();
        count[idx] = count[idx] + 1;
        setCount([...count]); 
        let totPay = $state.totPay; 
        let cuttentPay = 0;
            cuttentPay = totPay + Number(list[idx].판매가);  
        
            $setState({
                totPay: cuttentPay
            })
    }    
  
    // 6. 셀렉트 박스를 선택하면 리스트에 추가
    React.useEffect(()=>{
        let pay = 0;
        if( list.length > 0 ){
            list.map((item, idx)=>{
                pay += Number(item.판매가);
            });            
        }

        $setState({
            totPay: pay
        })
       
    },[list]);

    // 7. SHOW & HIDE
    React.useEffect(()=>{

        if(selector.viewProduct.current.옵션==='단일상품'){
            setIsCount(true);
        }

        if(selector.viewProduct.current.옵션==='다중상품'){
            setIsSelect(true);
        }

    },[]);


    // 8. 총상품금액 계산 
    React.useEffect(()=>{
        let totPay = 0;
        let isMinus = false;

        if(selector.viewProduct.current.옵션==='단일상품'){
            if(cnt >=1 ){
                totPay =  cnt * Number(selector.viewProduct.current.판매가)
            }
            if(cnt>1){
                isMinus = false;
            }
            else{
                isMinus = true;
            }
            $setState({
                totPay: totPay
            });
            setState({
                ...state,
                isMinus: isMinus
            })
        }
        return;
    },[cnt]);


    // 9. 셀렉트
    const onClickSelect=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isSelect: !state.isSelect
        })
    }

    // 10. 1씩감소
    const onClickCountMinus=(e)=>{
        e.preventDefault();
        if(cnt <= 1) { 
            setCnt(1);
        }   
        else {
            setCnt(cnt-1);
        }          
    }

    // 11. 1씩증가
    const onClickCountPlus=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    }

    // [1] 데이터베이스 장바구니 목록 저장
    const cartDBSave=(item)=>{
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
                console.log( res.data );
                if( Number(res.data)===1 ){
                    console.log('장바구니 수량이 변경 되었습니다.');
                    cartDBSelect(); 
                }
                else if( Number(res.data)===2 ){
                    console.log('장바구니 목록이 추가 저장 되었습니다.');
                    cartDBSelect(); 
                }
                else if( Number(res.data)===0 ){
                    console.log('장바구니 수정 저장 실패!');
                }
                else if( Number(res.data)===-1 ){
                    console.log('장바구니 추가 저장 실패!');
                }
                else{
                    console.log('데이터 확인후 다시 시도해주세요!');
                }
            
             }
        })
        .catch((err)=>{
             console.log( 'AXIOS 실패!' );
             console.log( err );
        });
 
    }
 
    // [2] 데이터베이스 장바구니 가져오기(조회 SELECT)
    const cartDBSelect=()=>{

       let formData = new FormData();
       formData.append('userId',  selector.signIn.로그인정보.아이디);
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
                 
             }
       })
       .catch((err)=>{
             console.log('AXIOS 실패!');
       });  
    }

    // 12. 장바구니 담기 클릭 이벤트
    const onClickCartAdd=(e)=>{
        e.preventDefault();
        
        let 장바구니 = selector.viewProduct.current;  

        let 단일상품장바구니 = [];
        let 다중상품장바구니 = [];
        let 카트_로컬저장소 = [];

        // [2] 단일상품 
        if(장바구니.옵션==='단일상품'){
            장바구니 = {
                ...장바구니,
                제품코드: selector.viewProduct.current.번호, 
                장바구니상품명: selector.viewProduct.current.제품명,
                수량: cnt
            }

            if(selector.signIn.로그인정보===null){ 
                if(localStorage.getItem('CART_PRODUCT')!==null){
                    단일상품장바구니 = JSON.parse(localStorage.getItem('CART_PRODUCT'));
                }
                let imsi = 단일상품장바구니.map((item)=>item.제품코드===장바구니.제품코드); 
                if(imsi.includes(true)===true){
                    단일상품장바구니 = 단일상품장바구니.map((item)=>item.제품코드===장바구니.제품코드?{...item, 수량:item.수량+장바구니.수량 }:{...item});
                }
                else{
                    단일상품장바구니 = [...단일상품장바구니, 장바구니];
                }
                localStorage.setItem('CART_PRODUCT', JSON.stringify(단일상품장바구니));
                setState({
                    ...state, 
                    장바구니: 단일상품장바구니
                });
                dispatch(cartMethod(단일상품장바구니)); 
            }
            else{ 
                cartDBSave(장바구니); 
            }
        }

        // 2. 다중상품 
        else if(장바구니.옵션==='다중상품'){
            list.map((item, i)=>{    
                장바구니 = {
                    ...장바구니,
                    제품코드: `${selector.viewProduct.current.번호}, ${item.상품명}`,
                    장바구니상품명: item.상품명,
                    수량: count[i]
                }            
                다중상품장바구니 = [
                    ...다중상품장바구니,
                    장바구니
                ]                
            }); 
               if(selector.signIn.로그인정보===null){ 
                    if(localStorage.getItem('CART_PRODUCT')!==null){
                        카트_로컬저장소 = JSON.parse(localStorage.getItem('CART_PRODUCT'));             
                    }
                    let res = null;
                    res = 카트_로컬저장소.map((item)=>다중상품장바구니.map((item2)=>item.제품코드===item2.제품코드? 1 : 0));
                    if( res.map((item)=>item.includes(1)).includes(true) ){ 
                        다중상품장바구니.map((item) => 
                            카트_로컬저장소.map((item2, idx) => {
                                if(item.제품코드===item2.제품코드){
                                    return 카트_로컬저장소[idx] = {...item2, 수량: item2.수량 + item.수량}
                                }
                                else{
                                    return 카트_로컬저장소[idx] = {...item2}
                                } 
                            })                    
                        );
                    }
                    else {
                        다중상품장바구니.map((item)=>{
                            카트_로컬저장소 = [
                                    ...카트_로컬저장소, 
                                    item 
                            ]   
                        })                    

                    } 
                    localStorage.setItem('CART_PRODUCT', JSON.stringify(카트_로컬저장소));
                    setState({
                        ...state, 
                        장바구니: 카트_로컬저장소
                    });
                    dispatch(cartMethod(카트_로컬저장소));  
               }
               else{ 
                    다중상품장바구니.map((item)=>{
                        cartDBSave(item);
                    });                    
                    cartDBSelect();   
               } 
        }
    }

    // 상태관리 변수 새로고침 해도 유지하게 한다.
    React.useEffect(()=>{
        let arr = [];
        if(localStorage.getItem('CART_PRODUCT')!==null){
            arr = JSON.parse(localStorage.getItem('CART_PRODUCT'));
        } 
        setState({
            ...state, 
            장바구니: arr
        });
        dispatch(cartMethod(arr));

        return;
    },[]);

    return (
        <main id='productView'>
            <section id='section1'>
                <div className="container">                
                    <div className="content">
                        <div className="left">
                            <img src={selector.viewProduct.current.이미지} alt="" />
                        </div>
                        <div className="right">
                            <ul>
                                <li><em>{selector.viewProduct.current.배송}</em></li>
                                <li><h2>{selector.viewProduct.current.제품명}</h2></li>
                                <li><em>{selector.viewProduct.current.제품특징}</em></li>
                                <li>
                                    <h3>
                                    {
                                        Number(selector.viewProduct.current.할인율) > 0 && (
                                        <strong>{Math.round(Number(selector.viewProduct.current.할인율)*100)}%</strong>
                                        )
                                    }
                                        <span className={Number(selector.viewProduct.current.할인율) > 0 ?'':'on'}>{Math.round(Number(selector.viewProduct.current.정가)*(1-Number(selector.viewProduct.current.할인율))).toLocaleString('ko-KR')}<i> {selector.viewProduct.current.옵션==="단일상품" ? "원":"원~"}</i></span>
                                    </h3>
                                </li>                                        
                            {
                                Number(selector.viewProduct.current.할인율) > 0 && (
                                <li><h4><strong>{Number(selector.viewProduct.current.정가).toLocaleString('ko-KR')}</strong><span>원</span></h4></li>
                                )
                            }
                                <li><h5>로그인 후, 적립 혜택이 제공됩니다.</h5></li>
                                <li>
                                    <a href='!#'>
                                        <span><strong>2,000원</strong> <em>적립금 + 할인 쿠폰 받고 구매하기</em></span>
                                        <img src="./images/product_view/icon_arrow_right.svg" alt="" />
                                    </a>
                                </li>
                            </ul>
                            <ul className='table'>
                                <li>
                                    <div className="col1">
                                        배송
                                    </div>
                                    <div className="col2">
                                        <em>{selector.viewProduct.current.배송}</em>
                                        <p>
                                            23시 전 주문 시 내일 아침 7시 전 도착<br/>
                                            (대구·부산·울산 샛별배송 운영시간 별도 확인)
                                        </p>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">
                                        판매자
                                    </div>
                                    <div className="col2">                                        
                                        <p>
                                            {selector.viewProduct.current.판매처==='Kurly Only'?'컬리':''}
                                        </p>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">
                                        포장타입
                                    </div>
                                    <div className="col2"> 
                                        <em>{selector.viewProduct.current.보관방법}</em>                                      
                                        <p>
                                            택배배송은 에코 포장이 스티로폼으로 대체됩니다.
                                        </p>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">
                                        중량/용량
                                    </div>
                                    <div className="col2">                                        
                                        <p>
                                            쿠바노 : 175g / 치킨 쿠바노 : 200g 
                                        </p>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">
                                        알레르기정보
                                    </div>
                                    <div className="col2">                                        
                                        <p>
                                            허닛 매니멀 쿠바노 : 우유, 밀, 돼지고기, 계란, 대두, 쇠고기 함유<br/> 
                                            허닛 매니멀 치킨 쿠바노 : 우유, 밀, 돼지고기, 계란, 대두, 쇠고기, 닭고기, 아황산류 함유 
                                        </p>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">
                                        유통기한(또는 소비기한)정보
                                    </div>
                                    <div className="col2">                                        
                                        <p>
                                            별도 표기일 까지 
                                        </p>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="col1">
                                        상품 선택
                                    </div>
                                    <div className="col2">     

                                    {
                                        isCount && (
                                        <div className="count-box">
                                           <h2>{selector.viewProduct.current.제품}</h2>     
                                           <h3>적립제외상품</h3>     
                                           <div>
                                                <div className="count-left">
                                                    <ul>
                                                        <li><button disabled={state.isMinus} className={`minus-btn${state.isMinus?' on':''}`} onClick={onClickCountMinus}><img src="./images/product_view/icon_minus.svg" alt="" /></button></li>
                                                        <li><span>{cnt}</span></li>
                                                        <li><button className='plus-btn' onClick={onClickCountPlus}><img src="./images/product_view/icon_plus.svg" alt="" /></button></li>
                                                    </ul>                                                    
                                                </div>
                                                <div className="count-right">
                                                    {
                                                        Number(selector.viewProduct.current.할인율) > 0 && (
                                                        <span>{Number(selector.viewProduct.current.정가).toLocaleString('ko-KR')}<i>원</i></span>
                                                        )
                                                    }
                                                    <strong>{Number(selector.viewProduct.current.판매가).toLocaleString('ko-KR')}<i>원</i></strong>
                                                </div>
                                           </div>
                                        </div>
                                        )
                                    }
                                    {
                                        isSelect && (
                                        <>
                                            <button onClick={onClickSelect}><em>상품을 선택해 주세요</em><span><img className={state.isSelect?'on':''} src="./images/product_view/ico_down_16x10.png" alt="" /></span></button>
                                            <div className={`list-box${state.isSelect?' on':''}`}>
                                                <ol>
                                                   { 
                                                        selector.viewProduct.current.옵션상품목록.map((item, idx)=>{
                                                            return(
                                                                <li key={item.상품명} onClick={(e)=>onClickList(e, item, idx)}>
                                                                    <p>
                                                                        <span>{item.상품명}</span>
                                                                        <strong>{Number(item.정가)}</strong>
                                                                    </p>                                                
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ol>
                                            </div>
                                        </>
                                        )
                                    }
                                    {
                                        list.map((item, idx)=>{

                                            return(
                                                <>
                                                    <div className="count-box" key={item.상품명}>
                                                        <button className='option-delete-btn'  onClick={(e)=>onClickOptionDeleteBtn(e, idx)}><img src="./images/product_view/icon_option_delete.svg" alt="" /></button>
                                                        <h2>{item.상품명}</h2>     
                                                        <h3>적립제외상품</h3>     
                                                        <div>
                                                            <div className="count-left">
                                                                <ul>
                                                                    <li><button disabled={state.isMinus} className={`minus-btn${state.isMinus?' on':''}`} onClick={(e)=>onClickCountMinusOption(e, idx)}><img src="./images/product_view/icon_minus.svg" alt="" /></button></li>
                                                                    <li><span>{count[idx]}</span></li>
                                                                    <li><button className='plus-btn' onClick={(e)=>onClickCountPlusOption(e, idx)}><img src="./images/product_view/icon_plus.svg" alt="" /></button></li>
                                                                </ul>                                                    
                                                            </div>
                                                            <div className="count-right">
                                                                {
                                                                    Number(selector.viewProduct.current.할인율) > 0 && (
                                                                    <span>{Number(item.정가).toLocaleString('ko-KR')}<i>원</i></span>
                                                                    )
                                                                }
                                                                <strong>{Math.round(Number(item.정가)*(1-Number(selector.viewProduct.current.할인율))).toLocaleString('ko-KR')}<i>원</i></strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                    </div>
                                </li>
                            </ul>

                            <div className='sum-payment'>
                                <em>총상품금액:</em>
                                <strong>{Number($state.totPay).toLocaleString('ko-KR')}</strong>
                                <span>원</span>
                            </div>
                            <div className='storage'>
                                <em>적립</em>
                                <strong>로그인 후, 적립 혜택 제공</strong>
                            </div>

                            <div className='button-box'>
                                <button><img src='./images/product_view/icon_heart.svg' /></button>
                                <button><img src='./images/product_view/icon_bell.svg' /></button>
                                <button onClick={onClickCartAdd}>장바구니담기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </main>
    );
};

