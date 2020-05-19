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
    searchTerm:''
  }


componentDidMount(){

  fetch('http://localhost:3000/projects')
  .then(resp => resp.json())
  .then(data => this.setState({
      projects: data
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


deleteFav=(id)=>{
  let project =this.props.projects.filter(project => project.id !== id)
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
              <Route exact path="/" render={props => <Home {...props} search={this.state.searchTerm} projects={this.state.projects}
               deleteFav={this.deleteFav} addLike={this.addLike}/>}/>
              <Route path="/favorite" component={Favorite}/>
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
