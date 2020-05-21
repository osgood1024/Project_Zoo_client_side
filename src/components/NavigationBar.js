import React from 'react';
import {Nav, Navbar,Form, Button, FormControl} from 'react-bootstrap'
import styled from 'styled-components'



const Styles =styled.div `
.navbar{
    height: 100px;
    background-color: #222;
    padding: 8px 40px 8px 20px;
}

.form-control {
    border-radius: 15px;
    
   
}
.button{
    border-radius: 50px;
}
.navbar-brand, .navbar-nav .nav-link{
    padding: 20px;
    color: #FF8C00;
    &:hover{
        color: white;
    }
}

img{
    border-radius: 50%;
    margin :10px;
}



`;


export const NavigationBar=(props)=>(
    
    <Styles>
        <Navbar expand='lg'>
            <Navbar.Brand href="/">Project Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls= "basic-navbar-nav"/>
            <Form inline>
                <FormControl type="text" placeholder="Search Project" className="mr-sm-3" value={props.search} onChange={(e)=>props.handleSearch(e)}/>
            </Form>
                <Button className="rounded-pill" variant="outline-success">Search</Button>
            <Navbar.Collapse id ="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/submitproject">Submit Project</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/favorite">Favorite</Nav.Link></Nav.Item>
                    <Nav.Item><img src={'./og.png'} alt={'osgood'} style={{width:50, height:40}} /> </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)