import React from 'react';
import './scss/sub6.scss';
import { useNavigate, useLocation, Link }  from  'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../reducer/signIn';
import { address } from '../../reducer/address';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub6SignInComponent() {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    const confirmModalMethod=(msg)=>{
        const obj = {
            isConfirmModal: true,
            confirmMsg: msg,
            회원가입완료: false
        }
        dispatch(confirmModal(obj));
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }

    const [state, setState] = React.useState({
        아이디: '',
        비밀번호:'',
        로그인정보: {}
    });

    const onChangeId=(e)=>{
        setState({
            ...state,
            아이디: e.target.value
        });
    }
    
    const onChangePw=(e)=>{
        setState({
            ...state,
            비밀번호: e.target.value
        });
    }

    const onSubmitSigin=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', state.아이디);
        formData.append('userPw', state.비밀번호);

        axios({
            url: 'http://gksmf519.dothome.co.kr/kurly_green/kurly_signin.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status===200){
                if(res.data!==''){
                    let toDay = new Date();
                    toDay.setDate(toDay.getDate() + 3);
                    const 로그인정보 = {
                        회원등급: '일반',
                        아이디: res.data.아이디,
                        이름: res.data.이름,
                        휴대폰: res.data.휴대폰,
                        주소: res.data.주소,
                        만료일: toDay.getTime()
                    }
                    localStorage.setItem('KURLY_SIGNIN_INFORMATION', JSON.stringify(로그인정보));
                    dispatch(signIn(로그인정보));
                    dispatch(address(res.data.주소));
                    navigate('/index');
                }
                else {
                    confirmModalMethod('입력한 정보를 다시 확인해주세요.');
                }
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    }

    const onClickIdSearch=(e)=>{
        e.preventDefault();
        navigate('/sub6IdSearch');
    }
    const onClickPwSearch=(e)=>{
        e.preventDefault();
        navigate('/sub6PwSearch');
    }

    const onClickSignup=(e)=>{
        e.preventDefault();
        navigate('/sub5');
    }

    return (
        <main id='sub6' className='sub6'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title-text">로그인</h2>
                    </div>
                    <div className="content sub6-content">
                       <form onSubmit={onSubmitSigin} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="text" 
                                            name='userId' 
                                            id='userId'
                                            onChange={onChangeId} 
                                            value={state.아이디}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="password" 
                                            name='userPw' 
                                            id='userPw'
                                            onChange={onChangePw}
                                            value={state.비밀번호}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <span>
                                            <a href="!#" onClick={onClickIdSearch}>아이디 찾기</a>
                                            <i>|</i>
                                            <a href="!#" onClick={onClickPwSearch}>비밀번호 찾기</a>
                                        </span>                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="submit" 
                                            name='submitBtn' 
                                            id='submitBtn' 
                                            value={'로그인'}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="button" 
                                            name='signupBtn' 
                                            id='signupBtn' 
                                            value={'회원가입'} 
                                            onClick={onClickSignup} 
                                        />
                                    </div>
                                </li>
                            </ul>
                       </form>
                    </div>
                </div>
            </section>
        </main>
    );
};
