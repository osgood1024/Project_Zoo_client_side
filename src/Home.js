import React from 'react'
import ProjectList from './components/ProjectList'



export class Home extends React.Component{
    state={
        projects:[],
        comments:[]
    
      }
    
      componentDidMount(){
        // debugger;
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


  handleFavorite =(ProjectId)=>{
    
          fetch(`http://localhost:3000/favorites`, {
            method: "POST",
            headers:{
              "content-type" : "application/json",
              accept : "application/json"
          },
          body: JSON.stringify({
              user_id: 31,
              project_id: ProjectId
          })
        })
    }

    // .then(resp => resp.json())
    // .then(newFav => console.log(newFav)) 
  
handleFavoriteDel=(project_id)=>{
  fetch(`http://localhost:3000/favorites`, {
    method: "Delete",
    headers:{
      "content-type" : "application/json",
      accept : "application/json"
    }
  })
    .then(resp => resp.json())
    .then(()=> this.deleteFav(project_id))
}
  
  deleteFav=(id)=>{
    let project =this.state.projects.filter(project => project.id !== id)
    this.setState({
      projects: project
    })

  }



    render(){
      console.log(this.state.projects)
        const search=this.state.projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))
        
        return(
            <div>
               <ProjectList 
               handleLike={this.handleLike}
                handleFavorite={this.handleFavorite}
                projects={search} 
                comments={this.state.comments}
                handleFavoriteDel={this.handleFavoriteDel}/>
            </div>
        )
    }
} 