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
    
      addLike=(newProject)=>{
      
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
      


    render(){
        return(
            <div>
               <ProjectList addLikes={this.addLike} projects={this.state.projects} comments={this.state.comments}/>
            </div>
        )
    }
} 