import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewProduct } from '../../../reducer/viewProduct';
import { viewProductIsFlag } from '../../../reducer/viewProductIsFlag';
import { quickMenuViewProduct } from '../../../reducer/quickMenuViewProduct';
import { useNavigate, useLocation } from 'react-router-dom';
import '../scss/pagenation.scss';

export default function ProductList({ filterDeleteMethod, 필터, 상품, 필터상품, 이미지경로}) {

    const [state, setState] = React.useState({
        공지카운트: 0,
        pageList: 10,
        page: 1, 
        totalPage: 0,
        pageNum: [],

        pageListBtn: 5,
        pageBtn: 1,
        totalPageBtn: 0,
        pageNumBtn: [],

        is추천순: false,
        is신상품순: true,
        is판매량순: false,
        is혜택순: false,
        is낮은가격순: false,
        is높은가격순: false  
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    React.useEffect(()=>{
        if(필터상품.length>0){
            setState({
                ...state,
                totalPage: Math.ceil(필터상품.length/state.pageList),
                totalPageBtn: Math.ceil(Math.ceil(필터상품.length/state.pageList)/state.pageListBtn)
            })
        }
    }, [필터상품]);

    React.useEffect(()=>{
        const {totalPage, pageBtn, pageListBtn} = state;
            if( totalPage > 0 ){
                let frontNum = 0; 
                let rearNum = 0;  
                let pageNumBtn = []; 
                frontNum = (((pageBtn-1) * pageListBtn) + 1);
                rearNum  = frontNum + pageListBtn - 1;
                if(rearNum > state.totalPage ){
                    rearNum = state.totalPage;
                }
                for(let i=frontNum; i<=rearNum; i++){
                    pageNumBtn = [...pageNumBtn, i];
                }
                setState({
                    ...state,
                    pageNumBtn: pageNumBtn
                })
            }
    }, [state.totalPage]);

    // 페이지 번호 클릭 
    const onClickPage=(e, num)=>{
        e.preventDefault();
        setState({
            ...state,
            page: num
        })
    }

    // 첫페이지 
    const onClickFirstPage=(e)=>{
        e.preventDefault();
        let pageNumBtn = []; 
        let pageBtn = state.pageBtn;
        let frontNum = 0;     
        let rearNum = 0;

        pageBtn = 1;
        frontNum = (((pageBtn-1) * state.pageListBtn) + 1);
        rearNum  = frontNum + state.pageListBtn - 1;
        if(rearNum > state.totalPage ){
            rearNum = state.totalPage;
        }
        for(let i=frontNum; i<=rearNum; i++){
            pageNumBtn = [...pageNumBtn, i];
        }
        setState({
            ...state,
            page: 1,
            pageNumBtn: pageNumBtn,
            pageBtn: pageBtn,
        })
    }

    // 마지막 페이지
    const onClickLastPage=(e)=>{
        e.preventDefault();
        let pageControl = Math.ceil(state.totalPage / state.pageListBtn) ;     
        let pageNumBtn = []; 
        let pageBtn = state.pageBtn;
        let frontNum = 0;     
        let rearNum = 0;

        pageBtn = pageControl;
        frontNum = (((pageBtn-1) * state.pageListBtn) + 1);
        rearNum  = frontNum + state.pageListBtn - 1;
        if(rearNum > state.totalPage ){
            rearNum = state.totalPage;
        }
        for(let i=frontNum; i<=rearNum; i++){
            pageNumBtn = [...pageNumBtn, i];
        }
        setState({
            ...state,
            page: state.totalPage,
            pageNumBtn: pageNumBtn,
            pageBtn: pageBtn,
        })
    }

    // 이전 페이지
    const onClickPrevPage=(e)=>{
        e.preventDefault();
        let frontNum = 0;     
        let rearNum = 0;      
        let pageNumBtn = [];  
        let pageBtn = state.pageBtn;  
        
        pageBtn -= 1;  
        frontNum = (((pageBtn-1) * state.pageListBtn) + 1);
        rearNum  = frontNum + state.pageListBtn - 1;
        for(let i=frontNum; i<=rearNum; i++){
            pageNumBtn = [...pageNumBtn, i];
        }
        setState({
            ...state,
            pageBtn: pageBtn,
            pageNumBtn: pageNumBtn
        })
    }

    // 다음 페이지
    const onClickNextPage=(e)=>{
        e.preventDefault();
        let frontNum = 0;     
        let rearNum = 0;      
        let pageNumBtn = [];  
        let pageBtn = state.pageBtn; 

        pageBtn += 1;
        frontNum = (((pageBtn-1) * state.pageListBtn) + 1);
        rearNum  = frontNum + state.pageListBtn - 1;
        if(rearNum > state.totalPage ){
            rearNum = state.totalPage;
        }
        for(let i=frontNum; i<=rearNum; i++){
            pageNumBtn = [...pageNumBtn, i];
        }
        setState({
            ...state,
            pageBtn: pageBtn,
            pageNumBtn: pageNumBtn
        })
    }

    const onClickDeleteEvent=(e, item)=>{
        e.preventDefault();
        filterDeleteMethod(item);
    }

    const onClickViewProduct=(e, item, min, list, path)=>{
        e.preventDefault();
    
        let obj = {
            번호: item.번호,
            이미지: `${path}${이미지경로}/${item.이미지}`,
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

    // 상품 정렬 
    const onClickOrder1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a, b)=> (a.추천 < b.추천) ? (-1) : ((a.추천 > b.추천) ? (1) : (0)) ),
            is추천순: true,
            is신상품순: false,
            is판매량순: false,
            is혜택순: false,
            is낮은가격순: false,
            is높은가격순: false
        })
    }

    // 2. 신상품순 
    const onClickOrder2=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a, b)=> (b.제조일시 < a.제조일시) ? (-1) : ((b.제조일시 > a.제조일시) ? (1) : (0)) ),
            is추천순: false,
            is신상품순: true,
            is판매량순: false,
            is혜택순: false,
            is낮은가격순: false,
            is높은가격순: false
        })
    }

    // 3. 판매량 
    const onClickOrder3=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a, b)=> b.판매량 - a.판매량),
            is추천순: false,
            is신상품순: false,
            is판매량순: true,
            is혜택순: false,
            is낮은가격순: false,
            is높은가격순: false
        })  
    }

    // 4. 혜택순 
    const onClickOrder4=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a, b)=> b.할인율 - a.할인율),
            is추천순: false,
            is신상품순: false,
            is판매량순: false,
            is혜택순: true,
            is낮은가격순: false,
            is높은가격순: false
        })   
    }

    // 5. 정가
    const onClickOrder5=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a, b)=> a.정가 - b.정가),
            is추천순: false,
            is신상품순: false,
            is판매량순: false,
            is혜택순: false,
            is낮은가격순: true,
            is높은가격순: false
        })  
    }

    // 6. 정가 
    const onClickOrder6=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            상품: 상품.sort((a, b)=> b.정가 - a.정가),
            is추천순: false,
            is신상품순: false,
            is판매량순: false,
            is혜택순: false,
            is낮은가격순: false,
            is높은가격순: true
        })  
    }

    return (
        <div className="right"> 
            <div className="header">
                <h3>총 {필터상품.length}건</h3>
                <span>
                    <a href="!#" onClick={onClickOrder1} className={state.is추천순?'on':''}>추천순<img src="./images/sub/sub1/icon_question.svg" alt="" /></a>
                    <a href="!#" onClick={onClickOrder2} className={state.is신상품순?'on':''}>신상품순</a>
                    <a href="!#" onClick={onClickOrder3} className={state.is판매량순?'on':''}>판매량순</a>
                    <a href="!#" onClick={onClickOrder4} className={state.is혜택순?'on':''}>혜택순</a>
                    <a href="!#" onClick={onClickOrder5} className={state.is낮은가격순?'on':''}>낮은가격순</a>
                    <a href="!#" onClick={onClickOrder6} className={state.is높은가격순?'on':''}>높은가격순</a>
                </span>
            </div>
            <div className="product-list">
                {
                    필터.length > 0 && (
                        <div className="filter-box">
                            {
                            
                                필터.map((item, idx)=>{
                                    return(
                                        <span key={idx}>
                                            <em>{item}</em>
                                            <a href="!#" onClick={(e)=>onClickDeleteEvent(e,item)}><img src="./images/sub/sub1/icon_delete.svg" alt="" /></a>
                                        </span>
                                    )
                                })
                                
                            }   
                        </div>
                    )
                }
                <ul>
                    {
                        필터상품.length > 0 && (
                            필터상품.map((item, idx)=>{
                                if( Math.ceil((idx+1)/state.pageList) === state.page  ){
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
                                        <li className={`list list${idx+1}`} key={item.번호}>
                                            
                                            <div className="col-gap"  onClick={(e)=>onClickViewProduct(e, item, 최소정가, item.정가, './images/sub/')}>
                                                <div className="img-box">
                                                <a href="!#"><img src={`./images/sub/sub1/${item.이미지}`} alt="" /></a>
                                                </div>
                                                <div className="txt-box">                                        
                                                    <p><a href="!#"><img src="./images/intro/section2/icon_cart.svg" alt="" /> 담기</a></p>
                                                    <h6>{item.배송}</h6>
                                                    <h3>{item.제품명}</h3>
                                                    <h6>{item.제품특징}</h6>
                                                    {
                                                        item.할인율!==0 && <h4>{Number(최소정가).toLocaleString('ko-KR')}원</h4>
                                                    }
                                                    <h5>
                                                    {
                                                        item.할인율!==0 && <em>{Math.round(item.할인율*100)}%</em>
                                                    }
                                                        <strong className={item.할인율===0?'on':''}>{Math.round(Number(최소정가)*(1-item.할인율)).toLocaleString('ko-KR')} {item.옵션==="단일상품" ? "원":"원~"}</strong></h5>
                                                        
                                                    <h6><img src="./images/intro/section2/icon_count.svg" alt="" />{item.리뷰}</h6>                                                
                                                    <h6>{item.유형}</h6>
                                                    <h6>{item.무료배송}</h6>
                                                </div>

                                            </div>
                                        </li>
                                    )
                                }
                            })
                        )
                    }
                </ul>
                <div id="pagenation">
                    <div className="pagenation-box">
                        <ul>
                            {
                                state.pageBtn > 1 && (
                                <>
                                <li><button onClick={onClickFirstPage}><img src="./images/pagenation/icon_first.png" alt="" /></button></li>    
                                <li><button onClick={onClickPrevPage}><img src="./images/pagenation/icon_prev.png" alt="" /></button></li> 
                                </>
                                )
                            }
                            {
                                state.pageNumBtn.map((item)=>{
                                    return(
                                        <li><button onClick={(e)=>onClickPage(e, item)}>{item}</button></li>  
                                    )
                                })
                            }  
                            {
                                state.pageBtn < state.totalPageBtn && (
                                <>
                                <li><button onClick={onClickNextPage}><img src="./images/pagenation/icon_next.png" alt="" /></button></li>    
                                <li><button onClick={onClickLastPage}><img src="./images/pagenation/icon_last.png" alt="" /></button></li>    
                                </>
                                )
                            }
                        </ul> 
                    </div>   
                </div>    

            </div> 
        </div>         
    );
};