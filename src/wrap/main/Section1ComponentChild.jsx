import React from 'react';

export default function Section1ComponentChild({슬라이드,n}) {

    const slideWrap = React.useRef();   
    React.useEffect(()=>{
        slideWrap.current.style.width = `${100 * n}%`; 
    },[n]);

    // 메인슬라이드 컨트롤 
    const [cnt, setCnt] = React.useState(0);
    const [toggle, setToggle] = React.useState(0);
    const [isArrow, setIsArrow] = React.useState(false);  

    // 1-1. 슬라이드 애니메이션
    const mainSlide=()=>{
        slideWrap.current.style.transition = 'all 0.6s ease-in-out';
        slideWrap.current.style.left = `${-100 * cnt}%`;
        if(cnt!==0){ 
            returnSlide();
        }
    }
    const returnSlide=()=>{
        if(cnt>(n-2)){
            setToggle(1);
            setCnt(1); 
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-100 * 0}%`;
        }
        if(cnt<0){
            setToggle(1);
            setCnt(n-2-1); 
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-(100*(n-2))}%`;
        }
    }

    // 2. 슬라이드 구현 
    React.useEffect(()=>{
        if(toggle===0){
            mainSlide();
        }
        else { 
            setToggle(0);
            setTimeout(()=>{ 
                mainSlide();
            },100);
        }
    },[cnt]);

    // 3-1. 다음카운트
    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt => cnt+1); 
    }

    // 3-2. 이전카운트 
    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt => cnt-1);
    }

    // 4. 자동 타이머 
    React.useEffect(()=>{
        if(isArrow===false){    
            let setId = 0;
            setId = setInterval(()=>{
                setCnt(cnt => cnt+1); 
            }, 4000);
            return () => clearInterval(setId); 
        }
    },[isArrow]); 

    // 5. 슬라이드 콘테이너 마우스 오버
    const onMouseEnterContainer=()=>{
        setIsArrow(true);
    }

    // 6. 슬라이드 콘테이너 마우스 아웃
    const onMouseLeaveContainer=()=>{
        setIsArrow(false);
    }

    return (
        <div className="slide-container"  onMouseEnter={onMouseEnterContainer}  onMouseLeave={onMouseLeaveContainer}>
            <div className="slide-view">
                <ul ref={slideWrap}  className="slide-wrap">  
                    {
                        슬라이드.map((item, idx)=>{
                            return (
                                <li className="slide" key={item.번호}>
                                    <img src={`./images/intro/section1/${item.이미지}`} alt="" />
                                </li>
                            )
                        })
                    }   
                </ul>
            </div>
            <a href="!#" onClick={onClickNext} className={`next-arrow-btn blind${isArrow?' on':''}`}>next-arrow-btn</a>
            <a href="!#" onClick={onClickPrev} className={`prev-arrow-btn blind${isArrow?' on':''}`}>prev-arrow-btn</a>
            <span className='page-num-box'><em>{cnt+1>n-2?1:cnt+1}</em><i>/</i><em>{n-2}</em></span>

        </div>
    );
};
