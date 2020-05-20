import React,{Component} from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import { Home } from './Home';
import { Favorite } from './Favorite';
import { SubmitProject } from './SubmitProject' ;
import { LogIn } from './components/LogIn' ;
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';




class App extends Component{
  state={
    projects:[],
    comments:[],
    users:[],
    favorites:[],
    searchTerm:''
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
  }))

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


handleSearch=(e) =>{
  this.setState({
      searchTerm: e.target.value
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
.then(()=> this.deleteFav(project_id))
}



deleteFav=(id)=>{
  let project =this.projects.filter(project => project.id !== id)
  this.setState({
    projects: project
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



addProject=(newProject)=>{
  this.setState({
    projects:[...this.state.projects,newProject]
  })
}


  render(){

    // console.log(this.state.favorites.map(p =>p.project.like))

    return(
      <React.Fragment>
        <NavigationBar handleSearch={this.handleSearch} search={this.state.searchTerm} />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} 
               search={this.state.searchTerm} 
               favorites={this.state.favorites}
               users={this.state.users}
               comments={this.state.comments}
               projects={this.state.projects}
               handleFavorite={this.handleFavorite} 
               handleFavoriteDel={this.handleFavoriteDel}
               handleLike={this.handleLike}
               handleComment={this.handleComment}
               handleDelComment={this.handleDelComment}
               
               />}/>
              <Route path="/favorite" render={props => <Favorite {...props} 
              search={this.state.searchTerm}
              favorites={this.state.favorites}
              users={this.state.users}
              comments={this.state.comments}
              projects={this.state.projects}
              handleFavorite={this.handleFavorite} 
              handleFavoriteDel={this.handleFavoriteDel}
              handleLike={this.handleLike}
              handleComment={this.handleComment}
              handleDelComment={this.handleDelComment}
            
              
              />} />
              <Route path="/submitproject" render={ props => <SubmitProject {...props} projects={this.state.projects} 
              newProject={this.addProject} />}/>
              <Route path="/login" component={LogIn}/>
            </Switch>
          </Router>
        </Layout>
        
      </React.Fragment>
     
    )
  }

}

export default App;
