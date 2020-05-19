import React from 'react'
import ProjectList from './components/ProjectList'



export class Home extends React.Component{
    state={
        comments:[],
        users:[]
        
    
      }
    
      componentDidMount(){

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
          .then(updatedProject =>  this.props.addLike(updatedProject)) 
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

handleFavoriteDel=(project_id,favorite_id)=>{
  fetch(`http://localhost:3000/favorites/${favorite_id}`, {
    method: "Delete",
    headers:{
      "content-type" : "application/json",
      accept : "application/json"
    }
  })
    .then(resp => resp.json())
    .then(()=> this.props.deleteFav(project_id))
}

// deleteFav=(id)=>{
//   let project =this.props.projects.filter(project => project.id !== id)
//   this.setState({
//     projects: project
//   })

// }


  handleComment=(ProjectId,newcontent)=>{

    fetch('http://localhost:3000/comments', {
      method: "POST",
      headers:{
        "content-type" : "application/json",
        accept : "application/json"
      },
      body: JSON.stringify({
        user_id: 31,
        project_id: ProjectId,
        content: newcontent
       })
    })
      .then(resp => resp.json())
      .then(newComment => 
        this.setState({
          comments: [...this.state.comments,newComment]
      })
    )
  }



  handleDelComment=(cid) =>{
    fetch(`http://localhost:3000/comments/${cid}`, {
      method: "Delete",
      headers:{
        "content-type" : "application/json",
        accept : "application/json"
      }
    })
      .then(resp => resp.json())
      .then(()=> this.deleteComment(cid))

  }


  deleteComment=(cid)=>{
    let comment =this.state.comments.filter(comment => comment.id !== cid)
    this.setState({
      comments: comment
    })

  }



    render(){

        const search=this.props.projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))
        
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
                handleComment={this.handleComment}
                handleDelComment={this.handleDelComment}
                />
            </div>
        )
    }
} 