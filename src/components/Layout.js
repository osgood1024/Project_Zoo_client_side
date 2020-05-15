import React from 'react';
import {Container} from 'react_bootstrap';

export const Layout =(props)=>(
    <Container>
        {props.children}
    </Container>
)