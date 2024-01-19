import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Sub7NoticeComponentChildList ({공지사항, 공지카운트, n}) {

    const selector = useSelector((state)=>state);

    const navigate= useNavigate();

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
    });
    

    // 전체 페이지 설정하기
    React.useEffect(()=>{
        try {
            if(공지사항.length>0){
                setState({
                    ...state,
                    totalPage: Math.ceil(공지사항.length/state.pageList),
                    totalPageBtn: Math.ceil(Math.ceil(공지사항.length/state.pageList)/state.pageListBtn)
                })
            }
        }
        catch(e) {
            console.log(e)
        }
    }, [공지사항]);

    // 페이지번호 저장 
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

    // 페이지 번호
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
    
    const onClickInsert=(e)=>{
        e.preventDefault();
        navigate('/sub7Insert');
    }

    const onClickList=(e, item)=>{
        navigate('/sub7View', {state: item});
    }


    return (
        <div className="right">
            <div className="right-header">
                <h2>공지사항</h2>
                <h3>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</h3>
            </div>                            
            <div className="right-list">

                <div className="list-header">
                    <ul className='column-box'>
                        <li className='col1'><span>번호</span></li>
                        <li className='col2'><span>제목</span></li>
                        <li className='col3'><span>작성자</span></li>
                        <li className='col4'><span>작성일</span></li>
                    </ul>                                   
                </div>
                <ul className='list-data'>
                    {
                        공지사항.length > 0 && (
                            공지사항.map((item, idx)=>{
                                if( Math.ceil((idx+1)/state.pageList) === state.page  ){
                                    return(
                                        <li key={item.번호} onClick={(e)=>onClickList(e, item)}>
                                            <ul className='column-box'>
                                                <li className='col1'><span>{item.타입==='공지'?item.타입:n-idx}</span></li>
                                                <li className='col2'><span>{item.제목}</span></li>
                                                <li className='col3'><span>{item.작성자}</span></li>
                                                <li className='col4'><span>{`${new Date(item.작성일).getFullYear()}.${new Date(item.작성일).getMonth()+1}.${new Date(item.작성일).getDate()}`}</span></li>
                                            </ul>  
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
        {
            selector.signIn.로그인정보!==null && ( 
                selector.signIn.로그인정보.회원등급==='관리자' && (
                <div className="button-box">
                    <button onClick={onClickInsert}>글쓰기</button>
                </div>
                )
            )
        }

        </div>
    );
};