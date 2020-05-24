import React from 'react';
import {Nav, Navbar,Form, Button, FormControl} from 'react-bootstrap'
import styled from 'styled-components'
import {Link} from 'react-router-dom';







const Styles =styled.div `
.navbar{
    height: 100px;
    background-color: #222;
    padding: 8px 40px 8px 20px;
}

.form-control {
    border-radius: 15px;
    width: 100%;
    padding: 10px ;
    
   
}
.button{
    border-radius: 50px;
    
}
.navbar-brand,  .navbar-nav .nav-link{
    padding: 20px;
    border-radius: 50px;
    color: #FF8C00;
    &:hover {
        color: white;
       
    }
}

.navbar-brand{
    font-size: 20px;
    margin: 0px 25px 0px 25px;
}

img{
    border-radius: 50%;
    margin :10px;
}



`;


export const NavigationBar=(props)=>{
    
    return (
    <Styles>
        <Navbar expand='lg'>
            <Navbar.Brand href="/">Project Zoo </Navbar.Brand>

            <Navbar.Toggle aria-controls= "basic-navbar-nav"/>
           
            <Form inline>
                <FormControl type="text" placeholder="Search Project"  className="mr-sm-2" value={props.search} onChange={(e)=>props.handleSearch(e)}/>
            </Form>

                <Button className="rounded-pill" variant="outline-success">Search</Button>
            
            <Navbar.Collapse id ="basic-navbar-nav">
                <Nav className="ml-auto" as={Link} variant="pills" defaultActiveKey="/" >
                    <Nav.Item><Nav.Link as={Link} to={"/"} eventKey={"link-0"}>Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link as={Link} to={"/submitproject"} eventKey={"link-1"}>Submit Project</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link as={Link} to={"/favorite"} eventKey={"link-2"} >Favorite</Nav.Link></Nav.Item>
                    <Nav.Item><img src={'./og.png'} alt={'osgood'} style={{width:50, height:40}} /></Nav.Item>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    </Styles>
    )
}