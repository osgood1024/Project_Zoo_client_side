import React, {Component} from 'react'
import { Button, Form, Segment, TextArea } from 'semantic-ui-react'
import styled from 'styled-components'
const Styles =styled.div `
.form_layout{
    margin:50px !important;
}
p{
    font-size: .92857143em;
    font-weight: 700;
}

.button{
    float: right;
}

.form{
    padding: 10px;
}


`

export class SubmitProject extends Component {

    state={
        name : "" ,
        link: "" ,
        image: "" ,
        description: ""
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    handleSubmit=(e) =>{
        e.preventDefault()
        fetch('http://localhost:3000/projects',{
            method: "POST",
            headers:{
              "content-type" : "application/json",
              accept : "application/json"
          },
          body: JSON.stringify({
            user_id : 1,
            name : this.state.name,
            link: this.state.link,
            image: this.state.image ,
            description: this.state.description,
            like: 0
             
          })
        })
        .then(resp => resp.json())
        .then(newSubmit=> {
            if(newSubmit.status===490){
                alert(newSubmit.errors)
            }
            else{

                this.props.newProject(newSubmit)
                
                    
            }
        }
    )
        
}
    
        
    


render(){
    return(
        <Styles>
        <Segment inverted padded={"very"} className={'form_layout'}>
            <Form inverted  onSubmit={this.handleSubmit}>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Project Name:' placeholder='what is your project topic?' name='name' value={this.state.name} onChange={this.handleChange} />
                </Form.Group>
                    {/* <Form.Input fluid label='# Tag :' placeholder='#todolist #react #web_dev....' /> */}
                <Form.Group widths="grouped">
                    <Form.Input fluid label='Website live link or Github Repo:' placeholder='your project link/ Github repo..' name='link' value={this.state.link} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group widths="grouped">
                    <Form.Input fluid label='Picture for project: ' placeholder='copy image address' name='image' value={this.state.image} onChange={this.handleChange}/>
                </Form.Group>

                <p>Description:</p>
                <Form.Group widths ="grouped">
                <TextArea  placeholder='Tell us more' name='description' value={this.state.description} onChange={this.handleChange}/>
                </Form.Group>

            
            <Button type='submit' className={"button"} >Submit</Button>

            </Form>
        </Segment>
        </Styles>

        )
    }
}
