import React from 'react'
import ProjectList from './components/ProjectList'



export class Home extends React.Component{
    state={
        projects:[],
        comments:[],
        users:[],
        contents: ""
    
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
        })
        )
    

        fetch('http://localhost:3000/users')
        .then(resp=>resp.json())
        .then(user => this.setState({
            users: user
        })
        )

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

  handleComment=(ProjectId)=>{
    fetch(`http://localhost:3000/comments`, {
      method: "POST",
      headers:{
        "content-type" : "application/json",
        accept : "application/json"
      },
      body: JSON.stringify({
        user_id: 31,
        project_id: ProjectId,
        content:this.state.content
       })
    })
      .then(resp => resp.json())
      .then(newComment => this.setState({
        contents:[...this.state.contents,newComment]
      })
      )
  }



handleChange=(e)=>{
  this.setState({
      [e.target.name] : e.target.value
  })
}



    render(){
      // console.log(this.state.users)
        const search=this.state.projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))
        
        return(
            <div>
               <ProjectList 
                handleFavorite={this.handleFavorite}
                handleFavoriteDel={this.handleFavoriteDel}
                handleLike={this.handleLike}
                contents={this.state.contents}
                projects={search} 
                comments={this.state.comments}
                users={this.state.users}
                handleChange={this.handleChange}
                handleComment={this.handleComment}
                />
            </div>
        )
    }
} 