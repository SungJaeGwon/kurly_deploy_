import React from 'react';
import '../wrap/scss/ConfirmModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../reducer/confirmModal';

export default function ConfirmModalComponent()  {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const onClickCloseBtn=(e)=>{
        e.preventDefault();
        
        if(selector.confirmModal.confirmMsg.includes('회원가입을 진심으로 감사드립니다.')===true){            
            const obj = {
                isConfirmModal: false,
                confirmMsg: '',
                회원가입완료: true
            }
            dispatch(confirmModal(obj));           
        }
        else if(selector.confirmModal.confirmMsg==='비밀번호 변경이 완료되었습니다.'){            
            const obj = {
                isConfirmModal: false,
                confirmMsg: '',
                회원가입완료: false
            }
            dispatch(confirmModal(obj));
            setTimeout(()=>{
                window.location.pathname = '/sub6';
            },0);
            
        }
        else if(selector.confirmModal.confirmMsg==='비밀번호(admin) 변경이 완료되었습니다.'){            
            const obj = {
                isConfirmModal: false,
                confirmMsg: '',
                회원가입완료: false
            }
            dispatch(confirmModal(obj));

            setTimeout(()=>{
                window.location.pathname = '/sub7AdminSign';
            },0);
            
        }
        else{
            const obj = {
                isConfirmModal: false,
                confirmMsg: '',
                회원가입완료: false
            }
            dispatch(confirmModal(obj)); 
        }
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.remove('on');
    }

    return (
        <div id='confirmModal'>
            <div className='container'>
                <div className='confirm-box'>
                    <ul>
                        <li>
                            <div className='message-box'>
                                
                                    {
                                        selector.confirmModal.confirmMsg.split('\n').map((item)=>{
                                            return(
                                                <p>
                                                    {item}
                                                </p>
                                            )
                                        })
                                    }
                                
                            </div>                             
                        </li>
                        <li>
                            <div className='button-box'>
                                <button onClick={onClickCloseBtn}>확인</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

