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




handleComment=(ProjectId,newcontent)=>{

    fetch('http://localhost:3000/comments', {
      method: "POST",
        headers:{
          "content-type" : "application/json",
          accept : "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
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




deleteFav=(id)=>{
  let project =this.projects.filter(project => project.id !== id)
  this.setState({
    projects: project
  })

}


  handleSearch=(e) =>{
    this.setState({
        searchTerm: e.target.value
    })
}

addProject=(newProject)=>{
  this.setState({
    projects:[...this.state.projects,newProject]
  })
}


  render(){

    return(
      <React.Fragment>
        <NavigationBar handleSearch={this.handleSearch} search={this.state.searchTerm} />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} 
               search={this.state.searchTerm} 
               projects={this.state.projects}
               comments={this.state.comments}
               users={this.state.users}
               handleFavorite={this.handleFavorite} 
               handleFavoriteDel={this.handleFavoriteDel}
               handleLike={this.handleLike}
               handleComment={this.handleComment}
               handleDelComment={this.handleDelComment}
               
               />}/>
              <Route path="/favorite" render={props => <Favorite {...props} addLike={this.addLike} />} />
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
