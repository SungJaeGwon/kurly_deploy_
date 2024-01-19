import React from "react";
import './scss/QuickMenu.scss';
import { useSelector, useDispatch } from "react-redux";
import { viewProduct } from "../reducer/viewProduct";
import { useNavigate } from "react-router-dom";

export default function QuickMenuComponent(){

    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isFixed, setIsFixed] = React.useState(false);

    React.useEffect(()=>{
       window.addEventListener('scroll', function(){
            let isFixed = false;
            if(this.window.scrollY >= 400){
                isFixed = true;
            }
            else{
                isFixed = false;
            }
            setIsFixed(isFixed);
       });     
    },[]);

    const refSlideWrap = React.useRef();
    const [cnt, setCnt] = React.useState(0);

    // 현재 클릭한 상품 이미지 상세페이지로 이동
    const onClickCurrentViewProduct=(e, item)=>{
        e.preventDefault();        
        dispatch(viewProduct(item));
        localStorage.setItem('viewProduct', JSON.stringify(item));
        navigate('/productView');
    }

    // 3. 클릭 이벤트 메서드
    const onClickUpDownEvent=(e, direction)=>{
        e.preventDefault();
        if(direction==='down'){  
            if(cnt > selector.quickMenuViewProduct.quickMenuViewProduct.length-4 ){
                return;
            }
            else{
                setCnt(cnt+1);
            }
        }
        else if(direction==='up'){
            if(cnt > 0){ 
                setCnt(cnt-1);
            }
            else{ 
                return;
            }
        }
    }

    // 4. 메인슬라이드 
    const mainSlide=()=>{
        try{
            refSlideWrap.current.style.transition = `all 0.3s ease-in-out`;
            refSlideWrap.current.style.transform = `translateY(${-94*cnt}px)`;
        } 
        catch(e){}
    }

    React.useEffect(()=>{
        mainSlide();
    },[cnt]);
    
    return(
        <div id="quikMenu" className={isFixed?'on':''}>
            <ul>
                <li>
                    <a href="!#">
                        <img src="./images/intro/deliveryInfo.png" alt="" />
                    </a>
                </li>

                <li>
                    <ul>
                        <li><a href="!#">등급별혜택</a></li>
                        <li><a href="!#">레시피</a></li>                        
                    </ul>
                </li>

                {
                selector.quickMenuViewProduct.quickMenuViewProduct.length > 0 && (
                <li>
                    <ul>
                        <li><button onClick={(e)=>onClickUpDownEvent(e, 'up')} className="up-arrow-btn"></button></li>
                        <li><h2>최근본상품</h2></li>
                        <li>
                            <ul ref={refSlideWrap}>
                                {
                                    selector.quickMenuViewProduct.quickMenuViewProduct.map((item)=>{
                                        return(
                                            <li key={item.번호}>
                                                <a href="!#" onClick={(e)=>onClickCurrentViewProduct(e, item)}>
                                                    <img src={item.이미지} alt="" />
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                        <li><button onClick={(e)=>onClickUpDownEvent(e, 'down')}  className="down-arrow-btn"></button></li>
                    </ul>
                </li>
                )
                }
            </ul>
        </div>
    )
}