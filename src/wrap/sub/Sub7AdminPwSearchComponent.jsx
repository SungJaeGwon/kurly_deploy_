import React from 'react';
import './scss/sub6_id_pw_search.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';
import { useNavigate } from 'react-router-dom';

export default function Sub6SignInPwSearchComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        isHp: true,
        isEmail: false,
        아이디:'',
        휴대폰:'',
        이메일:'',
        발급된인증번호: null,
        입력인증번호:'',
        isOff: false,
        isOff2: false,
        isGuidTextId: false,
        isGuidTextHp: false,
        isGuidTextEmail: false
    });

    const [count, setCount] = React.useState({
        M: 3,
        S: 0,
        setId: 0 
    });
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

    const onChangeId=(e)=>{
        let isGuidTextId = false;
        
        if(e.target.value===''){
            isGuidTextId=true;
        }
        else{
            isGuidTextId = false;
        }
        setState({
            ...state,
            아이디: e.target.value,
            isGuidTextId: isGuidTextId
        });
    }

    const onClickDelId=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            아이디: ''
        });
    }
    const onChangeHp=(e)=>{
        const regExp1 = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/g;
        const regExp2 = /[^\d]/g; 
        let 휴대폰 = '';     
        let isGuidTextHp = false;

        휴대폰 = e.target.value.replace(regExp2, '');
       
        if(휴대폰==='' || regExp1.test(휴대폰)===false){
            isGuidTextHp = true;
        }
        else {
            isGuidTextHp = false;
        }
        setState({
            ...state,
            휴대폰: 휴대폰,
            isGuidTextHp: isGuidTextHp
        });
    }
    const onClickDelHp=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            휴대폰: ''
        });
    }

    React.useEffect(()=>{

        let isOff = false;
        const regExp1 = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/g;

        if(regExp1.test(state.휴대폰)===true && state.아이디!==''){
            isOff = true;           
        }
        else{            
            isOff = false;            
        }

        setState({
            ...state,
            isOff: isOff
        });

        return;
    },[state.아이디, state.휴대폰]);


    const onClickTab=(e, p)=>{
        e.preventDefault();
        let isHp = true;
        let isEmail = false;
        if(p==='휴대폰인증'){
            isHp = true;
            isEmail = false;
        }
        else if(p==='이메일인증'){
            isHp = false;
            isEmail = true;
        }
        setState({
            ...state,
            isHp : isHp,
            isEmail : isEmail
        });
        
    }

    // 이메일 인증
    const onChangeEmail=(e)=>{
        let isGuidTextEmail = false;
        let isOff2 = false;
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        
        if(e.target.value==='' || regexp.test(e.target.value)===false){
            isGuidTextEmail = true;
            isOff2 = false;
        }
        else {
            isGuidTextEmail = false;            
            isOff2 = true;
        }
        setState({
            ...state,
            이메일: e.target.value,
            isGuidTextEmail: isGuidTextEmail,
            isOff2: isOff2
        })
    }

    React.useEffect(()=>{
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        let isOff2 = false;
        if(state.아이디==='' || regexp.test(state.이메일)===false){
            isOff2 = false;
        }
        else {         
            isOff2 = true;
        }
        setState({
            ...state,
            isOff2: isOff2
        });
        return;

    },[state.아이디, state.이메일]);

    const onClickDelEmail=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            이메일:''
        })
    }

    const timer3MinutesCounte=()=>{
        let m = 3; 
        let M = 0; 
        let S = 0;
        let now = new Date(); 
        let endTime = now.setMinutes( now.getMinutes() + 3 );
        let setId = 0;
        setId = setInterval(()=>{
            now = new Date(); 
            const result = endTime - now;
            if( now >= endTime ){
                clearInterval(setId);
                M=0;
                S=0;
            }
            else{
                M = Math.floor(result/(60*1000)) % 3;
                S = Math.floor(result/(1000)) % 60;
            }
            setCount({
                ...count,
                M: M<10?`0${M}`:M,
                S: S<10?`0${S}`:S,
                setId: setId
            })
        },1000);
    }

    const onSubmitPwSearch=(e)=>{
        e.preventDefault();
        const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;

        const formData = new FormData();
        formData.append('adminId', state.아이디);
        formData.append('adminHp', state.휴대폰.replace(regExp, '$1-$2-$3'));

        axios({
            url:'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_admin_pw_search.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.data===1){
                confirmModalMethod('비밀번호 재설정 하세요');
                let num = 0;
                const regexp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
                num = Math.floor(Math.random() * 9000000 + 1000000);
                if(regexp.test(state.휴대폰)===false){
                    confirmModalMethod('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');             
                }
                else{
                    confirmModalMethod(`인증번호가 발송되었습니다.  ${num}`);
                    clearInterval(count.setId);
                    timer3MinutesCounte();
                }
                setState({
                    ...state,
                    발급된인증번호: num,
                    isHpAuthenNumberBox: true
                });
            }
            else{
                confirmModalMethod('가입회원 정보를 확인하고 다시 시도하세요');
            }
        })
        .catch((err)=>{
            console.log( err )
        });
    }

    const onChangeAuthenNum=(e)=>{
        setState({
            ...state,
            입력인증번호: e.target.value
        })
    }

    const onClickOkBtn=(e)=>{
        e.preventDefault();
        if(Number(state.입력인증번호)===state.발급된인증번호){
            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;          
            navigate('/sub7AdminPwReset', { 
                state: {
                    아이디: state.아이디,
                    휴대폰: state.휴대폰.replace(regExp, '$1-$2-$3')
                }
            });     
        }
        else{
            confirmModalMethod('인증번호를 확인하세요');
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
     const tabBg = {
         backgroundColor: '#fcfcfc'
     }


    return (
        <main id='sub6IdSearch' className='id-pw-search'  style={mainBg}>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title-text" style={title1}>MyAdmin</h2>
                        <h3 className="title-text" style={title2}>비밀번호 찾기</h3>
                    </div>
                    
                    <div className="content">
                        <div className="tab-button-box">
                            <button style={tabBg} onClick={(e)=>onClickTab(e, '휴대폰인증')} className={state.isHp?'on':''}>휴대폰 인증</button>
                            <button style={tabBg} onClick={(e)=>onClickTab(e, '이메일인증')} className={state.isEmail?'on':''}>이메일 인증</button>
                        </div>
                        {
                            state.isHp && (
                                <form onSubmit={onSubmitPwSearch}  id='hpAuthen' autoComplete='off'>
                                        <ul>
                                            <li>
                                                <div className="gap">
                                                    <label htmlFor="userId">아이디</label>
                                                    <input 
                                                        type="text" 
                                                        name='userId' 
                                                        id='userId' 
                                                        placeholder='아이디을 입력해 주세요'
                                                        onChange={onChangeId}
                                                        value={state.아이디}
                                                    />
                                                {
                                                    state.아이디!==''&&(
                                                    <button className='delete-btn' onClick={onClickDelId}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>                                                    
                                                    )
                                                }
                                                </div>
                                                <p className={`guid-text${state.isGuidTextId?' on':''}`}>가입 시 등록한 아이디을 입력해 주세요.</p>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <label htmlFor="userId">휴대폰 번호</label>
                                                    <input 
                                                        type="text" 
                                                        name='userHp' 
                                                        id='userHp'  
                                                        placeholder='휴대폰 번호를 입력해 주세요'
                                                        onChange={onChangeHp}
                                                        value={state.휴대폰}
                                                        maxLength={11}
                                                    />
                                                {
                                                    state.휴대폰!==''&&(
                                                    <button className='delete-btn'  onClick={onClickDelHp}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>
                                                    )        
                                                }
                                                </div>
                                                <p className={`guid-text${state.isGuidTextHp?' on':''}`}>가입 시 등록한 휴대폰 번호를 입력해 주세요.</p>
                                            </li>
                                            
                                        {
                                            state.isHpAuthenNumberBox && (
                                            <>
                                                <li>
                                                    <div className="gap authen-number">
                                                        <label htmlFor="userAutheNum">인증 번호</label>
                                                        <div className="box">
                                                            <input 
                                                                type="text" 
                                                                name='userAutheNum' 
                                                                id='userAutheNum'  
                                                                placeholder='인증번호 7자리'
                                                                onChange={onChangeAuthenNum}
                                                                value={state.입력인증번호}
                                                                maxLength={7}
                                                            />
                                                            <button onClick={onSubmitPwSearch}>재발송</button>
                                                        </div>
                                                        <span className='time-box'><em>{count.M} : </em><em>{count.S}</em></span>                                                    
                                                    </div>
                                                    <p className={`guid-text${state.isGuidTextHp?' on':''}`}>가입 시 등록한 휴대폰 번호를 입력해 주세요.</p>
                                                </li>  

                                                <li>
                                                    <div className="gap">
                                                        <input 
                                                            type="button" 
                                                            name='okBtn' 
                                                            id='okBtn' 
                                                            value={'확인'} 
                                                            className={state.isOff?'':'off'} 
                                                            disabled={!state.isOff} 
                                                            onClick={onClickOkBtn}
                                                        />
                                                    </div>
                                                </li>   
                                            </>
                                            )
                                        }
                                            
                                        {
                                            state.발급된인증번호===null && (
                                                <li>
                                                    <div className="gap">
                                                        <input type="submit" name='submitBtn' id='submitBtn' value={'인증번호받기'} className={state.isOff?'':'off'} disabled={!state.isOff} />
                                                    </div>
                                                </li>    
                                            )
                                        }                              
                                        </ul>
                                </form>
                            )
                        }
                        {
                            state.isEmail && (
                                <form id='emailAuthen'  autoComplete='off'>
                                        <ul>
                                            <li>
                                                <div className="gap">
                                                    <label htmlFor="userId">아이디</label>
                                                    <input 
                                                        type="text" 
                                                        name='userId' 
                                                        id='userId' 
                                                        placeholder='아이디을 입력해 주세요'
                                                        onChange={onChangeId}
                                                        value={state.아이디}
                                                    />
                                                {
                                                    state.아이디!==''&&(
                                                    <button className='delete-btn' onClick={onClickDelId}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>                                                    
                                                    )
                                                }
                                                </div>
                                                <p className={`guid-text${state.isGuidTextId?' on':''}`}>가입 시 등록한 아이디을 입력해 주세요.</p>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                <label htmlFor="userId">이메일</label>
                                                    <input 
                                                        type="text" 
                                                        name='userEmail' 
                                                        id='userEmail'  
                                                        placeholder='이메일을 입력해 주세요'
                                                        onChange={onChangeEmail}
                                                        value={state.이메일}
                                                    />
                                                {
                                                    state.이메일!==''&&(
                                                    <button className='delete-btn' onClick={onClickDelEmail}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>
                                                    )
                                                }
                                                </div>
                                                <p className={`guid-text${state.isGuidTextEmail?' on':''}`}>가입 시 등록한 이메일을 입력해 주세요.</p>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <input type="submit" name='submitBtn' id='submitBtn' value={'확인'} className={state.isOff2?'':'off'} disabled={!state.isOff2} />
                                                </div>
                                            </li>                                
                                        </ul>
                                </form>
                            )
                        }

                    </div>
                </div>
            </section>
        </main>
    );
};
