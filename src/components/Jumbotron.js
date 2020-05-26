import React from 'react';
import { Jumbotron as Jumbo, Container} from "react-bootstrap";
import styled from 'styled-components';
// import green from './green.jpg';



const Styles = styled.div`
.jumbo{
    background:url(${ './green.jpg'}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
}
.overlay{
    background-color #000;
    opacity :0.15;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index:
}
.container{
    color: white;
    font-weight : 900;
}
`;

export const Jumbotron=()=>(
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className ="overlay"></div>
            
        </Jumbo>
    </Styles>

)