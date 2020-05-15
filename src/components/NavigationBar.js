import React from 'react';
import {Nav, Navbar,Form, Button, FormControl} from 'react-bootstrap'
import styled from 'styled-components'



const Styles =styled.div `
.navbar{
    height: 100px;
    background-color: #222;
}
.navbar-brand, .navbar-nav .nav-link{
    color: #FF8C00;
    &:hover{
        color: white;
    }
}
`;


export const NavigationBar=(props)=>(
    
    <Styles>
        <Navbar expand='lg'>
            <Navbar.Brand href="/">(brand logo)</Navbar.Brand>
            <Navbar.Toggle aria-controls= "basic-navbar-nav"/>
            <Form inline>
                <FormControl type="text" placeholder="Search your supply" className="mr-sm-2" value={props.search} onChange={props.searchterm}/>
                <Button variant="outline-success">Search</Button>
            </Form>
            <Navbar.Collapse id ="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/submitproject">Submit Project</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/favorite">Favorite</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)