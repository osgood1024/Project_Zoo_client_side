import React from 'react'
import ProjectList from './components/ProjectList'



export class Home extends React.Component{
    state={
        projects:[],
        comments:[]
      }
    
      componentDidMount(){
        fetch('http://localhost:3000/projects')
        .then(resp => resp.json())
        .then(data => this.setState({
            projects: data
          })
        )
    
    
        fetch('http://localhost:3000/comments')
        .then(resp=>resp.json())
        .then(commented => this.setState({
            comments: commented
        }))
      
      }


      addLike = (newProject)=>{
      
        let current_project= this.state.projects.reduce((acc,currVal) =>{ 
          if(currVal.id === newProject.id) {
             return acc.concat([newProject])
          } else{
            return acc.concat([currVal])
          }
        }, [])
        
        this.setState({
          projects: current_project
        })
      }
      



  handleLike = (id,newLike) => {

          fetch(` http://localhost:3000/projects/${id}`, {
            method: "PATCH",
            headers:{
              "content-type" : "application/json",
              accept : "application/json"
          },
          body: JSON.stringify({
              like: newLike 
          })
        })
          .then(resp => resp.json())
          .then(updatedProject =>  this.addLike(updatedProject)) 
        }



    render(){
        return(
            <div>
               <ProjectList handleLike={this.handleLike} projects={this.state.projects} comments={this.state.comments}/>
            </div>
        )
    }
} 