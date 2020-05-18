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

export class  SubmitProject extends Component {

    state={
        projects:[],
        projectName : "" ,
        projectLink: "" ,
        projectPic: "" ,
        projectDescription: ""
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidMount(){
        fetch('http://localhost:3000/projects')
        .then(resp => resp.json())
        .then(data => this.setState({
        projects:data
        })) 
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
            projectName : this.state.projectName,
            projectLink: this.state.projectLink,
            projectPic: this.state.projectPic ,
            projectDescription: this.state.projectDescription
             
          })
        })
        .then(resp => resp.json())
        .then(newProject => this.setState({
            projects:[...this.state.projects,newProject]
        }))
    }
    
        
    


render(){
    console.log(this.state)
    return(
        <Styles>
        <Segment inverted padded={"very"} className={'form_layout'}>
            <Form inverted>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Project Name:' placeholder='what is your project topic?' name='projectName' value={this.state.projectName} onChange={this.handleChange} />
                </Form.Group>
                    {/* <Form.Input fluid label='# Tag :' placeholder='#todolist #react #web_dev....' /> */}
                <Form.Group widths="grouped">
                    <Form.Input fluid label='Website live link or Github Repo:' placeholder='your project link/ Github repo..' name='projectLink' value={this.state.projectLink} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group widths="grouped">
                    <Form.Input fluid label='Picture for project: ' placeholder='copy image address' name='projectPic' value={this.state.projectPic} onChange={this.handleChange}/>
                </Form.Group>

                <p>Description:</p>
                <Form.Group widths ="grouped">
                <TextArea  placeholder='Tell us more' name='projectDescription' value={this.state.projectDescription} onChange={this.handleChange}/>
                </Form.Group>

            
            <Button type='submit' className={"button"} onSubmit={this.handleSubmit} >Submit</Button>

            </Form>
        </Segment>
        </Styles>

        )
    }
}
