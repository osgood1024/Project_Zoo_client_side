import React from 'react'
import ProjectList from './components/ProjectList'
// import {Spring} from 'react-spring/renderprops'



export class Favorite extends React.Component{

    state={
        projects:[],
        comments:[],
        users:[],
        favorites:[],
        category: 'all'
    }

 componentDidMount(){
     
    fetch('http://localhost:3000/projects')
        .then(resp => resp.json())
        .then(data => this.setState({
            projects: data
        })
        )

    fetch('http://localhost:3000/comments')
        .then(resp => resp.json())
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

    fetch('http://localhost:3000/favorites')
        .then(resp => resp.json())
        .then(fav => this.setState({
            favorites : fav
        }))
}



filterProject = (category) => {
    this.setState({
      category: category
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
  
  
  addLike = (newProject)=>{
      
    let current_project = this.state.projects.reduce((acc,currVal) => { 
      if(currVal.id === newProject.id) {
         return acc.concat([newProject])
      } else{
        return acc.concat([currVal])
      }
    }, [])
    
  let favorite=this.state.favorites.map(fav => {
    if(fav.project.id === newProject.id ){
      return {...fav, project: newProject }
    }else{
      return fav
    }
  } )
  
    this.setState({
      projects: current_project,
      favorites: favorite
    })
  }
  
  
  
  handleFavorite =(ProjectId)=>{
  
    fetch(`http://localhost:3000/favorites`, {
      method: "POST",
      headers:{
        "content-type" : "application/json",
        accept : "application/json"
    },
    body: JSON.stringify({
        user_id: 1,
        project_id: ProjectId
    })
  })
  .then(resp => resp.json())
  .then(newFav => {
      if(newFav.status===490){
        alert(newFav.errors)
      }
      else{
        console.log("Setting favorites here")
        this.setState({
          favorites: [...this.state.favorites,newFav]
          })
      }
    }
  )
  }
  
  handleFavoriteDel=(project_id,favorite_id)=>{
    console.log('handleFavoriteDel' , favorite_id, 'projectId', project_id)
      fetch(`http://localhost:3000/favorites/${favorite_id}`, {
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
    let favproject =this.state.projects.filter(fav => fav.id !== id)
    this.setState({
      projects: favproject
    })
  }
  
  
  
  handleComment=(user_id,ProjectId,newcontent)=>{
  
      fetch('http://localhost:3000/comments', {
        method: "POST",
          headers:{
            "content-type" : "application/json",
            accept : "application/json"
          },
          body: JSON.stringify({
            user_id: user_id,
            project_id: ProjectId,
            content: newcontent
            })
          })
          .then(resp => resp.json())
          .then(newComment => {
            if(newComment.status === 490){
              alert(newComment.errors)
            }else{
              this.setState({
                comments: [...this.state.comments,newComment]
              })
  
            }
          }
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

    const{category}=this.state

    const favorite_projects = this.state.projects.filter(project => project.favorites.some((fav)=> fav.user_id  === 1))
    const searchFilter=favorite_projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))
    const search = category  === 'all' ? searchFilter : searchFilter.filter(project => project.category.toLowerCase() === category)



        return(
            <>
             {/* <Spring
                from={{opacity: 0 ,  marginLeft:-20 , transform: 'translate3d(-20px,-20px,20px)'}}
                to={{opacity: 1,  transform: 'translate3d(0px,0px,0px)'}}
                config={{delay: 500, duration:1000}}
            >

{props => (
     <div style={props}> */}


        {
              search &&  

             <ProjectList
              projects={search} 
              filterProject={this.filterProject}
              users={this.state.users} 
              comments={this.state.comments} 
              handleFavorite={this.handleFavorite} 
              handleFavoriteDel={this.handleFavoriteDel}
              handleLike={this.handleLike}
              handleComment={this.handleComment}
              handleDelComment={this.handleDelComment}
             />

        }
        {/* </div>
            )}
            </Spring>       */}
            
            </>
           
        )
    }
}






