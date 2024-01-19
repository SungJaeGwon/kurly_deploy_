import React from 'react';
import './scss/sub.scss';
import './scss/sub5.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAddress } from '../../reducer/isAddress';
import { confirmModal } from '../../reducer/confirmModal';
import { confirmService1 } from '../../reducer/confirmService1Modal';
import { confirmService2 } from '../../reducer/confirmService2Modal';
import { confirmService3 } from '../../reducer/confirmService3Modal';

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

        생년: '',
        생월: '',
        생일: '',
        birthGuidText:'',

        성별:'선택안함', 

        추가입력사항: '',
        추천인아이디: '',  
        추천인아이디확인: false, 
        참여이벤트명: '',
        isUserChoogaId: false, 
        isUserChoogaEvent: false,

        이용약관 : [
            '이용약관 동의(필수)',
            '개인정보 수집∙이용 동의(필수)',
            '개인정보 수집∙이용 동의(선택)',
            '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
            'SNS',
            '이메일',
            '본인은 만 14세 이상입니다.(필수)'
        ],
        이용약관동의: [], 
        전체동의: ''
    });

    const [count, setCount] = React.useState({
        M: 3,
        S: 0,
        setId: 0 
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
            formData.append('userId', state.아이디);
            axios({
                url:'http://gksmf519.dothome.co.kr/kurly_green/kurly_id_duplicate_ok.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
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
            formData.append('userEmail', state.이메일);

            axios({
                url:'http://gksmf519.dothome.co.kr/kurly_green/kurly_email_duplicate_ok.php',
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
                console.log('AXIOS 오류');
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
                clearInterval(count.setId);
                timer3MinutesCounte();
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

    // 6-4. 인증번호 비교 확인 
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


    // 9 성별 
    const onChangeGender=(e)=>{
        setState({
            ...state,
            성별: e.target.value
        })
    }

    // 10-0 생년월월 유효성 검사
    React.useEffect(()=>{
        let birthGuidText = '';
        if( state.생년==='' && state.생월==='' &&  state.생일=='' ){
            birthGuidText = '';
        }
        else{
            if(state.생년.length<4){ 
                birthGuidText = '태어난 년도 4자리를 정확하게 입력해주세요.';
            }
            else if( Number(state.생년) < (new Date().getFullYear()-100) ){ 
                birthGuidText = '생년월일을 다시 확인해주세요.';
            }            
            else if(  Number(state.생년) > new Date().getFullYear()  ){
                birthGuidText = '생년월일이 미래로 입력 되었습니다. ';
            }            
            else{
                if( state.생월 < 1 || state.생월 > 12 ){
                    birthGuidText = '태어난 월을 정확하게 입력해주세요.';
                }
                else {
                    if(state.생일 < 1 || state.생일 > 31 ){
                        birthGuidText = '태어난 일을 정확하게 입력해주세요.';
                    }
                    else {
                        if(  Number(state.생년) === (new Date().getFullYear()-14)  ){
                            if( Number(state.생월) === (new Date().getMonth()+1) ){
                                if( Number(state.생일) === new Date().getDate() ){
                                    birthGuidText = ''; 
                                }
                                else if( Number(state.생일) > new Date().getDate() ){
                                    birthGuidText = '만 14세 미만은 가입이 불가합니다.';
                                }
                            }
                            else if(Number(state.생월) > (new Date().getMonth()+1)){
                                birthGuidText = '만 14세 미만은 가입이 불가합니다.';
                            }                            
                        }
                        else if(  Number(state.생년) > (new Date().getFullYear()-14)  ){
                            birthGuidText = '만 14세 미만은 가입이 불가합니다.';
                        }          
                    }
                }
            }
        }
        setState({
            ...state,
            birthGuidText: birthGuidText
        }) 
    },[state.생년,state.생월,state.생일]);



    // 10-1. 생년
    const onChangeYear=(e)=>{
        const regExp = /[^0-9]/g;
        let 생년 = e.target.value.replace(regExp, '');
        setState({
            ...state,
            생년: 생년
        });
    }
    // 10-2. 생월
    const onChangeMonth=(e)=>{
        const regExp = /[^0-9]/g;
        let 생월 = e.target.value.replace(regExp, '');
        setState({
            ...state,
            생월: 생월
        });
    }    
    // 10-3. 생일
    const onChangeDate=(e)=>{
        const regExp = /[^0-9]/g;
        let 생일 = e.target.value.replace(regExp, '');
        setState({
            ...state,
            생일: 생일
        });
    }

    // 11-1. 추천인아이디
    const onChangeChooga1=(e)=>{
       
        setState({
            ...state,
            추천인아이디: e.target.value
        });    
    }

    // 11-2 추천인아이디 확인
    const onClickIdOk=(e)=>{
        e.preventDefault();
        let 추천인아이디확인 = false;
        let idGuidText ='';
        const formData = new FormData();
        formData.append('userId', state.추천인아이디);

        axios({
            url:'http://gksmf519.dothome.co.kr/kurly_green/kurly_id_ok.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status===200){
                if(res.data===0){
                    idGuidText = '존재하지 않는 아이디 입니다.';  
                    추천인아이디확인=false;             
                }
                else if(res.data===1){                                            
                    idGuidText = '존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.';                    
                    추천인아이디확인=true;
                }
                confirmModalMethod( idGuidText );           
                setState({
                    ...state,
                    추천인아이디확인: 추천인아이디확인
                });   
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    }



    // 11-3. 참여이벤트명
    const onChangeChooga2=(e)=>{
        setState({
            ...state,
            참여이벤트명: e.target.value
        });
    }

    // 11-4 추가입력 사항
    const onChangeChooga=(e)=>{
        setState({
            ...state,
            추가입력사항: e.target.value
        });
    }
    // 11-5 추가입력사항
    React.useEffect(()=>{
        let isUserChoogaId = false;
        let isUserChoogaEvent = false;
        if(state.추가입력사항==="친구초대 추천인 아이디"){
            isUserChoogaId = true;
            isUserChoogaEvent = false;
        }
        else if(state.추가입력사항==="참여 이벤트명"){
            isUserChoogaId = false;
            isUserChoogaEvent = true;
        }
        setState({
            ...state,
            isUserChoogaId: isUserChoogaId,
            isUserChoogaEvent: isUserChoogaEvent
        })
    },[state.추가입력사항]);

    // 12-1  이용약관동의
    const onChangeServiceCheck=(e)=>{
        let 이용약관동의 = state.이용약관동의;

        if(e.target.checked===true){
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                if( 이용약관동의.includes('SNS')===false &&  이용약관동의.includes('이메일')===false ){
                    이용약관동의 = [...이용약관동의, e.target.value,'SNS','이메일'];
                }
                else if( 이용약관동의.includes('SNS')===true &&  이용약관동의.includes('이메일')===false ){
                    이용약관동의 = [...이용약관동의, e.target.value,'이메일'];
                }
                else if( 이용약관동의.includes('SNS')===false &&  이용약관동의.includes('이메일')===true ){
                    이용약관동의 = [...이용약관동의, e.target.value,'SNS'];
                }                
            }
            else if(e.target.value==='SNS'){
                if( 이용약관동의.includes('이메일')===true ){
                    이용약관동의 = [...이용약관동의, e.target.value,'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'];
                }
                else{
                    이용약관동의 = [...이용약관동의, e.target.value];
                }   
            }
            else if(e.target.value==='이메일'){
                if( 이용약관동의.includes('SNS')===true ){
                    이용약관동의 = [...이용약관동의, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'];
                }
                else{
                    이용약관동의 = [...이용약관동의, e.target.value];
                }
            }
            else{
                이용약관동의 = [...이용약관동의, e.target.value]
            }
        }
        else {
            let arr = state.이용약관동의;
            if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                arr = arr.filter((item)=> item!==e.target.value);
                arr = arr.filter((item)=> item!=='SNS');
                arr = arr.filter((item)=> item!=='이메일');
                이용약관동의 = arr;
            }
            else if(e.target.value==='SNS'){
                arr = arr.filter((item)=> item!==e.target.value);
                arr = arr.filter((item)=> item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                이용약관동의 = arr;
            }
            else if(e.target.value==='이메일'){
                arr = arr.filter((item)=> item!==e.target.value);
                arr = arr.filter((item)=> item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                이용약관동의 = arr;
            }
            else{
                이용약관동의 = 이용약관동의.filter((item)=>item !== e.target.value);
            }
        }
        setState({
            ...state,
            이용약관동의: 이용약관동의
        })
    }

    const onChangeServiceAllCheck=(e)=>{
        let 이용약관동의 = [];

        if(e.target.checked){
            이용약관동의 = state.이용약관;
        }
        else{
            이용약관동의 = []; 
        }
        setState({
            ...state,
            이용약관동의: 이용약관동의,
        })
    }

    // 이용약관보기 1
    const onClickServiceView1=(e)=>{
        e.preventDefault();
        dispatch(confirmService1(true));
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }
    // 이용약관보기 2
    const onClickServiceView2=(e)=>{
        e.preventDefault();
        dispatch(confirmService2(true));
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }
    // 이용약관보기 3
    const onClickServiceView3=(e)=>{
        e.preventDefault();
        dispatch(confirmService3(true));
        const htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.classList.add('on');
    }

    // DATABASE 서버 전송
    const onSubmitForm=(e)=>{
        e.preventDefault();
        let cnt = 0;
        state.이용약관동의.map((item)=>{
            if(item.includes('필수')){
                cnt++;
            }
        });

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
        else if(cnt < 3){
            confirmModalMethod('이용약관동의 필수 항목을 선택 해주세요');
        }
        else {
            const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g; 

            const formData = new FormData();
            formData.append('userId',       state.아이디);
            formData.append('userPw',       state.비밀번호);
            formData.append('userName',     state.이름);
            formData.append('userEmail',    state.이메일);
            formData.append('userHp',       state.휴대폰.replace(regExp, '$1-$2-$3'));
            formData.append('userAddress',  `${state.주소1}, ${state.주소2}` );
            formData.append('userGender',   state.성별);
            formData.append('userBirth',    `${state.생년}-${state.생일}-${state.생일}` );
            formData.append('userAddInput', `${state.추가입력사항} ${state.추천인아이디} ${state.추천인아이디확인} ${state.참여이벤트명}` );
            formData.append('userService',  state.이용약관동의);

            axios({ 
                url: 'http://gksmf519.dothome.co.kr/kurly_green/kurly_insert.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){  
                    console.log( res.data );          
                    if(res.data===1){ 
                        confirmModalMethod('마켓컬리 회원가입을 진심으로 감사드립니다.');
                        navigate('/sub6')
                    }   
                    else if(res.data===0){ 
                        confirmModalMethod('확인하고 다시 시도해주세요');
                    }
                }                              
            })
            .catch((err)=>{
                console.log(`AXIOS 전송 실패! ${err} `);
            });
        }
    }

    return (
        <main id='sub5' className='sub'>
            <section id="signUp">
                <div className="container">

                    <div className="title">
                        <h2 className="title-text">회원가입</h2>
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
                                            <label htmlFor="userId"><span>아이디</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text" 
                                                maxLength={16}
                                                name='userId' 
                                                id='userId' 
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
                                            <label htmlFor="userPw1"><span>비밀번호</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="password"
                                                maxLength={16}   
                                                name='userPw1' 
                                                id='userPw1' 
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
                                            <label htmlFor="userPw2"><span>비밀번호확인</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="password" 
                                                maxLength={16}  
                                                name='userPw2' 
                                                id='userPw2' 
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
                                            <label htmlFor="userName"><span>이름</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text"   
                                                name='userName' 
                                                id='userName' 
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
                                            <label htmlFor="userEmail"><span>이메일</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text"   
                                                name='userEmail' 
                                                id='userEmail' 
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
                                            <label htmlFor="userHp"><span>휴대폰</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <input 
                                                type="text" 
                                                maxLength={11}  
                                                name='userHp' 
                                                id='userHp' 
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
                                                            name='userHpAuthen' 
                                                            id='userHpAuthen' 
                                                            placeholder='인증번호를 입력해주세요'  
                                                            value={state.인증번호} 
                                                            onChange={onChangeHp2}
                                                        />
                                                        <span className='time-box'><em>{count.M} :</em><em>&nbsp;{count.S}</em></span>
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
                                                        name='userAddress1' 
                                                        id='userAddress1' 
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
                                                            name='userAddress2' 
                                                            id='userAddress2' 
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
                                <li className='list radio gender'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label><span>성별</span></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <label htmlFor="userMale">
                                                <input 
                                                    type="radio"   
                                                    name='userGender' 
                                                    id='userMale' 
                                                    value={'남자'} 
                                                    onChange={onChangeGender}
                                                    checked={state.성별.includes('남자')}
                                                />
                                                <span>남자</span>
                                            </label>
                                            <label htmlFor="userFemale">
                                                <input 
                                                    type="radio"  
                                                    name='userGender' 
                                                    id='userFemale' 
                                                    value={'여자'} 
                                                    onChange={onChangeGender}
                                                    checked={state.성별.includes('여자')}
                                                />
                                                <span>여자</span>
                                            </label>
                                            <label htmlFor="userNone">
                                                <input 
                                                    type="radio"   
                                                    name='userGender' 
                                                    id='userNone' 
                                                    value={'선택안함'}  
                                                    onChange={onChangeGender}
                                                    checked={state.성별.includes('선택안함')}
                                                />
                                                <span>선택안함</span>
                                            </label>
                                        </div>
                                    </div>      
                                </li>
                                <li className='list birth'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label htmlFor="userYear"><span>생년월일</span></label>
                                        </div>                                       
                                        <div className="input-box">
                                            <ul>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        maxLength={4}   
                                                        name='userYear' 
                                                        id='userYear' 
                                                        placeholder='YYYY'  
                                                        value={state.생년}  
                                                        onChange={onChangeYear}
                                                    />
                                                </li>
                                                <li><i>/</i></li>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        maxLength={2}  
                                                        name='userMonth' 
                                                        id='userMonth' 
                                                        placeholder='MM' 
                                                        value={state.생월} 
                                                        onChange={onChangeMonth}
                                                    />
                                                </li>
                                                <li><i>/</i></li>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        maxLength={2}  
                                                        name='userDate' 
                                                        id='userDate' 
                                                        placeholder='DD' 
                                                        value={state.생일} 
                                                        onChange={onChangeDate}
                                                    />
                                                </li>
                                            </ul>                                            
                                        </div>
                                        <p className={`guid-text${state.birthGuidText!==''?' on':''}`}>{state.birthGuidText}</p>  
                                    </div>        
                                </li>
                                <li className='list radio chooga'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label><span>추가입력사항</span></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <label htmlFor="userChooga1">
                                                <input 
                                                    type="radio"   
                                                    name='userChooga' 
                                                    id='userChooga1' 
                                                    value={'친구초대 추천인 아이디'} 
                                                    onChange={onChangeChooga}
                                                    checked={state.추가입력사항.includes('친구초대 추천인 아이디')}
                                                />
                                                <span>친구초대 추천인 아이디</span>
                                            </label>
                                            <label htmlFor="userChooga2">
                                                <input 
                                                    type="radio"  
                                                    name='userChooga' 
                                                    id='userChooga2' 
                                                    value={'참여 이벤트명'} 
                                                    onChange={onChangeChooga}
                                                    checked={state.추가입력사항.includes('참여 이벤트명')}
                                                />
                                                <span>참여 이벤트명</span>
                                            </label>                                            
                                        </div>
                                    </div>      
                                </li>
                                {
                                    state.isUserChoogaId && (
                                        <li className='list chooga userChoogaId'>
                                            <div className="list-box">
                                            
                                                <div className="input-box">
                                                    <input 
                                                        type="text"   
                                                        name='userChoogaId' 
                                                        id='userChoogaId' 
                                                        placeholder='추천인 아이디를 입력해주세요' 
                                                        value={state.추천인아이디}  
                                                        onChange={onChangeChooga1}
                                                    />
                                                </div>
                                                <div className="right-box">
                                                    <button onClick={onClickIdOk}>아이디 확인</button>
                                                </div>
                                                <p className='guid-text show'>
                                                    가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.
                                                </p> 

                                            </div>                                   
                                        </li>                      
                                    )          
                                }
                                {
                                    state.isUserChoogaEvent && (
                                        <li className='list chooga userChoogaEvent'>
                                            <div className="list-box">
                                            
                                                <div className="input-box">
                                                    <input 
                                                        type="text"   
                                                        name='userChoogaEvent' 
                                                        id='userChoogaEvent' 
                                                        placeholder='참여 이벤트명을 입력해주세요' 
                                                        value={state.참여이벤트명}  
                                                        onChange={onChangeChooga2}
                                                    />
                                                </div>                                        
                                                <p className='guid-text show'>
                                                    추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                                    가입 이후는 수정이 불가능 합니다.<br/>
                                                    대소문자 및 띄어쓰기에 유의해주세요.
                                                </p> 

                                            </div>                                   
                                        </li>                      
                                    )          
                                }
                                <li className='list hr'>
                                    <div className="list-box">
                                        <hr />
                                    </div>
                                </li>

                                <li className='list servie servie1'>
                                    <div className="list-box">
                                        <div className="left-box">
                                            <label><span>이용약관동의</span><i>*</i></label>
                                        </div>
                                       
                                        <div className="input-box">
                                            <label htmlFor="userServiceAll">
                                                <input 
                                                    type="checkbox"   
                                                    name='userServiceAll' 
                                                    id='userServiceAll' 
                                                    value={'전체 동의합니다.'} 
                                                    onChange={onChangeServiceAllCheck}
                                                    checked={state.이용약관동의.length===7}
                                                />
                                                <span>전체 동의합니다.</span>
                                            </label>
                                        </div>                                        
                                        <p className='guid-text show'>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>  
                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                       
                                        <div className="input-box">
                                            <label htmlFor="userService1">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService1' 
                                                    value={'이용약관 동의(필수)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('이용약관 동의(필수)')}
                                                />
                                                <span>이용약관 동의</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>  
                                        <button className='service-view'  onClick={onClickServiceView1}><span>약관보기</span><img src="http://localhost:3000/images/sub/sub5/icon_arrow_right.svg" alt="" /></button>
                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                       
                                        <div className="input-box">
                                            <label htmlFor="userService2">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService2' 
                                                    value={'개인정보 수집∙이용 동의(필수)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}
                                                />
                                                <span>개인정보 수집∙이용 동의</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div> 
                                        <button className='service-view' onClick={onClickServiceView2}><span>약관보기</span><img src="http://localhost:3000/images/sub/sub5/icon_arrow_right.svg" alt="" /></button>
                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                       
                                        <div className="input-box">
                                            <label htmlFor="userService3">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService3' 
                                                    value={'개인정보 수집∙이용 동의(선택)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}
                                                />
                                                <span>개인정보 수집∙이용 동의</span>
                                            </label>
                                            <em>(선택)</em>
                                        </div>          
                                        <button className='service-view'  onClick={onClickServiceView3}><span>약관보기</span><img src="http://localhost:3000/images/sub/sub5/icon_arrow_right.svg" alt="" /></button>
                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                       
                                        <div className="input-box">
                                            <label htmlFor="userService4">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService4' 
                                                    value={'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}
                                                />
                                                <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>
                                            </label>
                                            <em>(선택)</em>
                                        </div>                                        
                                    </div>
                                </li>
                                <li className='list servie servie5'>
                                    <div className="list-box">
                                        <div className="input-box">
                                            <label htmlFor="userService5">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService5' 
                                                    value={'SNS'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('SNS')}
                                                />
                                                <span>SNS</span>
                                            </label>
                                            <label htmlFor="userService6">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService6' 
                                                    value={'이메일'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('이메일')}
                                                />
                                                <span>이메일</span>
                                            </label>
                                        </div>                                        
                                        <p className='guid-text show'>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>  
                                    </div>
                                </li>
                                <li className='list servie'>
                                    <div className="list-box">
                                      
                                        <div className="input-box">
                                            <label htmlFor="userService7">
                                                <input 
                                                    type="checkbox"   
                                                    name='userService' 
                                                    id='userService7' 
                                                    value={'본인은 만 14세 이상입니다.(필수)'} 
                                                    onChange={onChangeServiceCheck}
                                                    checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                                />
                                                <span>본인은 만 14세 이상입니다.</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>                                        
                                    </div>
                                </li>                               
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
