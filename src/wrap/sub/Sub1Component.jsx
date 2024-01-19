import React from 'react';
import './scss/sub.scss';
import Title from './SubComponent/Title';
import Submenu from './SubComponent/Submenu';
import ProductList from './SubComponent/ProductList';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

export default function Sub1Component() {

    const location = useLocation();

    const [state, setState] = React.useState({
        타이틀: {
            이미지:'',
            텍스트:''
        },
        서브메뉴: {
            카테고리: [],
            브랜드: {
                가나다순: [],
                상품많은순: []
            },
            가격: [],
            혜택: [],
            유형: [],
            특정상품제외: []
        },
        상품: [],
        필터: [],
        필터상품: [],        
        필터삭제: [],
        이미지경로: ''          
    });

    const filterSetterMethod=(필터)=>{
        setState({
            ...state,
            필터: 필터
        })
    }

    const filterDeleteMethod=(삭제데이터)=>{
        let 필터 = state.필터;
        let result = 필터.filter((item)=>item!==삭제데이터);
        
        setState({
            ...state,
            필터: result,
            필터삭제: [...state.필터삭제, 삭제데이터]
        })
        if(result.length<=0){
            sessionStorage.removeItem('KURLY_SUB1_FILTER_ITEM');
        }

    }

    React.useEffect(()=>{
        if(state.필터삭제.length > 0){ 
            sessionStorage.setItem('KURLY_SUB1_FILTER_DELETE_ITEM', JSON.stringify(state.필터삭제));    
        }        
    },[state.필터삭제]);

    React.useEffect(()=>{
        if(state.필터.length > 0){ 
            sessionStorage.setItem('KURLY_SUB1_FILTER_ITEM', JSON.stringify(state.필터));
        }
    },[state.필터]);

    React.useEffect(()=>{
        let fileName = location.pathname.split('/')[1];
        axios({
            url:`./data/sub/${fileName}.json`,
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                let result = [];
                if(sessionStorage.getItem('KURLY_SUB1_FILTER_ITEM')!==null){
                   result = JSON.parse(sessionStorage.getItem('KURLY_SUB1_FILTER_ITEM'));
                }
                setState({
                    ...state,
                    타이틀: {
                        이미지: res.data.타이틀.이미지,
                        텍스트: res.data.타이틀.텍스트
                    },
                    서브메뉴: {
                        카테고리: res.data.서브메뉴.카테고리,
                        브랜드: {
                            가나다순: res.data.서브메뉴.브랜드.가나다순,
                            상품많은순: res.data.서브메뉴.브랜드.상품많은순
                        },
                        가격: res.data.서브메뉴.가격,
                        혜택: res.data.서브메뉴.혜택,
                        유형: res.data.서브메뉴.유형,
                        특정상품제외: res.data.서브메뉴.특정상품제외
                    },
                    상품: res.data.상품,
                    필터: result,
                    이미지경로: fileName
                });
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]);

    React.useEffect(()=>{
        setState({
            ...state,
            상품: state.상품.sort((a, b)=> (b.제조일시 < a.제조일시) ? (-1) : ((b.제조일시 > a.제조일시) ? (1) : (0)) ),
            is추천순: false,
            is신상품순: true,
            is판매량순: false,
            is혜택순: false,
            is낮은가격순: false,
            is높은가격순: false
        })
        return;
    }, [state.상품]);

    React.useEffect(()=>{
        let 필터상품 = [];
        if(state.필터.length > 0){ 
            state.상품.map((item)=>{
                state.필터.map((item2)=>{
                    if(item.카테고리 === item2){ 
                        return 필터상품 = [...필터상품, item]; 
                    }
                    if(item.제품명.includes(item2)){ 
                        return 필터상품 = [...필터상품, item];
                    }
                    if(item.옵션==="단일상품"){
                        state.서브메뉴.가격.map((item3)=>{
                            if(item2.includes(item3.가격범위)){
                                if(item.정가 >= item3.가격[0]  &&  item.정가 < item3.가격[1] ){
                                    return 필터상품 = [...필터상품, item];
                                }
                            }
                        })
                    }
                    else if(item.옵션==="다중상품"){
                        item.정가.map((item4)=>{
                            state.서브메뉴.가격.map((item3)=>{                                
                                if(item2.includes(item3.가격범위)){                                    
                                    if(item4.정가 >= item3.가격[0]  &&  item4.정가 < item3.가격[1] ){
                                        return 필터상품 = [...필터상품, item];
                                    }
                                }
                            })
                        })
                    }
                    if(item.혜택 === item2){
                        return 필터상품 = [...필터상품, item];
                    }
                    if(item.유형 === item2){
                        return 필터상품 = [...필터상품, item];
                    }
                    if(item.특정상품제외 === item2){
                        return 필터상품 = [...필터상품, item];
                    }
                });
            });
        }
        else{ 
            필터상품 = state.상품;
        }
        setState({
            ...state,
            필터상품: 필터상품
        })
    }, [state.필터]);

    const onClickRefresh=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            필터: [],
            필터상품: state.상품
        })
        sessionStorage.removeItem('KURLY_SUB1_FILTER_ITEM');
    }

    return (
        <main id='sub1' className='sub'>
            <section id="section1">
                <div className="container">
                    <Title 타이틀={state.타이틀} />
                    <div className="content">
                        <div className="left">
                            <div className="gap">
                                <div className="header">
                                    <h3>필터</h3>
                                    <span onClick={onClickRefresh}>
                                        <img src="./images/sub/sub1/icon_reflash.svg" alt="" />
                                        <em>초기화</em>
                                    </span>
                                </div>
                                <Submenu 상품={state.상품} 필터={state.필터}  filterSetterMethod={filterSetterMethod} 서브메뉴={state.서브메뉴} />
                            </div>
                        </div>
                        <ProductList filterDeleteMethod={filterDeleteMethod} 필터={state.필터} 상품={state.상품} 필터상품={state.필터상품} 이미지경로={state.이미지경로} />
                    </div>
                </div>
            </section>
        </main>
    );
};
