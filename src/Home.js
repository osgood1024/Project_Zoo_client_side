import React from 'react'
import ProjectList from './components/ProjectList'
// import {Spring} from 'react-spring/renderprops'


export class Home extends React.Component{


    state={
        projects:[],
        comments:[],
        users:[],
        favorites:[],
        category: 'all'
    }

 componentDidMount(){
     
    fetch('https://stark-sierra-95307.herokuapp.com/projects')
        .then(resp => resp.json())
        .then(data => this.setState({
            projects: data
        })
        )

    fetch('https://stark-sierra-95307.herokuapp.com/comments')
        .then(resp => resp.json())
        .then(commented => this.setState({
            comments: commented
        })
        )

    fetch('https://stark-sierra-95307.herokuapp.com/users')
        .then(resp=>resp.json())
        .then(user => this.setState({
            users: user
        })
        )

    fetch('https://stark-sierra-95307.herokuapp.com/favorites')
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
  
    fetch(` https://stark-sierra-95307.herokuapp.com/projects/${id}`, {
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
  
    fetch(`https://stark-sierra-95307.herokuapp.com/favorites`, {
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
        this.setState({
          favorites: [...this.state.favorites,newFav]
          })
      }
    }
  )
  }
  
  handleFavoriteDel=(project_id,favorite_id)=>{
    // console.log('handleFavoriteDel' , favorite_id, 'projectId', project_id)
      fetch(`https://stark-sierra-95307.herokuapp.com/favorites/${favorite_id}`, {
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
  
      fetch('https://stark-sierra-95307.herokuapp.com/comments', {
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
      fetch(`https://stark-sierra-95307.herokuapp.com/comments/${cid}`, {
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



  handleDelProject=(project_id)=>{
    fetch(`https://stark-sierra-95307.herokuapp.com/projects/${project_id}`, {
      method: "Delete",
      headers:{
        "content-type" : "application/json",
        accept : "application/json"
      }
  })
  .then(resp => resp.json())
  .then(()=> this.deleteProject(project_id))
  }
  

  deleteProject=(project_id)=>{
    let project=this.state.projects.filter(p => p.id !==project_id)
    this.setState({
      projects: project
    })

  }
 

    render(){
        const {category,projects,comments,users,favorites} = this.state;

        const searchFilter = projects.filter(p => p.name.toLowerCase().includes(this.props.search.toLowerCase()))
        
        const search = category  === 'all' ? searchFilter : searchFilter.filter(project => project.category.toLowerCase() === category)
        
        return(
           
            <div>
              {/* <Spring
                from={{opacity: 0 ,  marginLeft:-20 , transform: 'translate3d(-20px,-20px,20px)'}}
                to={{opacity: 1,  transform: 'translate3d(0px,0px,0px)'}}
                config={{delay: 500, duration:1000}}
            >

{props => (
     <div style={props}> */}


               <ProjectList 
                projects={search} 
                filterProject={this.filterProject}
                favorites={favorites}
                comments={comments}
                users={users}
                handleLike={this.handleLike}
                handleFavorite={this.handleFavorite}
                handleFavoriteDel={this.handleFavoriteDel}
                handleComment={this.handleComment}
                handleDelComment={this.handleDelComment}
                handleDelProject={this.handleDelProject}
                />


{/* </div>
            )}
            </Spring>  */}

            </div>
       
        )
    }
} 