import React from 'react';
import './scss/sub6_id_pw_search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Sub6SignInIdSearchComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const [state, setState] = React.useState({
        isHp: true,
        isEmail: false,
        아이디: '',
        가입일: '',
        이름:'',
        휴대폰:'',
        발급된인증번호: null,
        입력인증번호:'',
        이메일:'',
        isOff: false,
        isOff2: false,
        isGuidTextName: false,
        isGuidTextHp: false,
        isGuidTextEmail: false,
        isHpAuthenNumberBox: false, 
        isEmailAuthenNumberBox: false 
    });

    const [count, setCount] = React.useState({
        M: 3,
        S: 0,
        setId: 0 
    });

    const onChangeName=(e)=>{
        let isGuidTextName = false;
        
        if(e.target.value===''){
            isGuidTextName=true;
        }
        else{
            isGuidTextName = false;
        }
        setState({
            ...state,
            이름: e.target.value,
            isGuidTextName: isGuidTextName
        });
    }

    const onClickDelName=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            이름: ''
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

        if(regExp1.test(state.휴대폰)===true && state.이름!==''){
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

    },[state.이름, state.휴대폰]);

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
        if(state.이름==='' || regexp.test(state.이메일)===false){
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

    },[state.이름, state.이메일]);

    const onClickDelEmail=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            이메일:''
        })
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

    // 휴대폰 인증번호 발급 
    const onSubmitHpAuthen=(e)=>{
        e.preventDefault();
        const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;
     
        let formData = new FormData();
        formData.append('adminName', state.이름 );
        formData.append('adminHp', state.휴대폰.replace(regExp, '$1-$2-$3')); 

        axios({
            url:'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_admin_id_search.php',
            method: 'POST',
            data: formData 
        })
        .then((res)=>{
            if( res.data === ''){
                confirmModalMethod('가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요.');                
            }
            else {
                let num = 0;
                const regexp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
                num = Math.floor(Math.random() * 9000000 + 1000000); 
                if(regexp.test(state.휴대폰)===false){
                    confirmModalMethod('가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해 주세요.');             
                }
                else{
                    confirmModalMethod(`${num}\n인증번호가 발송되었습니다. 3분 안에 인증번호를 입력해 주세요.\n카카오톡이 설치된 경우 카카오 알림톡으로 발송됩니다. `);
                    clearInterval(count.setId);
                    timer3MinutesCounte();
                }
                setState({
                    ...state,
                    발급된인증번호: num,
                    isHpAuthenNumberBox: true,
                    아이디: res.data.아이디,
                    가입일: res.data.가입일
                });                
            }
        })
        .catch((err)=>{
            console.log(  err );
        });
    }

    const onSubmitEmailAuthen=(e)=>{
        e.preventDefault();
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
                navigate('/sub7AdminIdSearchResult', { 
                    state: {
                        아이디: state.아이디,
                        가입일: state.가입일
                    }
                });     
        }
        else{
            alert('인증번호를 확인하세요');
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
        <main id='sub6IdSearch' className='id-pw-search' style={mainBg}>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className="title-text" style={title1}>MyAdmin</h2>
                        <h3 className="title-text" style={title2}>아이디 찾기</h3>
                    </div>
                    
                    <div className="content">
                        <div className="tab-button-box">
                            <button style={tabBg} onClick={(e)=>onClickTab(e, '휴대폰인증')} className={state.isHp?'on':''}>휴대폰 인증</button>
                            <button style={tabBg} onClick={(e)=>onClickTab(e, '이메일인증')} className={state.isEmail?'on':''}>이메일 인증</button>
                        </div>
                        {
                            state.isHp && (
                                <form onSubmit={onSubmitHpAuthen} id='hpAuthen' autoComplete='off'>
                                        <ul>
                                            <li>
                                                <div className="gap">
                                                    <label htmlFor="userName">이름</label>
                                                    <input 
                                                        type="text" 
                                                        name='userName' 
                                                        id='userName' 
                                                        placeholder='이름을 입력해 주세요'
                                                        onChange={onChangeName}
                                                        value={state.이름}
                                                    />
                                                {
                                                    state.이름!=='' && (
                                                    <button 
                                                        className='delete-btn' 
                                                        onClick={onClickDelName}
                                                    >
                                                        <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                    </button>)
                                                }
                                                </div>
                                                <p className={`guid-text${state.isGuidTextName?' on':''}`}>가입 시 등록한 이름을 입력해 주세요.</p>
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
                                                    state.휴대폰!=='' && (
                                                    <button 
                                                        className='delete-btn'  
                                                        onClick={onClickDelHp}
                                                    >
                                                        <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                    </button>)
                                                }
                                                </div>                                               
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
                                                            <button onClick={onSubmitHpAuthen}>재발송</button>
                                                        </div>
                                                        <span className='time-box'><em>{count.M} : </em><em>&nbsp;{count.S}</em></span>                                                    
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
                                <form onSubmit={onSubmitEmailAuthen} id='emailAuthen'  autoComplete='off'>
                                        <ul>
                                            <li>
                                                <div className="gap">
                                                    <label htmlFor="userName">이름</label>
                                                    <input 
                                                        type="text" 
                                                        name='userName' 
                                                        id='userName' 
                                                        placeholder='이름을 입력해 주세요'
                                                        onChange={onChangeName}
                                                        value={state.이름}
                                                    />
                                                    {
                                                        state.이름!=='' && (
                                                        <button className='delete-btn' onClick={onClickDelName}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>                                                    
                                                        )
                                                    }
                                                </div>
                                                <p className={`guid-text${state.isGuidTextName?' on':''}`}>가입 시 등록한 이름을 입력해 주세요.</p>
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
                                                        state.이메일!=='' && (
                                                        <button 
                                                            className='delete-btn' 
                                                            onClick={onClickDelEmail}
                                                        >
                                                            <img src="./images/sub/sub6/icon_del.svg" alt="" />
                                                        </button>)
                                                    }
                                                </div>
                                                <p className={`guid-text${state.isGuidTextEmail?' on':''}`}>가입 시 등록한 이메일을 입력해 주세요.</p>
                                            </li>
                                        {
                                            state.isEmailAuthenNumberBox && (
                                            <li>
                                                <div className="gap authen-number">
                                                    <label htmlFor="userId">인증 번호</label>
                                                    <div className="box">
                                                        <input 
                                                            type="text" 
                                                            name='userHp' 
                                                            id='userHp'  
                                                            placeholder='인증번호 7자리'
                                                            onChange={onChangeHp}
                                                            value={state.입력인증번호}
                                                            maxLength={7}
                                                        />
                                                        <button>재발송</button>
                                                    </div>
                                                    <span className='time-box'><em>03</em><em>00</em></span>                                                    
                                                </div>
                                                <p className={`guid-text${state.isGuidTextHp?' on':''}`}>가입 시 등록한 휴대폰 번호를 입력해 주세요.</p>
                                            </li>
                                            )
                                        }
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
