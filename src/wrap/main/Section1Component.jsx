import React from "react";
import './scss/section1.scss';
import Section1ComponentChild from './Section1ComponentChild';
import axios from "axios";

export default function Section1Component(){

    const [state, setState] = React.useState({
        슬라이드: [],
        n: 0
    });
    React.useEffect(()=>{
        axios({
            url:'./data/intro/section1.json',
            method:'GET'
        })
        .then((result)=>{ 
            setState({
                ...state,
                슬라이드:  result.data.slide,
                n: result.data.slide.length
            })
        })
        .catch((error)=>{
            console.log("AXIOS 오류 " + error );
        });
    },[]);

    return(
        <section id="section1">            
            <Section1ComponentChild 슬라이드={state.슬라이드} n={state.n} />            
        </section>
    )
}