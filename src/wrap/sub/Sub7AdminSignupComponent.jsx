import React from 'react';
import './scss/sub.scss';
import './scss/sub5.scss';
import './scss/sub7_signup.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAddress } from '../../reducer/isAddress';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub5SignUpComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    
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
        아이디:'',
        idGuidText:'',
        아이디중복확인: false,

        비밀번호:'',
        pw1GuidText:'',
        비밀번호확인:'',
        pw2GuidText:'',

        이름:'',
        nameGuidText:'',

        이메일:'',
        이메일중복확인: false,
        emailGuidText:'',

        휴대폰:'',
        휴대폰번호인증: false,
        발급된인증번호: null,
        입력된인증번호: '', 
        isHpNum: false, 
        isHpNum2: false,
        isHpNum3: true, 

        주소1:'',
        주소2:'',
        isAddress: false,

    });

    React.useEffect(()=>{
        setTimeout(()=>{
            if(selector.address.주소.주소1!=='' && selector.address.주소.주소2!=='' ){
                return (
                    setState({
                        ...state,
                        주소1: selector.address.주소.주소1,
                        주소2: selector.address.주소.주소2,
                        isAddress: true
                    })    
                )
            }
        }, 10);
    },[selector.address.주소.주소1, selector.address.주소.주소2]);




    // [1-1]. 아이디
    const onChangeId=(e)=>{
        const   {value} = e.target;
        let     아이디 = '';
        let     idGuidText= '';
        const   regexp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;
        const   regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const   regexp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const   regexp4 = /\s/g;
        const   regexp5 = /^(.){6,16}$/g;
        아이디 = value.replace(regexp1, '');
        if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true  ||  regexp5.test(value)===false ){
            idGuidText = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else{
            idGuidText = '';
        }
        setState({
            ...state,
            아이디: 아이디,
            idGuidText: idGuidText
        });
    }

    // [1-2] 아이디 중복확인
    const onClickIdBtn=(e)=>{
        e.preventDefault();
        let value = state.아이디;
        let idGuidText = '';
        let 아이디중복확인 = false;
        const   regexp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;
        const   regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const   regexp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const   regexp4 = /\s/g;
        const   regexp5 = /^(.){6,16}$/g;

        if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true  ||  regexp5.test(value)===false ){
            idGuidText = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
            아이디중복확인 = false;
            confirmModalMethod( idGuidText );
            setState({
                ...state,
                아이디중복확인: 아이디중복확인
            });
        }
        else{  
            const formData = new FormData();
            formData.append('adminId', state.아이디);

            axios({
                url:'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_admin_id_duplicate_ok.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                console.log( res.data );
                if(res.status===200){
                    if(res.data===0){                                               
                        idGuidText = '사용 할 수 있는 아이디 입니다';
                        아이디중복확인 = true;                        
                    }
                    else if(res.data===1){                        
                        idGuidText = '사용 불가능한 아이디 입니다';
                        아이디중복확인 = false;
                    }
                    confirmModalMethod( idGuidText );
                    setState({
                        ...state,
                        아이디중복확인: 아이디중복확인
                    });
                }
            })
            .catch((err)=>{
                console.log('AXIOS 오류');
                console.log( err );
            });
        }
    }


    // [2]. 비밀번호
    const onChangePw1=(e)=>{
        const {value} = e.target;
        let pw1GuidText = '';
        const regexp1 = /^(.){10,16}$/g;
        const regexp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?])+)/g;
        const regexp3 = /\s/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /(\d)\1\1/g;  

        if(regexp1.test(value)===false){
            pw1GuidText = "최소 10자 이상 입력";
        }
        else if(regexp2.test(value)===false || regexp3.test(value)===true || regexp4.test(value)===true){
            pw1GuidText = "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합"
        }
        else if(regexp5.test(value)===true){
            pw1GuidText = "동일한 숫자 3개 이상 연속 사용 불가";
        }
        else{
            pw1GuidText = ""
        }
        setState({
            ...state,
            비밀번호: value,
            pw1GuidText: pw1GuidText
        });
    }
    
    
    // 3. 비밀번호확인
    const onChangePw2=(e)=>{
        let pw2GuidText = ''
        const {value} = e.target;

        if(value===''){
            pw2GuidText = '비밀번호를 한번 더 입력해 주세요.'
        }
        else if(value!==state.비밀번호){
            pw2GuidText = '동일한 비밀번호를 입력해 주세요.'
        }
        else {
            pw2GuidText = '';
        }
        setState({
            ...state,
            비밀번호확인: value,
            pw2GuidText: pw2GuidText
        });
    }

    // 4. 이름
    const onChangeName=(e)=>{
        const {value} = e.target;
        let nameGuidText = '';
        let 이름 = '';
        const regexp = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;

        이름 = value.replace(regexp, '');
        if(이름===''){
            nameGuidText = '이름을 입력해 주세요.';
        }
        else{
            nameGuidText = '';
        }
        setState({
            ...state,
            이름: 이름,
            nameGuidText: nameGuidText
        });
    }


    // 5-1. 이메일
    const onChangeEmail=(e)=>{
        const {value} = e.target;
        let emailGuidText = '';
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;

        if(value===''){
            emailGuidText ='이메일을 입력해 주세요.';
        }
        else if(regexp.test(value)===false){
            emailGuidText ='이메일 형식으로 입력해 주세요.';
        }
        else {
            emailGuidText ='';
        }
        setState({
            ...state,
            이메일: value,
            emailGuidText: emailGuidText
        });
    }


    // 5-2 이메일 중복확인
    const onClickEmailBtn=(e)=>{
        e.preventDefault();
        const value = state.이메일;
        let emailGuidText = '';
        let 이메일중복확인 = false;

        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'?]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+)*@[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+((\.)?[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?.]+)*\.[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9`~!#$%^&*\-_=+{}|'?]+$/g;
        if(value===''){
            emailGuidText ='이메일을 입력해 주세요.';
            이메일중복확인 = false;                    
            confirmModalMethod( emailGuidText );
        }
        else if(regexp.test(value)===false){
            emailGuidText ='이메일 형식으로 입력해 주세요.';
            이메일중복확인 = false;                    
            confirmModalMethod( emailGuidText );
        }
        else {          
            const formData = new FormData();
            formData.append('adminEmail', state.이메일);
            axios({
                url:'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_admin_email_duplicate_ok.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){
                    if(res.data===0){
                        emailGuidText = '사용 할 수 있는 이메일 입니다';
                        이메일중복확인 = true;                        
                    }
                    else if(res.data===1){                        
                        emailGuidText = '사용 불가능한 이메일 입니다';
                        이메일중복확인 = false;
                    }
                    confirmModalMethod( emailGuidText );
                    setState({
                        ...state,
                        이메일중복확인: 이메일중복확인
                    });
                }
            })
            .catch((err)=>{
                console.log( err );
            });
        }
    }

    // 6-1. 휴대폰번호 입력상자
    const onChangeHp1=(e)=>{        
        let isHpNum = false;

        if(e.target.value.length > 0){
            isHpNum = true
        }
        else {
            isHpNum = false;
        }
        setState({
            ...state,
            휴대폰: e.target.value,
            isHpNum: isHpNum
        });
    }
    
    // 6-2. 휴대폰 인증번호받기
    const onClickHpBtn=(e)=>{
        e.preventDefault();
        const regexp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
        let num = 0;
        let isHpNum = true; 
        let isHpNum2 = false;
        let isHpNum3 = true;

        if(state.isHpNum3===true){          
            num = Math.floor(Math.random() * 900000 + 100000);
            isHpNum = false; 
            isHpNum2 = false;
            if(regexp.test(state.휴대폰)===false){
                confirmModalMethod('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');             
            }
            else{
                confirmModalMethod(`인증번호가 발송되었습니다.  ${num}`);
                isHpNum = false;
                isHpNum2 = true;
            }
            setState({
                ...state,
                isHpNum: isHpNum,
                isHpNum2: isHpNum2,
                발급된인증번호: num
            });
        }
        else{  
            isHpNum3 = true; 
            isHpNum = true;
            setState({
                ...state,
                휴대폰:'',
                isHpNum: isHpNum,
                isHpNum3: isHpNum3
            });
        }

    }

    // 6-3. 인증번호입력상자
    const onChangeHp2=(e)=>{
        setState({
            ...state,
            입력된인증번호: e.target.value
        });
    }

    // 6-4. 인증번호 비교
    const onClickHpBtnOk=(e)=>{
        e.preventDefault();
        let isHpNum  = false;
        let isHpNum2 = false;
        let isHpNum3 = true;
        let 휴대폰번호인증 = false;

        if(state.발급된인증번호 === Number(state.입력된인증번호)){
            confirmModalMethod('인증에 성공 하였습니다.');
            isHpNum  = true; 
            isHpNum2 = false; 
            isHpNum3 = false; 
            휴대폰번호인증 = true;
        }
        else{
            confirmModalMethod('잘못된 인증 코드 입니다.');
            isHpNum2 = true;
            isHpNum  = false; 
            isHpNum3 = true; 
            휴대폰번호인증 = false;
        }

        setState({
            ...state,
            isHpNum: isHpNum,
            isHpNum2: isHpNum2,
            isHpNum3: isHpNum3,
            휴대폰번호인증: 휴대폰번호인증
        });
    }

    // 8-1. 주소검색 버튼
    const onClickAddressSearch=(e)=>{
        e.preventDefault();        
        dispatch(isAddress(true));
    }

    // 8-2. 주소1
    const onChangeAddress1=(e)=>{
        setState({
            ...state,
            주소1: e.target.value
        });
    }

    // 8-3. 주소2
    const onChangeAddress2=(e)=>{
        setState({
            ...state,
            주소2: e.target.value
        });
    }

    // 관리자 회원가입
    const onSubmitForm=(e)=>{
        e.preventDefault();
        if(state.아이디===''){
            confirmModalMethod('아이디를 입력하세요');
        }
        else if(state.아이디중복확인===false){
            confirmModalMethod('아이디를 중복확인을 해주세요');
        }
        else if(state.비밀번호===''){
            confirmModalMethod('비밀번호를 입력하세요');
        }
        else if(state.비밀번호확인===''){
            confirmModalMethod('한번더 비밀번호를 입력하세요');
        }        
        else if(state.이름===''){
            confirmModalMethod('이름을 입력하세요');
        }
        else if(state.이메일===''){
            confirmModalMethod('이메일을 입력하세요');
        }        
        else if(state.이메일중복확인===false){
            confirmModalMethod('이메일 중복확인을 해주세요');
        }
        else if(state.휴대폰===''){
            confirmModalMethod('휴대폰 번호를 입력하세요');
        }
        else if(state.휴대폰번호인증===false){
            confirmModalMethod('휴대폰 번호를 인증 해주세요');
        }
        else if(state.주소1===''){
            confirmModalMethod('주소를 검색 해주세요');
        }
        else if(state.주소2===''){
            confirmModalMethod('나머지 주소를 입력 해주세요');
        }        
        else { 
            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;
            const formData = new FormData(); 
            formData.append('adminId',       state.아이디);
            formData.append('adminPw',       state.비밀번호);
            formData.append('adminName',     state.이름);
            formData.append('adminEmail',    state.이메일);
            formData.append('adminHp',       state.휴대폰.replace(regExp, '$1-$2-$3'));
            formData.append('adminAddress',  `${state.주소1}, ${state.주소2}` );

            axios({
                url: 'http://gksmf519.dothome.co.kr/kurly_green/green_kurly_admin_siginup.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){  
                    if(res.data===1){                      
                        confirmModalMethod('마켓컬리 관리자 회원가입을 진심으로 감사드립니다.');
                    }   
                    else if(res.data===0){ 
                        confirmModalMethod('확인하고 다시 시도해주세요');
                        return;
                    }
                }                              
            })
            .then(()=>{
                navigate('/index');
            })
            .catch((err)=>{
                console.log(`AXIOS 전송 실패! ${err} `);
            });
        }
    }

    return (
        <main id='sub5' className='sub7-signup'>
            <section id="signUp">
                <div className="container">

                    <div className="title">
                        <h2 className="title-text title1">MyAdmin</h2>
                        <h4 className="title-text title2">관리자 회원가입</h4>
                        <div className="sub-title">
                            <h3><i>*</i><span>필수입력사항</span></h3>
                        </div>
                    </div>
                    
                    <div className="content sub5-content">
                       <form onSubmit={onSubmitForm}>
                            <ul className='signup-form'>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminId"><span>아이디</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text" 
                                                maxLength={16}
                                                name='adminId' 
                                                id='adminId' 
                                                placeholder='아이디를 입력해주세요' 
                                                value={state.아이디}  
                                                onChange={onChangeId}
                                            />
                                        </div>

                                        <div className="right-box">
                                            <button onClick={onClickIdBtn}>중복확인</button>
                                        </div>
                                        <p className={`guid-text${state.idGuidText!==''?' on':''}`}>{state.idGuidText}</p>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminPw1"><span>비밀번호</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="password"
                                                maxLength={16}   
                                                name='adminPw1' 
                                                id='adminPw1' 
                                                placeholder='비밀번호를 입력해주세요' 
                                                value={state.비밀번호} 
                                                onChange={onChangePw1}
                                            />
                                        </div>

                                        <div className="right-box">
                                           
                                        </div>
                                        <p className={`guid-text${state.pw1GuidText!==''?' on':''}`}>{state.pw1GuidText}</p>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminPw2"><span>비밀번호확인</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="password" 
                                                maxLength={16}  
                                                name='adminPw2' 
                                                id='adminPw2' 
                                                placeholder='비밀번호를 한번 더 입력해주세요' 
                                                value={state.비밀번호확인} 
                                                onChange={onChangePw2}
                                            />
                                        </div>

                                        <div className="right-box">
                                            
                                        </div>
                                        <p className={`guid-text${state.pw2GuidText!==''?' on':''}`}>{state.pw2GuidText}</p>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminName"><span>이름</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text"   
                                                name='adminName' 
                                                id='adminName' 
                                                placeholder='이름을 입력해주세요' 
                                                value={state.이름} 
                                                onChange={onChangeName}
                                            />
                                        </div>

                                        <div className="right-box">
                                            
                                        </div>
                                        <p className={`guid-text${state.nameGuidText!==''?' on':''}`}>{state.nameGuidText}</p>  
                                    </div>                                   
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminEmail"><span>이메일</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text"   
                                                name='adminEmail' 
                                                id='adminEmail' 
                                                placeholder='이메일을 입력해주세요'  
                                                value={state.이메일} 
                                                onChange={onChangeEmail}
                                            />
                                        </div>

                                        <div className="right-box">
                                            <button onClick={onClickEmailBtn}>중복확인</button>
                                        </div>
                                        <p className={`guid-text${state.emailGuidText!==''?' on':''}`}>{state.emailGuidText}</p>   
                                    </div>
                                </li>
                                <li className='list hp1'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="adminHp"><span>휴대폰</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text" 
                                                maxLength={11}  
                                                name='adminHp' 
                                                id='adminHp' 
                                                placeholder='숫자만 입력해주세요' 
                                                value={state.휴대폰} 
                                                onChange={onChangeHp1}
                                            />
                                        </div>

                                        <div className="right-box">
                                            <button 
                                                disabled={!state.isHpNum} 
                                                className={`hp-btn${state.isHpNum?'':' off'}`}
                                                onClick={onClickHpBtn}
                                            >{state.isHpNum3?'인증번호받기':'다른번호인증'}</button>
                                        </div>
                                        <p className='guid-text'></p>  
                                    </div>
                                </li>
                                {
                                    state.isHpNum2 && (
                                        <>
                                            <li className='list hp2'>
                                                <div className="list-box">
                                                
                                                    <div className="input-box">
                                                        <input 
                                                            type="text"   
                                                            name='adminHpAuthen' 
                                                            id='adminHpAuthen' 
                                                            placeholder='인증번호를 입력해주세요'  
                                                            value={state.인증번호} 
                                                            onChange={onChangeHp2}
                                                        />
                                                        <span className='time-box'><em>03</em><em>00</em></span>
                                                    </div>

                                                    <div className="right-box">
                                                        <button onClick={onClickHpBtnOk}>인증번호확인</button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='list hp3'>
                                                <div className="list-box">
                                                    
                                                    <p className='guid-text show'>
                                                        인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (컬리 1644-1107)
                                                    </p>
                                                                                        
                                                </div>
                                            </li>
                                        </>
                                    )
                                }
                                <li className='list address1'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor=""><span>주소</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">                                            
                                            {
                                                sessionStorage.getItem('KURLY_ADDRESS_KEY')===null && (
                                                    <button onClick={onClickAddressSearch} className='address-search-btn'>주소검색</button>
                                                )
                                            }
                                            {
                                                sessionStorage.getItem('KURLY_ADDRESS_KEY')!==null && (
                                                    <input 
                                                        type="text"   
                                                        name='adminAddress1' 
                                                        id='adminAddress1' 
                                                        placeholder='검색 주소' 
                                                        value={state.주소1} 
                                                        onChange={onChangeAddress1}
                                                    />
                                                )
                                            }
                                        </div>

                                        <div className="right-box">
                                            {
                                                sessionStorage.getItem('KURLY_ADDRESS_KEY')!==null && (
                                                    <button onClick={onClickAddressSearch}>재검색</button>
                                                )  
                                            }
                                        </div>

                                    </div>
                                </li>
                                {
                                    sessionStorage.getItem('KURLY_ADDRESS_KEY')!==null && (
                                        <>
                                            <li className='list address2'>
                                                <div className="list-box">
                                                
                                                    <div className="input-box">
                                                        <input 
                                                            type="text"   
                                                            name='adminAddress2' 
                                                            id='adminAddress2' 
                                                            placeholder='나머지 주소를 입력하세요'  
                                                            value={state.주소2} 
                                                            onChange={onChangeAddress2}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                            </li>
                                            <li className='list address3'>
                                                <div className="list-box">
                                                
                                                    <p className='guid-text show'>
                                                        <strong>샛별배송</strong>
                                                        배송지에 따라 상품 정보가 달라질 수 있습니다.
                                                    </p>

                                                </div>
                                            </li>
                                        </>
                                    )
                                }
                                                             
                            </ul>
                            <div className="button-box">
                                <button type='submit'>가입하기</button>
                            </div>
                       </form>
                    </div>

                </div>
            </section>
        </main>
    );
};
