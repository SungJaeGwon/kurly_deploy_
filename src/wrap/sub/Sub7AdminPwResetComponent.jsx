import React from 'react';
import './scss/sub6_pw_reset.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub6SignInPwResetComponent() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        아이디: location.state.아이디,
        휴대폰: location.state.휴대폰,

        새비밀번호1: '',
        새비밀번호2: '',   

        guidTextBox1: false, 
        guidTextBox2: false,

        pw1_guid_txt1: null,
        pw1_guid_txt2: null, 
        pw1_guid_txt3: null, 
        pw2_guid_txt1: null,
        submitBtn: true
    });

    // 비밀번호 등록
    const pw1RegExp=(value)=>{
        const regexp1 = /^(.){10,}$/g;
        const regexp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)/g;
        const regexp3 = /\s/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /(\d)\1\1/g;
        let pw1_guid_txt1 = null;
        let pw1_guid_txt2 = null;
        let pw1_guid_txt3 = null;

        if(regexp1.test(value)===false){
            pw1_guid_txt1 = true;
        }
        else {
            pw1_guid_txt1 = false;
        }

        if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true){
            pw1_guid_txt2 = true;
        }
        else{           
            pw1_guid_txt2 = false;
        }
    
        if(regexp5.test(value)===true){
            pw1_guid_txt3 = true;
        }
        else{
            pw1_guid_txt3 = false;
        }
        setState({
            ...state,
            새비밀번호1: value,
            pw1_guid_txt1: pw1_guid_txt1,
            pw1_guid_txt2: pw1_guid_txt2,
            pw1_guid_txt3: pw1_guid_txt3
        })
    }

    const pw2Function=(value)=>{
        let pw2_guid_txt1 = null;

        if(value!==state.새비밀번호1 || value===''){
            pw2_guid_txt1 = true;
        }
        else if(value===state.새비밀번호1){
            pw2_guid_txt1 = false;
        }
        setState({
            ...state,
            새비밀번호2: value,
            pw2_guid_txt1: pw2_guid_txt1
        })
    }

    // 새비밀번호 등록 변경
    React.useEffect(()=>{
        pw2Function(state.새비밀번호2);
        return;
    },[state.새비밀번호1]);


    // 최종 확인버튼
    React.useEffect(()=>{
        if(state.pw2_guid_txt1===false){ 
            setState({
                ...state,
                submitBtn: false
            }) 
        }
        else {
            setState({
                ...state,
                submitBtn: true
            }) 
        }
        return;
    },[state.pw2_guid_txt1]);

    // 비밀번호 등록 입력상자 포커스 인
    const onFocusPw1=()=>{
        setState({
            ...state,
            guidTextBox1: true
        })
    }

    // 비밀번호 등록 입력상자 포커스 아웃
    const onBlurPw1=()=>{
        pw1RegExp(state.새비밀번호1);
    }
   
    // 비밀번호 확인 입력상자 포커스 인
    const onFocusPw2=()=>{
        setState({
            ...state,
            guidTextBox2: true
        })
    }

    // 비밀번호 확인 입력상자 포커스 아웃
    const onBlurPw2=()=>{        
        pw2Function(state.새비밀번호2);
    }
   

    // 새비밀번호 등록
    const onChangePw1=(e)=>{
        pw1RegExp(e.target.value);
    }

    // 새비밀번호 확인
    const onChangePw2=(e)=>{
        pw2Function(e.target.value);
    }

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

    const onSubmitPwReset=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('adminId', state.아이디);
        formData.append('adminHp', state.휴대폰);
        formData.append('adminPw', state.새비밀번호1);

        axios({
            url:'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_admin_pw_update.php',
            method:'POST',
            data: formData
        })
        .then((res)=>{
            if( res.data===1 ){
                confirmModalMethod('비밀번호(admin) 변경이 완료되었습니다.');
            }
            else{
                confirmModalMethod('다시 확인하고 시도해주세요');
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    }

    // 새비밀번호
    const onClickDelPw=(e, el)=>{
        e.preventDefault();       
        if(el==='pw1'){
            setState({
                ...state,
                새비밀번호1: ''
            });
        }
        else if(el==='pw2'){
            setState({
                ...state,
                새비밀번호2: ''
            });
        }
    }
   
    const mainBg = {
        backgroundColor: '#fcfcfc'
     }
     const title1 = {
         fontSize: '24px',
         color: '#5f0080',
         textAlign: 'center'
     }
     const title2 = {
         fontSize: '20px',
         color: '#333',
         textAlign: 'center',
         padding: "0 0 50px 0"
     }

    return (
        <main id='pw-reset-form'  style={mainBg}>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title-text" style={title1}>MyAdmin</h2>
                        <h3 className="title-text" style={title2}>비밀번호 재설정</h3>
                    </div>
                    
                    <div className="content sub6-content">
                       <form  onSubmit={onSubmitPwReset} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userPw1">새 비밀번호 등록</label>
                                        <input 
                                            type="password" 
                                            name='userPw1' 
                                            id='userPw1'
                                            placeholder='새 비밀번호를 입력해 주세요'
                                            value={state.새비밀번호1}
                                            onChange={onChangePw1}
                                            onFocus={onFocusPw1}
                                            onBlur={onBlurPw1}
                                            maxLength={16}
                                        />
                                    {
                                        state.새비밀번호1!=='' && (
                                        <button 
                                            className='delete-btn' 
                                            onClick={(e)=>onClickDelPw(e, 'pw1')}
                                        >
                                            <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                        </button>
                                        )
                                    }
                                    </div>
                                {
                                    state.guidTextBox1 && (
                                    <div className='guid-text-box'>
                                        <p className={state.pw1_guid_txt1===null?'':(state.pw1_guid_txt1===true?'red':'blue')}>10자 이상 입력</p>
                                        <p className={state.pw1_guid_txt2===null?'':(state.pw1_guid_txt2===true?'red':'blue')}>영문/숫자/특수문자(공백제외)만 허용하며, 2개이상 조함</p>
                                        <p className={state.pw1_guid_txt3===null?'':(state.pw1_guid_txt3===true?'red':'blue')}>동일한 숫자 3개이상 연속 사용 불가</p>
                                    </div>
                                    )
                                }
                                </li>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userPw1">새 비밀번호 확인</label>
                                        <input 
                                            type="password" 
                                            name='userPw2' 
                                            id='userPw2' 
                                            placeholder='새 비밀번호를 한 번 더 입력해 주세요'
                                            value={state.새비밀번호2}
                                            onChange={onChangePw2}
                                            onFocus={onFocusPw2}
                                            onBlur={onBlurPw2}
                                            maxLength={16}
                                        />
                                    {
                                        state.새비밀번호2!=='' && (
                                        <button 
                                            className='delete-btn' 
                                            onClick={(e)=>onClickDelPw(e, 'pw2')}
                                        >
                                            <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                        </button>)
                                    }
                                    </div>  
                                {
                                    state.guidTextBox2 && (
                                    <div className='guid-text-box'>
                                        <p className={state.pw2_guid_txt1===null?'':(state.pw2_guid_txt1===true?'red':'blue')}>동일한 비밀번호를 입력해 주세요</p>
                                    </div>)
                                }
                                </li>
                                <li>
                                    <div className="gap">
                                        <input 
                                            type="submit" 
                                            name='submitBtn' 
                                            id='submitBtn' 
                                            value={'확인'} 
                                            className={state.submitBtn===true?'':'on'}
                                            disabled={state.submitBtn}
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
