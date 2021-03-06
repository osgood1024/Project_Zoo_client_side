import React, {Component} from 'react'
import { Button, Form, Segment, TextArea, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import {Spring} from 'react-spring/renderprops'



const Styles =styled.div `
.form_layout{
    margin:100px !important;
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
        projects:[],
        name : "" ,
        link: "" ,
        image: "" ,
        category: null,
        description: ""
    }

    componentDidMount(){

        fetch('http://localhost:3000/projects')
        .then(resp => resp.json())
        .then(data => this.setState({
            projects: data
        })
        )

    }

      
    
    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    handleCategory=(e,data)=>{
        
        this.setState({
            category: data.value
        })
    }
    
    addProject=(newProject)=>{
      this.setState({
        projects:[...this.state.projects,newProject]
      }, () => this.props.history.push('/'))
        
    }

    handleSubmit=(e) =>{
        e.preventDefault()
        fetch('https://stark-sierra-95307.herokuapp.com/projects',{
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
            category: this.state.category,
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
                this.addProject(newSubmit)
                    
            }
        }
    )
        
}
    
        
    


render(){

    const CategoryOptions=[
         {
            key: 'technology',
            text: 'technology',
            value: 'technology',
            
          },
          {
            key: 'health',
            text: 'health',
            value: 'health',
            
          },
          {
            key: 'entertainment',
            text: 'entertainment',
            value: 'entertainment',
            
          },
          {
            key: 'design',
            text: 'design tool',
            value: 'design tool',
            
          },
          {
            key: 'portfolio',
            text: 'portfolio',
            value: 'portfolio',
            
          },
          {
            key: 'education',
            text: 'education',
            value: 'education',
            
          },
          {
            key: 'game',
            text: 'game',
            value: 'game',
            
          },
          {
            key: 'productivity',
            text: 'productivity',
            value: 'productivity',
            
          },
          {
            key: 'news',
            text: 'news',
            value: 'news',
            
          },
          {
            key: 'other',
            text: 'other',
            value: 'other',
            
          },

    ]




    const{name,category,image,link,description}=this.state

   

    return(
        <Styles>
            <Spring
                from={{opacity: 0 ,  marginLeft:-20 , transform: 'translate3d(-20px,-20px,0)'}}
                to={{opacity: 1,  transform: 'translate3d(0px,0px,0)'}}
                config={{delay: 700, duration:1000}}
            >

{props => (
     <div style={props}>

        <Segment inverted padded={"very"} className={'form_layout'}>
            <Form inverted  onSubmit={this.handleSubmit}>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Project Name:' placeholder='what is your project topic?' name='name' value={name} onChange={this.handleChange} />
                </Form.Group>
                
                <p>Category:</p>
                <Dropdown fluid placeholder='Select Category' 
                selection
                search
                options ={CategoryOptions}
                value={category} 
                onChange={this.handleCategory}
                />

    

                    {/* <Form.Input fluid label='# Tag :' placeholder='#todolist #react #web_dev....' /> */}
                <Form.Group widths="grouped">
                    <Form.Input fluid label='Website live link or Github Repo:' placeholder='your project link/ Github repo..' name='link' value={link} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group widths="grouped">
                    <Form.Input fluid label='Picture for project: ' placeholder='copy image address' name='image' value={image} onChange={this.handleChange}/>
                </Form.Group>

                <p>Description:</p>
                <Form.Group widths ="grouped">
                <TextArea  placeholder='Tell us more' name='description' value={description} onChange={this.handleChange}/>
                </Form.Group>

            
            <Button type='submit' className={"button"} >Submit</Button>

            </Form>
        </Segment>
            </div>
            )}
            </Spring>
        </Styles>

        )
    }
}
