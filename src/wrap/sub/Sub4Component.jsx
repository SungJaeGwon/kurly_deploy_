import React from 'react';
import './scss/sub.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Sub1Component() {


    const location = useLocation();
    const navigate = useNavigate(); 

    const [state, setState] = React.useState({       
        상품: [],        
    });

    React.useEffect(()=>{
        let fileName = location.pathname.split('/')[1];

        axios({
            url:`./data/sub/${fileName}.json`,
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                
                setState({
                    ...state,            
                    상품: res.data.상품,
                    이미지경로: fileName
                });
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]);

    return (
        <main id='sub4' className='sub'>
            <section id="section1">
                <div className="container">
                    <div className="title hide">
                        <h2 className="title-text">특가혜택</h2>
                    </div>
                    
                    <div className="content sub4-content">
                        <ul>
                            {
                                state.상품.length > 0 && (
                                    state.상품.map((item,idx)=>{
                                        return(
                                            <li key={item.번호}>
                                                <a href="!#"><img src={`./images/sub/sub4/${item.이미지}`} alt="" /></a>
                                            </li>
                                        )
                                    })
                                )
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};
