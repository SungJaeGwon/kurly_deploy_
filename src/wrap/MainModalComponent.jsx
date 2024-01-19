import React from "react";
import './scss/MainModal.scss';
import { useDispatch } from "react-redux";
import { mainModal } from "../reducer/mainModal";

export default function MainModalComponent(){

    const dispatch = useDispatch();


    const onClickCloseBtn=(e)=>{
        e.preventDefault();

        dispatch(mainModal(false));
    }

    const onClickCloseBtnExpires=(e)=>{
        e.preventDefault(); 
        let toDay = new Date();
        toDay.setDate( toDay.getDate() + 1  );

        const obj = {
            id: 'MAIN20231008',
            expires: toDay.getTime()
        }
        localStorage.setItem('KURLY_MAIN_MODAL_KEY', JSON.stringify(obj));
        dispatch(mainModal(false));
    }
    return(
        <div id="mainModal">
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <div className="img-box">
                            <a href="!#">
                                <img src="./images/modal_main/227cbd86-d74b-48ed-be50-3da6a8c3634b.jpg" alt="" />
                            </a>
                        </div>
                        <div className="btn-box">
                            <button onClick={onClickCloseBtnExpires}>오늘 하루 안 보기</button>
                            <button onClick={onClickCloseBtn}>닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}