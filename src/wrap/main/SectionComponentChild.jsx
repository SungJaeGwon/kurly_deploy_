import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewProduct } from '../../reducer/viewProduct';
import { viewProductIsFlag } from '../../reducer/viewProductIsFlag';
import { quickMenuViewProduct } from '../../reducer/quickMenuViewProduct';
import { useNavigate, useLocation} from 'react-router-dom';


export default function SectionComponentChild ({ 타임세일, 제품, n, 애니메이션, 이미지배너, 칸수, 이미지경로}) {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    
    const slideWrap = React.useRef();
    const slide = React.useRef(); 
    const refSlide = React.useRef([]);
    const [state, setState] = React.useState({
        isLeftArrow: false,
        isRightArrow: false,
        cnt: 0,
        H: 0,
        M: 0, 
        S: 0
    });

    const onClickViewProduct=(e, item, min, list, path)=>{
        e.preventDefault();

        let altImg = "b5a8601f-c837-4d1f-bc7d-f3b3f5daefc2.jpg";
    
        let obj = {
            번호: item.번호,
            이미지: `${path}${이미지경로}/${이미지경로==='section5'?altImg:item.이미지}`,
            제품명: item.제품명,
            할인율: item.할인율,
            판매가: Math.round( min * (1 - item.할인율)),
            제품특징: item.제품특징,
            제조사: item.제조사,
            제조일시: item.제조일시,
            판매처: item.판매처,
            보관방법: item.보관방법,
            배송: item.배송,
            옵션: item.옵션,
            옵션상품목록: item.옵션==='다중상품'? list : [],
            정가: min,
            일시: new Date().getTime(),
        }
        dispatch(viewProduct(obj));   
        localStorage.setItem('viewProduct', JSON.stringify(obj));
        navigate('/productView');
    }

    React.useEffect(()=>{
        let imsi = [];
        if( localStorage.getItem('KURLY_VIEW_PRODUCT')===null ){
            if(Object.keys(selector.viewProduct.current).length > 0){ 
                imsi = [selector.viewProduct.current]; 
                localStorage.setItem("KURLY_VIEW_PRODUCT", JSON.stringify(imsi));                
                dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));
            }   
        }
        else{
            let result = JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT'));
            let filterResult = result.map((item)=>item.번호===selector.viewProduct.current.번호 ? true : false);
            
            if(filterResult.includes(true)!==true){
                if(Object.keys(selector.viewProduct.current).length>0){
                    result = [selector.viewProduct.current, ...result]; 
                    localStorage.setItem("KURLY_VIEW_PRODUCT", JSON.stringify(result));
                    dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));
                }    
            }     
        }
    },[selector.viewProduct.current])

    React.useEffect(()=>{
        if(localStorage.getItem('KURLY_VIEW_PRODUCT')!==null) {
            let result = JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT'));
            if(result.length>0){
                dispatch(quickMenuViewProduct(result));              
            }            
        }
    },[selector.viewProductIsFlag.isFlag]);

    const [isArrowPrev, setIsArrowPrev] = React.useState(false);
    const [isArrowNext, setIsArrowNext] = React.useState(false);

    React.useEffect(()=>{
        let isArrowPrev = false;
        let isArrowNext = false;
        if(state.cnt<=0){
            isArrowPrev = false; 
        }
        else{
            isArrowPrev = true; 
        }        
        if(state.cnt>=4){
            isArrowNext = false; 
        }
        else{
            isArrowNext = true; 
        }
        setIsArrowPrev(isArrowPrev);
        setIsArrowNext(isArrowNext);
    },[state.cnt]);

    // 슬라이드 랩퍼박스
    React.useEffect(()=>{
        if(타임세일.타임세일){
            try{
                let slideWidth = 1068 / 칸수; 
                slide.current.style.width = `${slideWidth}px`; 
                for(let i=0; i<n; i++){
                    if(칸수===3 && n===1){
                        refSlide.current[i].style.width = `${slideWidth * 2}px`;
                    }
                    else{
                        refSlide.current[i].style.width = `${slideWidth}px`;
                    }                    
                }
            } catch(e) {
                return;
            }    
        }
        if(이미지배너){
            try{
                let slideWidth = 1068 / 칸수; 
                for(let i=0; i<n; i++){
                    refSlide.current[i].style.width = `${slideWidth}px`;
                }   
            } catch(e) {
                return;
            }    
        }
 
        if(애니메이션){
            try{
                let slideWidth = 1068 / 칸수;
                for(let i=0; i<n; i++ ){
                    slide.current.style[i].width = `${slideWidth}px`;
                }
                slideWrap.current.style.width = `${slideWidth * n}px`;     
            } catch(e) {
                return;
            }    
        }
    },[칸수]);

    const onMouseEnterLeftArrow=(e)=>{
        setState({
            ...state,
            isLeftArrow: true
        })
    }
    const onMouseEnterRightArrow=(e)=>{
        setState({
            ...state,
            isRightArrow: true
        })
    }
    const onMouseLeaveLeftArrow=()=>{
        setState({
            ...state,
            isLeftArrow: false
        })
    }
    const onMouseLeaveRightArrow=()=>{
        setState({
            ...state,
            isRightArrow: false
        })
    }

    const mainSlide=()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        slideWrap.current.style.transform = `translateX(${-1068*state.cnt}px)`;
    }

    const onClickNextBtn=(e)=>{
        e.preventDefault();
        if(state.cnt>=4){
            setState({
                ...state,
                cnt: 4
            });
        }
        else {
            setState({
                ...state,
                cnt: state.cnt+1
            })
        }      
    }

    const onClickPrevBtn=(e)=>{
        e.preventDefault();
        if(state.cnt<=0){
            setState({
                ...state,
                cnt: 0
            });
        }
        else{
            setState({
                ...state,
                cnt: state.cnt-1
            })
        }
    }

    React.useEffect(()=>{        
        mainSlide(); 
    },[state.cnt]); 

    React.useEffect(()=>{
        if(타임세일.타임세일) {
         const setId = setInterval(function(){
             let timeSalse = 타임세일.타이머일시;
             let timeHours = 타임세일.타임시간;
             let start = new Date(timeSalse);
                 start.setHours( start.getHours() + timeHours ); 
             let now = new Date();
             let countTime = start - now; 
             let H=0;
             let M=0;
             let S=0;
 
             if( now >= start){
                 clearInterval(setId);
                 H=0;
                 M=0;
                 S=0;
             }
             else{
                 H= Math.floor(countTime/(60*60*1000)) % timeHours; 
                 M= Math.floor(countTime/(60*1000)) % 60;    
                 S= Math.floor(countTime/(1000)) % 60; 
             }
             setState({
                 ...state,
                 H: H < 10 ? `0${H}`:H,
                 M: M < 10 ? `0${M}`:M,
                 S: S < 10 ? `0${S}`:S,
             })    
         },1000);
        }
     },[타임세일, state]);

    return (
        <div className="slide-container">
            <div className="slide-view">
                <ul ref={slideWrap} className="slide-wrap">
                   {
                    타임세일.타임세일 && (
                        <li ref={slide} className="slide slide1">
                            <div className="col-gap">
                                <div className="txt-box timer-box">                                        
                                    <h2>{타임세일.캡션1}</h2>                                
                                    <h3>{타임세일.캡션2}</h3>                                
                                    <h4>
                                        <span className='icon-timer'>
                                            <img src="./images/intro/section3/icon_timer.svg" alt="" />
                                        </span>
                                        <span className='count-timer'>
                                            <strong>{state.H}</strong>
                                            <i>:</i>
                                            <strong>{state.M}</strong>
                                            <i>:</i>
                                            <strong>{state.S}</strong>
                                        </span>
                                    </h4>                                
                                    <h5>{타임세일.캡션3}</h5>                                
                                </div>
                            </div>
                        </li>
                    )     
                   }
                   {
                        제품.map((item, idx)=>{
                            
                            let 옵션최소정가 = 0;
                            let 최소정가;

                            if(item.옵션==='다중상품'){
                                옵션최소정가 = 100000000; 
                                item.정가.map((item2, idx2)=>{                
                                    if(옵션최소정가 > item2.정가){
                                        옵션최소정가 = item2.정가;
                                    }                    
                                });
                                최소정가=옵션최소정가;
                            }
                            else{                
                                최소정가=item.정가;
                            }
                            return(
                                <li ref={ (e)=> refSlide.current[idx]=e }  className={`slide slide${idx}`} key={item.번호}>
                                    <div className="col-gap" onClick={(e)=>onClickViewProduct(e, item, 최소정가, item.정가, './images/intro/')}>
                                        <div className="img-box">
                                            <a href="!#"><img src={`./images/intro/${이미지경로}/${item.이미지}`} alt="" /></a>
                                        </div>
                                        {
                                            !이미지배너 && (
                                                <div className="txt-box">                                        
                                                    <p><a href="!#"><img src="./images/intro/section2/icon_cart.svg" alt="" /> 담기</a></p>
                                                    <h3>{item.제품명}</h3>
                                                    <h4>
                                                        {
                                                            Number(최소정가).toLocaleString('ko-KO')
                                                        }원
                                                    </h4>
                                                    <h5><em>{Math.round(item.할인율*100)}%</em><strong>{(Math.round(Number(최소정가))*(1-item.할인율)).toLocaleString('ko-KO')} {item.옵션==="단일상품" ? "원":"원~"}</strong></h5>
                                                    <h6><img src="./images/intro/section2/icon_count.svg" alt="" />215</h6>
                                                </div>
                                            )
                                        }
                                    </div>
                                </li>
                            )
                        })
                   }
                </ul>
            </div>
            {             
            애니메이션 && (
                <a              
                    href="!#"  
                    onClick={onClickPrevBtn} 
                    onMouseEnter={onMouseEnterLeftArrow} 
                    onMouseLeave={onMouseLeaveLeftArrow} 
                    className={`sec2-left-arrow${isArrowPrev?' on':''}`}
                    ><img src={`./images/intro/${state.isLeftArrow?'icon_circle_left_arrow_purple.svg':'icon_circle_left_arrow_black.svg'}`} alt="" />
                </a>
            )
            }
            {
            애니메이션 && (
                <a 
                    onClick={onClickNextBtn}
                    href="!#" 
                    onMouseEnter={onMouseEnterRightArrow} 
                    onMouseLeave={onMouseLeaveRightArrow} 
                    className={`sec2-right-arrow${isArrowNext?' on':''}`}
                    ><img src={`./images/intro/${state.isRightArrow?'icon_circle_left_arrow_purple.svg':'icon_circle_left_arrow_black.svg'}`} alt="" />
                </a>
            )
            }
        </div>
    );
};