import React from "react";
import './scss/TomModal.scss';
import { useDispatch } from "react-redux";
import { topModal } from "../reducer/topModal";

export default function TopModalComponent(){

    const dispatch = useDispatch();

    const onClickCloseBtn=(e)=>{
        e.preventDefault();
        let expires = 3;
        let toDay = new Date();
        toDay.setDate( toDay.getDate() + expires );

        const obj = {
            id: `TOP20231008`,
            expires: toDay.getTime()  
        }
        localStorage.setItem('KURLY_TOP_MODAL_KEY', JSON.stringify(obj) ); 

        dispatch(topModal(false));
    }

    return(
        <div id="topModal">
           <div className="container">
                <div className="content">
                    <a href="!#"><em>지금 가입하고,  </em><strong>1만원 할인 쿠폰</strong><em> 받아가세요!</em></a>
                    <button onClick={onClickCloseBtn} className="topmodal-close-btn"></button>
                </div>
           </div>
        </div>
    )
}